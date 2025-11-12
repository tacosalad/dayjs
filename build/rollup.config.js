import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default (config) => {
  const { input, fileName, name, format } = config

  return {
    input: {
      input,
      external: [
        'dayjs'
      ],
      plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
        terser()
      ]
    },
    output: {
      file: fileName,
      format: format || 'umd',
      name: name || 'dayjs',
      globals: {
        dayjs: 'dayjs'
      },
      compact: true,
      exports: 'auto'
    }
  }
}
