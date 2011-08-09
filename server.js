var net = require('net'),
telnet = require('./telnet.js');

net.createServer(function(c) {
    c.write(telnet.enableEcho());

    telnet.c().clear()
    .move(27, 1).a('___  __            __  ___')
    .move(27, 2).a(' |  | _| |   |\\ | | _|  |')
    .move(27, 3).a(' |  |__  |__ | \\| |__   |')
    .send(c);

    c.on('data', function(buffer) {
        console.log(buffer);
    });
}).listen(7000);
