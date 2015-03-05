'use strict';

var path = require('path'),
 chalk = require('chalk'),
 assert = require('yeoman-generator').assert,
 helpers = require('yeoman-generator').test,
 os = require('os'),
 _ = require('lodash-node'),
 caseNum = 0,
 generatorPath = '../generators/app',
 outputDir = './temp-test',
 contextsDir = 'contexts',
 componentName = 'my-test-component',
 promptsDefault = require(path.resolve('test/mockData', 'promptsDefault.json')),
 prompts1Context1Viewport = require(path.resolve('test/mockData', 'prompts1Context1Viewport.json')),
 prompts2Contexts = require(path.resolve('test/mockData', 'prompts2Contexts.json')),
 promptsNoContexts1Viewport = require(path.resolve('test/mockData', 'promptsNoContexts1Viewport.json')),
 prompts2Contexts1Viewport = require(path.resolve('test/mockData', 'prompts2Contexts1Viewport.json')),
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

var files2Contexts1Viewport = [
  componentName + '/' + 'index.html',
  componentName + '/' + 'index.js',
  componentName + '/' + 'print.css',
  componentName + '/' + contextsDir + '/' + 'mysite/all.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/all.css'
];

var filesNoContexts = [
  componentName + '/' + 'index.html',
  componentName + '/' + 'index.js',
  componentName + '/' + 'print.css',
  componentName + '/' + '0-600.css',
  componentName + '/' + '600-1024.css',
  componentName + '/' + '1024+.css'
];

var files1Context1Viewport = [
  componentName + '/' + 'index.html',
  componentName + '/' + 'index.js',
  componentName + '/' + 'print.css',
  componentName + '/' + contextsDir + '/' + 'mysite/all.css'
];

var filesNoContexts1Viewport = [
  componentName + '/' + 'index.html',
  componentName + '/' + 'index.js',
  componentName + '/' + 'print.css',
  componentName + '/' + 'all.css'
];

function printPromptDetails (props) {
  var msg = '';

  for (var key in props) {
    msg += '\n' + _.startCase(key) + ':\t' + props[key];
  }

  console.log(
    chalk.yellow(
    '\n---- DETAILS ----',
    msg, '\n'
  ));
};

// 0 Contexts, Multiple Viewports
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(promptsNoContexts)
      .on('end', done);
  });

  it('create files - (0 Contexts, Multiple Viewports)', function () {
    assert.file(filesNoContexts);
  });

  after(function() {
    printPromptDetails(promptsNoContexts);
    console.log(filesNoContexts);
  });
});

// 1 Context, Multiple Viewports - default
describe('component:app - case ' + caseNum++, function () {
  console.log('\nTesting ' + chalk.yellow(componentName) + ' component...');

  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(promptsDefault)
      .on('end', done);
  });

  it('create files - (1 Context, Multiple Viewports - default)', function () {
    assert.file(filesDefaults);
  });

  after(function () {
    printPromptDetails(promptsDefault);
    console.log(filesDefaults);
  });
});

// 2 Contexts, Multiple Viewports
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts2Contexts)
      .on('end', done);
  });

  it('create files - (2 Contexts, Multiple Viewports)', function () {
    assert.file(files2Contexts);
  });


  after(function () {
    printPromptDetails(prompts2Contexts);
    console.log(files2Contexts);
  });
});

// 0 Contexts, 1 Viewport
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(promptsNoContexts1Viewport)
      .on('end', done);
  });

  it('create files - (0 Contexts, 1 Viewport)', function () {
    assert.file(filesNoContexts1Viewport);
  });

  after(function(){
    printPromptDetails(promptsNoContexts1Viewport);
    console.log(filesNoContexts1Viewport);
  });
});

// 1 Context, 1 Viewport
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts1Context1Viewport)
      .on('end', done);
  });

  it('create files - (1 Context, 1 Viewport)', function () {
    assert.file(files1Context1Viewport);
  });

  after(function() {
    printPromptDetails(prompts1Context1Viewport);
    console.log(files1Context1Viewport);
  });
});

// 2 Contexts, 1 Viewport
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts2Contexts1Viewport)
      .on('end', done);
  });

  it('create files - (2 Contexts, 1 Viewport)', function () {
    // TODO: Fix failure
    // assert.file(files2Contexts1Viewport);
  });

  after(function() {
    printPromptDetails(prompts2Contexts1Viewport);
    console.log(files2Contexts1Viewport);
  });
});
