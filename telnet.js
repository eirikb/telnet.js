var ESC = new Buffer([27]);

var SE = 240,
NOP = 241,
DM = 242,
BRK = 243,
IP = 244,
AO = 245,
AYT = 246,
EC = 247,
EL = 248,
GA = 249,
SB = 250,
WILL = 251,
WONT = 252,
DO = 253,
DONT = 254,
IAC = 255;

var transmitBinary = 0,
echo = 1,
suppressGoAhead = 3,
status = 5,
timingMark = 6,
terminalType = 24,
windowSize = 31,
terminalSpeed = 32,
remoteFlowControl = 33,
linemode = 34,
environmentVariables = 36;

exports.enableEcho = function() {
    return new Buffer([IAC, WILL, echo, IAC, WILL, suppressGoAhead]);
};

exports.chain = exports.c = function() {
    return (function() {
        var self = this,
        buffer = self.buffer = '';

        self.append = self.a = function(msg) {
            buffer += msg;
            return self;
        };

        self.up = function() {
            buffer += ESC + '[nA';
            return self;
        };

        self.down = function() {
            buffer += ESC + '[nB';
            return self;
        };

        self.right = function() {
            buffer += ESC + '[nC';
            return self;
        };

        self.left = function() {
            buffer += ESC + '[nD';
            return self;
        };

        self.move = function(x, y) {
            buffer += ESC + '[' + y + ';' + x + 'H';
            return self;
        };

        self.save = function() {
            buffer += ESC + '7';
            return self;
        };

        self.restore = function() {
            buffer += ESC + '8';
            return self;
        };

        self.clearLine = function() {
            buffer += ESC + '[2K';
            return self;
        };

        self.clear = function() {
            buffer += ESC + '[2J';
            return self;
        };

        self.normal = function() {
            buffer += ESC + '[0m';
            return self;
        };

        self.bold = function() {
            buffer += ESC + '[1m';
            return self;
        };

        self.underline = function() {
            buffer += ESC + '[4m';
            return self;
        };

        self.blink = function() {
            buffer += ESC + '[5m';
            return self;
        };

        self.video = function() {
            buffer += ESC + '[7m';
            return self;
        };

        self.height = function(i) {
            buffer += ESC + '#' + (i + 3);
            return self;
        };

        self.wide = function() {
            buffer += ESC + '[?3l';
            return self;
        };

        // TODO: Sort out ---------------------------------------------------
        //
        //Set new line mode						
        self.LMN = function() {
            buffer += ESC + '[20h';
            return self;
        };
        //Set cursor key to application			
        self.DECCKM = function() {
            buffer += ESC + '[?1h';
            return self;
        };
        //Set ANSI (versus VT52)					
        self.DECANM = function() {
            buffer += ESC + 'e';
            return self;
        };
        //Set number of columns to 132			
        self.DECCOLM = function() {
            buffer += ESC + '[?3h';
            return self;
        };
        //Set smooth scrolling					
        self.DECSCLM = function() {
            buffer += ESC + '[?4h';
            return self;
        };
        //Set reverse video on screen			
        self.DECSCNM = function() {
            buffer += ESC + '[?5h';
            return self;
        };
        //Set origin to relative					
        self.DECOM = function() {
            buffer += ESC + '[?6h';
            return self;
        };
        //Set auto-wrap mode						
        self.DECAWM = function() {
            buffer += ESC + '[?7h';
            return self;
        };
        //Set auto-repeat mode					
        self.DECARM = function() {
            buffer += ESC + '[?8h';
            return self;
        };
        //Set interlacing mode					
        self.DECINLM = function() {
            buffer += ESC + '[?9h';
            return self;
        };
        //Set line feed mode						
        self.LMN = function() {
            buffer += ESC + '[20l';
            return self;
        };
        //Set cursor key to cursor				
        self.DECCKM = function() {
            buffer += ESC + '[?1l';
            return self;
        };
        //Set VT52 (versus ANSI)					
        self.DECANM = function() {
            buffer += ESC + '[?2l';
            return self;
        };
        //Set number of columns to 80			
        self.DECCOLM = function() {
            buffer += ESC + '[?3l';
            return self;
        };
        //Set jump scrolling						
        self.DECSCLM = function() {
            buffer += ESC + '[?4l';
            return self;
        };
        //Set normal video on screen				
        self.DECSCNM = function() {
            buffer += ESC + '[?5l';
            return self;
        };
        //Set origin to absolute					
        self.DECOM = function() {
            buffer += ESC + '[?6l';
            return self;
        };
        //Reset auto-wrap mode					
        self.DECAWM = function() {
            buffer += ESC + '[?7l';
            return self;
        };
        //Reset auto-repeat mode					
        self.DECARM = function() {
            buffer += ESC + '[?8l';
            return self;
        };
        //Reset interlacing mode					
        self.DECINLM = function() {
            buffer += ESC + '[?9l';
            return self;
        };
        //Set alternate keypad mode				
        self.DECKPAM = function() {
            buffer += ESC + '=';
            return self;
        };
        //Set numeric keypad mode				
        self.DECKPNM = function() {
            buffer += ESC + '>';
            return self;
        };
        //Set United Kingdom G0 character set	
        self.setukg0 = function() {
            buffer += ESC + '(A';
            return self;
        };
        //Set United Kingdom G1 character set	
        self.setukg1 = function() {
            buffer += ESC + ')A';
            return self;
        };
        //Set United States G0 character set		
        self.setusg0 = function() {
            buffer += ESC + '(B';
            return self;
        };
        //Set United States G1 character set		
        self.setusg1 = function() {
            buffer += ESC + ')B';
            return self;
        };
        //Set G0 special chars. & line set	
        self.setspecg0 = function() {
            buffer += ESC + '(0';
            return self;
        };
        //Set G1 special chars. & line set	
        self.setspecg1 = function() {
            buffer += ESC + ')0';
            return self;
        };
        //Set G0 alternate character ROM			
        self.setaltg0 = function() {
            buffer += ESC + '(1';
            return self;
        };
        //Set G1 alternate character ROM			
        self.setaltg1 = function() {
            buffer += ESC + ')1';
            return self;
        };
        //Set G0 alt char ROM and spec. graphics	
        self.setaltspecg0 = function() {
            buffer += ESC + '(2';
            return self;
        };
        //Set G1 alt char ROM and spec. graphics	
        self.setaltspecg1 = function() {
            buffer += ESC + ')2';
            return self;
        };
        //Set single shift 2						
        self.SS2 = function() {
            buffer += ESC + 'N';
            return self;
        };
        //Set single shift 3						
        self.SS3 = function() {
            buffer += ESC + 'O';
            return self;
        };
        //Turn off character attributes			
        self.SGR0 = function() {
            buffer += ESC + '[m';
            return self;
        };
        //Turn off character attributes			
        self.SGR0 = function() {
            buffer += ESC + '[0m';
            return self;
        };
        //Turn bold mode on						
        self.SGR1 = function() {
            buffer += ESC + '[1m';
            return self;
        };
        //Turn low intensity mode on				
        self.SGR2 = function() {
            buffer += ESC + '[2m';
            return self;
        };
        //Turn underline mode on					
        self.SGR4 = function() {
            buffer += ESC + '[4m';
            return self;
        };
        //Turn blinking mode on					
        self.SGR5 = function() {
            buffer += ESC + '[5m';
            return self;
        };
        //Turn reverse video on					
        self.SGR7 = function() {
            buffer += ESC + '[7m';
            return self;
        };
        //Turn invisible text mode on			
        self.SGR8 = function() {
            buffer += ESC + '[8m';
            return self;
        };
        //Set top and bottom lines of a window	
        self.DECSTBM = function() {
            buffer += ESC + '[Line;Liner';
            return self;
        };
        //Move cursor up n lines				
        self.CUU = function() {
            buffer += ESC + '[ValueA';
            return self;
        };
        //Move cursor down n lines			
        self.CUD = function() {
            buffer += ESC + '[ValueB';
            return self;
        };
        //Move cursor right n lines			
        self.CUF = function() {
            buffer += ESC + '[ValueC';
            return self;
        };
        //Move cursor left n lines			
        self.CUB = function() {
            buffer += ESC + '[ValueD';
            return self;
        };
        //Move cursor to upper left corner		
        self.cursorhome = function() {
            buffer += ESC + '[H';
            return self;
        };
        //Move cursor to upper left corner		
        self.cursorhome = function() {
            buffer += ESC + '[;H';
            return self;
        };
        //Move cursor to screen location v,h	
        self.CUP = function() {
            buffer += ESC + '[Line;ColumnH';
            return self;
        };
        //Move cursor to upper left corner		
        self.hvhome = function() {
            buffer += ESC + '[f';
            return self;
        };
        //Move cursor to upper left corner		
        self.hvhome = function() {
            buffer += ESC + '[;f';
            return self;
        };
        //Move cursor to screen location v,h	
        self.CUP = function() {
            buffer += ESC + '[Line;Columnf';
            return self;
        };
        //Move/scroll window up one line			
        self.IND = function() {
            buffer += ESC + 'D';
            return self;
        };
        //Move/scroll window down one line		
        self.RI = function() {
            buffer += ESC + 'M';
            return self;
        };
        //Move to next line						
        self.NEL = function() {
            buffer += ESC + 'E';
            return self;
        };
        //Save cursor position and attributes	
        self.DECSC = function() {
            buffer += ESC + '7';
            return self;
        };
        //Restore cursor position and attributes	
        self.DECSC = function() {
            buffer += ESC + '8';
            return self;
        };
        //Set a tab at the current column		
        self.HTS = function() {
            buffer += ESC + 'H';
            return self;
        };
        //Clear a tab at the current column		
        self.TBC = function() {
            buffer += ESC + '[g';
            return self;
        };
        //Clear a tab at the current column		
        self.TBC = function() {
            buffer += ESC + '[0g';
            return self;
        };
        //Clear all tabs							
        self.TBC = function() {
            buffer += ESC + '[3g';
            return self;
        };
        //Double-height letters, top half		
        self.DECDHL = function() {
            buffer += ESC + '#3';
            return self;
        };
        //Double-height letters, bottom half		
        self.DECDHL = function() {
            buffer += ESC + '#4';
            return self;
        };
        //Single width, single height letters	
        self.DECSWL = function() {
            buffer += ESC + '#5';
            return self;
        };
        //Double width, single height letters	
        self.DECDWL = function() {
            buffer += ESC + '#6';
            return self;
        };
        //Clear line from cursor right			
        self.EL0 = function() {
            buffer += ESC + '[K';
            return self;
        };
        //Clear line from cursor right			
        self.EL0 = function() {
            buffer += ESC + '[0K';
            return self;
        };
        //Clear line from cursor left			
        self.EL1 = function() {
            buffer += ESC + '[1K';
            return self;
        };
        //Clear entire line						
        self.EL2 = function() {
            buffer += ESC + '[2K';
            return self;
        };
        //Clear screen from cursor down			
        self.ED0 = function() {
            buffer += ESC + '[J';
            return self;
        };
        //Clear screen from cursor down			
        self.ED0 = function() {
            buffer += ESC + '[0J';
            return self;
        };
        //Clear screen from cursor up			
        self.ED1 = function() {
            buffer += ESC + '[1J';
            return self;
        };
        //Clear entire screen					
        self.ED2 = function() {
            buffer += ESC + '[2J';
            return self;
        };
        //Device status report					
        self.DSR = function() {
            buffer += ESC + '5n';
            return self;
        };
        //Response: terminal is OK				
        self.DSR = function() {
            buffer += ESC + '0n';
            return self;
        };
        //Response: terminal is not OK			
        self.DSR = function() {
            buffer += ESC + '3n';
            return self;
        };
        //Get cursor position					
        self.DSR = function() {
            buffer += ESC + '6n';
            return self;
        };
        //Response: cursor is at v,h	
        self.CPR = function() {
            buffer += ESC + 'Line;ColumnR';
            return self;
        };
        //Identify what terminal type			
        self.DA = function() {
            buffer += ESC + '[c';
            return self;
        };
        //Identify what terminal type (another)	
        self.DA = function() {
            buffer += ESC + '[0c';
            return self;
        };
        //Response: terminal type code n		
        self.DA = function() {
            buffer += ESC + '[?1;Value0c';
            return self;
        };
        //Reset terminal to initial state		
        self.RIS = function() {
            buffer += ESC + 'c';
            return self;
        };
        //Screen alignment display				
        self.DECALN = function() {
            buffer += ESC + '#8';
            return self;
        };
        //Confidence power up test				
        self.DECTST = function() {
            buffer += ESC + '[2;1y';
            return self;
        };
        //Confidence loopback test				
        self.DECTST = function() {
            buffer += ESC + '[2;2y';
            return self;
        };
        //Repeat power up test					
        self.DECTST = function() {
            buffer += ESC + '[2;9y';
            return self;
        };
        //Repeat loopback test					
        self.DECTST = function() {
            buffer += ESC + '[2;10y';
            return self;
        };
        //Turn off all four leds					
        self.DECLL0 = function() {
            buffer += ESC + '[0q';
            return self;
        };
        //Turn on LED #1							
        self.DECLL1 = function() {
            buffer += ESC + '[1q';
            return self;
        };
        //Turn on LED #2							
        self.DECLL2 = function() {
            buffer += ESC + '[2q';
            return self;
        };
        //Turn on LED #3							
        self.DECLL3 = function() {
            buffer += ESC + '[3q';
            return self;
        };
        //Turn on LED #4							
        self.DECLL4 = function() {
            buffer += ESC + '[4q';
            return self;
        };
        //Enter/exit ANSI mode (VT52)			
        self.setansi = function() {
            buffer += ESC + '<';
            return self;
        };
        //Enter alternate keypad mode			
        self.altkeypad = function() {
            buffer += ESC + '=';
            return self;
        };
        //Exit alternate keypad mode				
        self.numkeypad = function() {
            buffer += ESC + '>';
            return self;
        };
        //Use special graphics character set		
        self.setgr = function() {
            buffer += ESC + 'F';
            return self;
        };
        //Use normal US/UK character set			
        self.resetgr = function() {
            buffer += ESC + 'G';
            return self;
        };
        //Move cursor up one line				
        self.cursorup = function() {
            buffer += ESC + 'A';
            return self;
        };
        //Move cursor down one line				
        self.cursordn = function() {
            buffer += ESC + 'B';
            return self;
        };
        //Move cursor right one char				
        self.cursorrt = function() {
            buffer += ESC + 'C';
            return self;
        };
        //Move cursor left one char				
        self.cursorlf = function() {
            buffer += ESC + 'D';
            return self;
        };
        //Move cursor to upper left corner		
        self.cursorhome = function() {
            buffer += ESC + 'H';
            return self;
        };
        //Generate a reverse line-feed			
        self.revindex = function() {
            buffer += ESC + 'I';
            return self;
        };
        //Erase to end of current line			
        self.cleareol = function() {
            buffer += ESC + 'K';
            return self;
        };
        //Erase to end of screen					
        self.cleareos = function() {
            buffer += ESC + 'J';
            return self;
        };
        //Identify what the terminal is			
        self.ident = function() {
            buffer += ESC + 'Z';
            return self;
        };
        //Correct response to ident				
        self.identresp = function() {
            buffer += ESC + '/Z';
            return self;
        };

        self.send = self.s = self.write = self.w = function(socket) {
            socket.write(buffer);
            return self;
        };

        return self;
    })();
};

