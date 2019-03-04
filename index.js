#!/usr/bin/env node
'use strict'
const direction = process.argv[2]

if (!['left', 'right', 'normal'].includes(direction)) throw new Error('Direction must be one <left, right, normal>')

var exec = require('child_process').exec

const coordinateMatrices = {
  left: "0 -1 1 1 0 0 0 0 1",
  right: "0 1 0 -1 0 1 0 0 1",
  normal: "0 0 0 0 0 0 0 0 0"
}

exec('xinput', (err, stdout) => {
  if (err) throw err
  const lines = stdout.split('\n')
  const pointerLines = lines.filter(line => line.includes('slave  pointer'))
  const deviceNames = pointerLines.map(line => {
    const nameSection = line.split('\t')[0]
    const name  = nameSection.slice(nameSection.indexOf('↳') + 1)
    return name.trim()
  })

  const script = deviceNames.map(deviceName => {
    return `xinput set-prop "${deviceName}" --type=float "Coordinate Transformation Matrix" ${coordinateMatrices[direction]}`
  }).join('\n')

  process.stdout.write(script)
})
