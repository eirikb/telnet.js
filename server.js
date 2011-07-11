var net = require('net'),
server = net.createServer(function(c) { 
    c.write(new Buffer([255, 251, 1, 255, 253, 3, 255, 251, 3]));

    c.write(new Buffer([27]) + '[2J');

    function s(x, y, msg) {
         c.write(new Buffer([27]) + "[" + y + ";" + x + "H" + msg);
    }
    s(27, 1, "___  __            __  ___");
    s(27, 2, " |  | _| |   |\\ | | _|  |");
    s(27, 3, " |  |__  |__ | \\| |__   |");

    s(34, 6, " _____NICK____");
    s(34, 7, "|             |");
    s(34, 8, "|             |");
    s(34, 9, "|_____________|");
    s(36, 8, "");

    c.on('data', function() {
        console.log('DATA!', arguments);
    });
}).listen(7000);

