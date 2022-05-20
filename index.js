const {ShardingManager} = require("discord.js")
const config = require(`./config.json`)
const mngr = new ShardingManager(`./xero.js`, {token: config.token, respawn: true, totalShards: 1})
mngr.spawn()