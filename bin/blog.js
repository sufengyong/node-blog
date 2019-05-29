#!/usr/bin/env node

var program = require('commander'),
	preview = require('../lib/preview');

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


program.parse(process.argv);
