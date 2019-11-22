const os = require('os');
const util= require('os-utils')

exports.cpu=function(){
    console.log('average cpu usage:');
    console.log(os.cpus())
}

exports.currentCpu=function(){
    setInterval(()=>
    {util.cpuUsage((usage)=>{
        console.log( 'CPU Usage (%): ' + 100*usage );
    })},1000
    )
}

exports.totalMemory=function(){
    console.log(os.totalmem())
}

exports.freeMemory=function(){
    console.log(os.freemem())
}
exports.usedMemory=function(){
    console.log((os.totalmem()-os.freemem()))
}
