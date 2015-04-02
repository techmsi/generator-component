'use strict';

var util = require('util'),
  path = require('path'),
  chalk = require('chalk'),
  yeoman = require('yeoman-generator'),
  yosay = require('yosay'),
  _ = require('lodash'),
  prompts = require('../promptsAdditional.js'),
  printPromptDetails = require('../helpers.js').printPromptDetails,
  createCss = require('../helpers.js').createCss;

// Note: Call generator using this.name
var FactoryComponentContextGenerator = yeoman.generators.NamedBase.extend({
  prompting: function () {
    var done = this.async();
    // Retrieved from command line arguments
    this.componentDir = this.name;

    this.prompt(prompts, function (props) {
      this.props = props;
      this.hasContexts = _.includes(props.folders, 'contextsDir');

      done();
    }.bind(this));
  },
  confirmInfo: function () {
    printPromptDetails(this.props);
  },
  createFolders: function () {

    // Make base component folder
    this.mkdir(this.componentDir);
    this.mkdir(this.componentDir + '/media');

  },
  createFiles: function () {

    var data,
        contextsDirs,
        componentDir = this.componentDir,
        contextsDir = componentDir + '/' + this.props.contextFolderName + '/',
        singleFolderPath = contextsDir + this.props.contextName;

    data = {
      componentName: this.componentDir,
      desktopOnlyDisplay: this.props.desktopOnlyDisplay,
      controllerName: _.capitalize(_.camelCase(this.componentDir)),
      tag: this.props.containerTag
    };

    if (this.props.numOfContextFolders > 1) {
      contextsDirs = this.props.contextNames.split(',');

      for (var folder in contextsDirs) {
        var dir = contextsDir + contextsDirs[folder];
        createCss(this, dir, data);
      }
      this.log('Created Contexts:\t', chalk.underline.blue(contextsDirs));
    } else if (this.props.numOfContextFolders == 1) {
      createCss(this, singleFolderPath, data);
      this.log(chalk.blue('Context Needed.'));
    } else {
      createCss(this, componentDir, data);
      this.log(chalk.blue('No Context Needed.'));
    }

  }
});

module.exports = FactoryComponentContextGenerator;
