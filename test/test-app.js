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
 prompts0ContextsMultipleBreakpoints = require(path.resolve('test/mockData', 'prompts0ContextsMultipleBreakpoints.json')),
 prompts1ContextMultipleBreakpoints = require(path.resolve('test/mockData', 'prompts1ContextMultipleBreakpoints.json')),
 prompts2ContextsMultipleBreakpoints = require(path.resolve('test/mockData', 'prompts2ContextsMultipleBreakpoints.json')),
 prompts0Contexts1Breakpoint = require(path.resolve('test/mockData', 'prompts0Contexts1Breakpoint.json')),
 prompts1Context1Breakpoint = require(path.resolve('test/mockData', 'prompts1Context1Breakpoint.json')),
 prompts2Contexts1Breakpoint = require(path.resolve('test/mockData', 'prompts2Contexts1Breakpoint.json'));

var filesDefaults = [
   componentName + '/' + 'media/',
   componentName + '/' + 'template.nunjucks',
   componentName + '/' + 'client.js',
   componentName + '/' + 'print.css'
 ];

var files0ContextsMultipleBreakpoints = [
  componentName + '/' + '0-600.css',
  componentName + '/' + '600-1024.css',
  componentName + '/' + '1024+.css'
];

// Default prompt options
var files1ContextMultipleBreakpoints = [
  componentName + '/' + contextsDir + '/' + 'mysite/0-600.css',
  componentName + '/' + contextsDir + '/' + 'mysite/600-1024.css',
  componentName + '/' + contextsDir + '/' + 'mysite/1024+.css'
];

var files2ContextsMultipleBreakpoints = [
  componentName + '/' + contextsDir + '/' + 'mysite/0-600.css',
  componentName + '/' + contextsDir + '/' + 'mysite/600-1024.css',
  componentName + '/' + contextsDir + '/' + 'mysite/1024+.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/0-600.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/600-1024.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/1024+.css'
];

var files0Contexts1Breakpoint = [
  componentName + '/' + 'all.css'
];

var files1Context1Breakpoint = [
  componentName + '/' + contextsDir + '/' + 'mysite/all.css'
];

var files2Contexts1Breakpoint = [
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

// 0 Contexts, Multiple Breakpoints
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts0ContextsMultipleBreakpoints)
      .on('end', done);
  });

  it('create files - (0 Contexts, Multiple Breakpoints)', function () {
    assert.file(filesDefaults);
    assert.file(files0ContextsMultipleBreakpoints);
  });

  after(function() {
    printPromptDetails(prompts0ContextsMultipleBreakpoints);
    console.log(files0ContextsMultipleBreakpoints);
  });
});

// 1 Context, Multiple Breakpoints - default
describe('component:app - case ' + caseNum++, function () {
  console.log('\nTesting ' + chalk.yellow(componentName) + ' component...');

  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts1ContextMultipleBreakpoints)
      .on('end', done);
  });

  it('create files - (1 Context, Multiple Breakpoints - default)', function () {
    assert.file(filesDefaults);

    assert.file(files1ContextMultipleBreakpoints);
  });

  after(function () {
    printPromptDetails(prompts1ContextMultipleBreakpoints);
    console.log(files1ContextMultipleBreakpoints);
  });
});

// 2 Contexts, Multiple Breakpoints
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts2ContextsMultipleBreakpoints)
      .on('end', done);
  });

  it('create files - (2 Contexts, Multiple Breakpoints)', function () {
    assert.file(filesDefaults);
    assert.file(files2ContextsMultipleBreakpoints);
  });


  after(function () {
    printPromptDetails(prompts2ContextsMultipleBreakpoints);
    console.log(files2ContextsMultipleBreakpoints);
  });
});

// 0 Contexts, 1 Breakpoint
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts0Contexts1Breakpoint)
      .on('end', done);
  });

  it('create files - (0 Contexts, 1 Breakpoint)', function () {
    assert.file(filesDefaults);
    assert.file(files0Contexts1Breakpoint);
  });

  after(function(){
    printPromptDetails(prompts0Contexts1Breakpoint);
    console.log(files0Contexts1Breakpoint);
  });
});

// 1 Context, 1 Breakpoint
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts1Context1Breakpoint)
      .on('end', done);
  });

  it('create files - (1 Context, 1 Breakpoint)', function () {
    assert.file(filesDefaults);
    assert.file(files1Context1Breakpoint);
  });

  after(function() {
    printPromptDetails(prompts1Context1Breakpoint);
    console.log(files1Context1Breakpoint);
  });
});

// 2 Contexts, 1 Breakpoint
describe('component:app - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts2Contexts1Breakpoint)
      .on('end', done);
  });

  it('create files - (2 Contexts, 1 Breakpoint)', function () {
    assert.file(filesDefaults);
    assert.file(files2Contexts1Breakpoint);
  });

  after(function() {
    printPromptDetails(prompts2Contexts1Breakpoint);
    console.log(files2Contexts1Breakpoint);
  });
});
