var net = require('net'),
telnet = require('./telnet.js');

net.createServer(function(c) {
    c.write(telnet.enableEcho());

    telnet.c().normal().clear().
    move(20, 2).a('___  __            __  ___').
    move(20, 3).a(' |  | _| |   |\\ | | _|  |').
    move(20, 4).a(' |  |__  |__ | \\| |__   |').
    move(20, 5).a('--------------------------').
    send(c);

    telnet.c().bold().move(2, 8).underline().a('Hello world').normal().send(c);

    c.on('data', function(buffer) {
        console.log(buffer);
    });
}).listen(7000);

