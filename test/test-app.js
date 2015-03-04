'use strict';

var path = require('path'),
 chalk = require('chalk'),
 assert = require('yeoman-generator').assert,
 helpers = require('yeoman-generator').test,
 os = require('os'),
 generatorPath = '../generators/app',
 outputDir = './temp-test',
 contextsDir = 'contexts',
 componentName = 'my-test-component',
 promptsDefault = require(path.resolve('test/mockData', 'promptsDefault.json')),
 promptsNoMediaQueries = require(path.resolve('test/mockData', 'promptsNoMediaQueries.json')),
 prompts2Contexts = require(path.resolve('test/mockData', 'prompts2Contexts.json')),
 promptsNoContexts = require(path.resolve('test/mockData', 'promptsNoContexts.json'));

var filesDefaults = [
  componentName + '/' + 'index.html',
  componentName + '/' + 'index.js',
  componentName + '/' + 'print.css',
  componentName + '/' + contextsDir + '/' + 'mysite/0-600.css',
  componentName + '/' + contextsDir + '/' + 'mysite/600-1024.css',
  componentName + '/' + contextsDir + '/' + 'mysite/1024+.css'
];

var files2Contexts = [
  componentName + '/' + 'index.html',
  componentName + '/' + 'index.js',
  componentName + '/' + 'print.css',
  componentName + '/' + contextsDir + '/' + 'mysite/0-600.css',
  componentName + '/' + contextsDir + '/' + 'mysite/600-1024.css',
  componentName + '/' + contextsDir + '/' + 'mysite/1024+.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/0-600.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/600-1024.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/1024+.css'
];

var filesNoContexts = [
  componentName + '/' + 'index.html',
  componentName + '/' + 'index.js',
  componentName + '/' + 'print.css',
  componentName + '/' + '0-600.css',
  componentName + '/' + '600-1024.css',
  componentName + '/' + '1024+.css'
];

var filesNoMediaQueries = [
  componentName + '/' + 'index.html',
  componentName + '/' + 'index.js',
  componentName + '/' + 'print.css',
  componentName + '/' + 'all.css'
];

describe('component:app - case 1', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(promptsDefault)
      .on('ready', function (generator) {
        console.log('\nTesting ' + chalk.yellow(componentName) + ' component...');
      })
      .on('end', done);
  });

  it('create files - (default)', function () {
    assert.file(filesDefaults);
  });
});
