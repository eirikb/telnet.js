var net = require('net'),
telnet = require('./telnet.js');

net.createServer(function(c) {
    telnet.cmd().IAC.WILL.echo.IAC.WILL.suppressGoAhead.send(c);

    var s = telnet.seq().normal.clear.
    move(20, 2).a('___  __            __  ___').
    move(20, 3).a(' |  | _| |   |\\ | | _|  |').
    move(20, 4).a(' |  |__  |__ | \\| |__   |').
    move(20, 5).a('--------------------------');
    c.write(s.buffer);

    telnet.seq().move(2, 8).bold.underline.a('Hello world').send(c);

    c.on('data', function(buffer) {
        console.log(buffer);
    });
}).listen(7000);

