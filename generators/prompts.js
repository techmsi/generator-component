'use strict';

var chalk = require('chalk'),
prompts = [{
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
    return props.viewports.indexOf('desktopCss') !== -1;
  },
    type: 'confirm',
    name: 'desktopOnlyDisplay',
    value: 'desktopOnlyDisplay',
    message: chalk.black('Will this only be visible on Desktop?'),
    default: true
  },
  {
    when: function (props) {
    return props.desktopOnlyDisplay;
  },
  name: 'mobileRange',
  value: 'mobileRange',
  message: chalk.black('What is the maximum range for the Mobile Viewport?'),
  default: '600'
  },
  {
    when: function (props) {
    return props.viewports.indexOf('tabletCss') !== -1;
  },
  name: 'tabletRange',
  value: 'tabletRange',
  message: chalk.black('What is the maximum range for the Tablet Viewport?'),
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
    },
    {
      name: 'Contexts Folder',
      value: 'contextsDir',
      checked: true
    }]
  },
  {
    when: function (props) {
    return props.folders.indexOf('contextsDir') !== -1;
  },
  name: 'numOfContextFolders',
  value: 'numOfContextFolders',
  message: chalk.green('Enter the number of context folders you need'),
  default: '1'
  },
  {
    when: function (props) {
    return props.numOfContextFolders == 1;
  },
  name: 'contextName',
  value: 'contextName',
  message: chalk.green('What do you want to name your context folder?'),
  default: 'mysite'
  },
  {
    when: function (props) {
    return props.numOfContextFolders > 1;
  },
  name: 'contextNames',
  value: 'contextNames',
  message: chalk.green('Enter the names of your contexts folder separated by commas.') +
  chalk.red('\nPlease don\'t add spaces after the comma.\n'),
  default: 'mysite1,mysite2'
  }
];

module.exports = prompts;
