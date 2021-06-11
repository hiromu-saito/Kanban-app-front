'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

// 開発環境の環境変数を継承しつつ，上書き
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
