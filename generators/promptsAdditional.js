'use strict';

var chalk = require('chalk'),
prompts = [
  {
    type:'checkbox',
    name:'folders',
    message:'\n\nWhich folders would you like to create?',
    choices:[
      {
        name:'Media Folder',
        value:'mediaDir',
        checked:true
      },
      {
        name:'Contexts Folder',
        value:'contextsDir',
        checked:true
      }
    ]
  },
  {
    name:'numOfContextFolders',
    value:'numOfContextFolders',
    when:function (answers) {
      return hasFeatureChoice(answers.folders, 'contextsDir');
    },
    message:chalk.green('Enter the number of context folders you need'),
    default:'1'
  },
  {
    name:'contextFolderName',
    value:'contextFolderName',
    message:chalk.green('What do you want to name the folder that holds your context? (i.e. contexts)'),
    when:function (answers) {
      return answers.numOfContextFolders >= 1;
    },
    default:'contexts'
  },
  {
    name:'contextName',
    value:'contextName',
    message:chalk.green('What do you want to name your context folder?'),
    when:function (answers) {
      return answers.numOfContextFolders == 1;
    },
    default:'mysite'
  },
  {
    name:'contextNames',
    value:'contextNames',
    when:function (answers) {
      return answers.numOfContextFolders > 1;
    },
    message:chalk.green('Enter the names of your contexts folder separated by commas.') +
    chalk.red('\nPlease don\'t add spaces after the comma'),
    default:'mysite,myothersite'
  },
  {
    type:'confirm',
    name:'mediaQuery',
    message:chalk.green('Do you need more than one viewport?'),
    default:true
  },
  {
    type:'checkbox',
    name:'breakpoints',
    message:'Which breakpoints would you like to build the css for?',
    when:hasFeature('mediaQuery'),
    choices:[
      {
        name:'Mobile',
        value:'mobileCss',
        checked:true
      },
      {
        name:'Tablet',
        value:'tabletCss',
        checked:true
      },
      {
        name:'Desktop',
        value:'desktopCss',
        checked:true
      }
    ]
  },
  {
    type:'confirm',
    name:'desktopOnlyDisplay',
    value:'desktopOnlyDisplay',
    when:hasFeature('mediaQuery'),
    message:chalk.black('Will this only be visible on Desktop?'),
    default:true
  },
  {
    name:'mobileRange',
    value:'mobileRange',
    message:chalk.black('What is the maximum range for the Mobile Breakpoint?'),
    when:function (answers) {
      return hasFeatureChoice(answers.breakpoints, 'mobileCss');
    },
    default:'600'
  },
  {
    name:'tabletRange',
    value:'tabletRange',
    message:chalk.black('What is the maximum range for the Tablet Breakpoint?'),
    when:function (answers) {
      return hasFeatureChoice(answers.breakpoints, 'tabletCss');
    },
    default:'1024'
  }
];

function hasFeature (feature) {
  return function (answers) {
    return answers[feature];
  };
}

function hasFeatureChoice (answers,choice) {
  return (answers) ? answers.indexOf(choice) !== -1 : false;
}

module.exports = prompts;
