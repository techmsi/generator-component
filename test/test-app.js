'use strict';

var path = require('path'),
 chalk = require('chalk'),
 assert = require('yeoman-generator').assert,
 helpers = require('yeoman-generator').test,
 os = require('os'),
 _ = require('lodash'),
 caseNum = 1,
 generatorPath = '../generators/app',
 outputDir = './temp-test',
 componentName = 'my-test-component',
 printPromptDetails = require(path.resolve('generators', 'helpers.js')).printPromptDetails,
 prompts0ContextsMultipleBreakpoints = require(path.resolve('test/mockData', 'prompts0ContextsMultipleBreakpoints.json')),
 prompts0Contexts1Breakpoint = require(path.resolve('test/mockData', 'prompts0Contexts1Breakpoint.json'));

var filesDefaults = [
   componentName + '/' + 'media/',
   componentName + '/' + 'template.nunjucks',
   componentName + '/' + 'server.js',
   componentName + '/' + 'schema.yml',
   componentName + '/' + 'client.js',
   componentName + '/' + 'print.css'
 ];

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
  });

  after(function() {
    printPromptDetails(prompts0ContextsMultipleBreakpoints);
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
  });

  after(function(){
    printPromptDetails(prompts0Contexts1Breakpoint);
  });
});
