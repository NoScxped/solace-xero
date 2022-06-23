const {ShardingManager} = require("discord.js")
const conf = require(`./config.json`)
const mngr = new ShardingManager(`./xero.js`, {token: conf.token, respawn: true, totalShards: 1})
mngr.spawn()