'use strict';

var util = require('util'),
path = require('path'),
chalk = require('chalk'),
yeoman = require('yeoman-generator'),
yosay = require('yosay'),
_ = require('lodash-node');

// Extend Base generator
var FactoryComponentGenerator = yeoman.generators.Base.extend({
  info: function () {
    this.log(chalk.yellow(
      'Out of the box I create a self-contained component,\n' +
      'with html,css, & js placeholder files.\n'
    ));
  },
  promptUser: function () {
      var done = this.async();

      var prompts = [{
              name: 'componentName',
              message: 'Enter your component\'s name: '
          },
        {
          type: 'list',
          name: 'containerTag',
          message: 'Which tag would you like to use?(\n Choose a semantically appropriate tag)',
          choices: [{
            name: 'Nav',
            value: 'nav'
          },
          {
            name: 'Aside',
            value: 'aside'
          },
          {
            name: 'Section',
            value: 'section'
          },
          {
            name: 'Div',
            value: 'div'
          }]
          ,default: 2
        },
        {
          type: 'confirm',
          name: 'noMediaQuery',
          message: 'Do you need more than one viewport?',
          default: true
        },
        {
          type: 'checkbox',
          name: 'viewports',
          message: 'Which viewports would you like to build the css for?',
          choices: [{
            name: 'Mobile',
            value: 'mobileCss',
            checked: true
          },
          {
            name: 'Tablet',
            value: 'tabletCss',
            checked: true
          },
          {
            name: 'Desktop',
            value: 'desktopCss',
            checked: true
          },
         ]
        },
        {
          when: function (props) {
          return props.viewports.indexOf('tabletCss') !== -1;
        },
        name: 'mobileRange',
        value: 'mobileRange',
        message: chalk.green('mobileRangeMax???'),
        default: '600'
        },
        {
          when: function (props) {
          return props.viewports.indexOf('tabletCss') !== -1;
        },
        name: 'tabletRange',
        value: 'tabletRange',
        message: chalk.green('tabletRange Max???'),
        default: '1024'
        },
        {
          type: 'checkbox',
          name: 'folders',
          message: 'Which folders would you like to create?',
          choices: [{
            name: 'Media Folder',
            value: 'mediaDir',
            checked: true
          },{
            name: 'Contexts Folder',
            value: 'contextsDir',
            checked: true
          }]
        },
        {
          when: function (props) {
            console.log(props.folders.indexOf('contextsDir'));
          return props.folders.indexOf('contextsDir') !== -1;
        },
        name: 'contextName',
        value: 'contextName',
        message: chalk.green('What do you want to name your context folder?'),
        default: 'mysite'
       }
      ];

      this.prompt(prompts, function (props) {
        this.componentName = props.componentName;
        this.containerTag = props.containerTag;
        this.contextName = props.contextName;
        this.folders = props.folders;
        this.noMediaQuery = props.noMediaQuery;
        this.viewports = props.viewports;
        this.mobileRange = props.mobileRange;
        this.tabletRange = props.tabletRange;

      done();
      }.bind(this));
  },
  confirmInfo: function () {
      this.log(chalk.yellow(
        '\n---- DETAILS----\n',
        '\nComponent Name:\t', this.componentName,
        '\nContainer Tag:\t', this.containerTag,
        '\nContext Name:\t', this.contextName,
        '\nFolders Needed:\t', this.folders,
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
    contextsDir = componentDir + '/contexts/' + this.contextsDirName;

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
      this.template('_all.css', contextsDir + '/' + '0-' + this.mobileRange + '.css', data);
      this.template('_all.css', contextsDir + '/' + this.mobileRange + '-' + this.tabletRange + '.css', data);
      this.template('_all.css', contextsDir + '/' + this.tabletRange + '+' + '.css', data);
    } else {
      this.template('_all.css', contextsDir + '/all.css', data);
    }
  }

});

module.exports = FactoryComponentGenerator;
