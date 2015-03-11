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
    var msg = '';

    for (var key in this.props) {
      msg += '\n' + _.startCase(key) + ':\t' + this.props[key];
    }

    this.log(chalk.yellow(
      '\n---- DETAILS----',
      '\nComponent Name:\t', this.componentDir,
      msg, '\n'
    ));

  },
  createFolders: function () {

    // Make base component folder
    this.mkdir(this.componentDir);

    if (_.includes(this.props.folders, 'mediaDir')) {
      this.mkdir(this.componentDir + '/media');
    }

    if (this.hasContexts) {
      this.mkdir(this.componentDir + '/contexts');
    }
  },
  createFiles: function () {
    var data,
        contextsDirs,
        componentDir = this.componentDir,
        contextsDir = componentDir + '/contexts/',
        singleFolderPath = contextsDir + this.props.contextName;

    data = {
      componentName: this.componentDir,
      desktopOnlyDisplay: this.props.desktopOnlyDisplay,
      controllerName: _.capitalize(_.camelCase(this.componentDir)),
      tag: this.props.containerTag
    };

    // Files that must be created
    this.template('_index.html', componentDir + '/index.html', data);
    this.template('_index.js', componentDir + '/index.js', data);
    this.template('_print.css', componentDir + '/print.css', data);
    this.log(chalk.blue('Basic Files Created.'));

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

// Creates Css files for the specified ranges
function createCss(self, dir, data) {
  var newData = (data.desktopOnlyDisplay) ? _.omit(data, 'desktopOnlyDisplay') : data;

  if (self.props.mediaQuery) {
    self.template('_all.css', dir + '/' + '0-' + self.props.mobileRange + '.css', newData);
    self.template('_all.css', dir + '/' + self.props.mobileRange + '-' + self.props.tabletRange + '.css', newData);
    self.template('_all.css', dir + '/' + self.props.tabletRange + '+' + '.css', data);
  } else if (dir !== 'undefined') {
    // No media queries required but context required
    self.template('_all.css', dir + '/all.css', data);
  } else {
    // No media queries required
    self.template('_all.css', self.componentDir + '/all.css', data);
  }

}

module.exports = FactoryComponentGenerator;
