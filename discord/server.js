const server = require("express")()
const fs = require("fs");
const { Discord, login, client, ready, err } = require('./main.js')


function alive(port, log, web){
    if(!web) err(`Web is not defined. You only have alive('${port}', '${log}')`)
    if(!log) err(`Log is not defined. You only have alive('${port}')`)
    if(!port) err('Port is not defined. You only have alive()')
server.get('/', (req, res) => {
    res.send(web)
})
    server.listen(port, ()=>{console.log(log)});
}

module.exports = alive