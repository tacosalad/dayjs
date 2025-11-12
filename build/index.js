import * as rollup from 'rollup'
import configFactory from './rollup.config.js'
import fs from 'fs'
import util from 'util'
import path from 'path'
import ncpPkg from 'ncp'
const { ncp } = ncpPkg
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { promisify } = util

const promisifyReadDir = promisify(fs.readdir)
const promisifyReadFile = promisify(fs.readFile)
const promisifyWriteFile = promisify(fs.writeFile)

const localeNameRegex = /\/\/ (.*) \[/
const formatName = n => n.replace(/\.js/, '').replace('-', '_')

const localePath = path.join(__dirname, '../src/locale')

async function build(option) {
  const bundle = await rollup.rollup(option.input)
  await bundle.write(option.output)
}

async function listLocaleJson(localeArr) {
  const localeListArr = []
  await Promise.all(localeArr.map(async (l) => {
    const localeData = await promisifyReadFile(path.join(localePath, l), 'utf-8')
    localeListArr.push({
      key: l.slice(0, -3),
      name: localeData.match(localeNameRegex)[1]
    })
  }))
  promisifyWriteFile(path.join(__dirname, '../locale.json'), JSON.stringify(localeListArr), 'utf8')
}

(async () => {
  try {

    // We use await-in-loop to make rollup run sequentially to save on RAM
    const locales = await promisifyReadDir(localePath)
    for (const l of locales) {
      // run builds sequentially to limit RAM usage
      await build(configFactory({
        input: `./src/locale/${l}`,
        fileName: `./locale/${l}`,
        name: `dayjs_locale_${formatName(l)}`,
        format: 'es'
      }))
    }

    const plugins = await promisifyReadDir(path.join(__dirname, '../src/plugin'))
    for (const plugin of plugins) {
      // run builds sequentially to limit RAM usage
      await build(configFactory({
        input: `./src/plugin/${plugin}/index`,
        fileName: `./plugin/${plugin}.js`,
        name: `dayjs_plugin_${formatName(plugin)}`,
        format: 'es'
      }))
    }

    // Build main dayjs files
    await build(configFactory({
      input: './src/index.js',
      fileName: './dayjs.min.js',
      format: 'es'
    }))

    await promisify(ncp)('./types/', './')

    // list locales
    await listLocaleJson(locales)
  } catch (e) {
    console.error(e)
  }
})()
