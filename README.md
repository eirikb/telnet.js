telnet.js
-

Library to generate output for a telnet server

Note that this is not a telnet client or telnet server, its a library that will create strings a server can use to reply to clients.
require('net') to create a server (see [server.js])

Install
--

  npm install telnet

Example
--

    var net = require('net'),
    telnet = require('telnet.js');

    net.createServer(function(c) {
        telnet.cmd().IAC.WILL.echo.IAC.WILL.suppressGoAhead.send(c);
        telnet.seq().move(2, 8).bold.underline.a('Hello world').send(c);

        c.on('data', function(buffer) {
            console.log(buffer);
        });
    }).listen(7000);

API
--

Escape sequences
---

Set reverse video on screen

    reverseVideo

Set normal video on screen				

    normalVideo

Turn off character attributes			

    normal

Turn bold mode on						

    bold

Turn underline mode on					

    underline

Turn reverse video on					

    reverse

Move cursor to screen location v,h	

    move

Clear entire screen					

    clear

Move cursor up n lines				

    up

Move cursor down n lines			

    down

Move cursor right n lines			

    right

Move cursor left n lines			

    left

Move cursor to upper left corner		

    home

Move/scroll window up one line			

    scrollUp

Move/scroll window down one line		

    scrollDown

Move to next line						

    nextline

Save cursor position and attributes	

    save

Restore cursor position and attributes	

    restore

Double-height letters, top half		

    bigTop

Double-height letters, bottom half		

    bigBottom

Single width, single height letters	

    singleWidth

Double width, single height letters	

    doubleWidth

Clear line from cursor right			

    clearRight

Clear line from cursor left			

    clearUp

Clear entire line						

    clearLine

Clear screen from cursor down			

    clearDown

Clear screen from cursor up			

    clearUp

Reset terminal to initial state		

    reset

Telnet
--

Telnet give users a simple way to view and input data.
