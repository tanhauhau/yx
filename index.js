#!/usr/bin/env node
const pkgUp = require('pkg-up');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt')
);

autocomplete().then(executeCmd);

function findScripts() {
  const { scripts = {} } = require(pkgUp.sync());
  return scripts;
}

function mapScripts(scripts) {
  return Object.keys(scripts).map(script => ({
    value: `yarn run ${script}`,
    name: format(script, scripts[script]),
  }));
}

function findBinaries() {
  try {
    const binaryFolder = path.join(pkgUp.sync(), '../node_modules/.bin');
    const binaries = fs.readdirSync(binaryFolder);
    return binaries;
  } catch (e) {
    return [];
  }
}

function mapBinaries(binaries) {
  return binaries.map(binary => ({
    value: `npx ${binary}`,
    name: format(binary, `npx ${binary}`),
  }));
}

function format(title, description) {
  return title + ' ' + chalk.dim(description);
}

function autocomplete() {
  const options = [
    ...mapScripts(findScripts()),
    ...mapBinaries(findBinaries()),
  ];

  return inquirer
    .prompt([
      {
        type: 'autocomplete',
        name: 'cmd',
        message: 'yx',
        source: function(answersSoFar, input) {
          const _input = (input || '').toLowerCase();
          return Promise.resolve(
            options.filter(
              option => option.value.toLowerCase().indexOf(_input) > -1
            )
          );
        },
      },
    ])
    .then(function(answers) {
      return answers.cmd;
    });
}

function executeCmd(cmd) {
  const { execSync } = require('child_process');
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    process.exit(1);
  }
}
