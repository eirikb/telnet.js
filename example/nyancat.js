// NOTE! This idea is partly stolen from niftylettuce
// https://github.com/niftylettuce/nyancat.js
var net = require('net'),
telnet = require('../telnet.js');

var cat = [' ,---/V\\', '~|__(o.o)'],
feets = [' U U U U ', '  UU  UU '],
feet = 0,
rainbow = '¯`·.,¸,.·*¯`·.,¸,.·*¯`·.,¸,.·*¯`·.,¸,.·*¯`·.,¸,.·*¯`·.,¸,.·*¯`·.,¸,.·*',
colors = ['red', 'green', 'yellow', 'purple', 'pink', 'cyan'],
color = 0;

function drawCat(s) {
    var drawRainbow = function(text) {
        color = color > 0 ? color - 1: colors.length - 1;
        s[colors[color]].a(rainbow).white.a(text).nextline;
    };
    drawRainbow('');
    cat.forEach(function(c) {
        drawRainbow(c);
    });
    feet = feet > 0 ? feet - 1: feets.length - 1;
    drawRainbow(feets[feet]);

    return s;
};

net.createServer(function(c) {
    telnet.cmd().IAC.WILL.echo.IAC.WILL.suppressGoAhead.send(c);

    telnet.seq().clear.home.normal.a('Press q to exit').bold.send(c);

    setInterval(function() {
        var s = telnet.seq().move(1, 10);
        drawCat(s).send(c);
    },
    100);

    c.on('data', function(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i] >= 32 && data[i] <= 126) {
                telnet.seq().clear.home.normal.a('Thanks for watching! - ').bold.a('eirikb@eirikb.no').
                normal.nextline.nextline.send(c);
                c.end();
            }
        }
    });

}).listen(7000);

