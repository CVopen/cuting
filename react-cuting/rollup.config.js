import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',
  output: {
    file: './lib/main.js',
    format: 'cjs'
  },
  plugins: [babel()],
  external: ['react', 'styled-components']
}