'use strict'
const exec = require('child_process').exec

module.exports = (direction, cb) => {
  const coordinateMatrices = {
    left: "0 -1 1 1 0 0 0 0 1",
    right: "0 1 0 -1 0 1 0 0 1",
    normal: "0 0 0 0 0 0 0 0 0"
  }

  exec('xinput', (err, stdout) => {
    if (err) cb(err)
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

    cb(null, script)
  })
}
