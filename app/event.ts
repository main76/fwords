/// <reference path="../fobject/baseobj.ts" />
/// <reference path="./fwords.ts" />

module core {
    type ModifierCollection = {
        Shift: boolean,
        Alt: boolean,
        Meta: boolean,
        Control: boolean
    }

    export class Keys implements fobject.IFrameType {
        protected keys: Object;
        public Modifiers: ModifierCollection;
        protected static instance: Keys;

        public static GetInstance(): Keys {
            if (!Keys.instance)
                throw new Error('Instance has not been Initialized.');
            return Keys.instance;
        }

        public static CreateInstance(app: Application): void {
            if (!(app instanceof Application))
                throw new Error('Instance can only be created by the application.');
            if (Keys.instance)
                throw new Error('Instance has already been Initialized');
            Keys.instance = new Keys();
        }

        constructor() {
            if (!window)
                throw new Error('Null reference of BOM.window.');
            window.onkeydown = this.OnKeyDown.bind(this);
            window.onkeyup = this.OnKeyUp.bind(this);
            this.keys = {};
            this.Modifiers = {
                Shift: false,
                Alt: false,
                Meta: false,
                Control: false
            };
        }

        public Update(): void {
            this.Modifiers.Shift = this.CheckModifier('Shift');
            this.Modifiers.Alt = this.CheckModifier('Alt');
            this.Modifiers.Meta = this.CheckModifier('Meta');
            this.Modifiers.Control = this.CheckModifier('Control');
        }

        protected CheckModifier(type: string): boolean {
            const l = 'Left';
            const r = 'Right';
            return this.IsKeyPress(type + l) || this.IsKeyPress(type + r);
        }

        protected OnKeyDown(event: KeyboardEvent): void {
            let key = whatKey(event);
            this.keys[key] = true;
        }

        protected OnKeyUp(event: KeyboardEvent): void {
            let key = whatKey(event);
            this.keys[key] = false;
        }

        public IsKeyPress(key: string): boolean {
            let keycode = this.keys[key];
            return !!keycode;
        }
    }

    enum Location {
        STANDARD = 0,
        LEFT = 1,
        RIGHT = 2,
        NUMPAD = 3,
        MOBILE = 4,
        JOYSTICK = 5
    }

    const shiftNumpad = {
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
        45: 96,
    };

    const left = {
        16: 160,
        17: 162,
        18: 164
    };

    const right = {
        16: 161,
        17: 163,
        18: 165
    };

        function whatKey(event: KeyboardEvent): string {
            let key = keyCodes[event.keyCode];
            if (key) {
                if (event.location === Location.NUMPAD) {
                    let mapped = shiftNumpad[event.keyCode];
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
            else return String.fromCharCode(event.keyCode);
        }

    // the ultimate list of keycodes from https://github.com/Benvie/Keyboard
    const keyCodes: string[] = [
        'Unknown', 'Mouse1', 'Mouse2', 'Break', 'Mouse3', 'Mouse4', 'Mouse5', '', 'Backspace', 'Tab', '', '', 'Clear', 'Enter', '', '', 'Shift', 'Control', 'Alt', 'Pause', 'CapsLock', 'IMEHangul', '',
        'IMEJunja', 'IMEFinal', 'IMEKanji', '', 'Escape', 'IMEConvert', 'IMENonconvert', 'IMEAccept', 'IMEModechange', 'Space', 'PageUp', 'PageDown', 'End', 'Home', 'Left', 'Up', 'Right', 'Down',
        'Select', 'Print', 'Execute', 'PrintScreen', 'Insert', 'Delete', 'Help', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '', '', '', '', '', '', '', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'MetaLeft', 'MetaLeft', 'MetaExtra', '', 'Sleep', 'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3',
        'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9', 'NumpadMultiply', 'NumpadAdd', 'NumpadEnter', 'NumpadSubtract', 'NumpadDecimal', 'NumpadDivide', 'F1', 'F2', 'F3', 'F4', 'F5',
        'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', '', '', '', '', '', '', '', '', 'NumLock', 'ScrollLock', '',
        '', '', '', '', '', '', '', '', '', '', '', '', '', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'BrowserBack', 'BrowserForward', 'BrowserRefresh',
        'BrowserStop', 'BrowserSearch', 'BrowserFavorites', 'BrowserHome', 'VolumeMute', 'VolumeDown', 'VolumeUp', 'MediaNextTrack', 'MediaPreventrack', 'MediaStop', 'MediaPlayPause', 'LaunchMail',
        'SelectMedia', 'LaunchApplication1', 'LaunchApplication2', '', '', ';', '=', ',', '-', '.', '/', 'DeadGrave', 'DeadAcute', 'DeadCircumflex', 'DeadTilde', 'DeadMacron', 'DeadBreve', 'DeadAboveDot',
        'DeadUmlaut', 'DeadAboveRing', 'DeadDoubleAcute', 'DeadCaron', '', '', '', '', '', '', '', '', '', '', '', '', 'DeadCedilla', 'DeadOgonek', '', '', '[', '\\', ']', '\\', 'Meta', 'Meta', '',
        'AltGr', '', '', 'IMEProcess', '', '0x00', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Attention', 'Crsel', 'Exsel', 'EraseEOF', 'Play', 'Zoom', 'NoName', '', 'Clear', ''
    ];
}