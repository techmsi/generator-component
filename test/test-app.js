'use strict';

var path = require('path'),
 chalk = require('chalk'),
 assert = require('yeoman-generator').assert,
 helpers = require('yeoman-generator').test,
 os = require('os'),
 _ = require('lodash-node'),
 caseNum = 1,
 generatorPath = '../generators/app',
 outputDir = './temp-test',
 contextsDir = 'contexts',
 componentName = 'my-test-component',
 prompts0ContextsMultipleViewports = require(path.resolve('test/mockData', 'prompts0ContextsMultipleViewports.json')),
 prompts1ContextMultipleViewports = require(path.resolve('test/mockData', 'prompts1ContextMultipleViewports.json')),
 prompts2ContextsMultipleViewports = require(path.resolve('test/mockData', 'prompts2ContextsMultipleViewports.json')),
 prompts0Contexts1Viewport = require(path.resolve('test/mockData', 'prompts0Contexts1Viewport.json')),
 prompts1Context1Viewport = require(path.resolve('test/mockData', 'prompts1Context1Viewport.json')),
 prompts2Contexts1Viewport = require(path.resolve('test/mockData', 'prompts2Contexts1Viewport.json'));

var filesDefaults = [
   componentName + '/' + 'media/',
   componentName + '/' + 'index.html',
   componentName + '/' + 'index.js',
   componentName + '/' + 'print.css'
 ];

var files0ContextsMultipleViewports = [
  componentName + '/' + '0-600.css',
  componentName + '/' + '600-1024.css',
  componentName + '/' + '1024+.css'
];

// Default prompt options
var files1ContextMultipleViewports = [
  componentName + '/' + contextsDir + '/' + 'mysite/0-600.css',
  componentName + '/' + contextsDir + '/' + 'mysite/600-1024.css',
  componentName + '/' + contextsDir + '/' + 'mysite/1024+.css'
];

var files2ContextsMultipleViewports = [
  componentName + '/' + contextsDir + '/' + 'mysite/0-600.css',
  componentName + '/' + contextsDir + '/' + 'mysite/600-1024.css',
  componentName + '/' + contextsDir + '/' + 'mysite/1024+.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/0-600.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/600-1024.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/1024+.css'
];

var files0Contexts1Viewport = [
  componentName + '/' + 'all.css'
];

var files1Context1Viewport = [
  componentName + '/' + contextsDir + '/' + 'mysite/all.css'
];

var files2Contexts1Viewport = [
  componentName + '/' + contextsDir + '/' + 'mysite/all.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/all.css'
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
      .withPrompt(prompts0ContextsMultipleViewports)
      .on('end', done);
  });

  it('create files - (0 Contexts, Multiple Viewports)', function () {
    assert.file(filesDefaults);
    assert.file(files0ContextsMultipleViewports);
  });

  after(function() {
    printPromptDetails(prompts0ContextsMultipleViewports);
    console.log(files0ContextsMultipleViewports);
  });
});

// 1 Context, Multiple Viewports - default
describe('component:app - case ' + caseNum++, function () {
  console.log('\nTesting ' + chalk.yellow(componentName) + ' component...');

  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts1ContextMultipleViewports)
      .on('end', done);
  });

  it('create files - (1 Context, Multiple Viewports - default)', function () {
    assert.file(filesDefaults);

    assert.file(files1ContextMultipleViewports);
  });

  after(function () {
    printPromptDetails(prompts1ContextMultipleViewports);
    console.log(files1ContextMultipleViewports);
  });
});

// 2 Contexts, Multiple Viewports
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts2ContextsMultipleViewports)
      .on('end', done);
  });

  it('create files - (2 Contexts, Multiple Viewports)', function () {
    assert.file(filesDefaults);
    assert.file(files2ContextsMultipleViewports);
  });


  after(function () {
    printPromptDetails(prompts2ContextsMultipleViewports);
    console.log(files2ContextsMultipleViewports);
  });
});

// 0 Contexts, 1 Viewport
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts0Contexts1Viewport)
      .on('end', done);
  });

  it('create files - (0 Contexts, 1 Viewport)', function () {
    assert.file(filesDefaults);
    assert.file(files0Contexts1Viewport);
  });

  after(function(){
    printPromptDetails(prompts0Contexts1Viewport);
    console.log(files0Contexts1Viewport);
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
    assert.file(filesDefaults);
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
    assert.file(filesDefaults);
    assert.file(files2Contexts1Viewport);
  });

  after(function() {
    printPromptDetails(prompts2Contexts1Viewport);
    console.log(files2Contexts1Viewport);
  });
});
