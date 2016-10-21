'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var camelcase = require('camelcase');

const staticFiles = [
  '.babelrc',
  '.editorconfig',
  '.eslintrc.yml'
];

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('rollup lib') + ' generator!'
    ));

    var prompts = [{
      name: 'libName',
      message: 'What will we call your project',
      default: this.appname.replace(/\s/g, '-')
    }, {
      name: 'authGitHub',
      message: 'Surely you\'ll me your GitHub name',
      validate: x => x.length > 0 ? true : 'Actually, you have to provide a GitHub username'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    staticFiles.map(function(f) {
      this.fs.copy(this.templatePath(f), this.destinationPath(f));
    }.bind(this));

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        libName: this.props.libName,
        authGitHub: this.props.authGitHub
      }
    );

    this.fs.copyTpl(
      this.templatePath('_rollup.config.js'),
      this.destinationPath('rollup.config.js'),
      {
        libName: this.props.libName,
        modName: camelcase(this.props.libName)
      }
    );

    this.fs.copy(
      this.templatePath('src/**/*'),
      this.destinationPath('src/')
    );
    this.fs.copy(
      this.templatePath('test/**/*'),
      this.destinationPath('test/')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
