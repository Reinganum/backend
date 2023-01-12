const cpus=require('os').cpus()

process.on('message',(message)=>{
    if (message==="getInfo"){
    const result={
        "origen":"info desde child process",
        "argumentos":process.argv.slice(2), 
        "memory (rss)":process.memoryUsage().rss,
        "sistema operativo":process.platform, 
        pid:process.pid,
         "node version":process.version,
        "ruta archivo":process.argv[1],
        "carpeta root":process.cwd(),
        "NUMERO DE CPUS": `${cpus.length}`
        }
        process.send(result)
    }
})