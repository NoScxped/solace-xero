const {ShardingManager} = require("discord.js")
const conf = require(`./config.json`)
const mngr = new ShardingManager(`./xero.ts`, {token: conf.token, respawn: true, totalShards: 1})
mngr.spawn()