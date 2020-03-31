#!/usr/bin/env node
const homedir = require('os').homedir()
const config = require('./config.json')
const fs = require('fs')
const path = require('path')

try {
  fs.accessSync(path.join(homedir, '.timer-config.json'), fs.constants.F_OK);
  const fileContents = fs.readFileSync(path.join(homedir, '.timer-config.json'), 'utf8')
  const homeConfig = JSON.parse(fileContents)
  config.file = homeConfig.file
} catch (err) {
}

let option = process.argv[2]

fs.appendFileSync(config.file, option + ';' + new Date().toISOString() + '\n')
