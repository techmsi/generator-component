'use strict';

var chalk = require('chalk'),
prompts = [
  {
    type:'checkbox',
    name:'folders',
    message:'Which folders would you like to create?',
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
