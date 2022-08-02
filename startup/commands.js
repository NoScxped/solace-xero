const commands = fs.readdirSync(path.resolve('./commands')).filter(file => file.endsWith(`.js` || `.ts`))
var cmds = []
console.log('Exporting commands...')
commands.forEach(command => {
    const cmd = require(`./commands/` + command)
    try {

    cmd.data = JSON.parse(JSON.stringify(cmd.data).replace(/MixedClass/g, ''))
    var obj = {
        name: cmd.data.name,
        description: cmd.data.description,
        options: cmd.data.options
    }

    cmds.push(JSON.stringify(obj))
    
}
    catch(err) {
        console.error(err)
    }
})
console.log(`Commands Exported.`)
console.log(cmds)
var str = `[${cmds}]`
fs.writeFileSync(`./docs/commands.json`, str)