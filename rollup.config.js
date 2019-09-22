import typescript from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'

import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      typescript({
        typescript: require('typescript')
      }),
      filesize()
    ]
  },
  {
    input: 'src/index.ts',
    output: { file: pkg.browser, name: 'Events', format: 'umd' },
    plugins: [
      resolve(),
      typescript({
        typescript: require('typescript')
      }),
      commonjs(),
      uglify(),
      filesize()
    ]
  }
]
