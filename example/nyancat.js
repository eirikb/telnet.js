// NOTE! This idea is partly stolen from niftylettuce
// https://github.com/niftylettuce/nyancat.js
var net = require('net'),
telnet = require('../telnet.js');

var cat = [' ,---/V\\', '~|__(o.o)'],
feets = [' U U U U ', '  UU  UU '],
colors = ['red', 'yellow', 'green', 'cyan'],
feet = 0,
rainbow = '¯`·.,¸,.·*¯`·.,¸,.·*¯`·.,¸,.·*¯`·.,¸,.·*¯`·.,¸,.·*',
star = [[' ', ' * ', ' '], ['|', '- -', '|'], ['.', '. .', '.']],
stars = [];
counter = 0;

function drawStars(seq) {
    var i, s;
    stars.push({
        x: Math.floor(Math.random() * 70) + 2,
        y: Math.floor(Math.random() * 18) + 2,
        t: 0,
        c: 0
    });

    stars.forEach(function(s, i) {
        seq.move(s.x, s.y).a(star[s.t][0]).
        move(s.x - 1, s.y + 1).a(star[s.t][1]).
        move(s.x, s.y + 2).a(star[s.t][2]);
        s.x -= 2;
        if (++s.c === 3) {
            s.c = 0;
            s.t++;
        }
        if (s.x < 3 || s.t === 3) {
            stars.splice(i, 1);
        }
    });
}

function draw(c) {
    var seq = telnet.seq().clear;
    drawStars(seq);
    seq.bold.move(1, 10);
    counter = counter < 8 ? counter + 2: 0;
    colors.forEach(function(color) {
        seq[color].clearLine.a(rainbow.slice(counter, rainbow.length - 10 + counter)).nextline;
    });

    feet = feet > 0 ? feet - 1: feets.length - 1;
    seq.white.move(42, 11).a(cat[0]).move(42, 12).a(cat[1]).
    move(42, 13).a(feets[feet]);

    seq.normal.home.a('press q to exit').send(c);
}

net.createServer(function(c) {
    console.log('>', c.remoteAddress);
    telnet.cmd().IAC.WILL.echo.IAC.WILL.suppressGoAhead.send(c);

    var timer = setInterval(function() {
        draw(c);
    },
    100);

    c.on('data', function(data) {
        if (data[0] < 200) {
            clearInterval(timer);
            telnet.seq().clear.home.normal.a('Thanks for watching! - ').bold.a('eirikb@eirikb.no').
            normal.nextline.nextline.send(c);
            c.end();
        }
    });

    c.on('end', function() {
        console.log('<', c.remoteAddress);
    });

}).listen(7000);

