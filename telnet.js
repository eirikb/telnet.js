var ESC = new Buffer([27]);

// Telnet commands
var cmd = {
    // Subnegotiation end
    SE: 240,
    // No operation
    NOP: 241,
    // Data mark
    DM: 242,
    // Break
    BRK: 243,
    // Interrupt process
    IP: 244,
    // Abort output 
    AO: 245,
    // Are you there
    AYT: 246,
    // Erase character
    EC: 247,
    // Erase line
    EL: 248,
    // Go ahead
    GA: 249,
    // Subnegotiation begin
    SB: 250,
    WILL: 251,
    WONT: 252,
    DO: 253,
    DONT: 254,
    IAC: 255,

    transmitBinary: 0,
    echo: 1,
    suppressGoAhead: 3,
    status: 5,
    timingMark: 6,
    terminalType: 24,
    windowSize: 31,
    terminalSpeed: 32,
    remoteFlowControl: 33,
    linemode: 34,
    environmentVariables: 36
};

// Escape sequences
var seq = {
    // Set reverse video on screen
    reverseVideo: '[?5h',
    // Set normal video on screen				
    normalVideo: '[?5l',
    // Turn off character attributes			
    normal: '[m',
    // Turn bold mode on						
    bold: '[1m',
    // Turn underline mode on					
    underline: '[4m',
    // Turn reverse video on					
    reverse: '[7m',
    // Turn black color on
    black: '[30m', 
    // Turn red color on
    red: '[31m', 
    // Turn green color on
    green: '[32m', 
    // Turn yellow color on
    yellow: '[33m', 
    // Turn purple color on
    purple: '[34m', 
    // Turn pink color on
    pink: '[35m', 
    // Turn cyan color on
    cyan: '[36m', 
    // Turn white color on
    white: '[37m', 
    // Move cursor to screen location v,h	
    move: '[Line;ColumnH',
    // Clear entire screen					
    clear: '[2J',
    // Move cursor up n lines				
    up: '[ValueA',
    // Move cursor down n lines			
    down: '[ValueB',
    // Move cursor right n lines			
    right: '[ValueC',
    // Move cursor left n lines			
    left: '[ValueD',
    // Move cursor to upper left corner		
    home: '[H',
    // Move/scroll window up one line			
    scrollUp: 'D',
    // Move/scroll window down one line		
    scrollDown: 'M',
    // Move to next line						
    nextline: 'E',
    // Save cursor position and attributes	
    save: '7',
    // Restore cursor position and attributes	
    restore: '8',
    // Double-height letters, top half		
    bigTop: '#3',
    // Double-height letters, bottom half		
    bigBottom: '#4',
    // Single width, single height letters	
    singleWidth: '#5',
    // Double width, single height letters	
    doubleWidth: '#6',
    // Clear line from cursor right			
    clearRight: '[K',
    // Clear line from cursor left			
    clearUp: '[1K',
    // Clear entire line						
    clearLine: '[2K',
    // Clear screen from cursor down			
    clearDown: '[J',
    // Clear screen from cursor up			
    clearUp: '[1J',
    // Reset terminal to initial state		
    reset: 'c',

    //
    // Duplicates?
    //
    // Turn off character attributes			
    SGR02: '[0m',
    // Move cursor to upper left corner		
    cursorhome2: '[;H',
    // Move cursor to upper left corner		
    hvhome: '[f',
    // Move cursor to upper left corner		
    hvhome2: '[;f',
    // Move cursor to screen location v,h	
    move2: '[Line;Columnf',
    // Clear line from cursor right			
    EL02: '[0K',
    // Clear screen from cursor down			
    ED02: '[0J',

    //
    // Stuff that either dont work or is probably useless
    // Lightly tested on GNU inetutils 1.8 TELNET 
    //
    // Turn blinking mode on (Does not seem to do as advertised)
    blinking: '[5m',
    // Turn low intensity mode on				
    lowIntensity: '[2m',
    // Clear a tab at the current column		
    clearTab: '[g',
    // Move cursor up one line				
    cursorup: 'A',
    // Move cursor down one line				
    cursordn: 'B',
    // Move cursor right one char				
    cursorrt: 'C',
    // Move cursor left one char				
    cursorlf: 'D',
    // Move cursor to upper left corner		
    cursorhome3: 'H',
    // Generate a reverse line-feed			
    revindex: 'I',
    // Erase to end of current line			
    cleareol: 'K',
    // Erase to end of screen					
    cleareos: 'J',
    // Clear a tab at the current column		
    TBC2: '[0g',
    // Clear all tabs							
    TBC3: '[3g',
    // Turn invisible text mode on			
    invisible: '[8m',
    // Set a tab at the current column		
    tab: 'H',
    // Confidence power up test				
    DECTST: '[2;1y',
    // Confidence loopback test				
    DECTST2: '[2;2y',
    // Repeat power up test					
    DECTST3: '[2;9y',
    // Repeat loopback test					
    DECTST4: '[2;10y',
    // Turn off all four leds					
    DECLL0: '[0q',
    // Turn on LED #1							
    DECLL1: '[1q',
    // Turn on LED #2							
    DECLL2: '[2q',
    // Turn on LED #3							
    DECLL3: '[3q',
    // Turn on LED #4							
    DECLL4: '[4q',
    // Enter/exit ANSI mode (VT52)			
    setansi: '<',
    // Enter alternate keypad mode			
    altkeypad: '=',
    // Exit alternate keypad mode				
    numkeypad: '>',
    // Use special graphics character set		
    setgr: 'F',
    // Use normal US/UK character set			
    resetgr: 'G',
    // Screen alignment display				
    DECALN: '#8',
    // Identify what the terminal is			
    ident: 'Z',
    // Correct response to ident				
    identresp: '/Z',
    // Set alternate keypad mode				
    DECKPAM: '=',
    // Set numeric keypad mode				
    DECKPNM: '>',
    // Set United Kingdom G0 character set	
    setukg0: '(A',
    // Set United Kingdom G1 character set	
    setukg1: ')A',
    // Set United States G0 character set		
    setusg0: '(B',
    // Set United States G1 character set		
    setusg1: ')B',
    // Set G0 special chars. & line set	
    setspecg0: '(0',
    // Set G1 special chars. & line set	
    setspecg1: ')0',
    // Set G0 alternate character ROM			
    setaltg0: '(1',
    // Set G1 alternate character ROM			
    setaltg1: ')1',
    // Device status report					
    DSR: '5n',
    // Response: terminal is OK				
    DSR2: '0n',
    // Response: terminal is not OK			
    DSR3: '3n',
    // Get cursor position					
    DSR4: '6n',
    // Response: cursor is at v,h	
    CPR: 'Line;ColumnR',
    // Identify what terminal type			
    DA: '[c',
    // Identify what terminal type (another)	
    DA2: '[0c',
    // Response: terminal type code n		
    DA3: '[?1;Value0c',
    // Set top and bottom lines of a window	
    DECSTBM: '[Line;Liner',
    // Set single shift 2						
    SS2: 'N',
    // Set single shift 3						
    SS3: 'O',
    // Set G0 alt char ROM and spec. graphics	
    setaltspecg0: '(2',
    // Set G1 alt char ROM and spec. graphics	
    setaltspecg1: ')2',
    // Reset interlacing mode					
    DECINLM2: '[?9l',
    // Reset auto-wrap mode					
    DECARM2: '[?8l',
    // Set origin to absolute					
    DECOM2: '[?6l',
    // Set new line mode						
    LMN: '[20h',
    // Set cursor key to application			
    DECCKM: '[?1h',
    // Set ANSI (versus VT52)					
    DECANM: 'e',
    // Set number of columns to 132			
    DECCOLM: '[?3h',
    // Set smooth scrolling					
    DECSCLM: '[?4h',
    // Set origin to relative					
    DECOM: '[?6h',
    // Set auto-wrap mode						
    DECAWM: '[?7h',
    // Set auto-repeat mode					
    DECARM: '[?8h',
    // Set interlacing mode					
    DECINLM: '[?9h',
    // Set line feed mode						
    LMN2: '[20l',
    // Set cursor key to cursor				
    DECCKM2: '[?1l',
    // Set VT52 (versus ANSI)					
    DECANM2: '[?2l',
    // Set number of columns to 80			
    DECCOLM2: '[?3l',
    // Set jump scrolling						
    DECSCLM2: '[?4l'
};

var Seq = function() {
    this.buffer = this.b = this.result = '';
};

Object.keys(seq).forEach(function(key) {
    var cmd = seq[key];
    if (cmd.match(/column|line|value/i)) {
        Seq.prototype[key] = function(a, b) {
            this.buffer += ESC + cmd.
            replace(/column/ig, a).
            replace(/line/ig, b).replace(/value/ig, a);
            return this;
        };
    } else {
        Seq.prototype.__defineGetter__(key, function() {
            this.buffer += ESC + cmd;
            return this;
        });
    }
});

Seq.prototype.append = Seq.prototype.a = function(msg) {
    this.buffer += msg;
    return this;
};

Seq.prototype.send = function(socket) {
    try  {
    socket.write(this.buffer);
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};

exports.seq = exports.s = function() {
    return new Seq();
};

var Cmd = function() {
    this.buffer = this.b = this.result = [];
};

Object.keys(cmd).forEach(function(key) {
    Cmd.prototype.__defineGetter__(key, function() {
        this.buffer.push(cmd[key]);
        return this;
    });
});

Cmd.prototype.send = function(socket) {
    try {
    socket.write(new Buffer(this.buffer));
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};

exports.cmd = exports.c = function() {
    return new Cmd;
};

