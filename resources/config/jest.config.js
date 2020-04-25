/**
 * @author      Michael Kilian
 * @copyright   2019-2020, https://unleashed.sh
 * @license     proprietary
 */
'use strict';

const path = require('path');

module.exports = {
  collectCoverage : true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/vendor/',
    '/resources/',
    '/tests/'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleFileExtensions: [
    'js',
    'ts'
  ],
  moduleNameMapper: {
    '@src/(.*)$': '<rootDir>/src/$1'
  },
  preset: 'ts-jest',
  rootDir: path.resolve(__dirname, '..', '..')
};
