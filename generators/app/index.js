'use strict';

var util = require('util'),
path = require('path'),
chalk = require('chalk'),
yeoman = require('yeoman-generator'),
yosay = require('yosay'),
_ = require('lodash-node');

var viewPortRange = [{
  mobile:{
    min:0,
    max:600
  },
  tablet:{
    min:600,
    max:1024
  },
  desktop:{
    min:1024
  },
}];

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
          }]
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
          type: 'confirm',
          name: 'noMediaQuery',
          message: 'Do you need more than one viewport?',
          default: true
        },
      ];

      this.prompt(prompts, function (props) {
        this.componentName = props.componentName;
        this.containerTag = props.containerTag;
        this.folders = props.folders;
        this.noMediaQuery = props.noMediaQuery;
        this.viewports = props.viewports;

      done();
      }.bind(this));
  },
  confirmInfo: function () {
      this.log(chalk.green(
        'Component Name: ',this.componentName,
        'Container Tag: ',this.containerTag,
        'Media Query Needed: ', this.noMediaQuery,
        'Viewports: ', this.viewports,
        'Folders Needed: ', this.folders
      ));
    },
  createFolders: function () {
    this.componentDir = this.componentName;
    this.contextsDir = this.contextName || 'vulture';

    // Make base component folder
    this.mkdir(this.componentDir);
    this.mkdir(this.componentDir + '/media');
    this.mkdir(this.componentDir + '/contexts');
    this.mkdir(this.componentDir + '/contexts/' + this.contextsDir);
  },
  createFiles: function () {
    var data,
    componentDir = this.componentDir;

    data = {
      componentName: this.componentName,
      controllerName: _.capitalize(_.camelCase(this.componentName)),
      tag: this.containerTag
    };

    // Files that must be created
    this.template('_index.html', componentDir + '/index.html', data);
    this.template('_index.js', componentDir + '/index.js', data);
    this.template('_print.css', componentDir + '/print.css', data);

    if (this.noMediaQuery) {
      this.template('_all.css', componentDir + '/contexts/' + this.contextsDir + '/all.css', data);
    } else {
      console.log('Viewports needed');
    }

  }

});

module.exports = FactoryComponentGenerator;
