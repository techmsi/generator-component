'use strict';

var chalk = require('chalk'),
descriptions = require('./descriptions.json'),
prompts = [
  {
    type:'list',
    name:'containerTag',
    message:'Which tag would you like to use?' +
    chalk.red('\n(Choose a semantically appropriate tag)'),
    choices:[
      {
        name:'Section' + chalk.gray('\n\t[' + descriptions.section + ']'),
        value:'section'
      },
      {
        name:'Article' + chalk.gray('\n\t[' + descriptions.article + ']'),
        value:'article'
      },
      {
        name:'Nav' + chalk.gray('\n\t[' + descriptions.nav + ']'),
        value:'nav'
      },
      {
        name:'Header' + chalk.gray('\n\t[' + descriptions.header + ']'),
        value:'header'
      },
      {
        name:'Footer' + chalk.gray('\n\t[' + descriptions.footer + ']'),
        value:'footer'
      },
      {
        name:'Aside' + chalk.gray('\n\t[' + descriptions.aside + ']'),
        value:'aside'
      },
      {
        name:'Div' + chalk.gray('\n\t[' + descriptions.div + ']'),
        value:'div'
      }
    ],
    default:2
  },
  {
    type:'list',
    name:'markupFilename',
    message:chalk.green('Which template language would you like to use?'),
    choices:[
      {
        name:'Jade',
        value:'jade'
      },
      {
        name:'Nunjucks',
        value:'nunjucks'
      }
    ],
    default:1
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
