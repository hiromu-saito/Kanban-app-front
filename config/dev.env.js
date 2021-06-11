'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 本番環境の環境変数を継承しつつ，上書き
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
