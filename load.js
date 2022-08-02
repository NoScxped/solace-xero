
obj.forEach(command => {

    var cmdname = "/" + command.name.charAt(0).toUpperCase() + command.name.slice(1)

    var title = document.createElement(`h2`)
    var description = document.createElement(`p`)
    description.innerHTML = command.description
    title.innerHTML = command.name

    var holder = document.createElement(`ul`)

    document.body.appendChild(holder)
    holder.appendChild(title)
    holder.appendChild(description)
    
    if(command.options.length > 0){

        command.options.forEach(option => {
           
            if(option.type === 1 || !option.type){

                cmdname = cmdname.concat(` ${option.name.charAt(0).toUpperCase() + option.name.slice(1)}`)

            if(option.options){

                option.options.forEach(option => {

                    cmdname = cmdname.concat(` [${option.name}]`)

                })
                
            }

            
            cmdname = "/" + command.name.charAt(0).toUpperCase() + command.name.slice(1)

    } else  {

        cmdname = cmdname.concat(` [ ${option.name.charAt(0).toUpperCase() + option.name.slice(1)} ]`)

    }
    

})

    }
})