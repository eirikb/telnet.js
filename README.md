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

<b>reverseVideo</b> - Set video to inverted on screen
<b>normalVideo</b> - Set normal video on screen				
<b>normal</b> - Turn off character attributes			
<b>bold</b> - Turn bold mode on						
<b>underline</b> - Turn underline mode on
<b>reverse</b> - Turn reverse video on					
<b>move</b> - Move cursor to screen location v,h	
<b>clear</b> - Clear entire screen					
<b>up</b> - Move cursor up n lines				
<b>down</b> - Move cursor down n lines			
<b>right</b> - Move cursor right n lines			
<b>left</b> - Move cursor left n lines			
<b>home</b> - Move cursor to upper left corner		
<b>scrollUp</b> - Move/scroll window up one line			
<b>scrollDown</b> - Move/scroll window down one line		
<b>nextline</b> - Move to next line						
<b>save</b> - Save cursor position and attributes	
<b>restore</b> - Restore cursor position and attributes	
<b>bigTop</b> - Double-height letters, top half		
<b>bigBottom</b> - Double-height letters, bottom half		
<b>singleWidth</b> - Single width, single height letters	
<b>doubleWidth</b> - Double width, single height letters	
<b>clearRight</b> - Clear line from cursor right			
<b>clearUp</b> - Clear line from cursor left			
<b>clearLine</b> - Clear entire line						
<b>clearDown</b> - Clear screen from cursor down			
<b>clearUp</b> - Clear screen from cursor up			
<b>reset</b> - Reset terminal to initial state		


Telnet
--

Telnet give users a simple way to view and input data.
