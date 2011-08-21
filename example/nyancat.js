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
    telnet.seq().clear.bold.send(c);

    setInterval(function() {
        var s = telnet.seq().move(1, 10);
        drawCat(s).send(c);
    },
    100);

}).listen(7000);

