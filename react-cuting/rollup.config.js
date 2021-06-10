import babel from 'rollup-plugin-babel'
import image from '@rollup/plugin-image'

export default {
  input: './src/index.js',
  output: {
    file: './lib/main.js',
    format: 'cjs'
  },
  plugins: [babel(), image()],
  external: ['react', 'styled-components']
}