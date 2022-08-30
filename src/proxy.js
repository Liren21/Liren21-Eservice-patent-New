/* eslint-disable */
const settingsService = require('./settings-service')
const ParcelProxyServer = require('parcel-proxy-server')
// var exec = require("child_process").exec
const URL = settingsService.domainUrl + '/backend/'
const entryPoint = './src/app/index.html'

const server = new ParcelProxyServer({
    entryPoint: entryPoint,
    proxies: {
        [URL]: {
            target: 'http://127.0.0.1:' + settingsService.backendPort + '/',
        },
    },
})

server.bundler.on('buildStart', () => {
    console.log('Start build!')
    console.log(new Date())
    // exec("npm run fix-valid", function(error, stdout, stderr) {
    //     console.log(stdout)
    //     console.log(stderr)
    //
    //     if (error !== null) {
    //         console.log("exec error: ")
    //         console.log(error)
    //     }
    // })
})

server.bundler.on('buildEnd', () => {
    console.log('Build completed!')
    console.log(new Date())
})

server.listen(settingsService.frontendPort, () => {
    console.log('Parcel proxy proxy has started')
})
