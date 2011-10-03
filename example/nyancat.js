// NOTE! This idea is partly stolen from niftylettuce
// https://github.com/niftylettuce/nyancat.js
var net = require('net'),
telnet = require('../telnet.js');

var cat = [' ,---/V\\', '~|__(o.o)'],
feets = [' U U U U ', '  UU  UU '],
colors = ['red', 'yellow', 'green', 'cyan'],
rainbow = "~-.,_,.-~*'`'";
star = [[' ', ' * ', ' '], ['|', '- -', '|'], ['.', '. .', '.']],
port = 9001;

function drawStars(c, seq) {
    var i, s;
    c.stars.push({
        x: Math.floor(Math.random() * 70) + 2,
        y: Math.floor(Math.random() * 18) + 2,
        t: 0,
        c: 0
    });

    c.stars.forEach(function(s, i) {
        seq.move(s.x, s.y).a(star[s.t][0]).
        move(s.x - 1, s.y + 1).a(star[s.t][1]).
        move(s.x, s.y + 2).a(star[s.t][2]);
        s.x -= 2;
        if (++s.c === 3) {
            s.c = 0;
            s.t++;
        }
        if (s.x < 3 || s.t === 3) {
            c.stars.splice(i, 1);
        }
    });
}

function draw(c, counter, x, y) {
    var seq = telnet.seq().clear,
    rb = '',
    i;
    for (i = 0; i < (x + counter) / rainbow.length; i++) {
        rb += rainbow;
    }
    rb = rb.slice(counter, x + counter);
    drawStars(c, seq);
    seq.bold.move(1, y);
    colors.forEach(function(color) {
        seq[color].clearLine.a(rb).nextline;
    });

    c.feet = c.feet > 0 ? c.feet - 1: feets.length - 1;
    seq.white.move(x, y).a(cat[0]).move(x, y + 1).a(cat[1]).
    move(x, y + 2).a(feets[c.feet]);
    try {
        return seq.normal.home.a('press q to exit - arrows to move').send(c);
    } catch(e) {
        console.log(e);
    }
}

net.createServer(function(c) {
    var running = true,
    counter = 0,
    x = 40,
    y = 10;
    c.feet = 0,
    c.stars = [];

    console.log('>', c.remoteAddress, new Date());
    if (!telnet.cmd().IAC.WILL.echo.IAC.WILL.suppressGoAhead.send(c)) {
        running = false;
    }

    var timer = setInterval(function() {
        if (running) {
            counter = counter < rainbow.length - 1 ? counter + 2: 0;
            if (!draw(c, counter, x, y)) {
                running = false;
            }
        }
    },
    100);

    c.on('data', function(data) {
        if (data[0]  != 27 && data[0] < 200) {
            clearInterval(timer);
            if (running) {
                try {
                    telnet.seq().clear.home.normal.a('Thanks for watching! - ').bold.a('eirikb@eirikb.no').
                    normal.nextline.a('Using ').bold.a('telnet.js').normal.a(' - https://github.com/eirikb/telnet.js').
                    normal.nextline.
                    a('Rememeber to check out the console version by niftylettuce').
                    nextline.a('https://github.com/niftylettuce/nyancat.js').
                    nextline.nextline.send(c);
                    c.end();
                } catch(e) {
                    console.log(e);
                }
            }
        } else if (data[1] === 91) {
            switch (data[2]) {
            case 68:
                x--;
                break;
            case 65:
                y--;
                break;
            case 67:
                x++;
                break;
            case 66:
                y++;
                break;
            }
            x = x < 0 ? 0: x;
            x = x > 70 ? 70: x;
            y = y < 0 ? 0: y;
            y = y > 20 ? 20: y;
        }
    });

    c.on('end', function() {
        clearInterval(timer);
        running = false;
        console.log('<', c.remoteAddress, new Date());
    });

}).listen(port);

console.log('Nyancat running on port %d', port);

