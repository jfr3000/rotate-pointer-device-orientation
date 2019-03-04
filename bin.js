#!/usr/bin/env node
'use strict'
const makeScript = require('.')
const direction = process.argv[2]

if (!['left', 'right', 'normal'].includes(direction)) throw new Error('Direction must be one <left, right, normal>')

makeScript(direction, (err, script) => {
  if (err) throw err
  process.stdout.write(script)
})
