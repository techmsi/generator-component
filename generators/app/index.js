'use strict';

var util = require('util'),
path = require('path'),
chalk = require('chalk'),
yeoman = require('yeoman-generator'),
yosay = require('yosay'),
_ = require('lodash-node'),
prompts = require('../prompts.js');

// Extend Base generator
var FactoryComponentGenerator = yeoman.generators.Base.extend({
  info: function () {
    this.log(chalk.yellow(
      'Out of the box I create a self-contained component,\n' +
      'with html, css, & js placeholder files.\n'
    ));
  },
  promptUser: function () {
      var done = this.async();

      this.prompt(prompts, function (props) {
        this.componentName = props.componentName;
        this.containerTag = props.containerTag;
        this.contextName = props.contextName;
        this.contextNames = (props.contextNames) ? props.contextNames.split(',') : null;
        this.folders = props.folders;
        this.noMediaQuery = props.noMediaQuery;
        this.viewports = props.viewports;
        this.mobileRange = props.mobileRange;
        this.tabletRange = props.tabletRange;
        this.numOfContextFolders = props.numOfContextFolders;

      done();
      }.bind(this));

  },
  confirmInfo: function () {
      this.log(chalk.yellow(
        '\n---- DETAILS----\n',
        '\nComponent Name:\t', this.componentName,
        '\nContainer Tag:\t', this.containerTag,
        '\nContext Name(s):\t', this.contextName || this.contextNames,
        '\nFolders Needed:\t', this.folders,
        '\n# of Folders:\t', this.numOfContextFolders,
        '\nMedia Query:\t', this.noMediaQuery,
        '\nViewports:\t', this.viewports,
        '\nMobile: ', this.mobileRange,
        ', Tablet: ', this.tabletRange
      ));
    },
  createFolders: function () {
    this.componentDir = this.componentName;
    this.contextsDirName = this.contextName;

    // Make base component folder
    this.mkdir(this.componentDir);
    this.mkdir(this.componentDir + '/media');
    this.mkdir(this.componentDir + '/contexts');
    this.mkdir(this.componentDir + '/contexts/' + this.contextsDirName);
  },
  createFiles: function () {
    var data,
    componentDir = this.componentDir,
    contextsDir = componentDir + '/contexts/',
    contextsDirs = this.contextNames,
    singleFolderPath = contextsDir + this.contextName;

    data = {
      componentName: this.componentName,
      controllerName: _.capitalize(_.camelCase(this.componentName)),
      tag: this.containerTag
    };

    // Files that must be created
    this.template('_index.html', componentDir + '/index.html', data);
    this.template('_index.js', componentDir + '/index.js', data);
    this.template('_print.css', componentDir + '/print.css', data);

    // Single CSS or CSS for Viewports
    if (this.noMediaQuery) {

      if (this.numOfContextFolders > 1) {
        for (folder in contextsDirs) {
          var dir = contextsDir + contextsDirs[folder];
          createCss(this, dir, data);
        }
      } else {
        createCss(this, singleFolderPath, data);
      }

    } else {
      // No media queries required
      this.template('_all.css', singleFolderPath + '/all.css', data);
    }
  }

});

// Creates Css files for the specified ranges
function createCss(self, dir, data) {
  self.template('_all.css', dir + '/' + '0-' + self.mobileRange + '.css', data);
  self.template('_all.css', dir + '/' + self.mobileRange + '-' + self.tabletRange + '.css', data);
  self.template('_all.css', dir + '/' + self.tabletRange + '+' + '.css', data);
}

module.exports = FactoryComponentGenerator;
