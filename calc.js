#!/usr/bin/env node
const homedir = require('os').homedir()
const config = require('./config.json')
const fs = require('fs')
const moment = require('moment')
const path = require('path')

try {
  fs.accessSync(path.join(homedir, '.timer-config.json'), fs.constants.F_OK);
  const fileContents = fs.readFileSync(path.join(homedir, '.timer-config.json'), 'utf8')
  const homeConfig = JSON.parse(fileContents)
  config.file = homeConfig.file
  config.results = homeConfig.results
  config.myName = homeConfig.myName
} catch (err) {
}

// Step 1: Read in CSV File from config.json
let lines = fs.readFileSync(config.file, 'utf8').split("\n")
lines.pop()
let html = `
<html>
  <head>
    <title>My Work Times - ${config.myName}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1>My Work Times - ${config.myName}</h1>
      <a href="${config.file}">CSV</a>
      <div class="my-xs"></div>
`

let actualDate = ''
let timeCalc = {}

// Step 2: Loop every Line
for (let index = 0; index < lines.length; index++) {
  
  if (lines[index] === '') continue
  const csvSplit = lines[index].split(';')
  const thing = csvSplit[0]
  const date = csvSplit[1].split('T')[0]
  const time = csvSplit[1].split('T')[1].split('.')[0]
  console.log(`${index} / ${lines.length} : ${thing} > ${date} > ${time}`)

  let nextTime = ''
  if (index + 1 < lines.length) { // there is a next line
    nextTime = moment(lines[index + 1].split(';')[1])
  } else { // this is the last line
    nextTime = moment()
  }

  

  if (date !== actualDate) {
    actualDate = date
    timeCalc = {}
    html += '<h2>' + germanDate(date) + '</h2>'
    html += '<table class="table">'
  }

  let nextDay = index + 1 < lines.length && lines[index + 1].split(';')[1].split('T')[0] !== date

  html += '<tr>'
  html += '<td>' + time + '</td>'
  html += '<td>' + thing + '</td>'
  html += '</tr>'
  if (!timeCalc[thing]) {
    timeCalc[thing] = 0
  }
  timeCalc[thing] += moment(nextTime).diff(csvSplit[1], 'seconds')

  if (nextDay || index + 1 === lines.length) { // a new day, yes it is! OR the last day
    html += '</table>'
    html += '<div class="my-xs"></div>'
    html += '<ul>'
    for (const [key, value] of Object.entries(timeCalc)) {
      html += `<li>${key}: ${hhmmss(value)}</li>`
    }
    html += '</ul>'

    if (actualDate !== '') { // there is a next day
      html += '<hr/>'
      html += '<div class="my-xs"></div>'
    }
    
  }

  
}
  
html += `
    </div>
  </body>
</html>
`
fs.writeFileSync(config.results, html)


function germanDate(date) {
  const split = date.split('-')
  return split[2] + '.' + split[1] + '.' + split[0]
}
function pad(num) {
  return ("0"+num).slice(-2);
}
function hhmmss(secs) {
  var minutes = Math.floor(secs / 60);
  secs = secs%60;
  var hours = Math.floor(minutes/60)
  minutes = minutes%60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
}