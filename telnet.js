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
    return new Buffer([IAC, WILL, echo, IAC, DO, suppressGoAhead, IAC, WILL, supressGoAhead]);
};

exports.s = function(x, y, msg) {
    return new Buffer([27]) + "[" + y + ";" + x + "H" + msg;
};

exports.chain = exports.c = function() {
    return new function() {
        var self = this,
        buffer = self.buffer = '';

        self.append = self.a = function(msg) {
            buffer += msg;
            return self;
        };

        self.graphic = function() {
            buffer += ESC + '(0';
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

        self.send = self.s = function(socket) {
            socket.write(buffer);
        };
    };
};

