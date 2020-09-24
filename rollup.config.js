import typescript from 'rollup-plugin-ts'
import { uglify } from 'rollup-plugin-uglify'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'

function generateConfigFromFileSource(
  file,
  { name = 'index', outputDir } = {}
) {
  const formattedOutputDir = outputDir ? '/' + outputDir : ''
  const tsconfig = (resolvedConfig) => ({
    ...resolvedConfig,
    declarationDir: `./dist${formattedOutputDir}`,
  })

  return [
    {
      input: file,
      output: {
        file: `dist${formattedOutputDir}/${name}.js`,
        format: 'cjs',
        exports: 'default',
      },
      plugins: [
        typescript({
          tsconfig,
        }),
        filesize(),
      ],
    },
    {
      input: file,
      output: {
        file: `dist${formattedOutputDir}/${name}.module.js`,
        format: 'es',
        exports: 'default',
      },

      plugins: [
        typescript({
          tsconfig,
        }),
        filesize(),
      ],
    },
    {
      input: file,
      output: {
        file: `dist${formattedOutputDir}/${name}.browser.js`,
        name: 'Events',
        format: 'umd',
      },
      plugins: [
        resolve(),
        typescript({
          tsconfig,
        }),
        commonjs(),
        uglify(),
        filesize(),
      ],
    },
  ]
}

export default [
  ...generateConfigFromFileSource('src/EventEmitter.ts'),
  ...generateConfigFromFileSource('src/LightEventEmitter.ts', {
    outputDir: 'light',
  }),
]
