// const express = require("express");

const OS = require('os')

const chalk = require('chalk');
const log = console.log;


log(chalk`
  {grey ----------} {bold Boot Sequence} {grey ----------}
        Node Systems Boot v1.0.2
    Copyright (C) 2021, Node Industries
  {grey ----------------------------------------}

  System:
    Processor: {green ${OS.cpus()[0].model}}
    Memory: {green ${OS.totalmem()/1024/1024/1024} GB}

  {blue ->} Starting Database

  Connecting To:
    Authenticator: ▰▰▰▰▰▰▰▰▰▰▰▰ {green 100%}
    Accounts: ▰▰▰▰▰▰▰▰▱▱▱▱ {yellow 70%}
    Mass Storage: ▱▱▱▱▱▱▱▱▱▱▱▱ {red 0%}

  Uptime: {grey ${OS.uptime()}}
`)


log(chalk`
	There are {bold 5280 feet} in a mile.
	In {bold 18 miles}, there are {green.bold ${18 * 5280} feet}.
`);

log(chalk.blue('Hello') + ' World' + chalk.red('!') )

log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

log(chalk.green(
  'I am a green line' +
  chalk.blue.underline.bold(' with a blue substring') +
  ' that becomes green again!'
));

log(`
  CPU: ${chalk.red('90%')}
  RAM: ${chalk.green('40%')}
  DISK: ${chalk.yellow('70%')}
`);


// Use RGB colors in terminal emulators that support it.
log(chalk.keyword('orange')('Yay for orange colored text!'));
log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
log(chalk.hex('#DEADED').bold('Bold gray!'));

const error = chalk.bold.red;
const warning = chalk.keyword('orange');

console.log(error('Error!'));
console.log(warning('Warning!'));
