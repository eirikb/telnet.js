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

<b>reverseVideo</b> - <i>Set reverse video on screen</i>
<b>normalVideo</b> - <i>Set normal video on screen</i>
<b>normal</b>  - <i>Turn off character attributes</i>
<b>bold</b> - <i>Turn bold mode on</i>
<b>underline</b> - <i> Turn underline mode on</i>
<b>reverse</b> - <i> Turn reverse video on</i>
<b>move</b> - <i> Move cursor to screen location v,h</i>
<b>clear</b> - <i> Clear entire screen</i>
<b>up</b> - <i> Move cursor up n lines</i>
<b>down</b> - <i> Move cursor down n lines</i>
<b>right</b> - <i> Move cursor right n lines</i>
<b>left</b> - <i> Move cursor left n lines</i>
<b>home</b> - <i> Move cursor to upper left corner</i>
<b>scrollUp</b> - <i> Move/scroll window up one line</i>
<b>scrollDown</b> - <i> Move/scroll window down one line</i>
<b>nextline</b> - <i> Move to next line</i>
<b>save</b> - <i> Save cursor position and attributes</i>
<b>restore</b> - <i> Restore cursor position and attributes</i>
<b>bigTop</b> - <i> Double-height letters, top half</i>
<b>bigBottom</b> - <i> Double-height letters, bottom half</i>
<b>singleWidth</b> - <i> Single width, single height letters</i>
<b>doubleWidth</b> - <i> Double width, single height letters</i>
<b>clearRight</b> - <i> Clear line from cursor right</i>
<b>clearUp</b> - <i> Clear line from cursor left</i>
<b>clearLine</b> - <i> Clear entire line</i>
<b>clearDown</b> - <i> Clear screen from cursor down</i>
<b>clearUp</b> - <i> Clear screen from cursor up</i>
<b>reset</b> - <i> Reset terminal to initial state</i>

Telnet
--

Telnet give users a simple way to view and input data.
