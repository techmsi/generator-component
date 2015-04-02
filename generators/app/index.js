'use strict';

var util = require('util'),
  path = require('path'),
  chalk = require('chalk'),
  yeoman = require('yeoman-generator'),
  yosay = require('yosay'),
  _ = require('lodash'),
  prompts = require('../prompts.js'),
  printPromptDetails = require('../helpers.js').printPromptDetails,
  createCss = require('../helpers.js').createCss;

// Extend Base generator
var FactoryComponentGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('componentName', { type: String, required: true });
    this.componentName = this.componentName;
  },
  info: function () {
    this.log(chalk.yellow(
      'Out of the box I create a self-contained component,\n' +
      'with html, css, & js placeholder files.\n'
    ));
  },
  promptUser: function () {

    var done = this.async();
    // Retrieved from command line arguments
    this.componentDir = this.componentName;

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
        componentDir = this.componentDir;

    data = {
      componentName: this.componentDir,
      desktopOnlyDisplay: this.props.desktopOnlyDisplay,
      controllerName: _.capitalize(_.camelCase(this.componentDir)),
      tag: this.props.containerTag
    };


    // Files that must be created
    this.copy('_server.js', componentDir + '/server.js');
    this.copy('_schema.yml', componentDir + '/schema.yml');
    this.template('_index.html', componentDir + '/template.' + this.props.markupFilename, data);
    this.template('_index.js', componentDir + '/client.js', data);
    this.template('_print.css', componentDir + '/print.css', data);
    this.log(chalk.blue('Basic Files Created.'));

    createCss(this, componentDir, data);
    this.log(chalk.blue('No Context Needed.'));
  },
  createContexts: function () {
    if (this.addContexts) {
      var done = this.async();
      this.invoke('factory-component:context', {args: [componentDir]}, function () {
        done();
      });
    } else {
      this.log('No contexts created.');
    }
  }

});

module.exports = FactoryComponentGenerator;
