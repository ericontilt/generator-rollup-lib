'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-rollup-lib:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      '.babelrc',
      '.editorconfig',
      '.eslintrc.yml',
      'package.json',
      'rollup.config.js'
    ]);
  });
});
