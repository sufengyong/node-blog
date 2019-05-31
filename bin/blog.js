#!/usr/bin/env node

let program = require('commander'),
  preview = require('../lib/preview'),
  build = require('../lib/build');

program.version('1.0.0');

program.command('help')
	.description('')
	.action(function () {
		program.outputHelp();
	});


// program.command('create [dir]')
// 	.description()
// 	.action(function () {

// 	});


program.command('preview')
    .action(preview);
    
program.command('build')
    .action(build);


program.parse(process.argv);
