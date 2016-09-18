var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../external/fabric.d.ts" />
var fobject;
(function (fobject) {
    var Fobject = (function () {
        function Fobject(i, p) {
            if (p === void 0) { p = 0; }
            this.instance = i;
            this.Priority = p;
        }
        Fobject.prototype.GetInstance = function () {
            return this.instance;
        };
        Fobject.prototype.Update = function (elasped) {
            if (this.instance) {
                this.instance.Update(elasped);
            }
        };
        Fobject.prototype.Draw = function (canvas) {
            if (this.instance) {
                canvas.getContext().globalAlpha = 1;
                this.instance.Draw(canvas);
            }
        };
        Fobject.prototype.Dispose = function () {
            this.instance = null;
        };
        return Fobject;
    }());
    fobject.Fobject = Fobject;
    var Rectangle = (function () {
        function Rectangle(px, py, width, height) {
            this.LeftTop = { x: px, y: py };
            this.Width = width;
            this.Height = height;
        }
        Rectangle.prototype.Contains = function (p) {
            var X = this.LeftTop.x;
            var Y = this.LeftTop.y;
            var x = p.x;
            var y = p.y;
            return X <= x && x < X + this.Width && Y <= y && y < Y + this.Height;
        };
        Rectangle.prototype.IntersectsWith = function (rect) {
            var X = this.LeftTop.x;
            var Y = this.LeftTop.y;
            return (rect.LeftTop.x < X + this.Width) && (X < (rect.LeftTop.x + rect.Width)) &&
                (rect.LeftTop.y < Y + this.Height) && (Y < rect.LeftTop.y + rect.Height);
        };
        return Rectangle;
    }());
    fobject.Rectangle = Rectangle;
})(fobject || (fobject = {}));
/// <reference path="../fobject/baseobj.ts" />
/// <reference path="./fwords.ts" />
var core;
(function (core) {
    var Keys = (function () {
        function Keys() {
            if (!window)
                throw new Error('Null reference of BOM.window.');
            this.keys = {};
            this.listeners = {
                press: [],
                release: []
            };
            this.Modifiers = {
                Shift: false,
                Alt: false,
                Meta: false,
                Control: false
            };
            window.onkeyup = this.OnKeyUp.bind(this);
            window.onkeydown = this.OnKeyDown.bind(this);
        }
        Keys.GetInstance = function () {
            if (!Keys.instance)
                throw new Error('Instance has not been Initialized.');
            return Keys.instance;
        };
        Keys.CreateInstance = function (app) {
            if (!(app instanceof core.Application))
                throw new Error('Instance can only be created by the application.');
            if (Keys.instance)
                throw new Error('Instance can only be initialized once');
            Keys.instance = new Keys();
            return Keys.instance;
        };
        Keys.prototype.Update = function () {
            this.Modifiers.Shift = this.CheckModifier('Shift');
            this.Modifiers.Alt = this.CheckModifier('Alt');
            this.Modifiers.Meta = this.CheckModifier('Meta');
            this.Modifiers.Control = this.CheckModifier('Control');
        };
        Keys.prototype.CheckModifier = function (type) {
            var l = 'Left';
            var r = 'Right';
            return this.IsKeyPress(type + l) || this.IsKeyPress(type + r);
        };
        Keys.prototype.Emit = function (type, key) {
            var handlers = this.listeners[type];
            if (!handlers)
                return;
            handlers.forEach(function (handler) {
                if (handler)
                    handler(key);
            });
        };
        Keys.prototype.AddListener = function (type, func) {
            var handlers = this.listeners[type];
            if (!handlers)
                throw new Error('Type ' + type + ' not supported');
            handlers[handlers.length] = func;
        };
        Keys.prototype.OnKeyDown = function (event) {
            var key = whatKey(event);
            if (!this.keys[key]) {
                this.Emit('press', key);
                this.keys[key] = true;
            }
        };
        Keys.prototype.OnKeyUp = function (event) {
            var key = whatKey(event);
            this.keys[key] = false;
            this.Emit('release', key);
        };
        Keys.prototype.IsKeyPress = function (key) {
            var keycode = this.keys[key];
            return !!keycode;
        };
        return Keys;
    }());
    core.Keys = Keys;
    var Location;
    (function (Location) {
        Location[Location["STANDARD"] = 0] = "STANDARD";
        Location[Location["LEFT"] = 1] = "LEFT";
        Location[Location["RIGHT"] = 2] = "RIGHT";
        Location[Location["NUMPAD"] = 3] = "NUMPAD";
        Location[Location["MOBILE"] = 4] = "MOBILE";
        Location[Location["JOYSTICK"] = 5] = "JOYSTICK";
    })(Location || (Location = {}));
    var shiftNumpad = {
        12: 101,
        13: 108,
        33: 105,
        34: 99,
        35: 97,
        36: 103,
        37: 100,
        38: 104,
        39: 102,
        40: 98,
        45: 96
    };
    var left = {
        16: 160,
        17: 162,
        18: 164
    };
    var right = {
        16: 161,
        17: 163,
        18: 165
    };
    function whatKey(event) {
        var key = keyCodes[event.keyCode];
        if (key) {
            if (event.location === Location.NUMPAD) {
                var mapped = shiftNumpad[event.keyCode];
                if (mapped) {
                    return keyCodes[mapped];
                }
            }
            else if (event.location === Location.LEFT && event.keyCode in left) {
                key = keyCodes[left[event.keyCode]];
            }
            else if (event.location === Location.RIGHT && event.keyCode in right) {
                key = keyCodes[right[event.keyCode]];
            }
            return key;
        }
        else
            return String.fromCharCode(event.keyCode);
    }
    // the ultimate list of keycodes from https://github.com/Benvie/Keyboard
    var keyCodes = [
        'Unknown', 'Mouse1', 'Mouse2', 'Break', 'Mouse3', 'Mouse4', 'Mouse5', '', 'Backspace', 'Tab', '', '', 'Clear', 'Enter', '', '', 'Shift', 'Control',
        'Alt', 'Pause', 'CapsLock', 'IMEHangul', '', 'IMEJunja', 'IMEFinal', 'IMEKanji', '', 'Escape', 'IMEConvert', 'IMENonconvert', 'IMEAccept',
        'IMEModechange', 'Space', 'PageUp', 'PageDown', 'End', 'Home', 'Left', 'Up', 'Right', 'Down', 'Select', 'Print', 'Execute', 'PrintScreen', 'Insert',
        'Delete', 'Help', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '', '', '', '', '', '', '', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'MetaLeft', 'MetaLeft', 'MetaExtra', '', 'Sleep', 'Numpad0',
        'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9', 'NumpadMultiply', 'NumpadAdd', 'NumpadEnter',
        'NumpadSubtract', 'NumpadDecimal', 'NumpadDivide', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15',
        'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', '', '', '', '', '', '', '', '', 'NumLock', 'ScrollLock', '',
        '', '', '', '', '', '', '', '', '', '', '', '', '', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'BrowserBack',
        'BrowserForward', 'BrowserRefresh', 'BrowserStop', 'BrowserSearch', 'BrowserFavorites', 'BrowserHome', 'VolumeMute', 'VolumeDown', 'VolumeUp',
        'MediaNextTrack', 'MediaPreventrack', 'MediaStop', 'MediaPlayPause', 'LaunchMail', 'SelectMedia', 'LaunchApplication1', 'LaunchApplication2', '', '',
        ';', '=', ',', '-', '.', '/', 'DeadGrave', 'DeadAcute', 'DeadCircumflex', 'DeadTilde', 'DeadMacron', 'DeadBreve', 'DeadAboveDot', 'DeadUmlaut',
        'DeadAboveRing', 'DeadDoubleAcute', 'DeadCaron', '', '', '', '', '', '', '', '', '', '', '', '', 'DeadCedilla', 'DeadOgonek', '', '', '[', '\\', ']',
        '\\', 'Meta', 'Meta', '', 'AltGr', '', '', 'IMEProcess', '', '0x00', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Attention', 'Crsel',
        'Exsel', 'EraseEOF', 'Play', 'Zoom', 'NoName', '', 'Clear', ''
    ];
})(core || (core = {}));
/// <reference path="./event.ts" />
/// <reference path="../external/fabric.d.ts" />
var core;
(function (core) {
    var Canvas = (function () {
        function Canvas() {
        }
        Canvas.GetInstance = function () {
            if (!Canvas.instance)
                throw new Error('Instance has not been Initialized.');
            return Canvas.instance;
        };
        Canvas.CreateInstance = function (app, param) {
            if (!(app instanceof core.Application))
                throw new Error('Instance can only be created by the application.');
            if (Canvas.instance)
                throw new Error('Instance can only be initialized once');
            Canvas.instance = new fabric.Canvas(param);
            return Canvas.instance;
        };
        return Canvas;
    }());
    core.Canvas = Canvas;
})(core || (core = {}));
/// <reference path="../fobject/baseobj.ts" />
/// <reference path="../app/canvas.ts" />
var scene;
(function (scene) {
    var BaseScene = (function () {
        function BaseScene() {
            this.fobjs = new Array();
        }
        BaseScene.prototype.Update = function (elasped) {
            this.ClearCanvas();
            this.fobjs.sort(function (fobj) { return fobj.Priority; });
            this.fobjs.forEach(function (fobj) {
                fobj.Update(elasped);
                fobj.Draw(core.Canvas.GetInstance());
            });
        };
        BaseScene.prototype.ClearCanvas = function () {
            core.Canvas.GetInstance().clear();
        };
        return BaseScene;
    }());
    scene.BaseScene = BaseScene;
})(scene || (scene = {}));
/// <reference path="baseobj.ts" />
/// <reference path="../external/fabric.d.ts" />
var fobject;
(function (fobject) {
    var LogoPainter = (function () {
        function LogoPainter() {
            this.image = new Image();
            this.image.src = 'res/github.svg';
            this.loadingTime = 0;
            this.Position = { x: 0, y: 0 };
        }
        LogoPainter.prototype.Draw = function (canvas) {
            var context = canvas.getContext();
            var alpha = this.loadingTime / 5000 + 0.4;
            context.globalAlpha = alpha > 1 ? 1 : alpha;
            if (this.Size)
                context.drawImage(this.image, this.Position.x, this.Position.y, this.Size.width, this.Size.height);
            else
                context.drawImage(this.image, this.Position.x, this.Position.y);
        };
        LogoPainter.prototype.Update = function (elasped) {
            if (elasped)
                this.loadingTime += elasped;
        };
        return LogoPainter;
    }());
    fobject.LogoPainter = LogoPainter;
})(fobject || (fobject = {}));
/// <reference path="basescene.ts" />
/// <reference path="manager.ts" />
/// <reference path="../fobject/logo.ts" />
var scene;
(function (scene) {
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            _super.call(this);
            var painter = new fobject.LogoPainter();
            painter.Position = { x: 40, y: 40 };
            painter.Size = { width: 320, height: 320 };
            this.logo = new fobject.Fobject(painter);
            this.fobjs.push(this.logo);
            this.timer = 0;
        }
        Loading.prototype.Update = function (elasped) {
            _super.prototype.Update.call(this, elasped);
            this.timer += elasped;
            if (this.timer >= 5000) {
                var manager = scene.Manager.GetInstance();
                var next = manager.scenes.menu;
                if (next)
                    manager.Current = next;
            }
        };
        return Loading;
    }(scene.BaseScene));
    scene.Loading = Loading;
})(scene || (scene = {}));
/// <reference path="baseobj.ts" />
/// <reference path="../external/fabric.d.ts" />
var fobject;
(function (fobject) {
    var TextPainter = (function () {
        function TextPainter(text) {
            this.TextValue = text;
            this.FontStyle = '24px Consolas';
            this.Position = { x: 0, y: 0 };
        }
        TextPainter.prototype.Draw = function (canvas) {
            var context = canvas.getContext();
            context.font = this.FontStyle;
            context.fillText(this.TextValue, this.Position.x, this.Position.y);
        };
        TextPainter.prototype.Update = function () { };
        return TextPainter;
    }());
    fobject.TextPainter = TextPainter;
})(fobject || (fobject = {}));
/// <reference path="basescene.ts" />
/// <reference path="../fobject/text.ts" />
/// <reference path="../app/event.ts" />
var scene;
(function (scene) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.call(this);
            this.first = this.CreateText('first', 50, 50);
            this.second = this.CreateText('second', 50, 150);
            this.third = this.CreateText('third', 50, 250);
            this.selection = this.CreateText('>', 35, 0);
            this.fobjs.push(this.first, this.second, this.third, this.selection);
            this.currentSelect = this.CreateSelectionChain();
            core.Keys.GetInstance().AddListener('press', this.OnKeyPress.bind(this));
        }
        Menu.prototype.OnKeyPress = function (key) {
            if (key === 'Up')
                this.currentSelect = this.currentSelect.prev;
            else if (key === 'Down')
                this.currentSelect = this.currentSelect.next;
        };
        Menu.prototype.Update = function (elasped) {
            this.selection.GetInstance().Position.y = this.currentSelect.data;
            _super.prototype.Update.call(this, elasped);
        };
        Menu.prototype.CreateText = function (text, px, py) {
            var painter = new fobject.TextPainter(text);
            painter.Position = { x: px, y: py };
            return new fobject.Fobject(painter);
        };
        Menu.prototype.CreateSelectionChain = function () {
            var chain1 = {
                data: this.first.GetInstance().Position.y,
                prev: null,
                next: null
            };
            var chain2 = {
                data: this.second.GetInstance().Position.y,
                prev: null,
                next: null
            };
            var chain3 = {
                data: this.third.GetInstance().Position.y,
                prev: null,
                next: null
            };
            chain1.prev = chain3;
            chain2.prev = chain1;
            chain3.prev = chain2;
            chain1.next = chain2;
            chain2.next = chain3;
            chain3.next = chain1;
            return chain1;
        };
        return Menu;
    }(scene.BaseScene));
    scene.Menu = Menu;
})(scene || (scene = {}));
/// <reference path="./loading.ts" />
/// <reference path="./menu.ts" />
/// <reference path="./basescene.ts" />
/// <reference path="../app/fwords.ts" />
var scene;
(function (scene) {
    var Manager = (function () {
        function Manager() {
            this.scenes = {
                battle: null,
                credit: null,
                loading: null,
                menu: null
            };
            this.scenes.loading = new scene.Loading();
            this.scenes.menu = new scene.Menu();
            this.Current = this.scenes.loading;
        }
        Manager.GetInstance = function () {
            if (!Manager.instance)
                throw new Error('Instance has not been Initialized.');
            return Manager.instance;
        };
        Manager.CreateInstance = function (app) {
            if (!(app instanceof core.Application))
                throw new Error('Instance can only be created by the application.');
            if (Manager.instance)
                throw new Error('Instance can only be initialized once');
            Manager.instance = new Manager();
            return Manager.instance;
        };
        return Manager;
    }());
    scene.Manager = Manager;
})(scene || (scene = {}));
/// <reference path="../scene/manager.ts" />
/// <reference path="./event.ts" />
/// <reference path="./canvas.ts" />
var core;
(function (core) {
    var Application = (function () {
        function Application(param) {
            this.keyboard = core.Keys.CreateInstance(this);
            this.scene = scene.Manager.CreateInstance(this);
            core.Canvas.CreateInstance(this, param);
        }
        Application.prototype.Start = function (timeout) {
            var _this = this;
            this.startTime = new Date();
            this.lastFrame = this.startTime;
            var handler = function () {
                var nowTime = new Date();
                var current = _this.scene.Current;
                var elasped = nowTime - _this.lastFrame;
                _this.keyboard.Update();
                current.Update(elasped);
                _this.lastFrame = nowTime;
            };
            setInterval(handler.bind(this), timeout);
        };
        return Application;
    }());
    core.Application = Application;
})(core || (core = {}));
