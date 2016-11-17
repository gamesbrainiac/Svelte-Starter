const html = require('rollup-plugin-html');
const postcss = require('rollup-plugin-postcss');
const scss = require('postcss-scss');
const modules = require('postcss-modules');
const precss = require('precss');
const cssnext = require('postcss-cssnext');
const rucksack = require('rucksack-css');
const cssnano = require('cssnano');
const image = require('rollup-plugin-image');
const json = require('rollup-plugin-json');
const globals = require('rollup-plugin-node-globals');
const builtins = require('rollup-plugin-node-builtins');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

let cssExportMap = {};
module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.spec.js': ['rollup']
    },
    rollupPreprocessor: {
      format: 'iife',
      plugins: [
        html({
          htmlMinifierOptions: {
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true
          }
        }),
        postcss({
          parser: scss,
          plugins: [
            modules({ getJSON(id, tokens) { cssExportMap[id] = tokens; } }),
            precss(),
            cssnext({ warnForDuplicates: false }),
            rucksack({ fallbacks: true, autoprefixer: true }),
            cssnano()
          ],
          getExport(id) { return cssExportMap[id]; }
        }),
        image(),
        json(),
        globals(),
        builtins(),
        resolve({ jsnext: true, browser: true }),
        commonjs(),
        babel()
      ]
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  });
};
