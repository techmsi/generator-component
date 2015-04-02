'use strict';

var path = require('path'),
 chalk = require('chalk'),
 assert = require('yeoman-generator').assert,
 helpers = require('yeoman-generator').test,
 os = require('os'),
 _ = require('lodash'),
 caseNum = 1,
 generatorPath = '../generators/context',
 outputDir = './temp-test',
 contextsDir = 'contexts',
 componentName = 'my-test-component',
 printPromptDetails = require(path.resolve('generators', 'helpers.js')).printPromptDetails,
 prompts1ContextMultipleBreakpoints = require(path.resolve('test/mockData/withContexts', 'prompts1ContextMultipleBreakpoints.json')),
 prompts2ContextsMultipleBreakpoints = require(path.resolve('test/mockData/withContexts', 'prompts2ContextsMultipleBreakpoints.json')),
 prompts1Context1Breakpoint = require(path.resolve('test/mockData/withContexts', 'prompts1Context1Breakpoint.json')),
 prompts2Contexts1Breakpoint = require(path.resolve('test/mockData/withContexts', 'prompts2Contexts1Breakpoint.json'));

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

var files1Context1Breakpoint = [
  componentName + '/' + contextsDir + '/' + 'mysite/all.css'
];

var files2Contexts1Breakpoint = [
  componentName + '/' + contextsDir + '/' + 'mysite/all.css',
  componentName + '/' + contextsDir + '/' + 'myothersite/all.css'
];

// 1 Context, Multiple Breakpoints - default
describe('component:context - case ' + caseNum++, function () {
  console.log('\nTesting ' + chalk.yellow(componentName) + ' component...');

  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts1ContextMultipleBreakpoints)
      .on('end', done);
  });

  it('create files - (1 Context, Multiple Breakpoints - default)', function () {

    assert.file(files1ContextMultipleBreakpoints);
  });

  after(function () {
    printPromptDetails(prompts1ContextMultipleBreakpoints);
    console.log(files1ContextMultipleBreakpoints);
  });
});

// 2 Contexts, Multiple Breakpoints
describe('component:context - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts2ContextsMultipleBreakpoints)
      .on('end', done);
  });

  it('create files - (2 Contexts, Multiple Breakpoints)', function () {
    assert.file(files2ContextsMultipleBreakpoints);
  });


  after(function () {
    printPromptDetails(prompts2ContextsMultipleBreakpoints);
    console.log(files2ContextsMultipleBreakpoints);
  });
});

// 1 Context, 1 Breakpoint
describe('component:context - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts1Context1Breakpoint)
      .on('end', done);
  });

  it('create files - (1 Context, 1 Breakpoint)', function () {
    assert.file(files1Context1Breakpoint);
  });

  after(function() {
    printPromptDetails(prompts1Context1Breakpoint);
    console.log(files1Context1Breakpoint);
  });
});

// 2 Contexts, 1 Breakpoint
describe('component:context - case ' + caseNum++, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, generatorPath))
      .inDir(path.join(os.tmpdir(), outputDir))
      .withArguments([componentName])              // Mock the arguments
      .withPrompt(prompts2Contexts1Breakpoint)
      .on('end', done);
  });

  it('create files - (2 Contexts, 1 Breakpoint)', function () {
    assert.file(files2Contexts1Breakpoint);
  });

  after(function() {
    printPromptDetails(prompts2Contexts1Breakpoint);
    console.log(files2Contexts1Breakpoint);
  });
});
