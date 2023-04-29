const yargs = require('yargs');

const args = yargs(process.argv).parse();

const esmodules = [
  'antlr4',
].join('|');

const coverage = args.coverage === true;
const reporters = ['default'];
if (coverage) {
  reporters.push(['jest-html-reporters', {
    publicPath: './test-result/html',
    filename: 'report.html',
    openReport: true,
  }]);
}

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  transformIgnorePatterns: [
    `node_modules/(?!(${esmodules})/)`,
  ],
  coverageDirectory: './test-result/coverage/',
  reporters,
  setupFilesAfterEnv: ['jest-extended/all'],
  transform: {
    '.+\\.(t|j)sx?$': '@swc/jest',
  },
};
