var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fobject;
(function (fobject) {
    var Fobject = (function () {
        function Fobject(i) {
            this.instance = i;
        }
        Fobject.prototype.Update = function (elasped) {
            if (this.instance) {
                this.instance.Update(elasped);
            }
        };
        Fobject.prototype.Draw = function (context) {
            if (this.instance) {
                this.instance.Draw(context);
            }
        };
        Fobject.prototype.Dispose = function () {
            this.instance = null;
        };
        return Fobject;
    }());
    fobject.Fobject = Fobject;
})(fobject || (fobject = {}));
/// <reference path="../fobject/baseobj.ts" />
var scene;
(function (scene) {
    var BaseScene = (function () {
        function BaseScene(ctx) {
            this.context = ctx;
            this.fobjs = new Array();
        }
        BaseScene.prototype.Update = function (elasped) {
            var _this = this;
            this.fobjs.forEach(function (fobj) {
                fobj.Update(elasped);
                fobj.Draw(_this.context);
            });
        };
        return BaseScene;
    }());
    scene.BaseScene = BaseScene;
})(scene || (scene = {}));
/// <reference path="baseobj.ts" />
var fobject;
(function (fobject) {
    var ClockPainter = (function () {
        function ClockPainter() {
        }
        ClockPainter.prototype.Draw = function (context) {
            this.DrawClock(context);
        };
        ClockPainter.prototype.Update = function (elasped) {
            this.now = new Date();
        };
        ClockPainter.prototype.DrawClock = function (ctx) {
            var x, y, i;
            var now = this.now; // alias
            var getX = function (angle) { return -Math.sin(angle + Math.PI); };
            var getY = function (angle) { return Math.cos(angle + Math.PI); };
            ctx.clearRect(0, 0, 400, 400);
            ctx.save();
            ctx.translate(200, 200);
            ctx.beginPath();
            ctx.lineWidth = 14;
            ctx.strokeStyle = '#325FA2';
            ctx.fillStyle = '#eeeeee';
            ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.fill();
            // Hour marks
            ctx.lineWidth = 8;
            ctx.strokeStyle = '#000000';
            for (i = 0; i < 12; i++) {
                x = getX(Math.PI / 6 * i);
                y = getY(Math.PI / 6 * i);
                ctx.beginPath();
                ctx.moveTo(x * 100, y * 100);
                ctx.lineTo(x * 125, y * 125);
                ctx.stroke();
            }
            // Minute marks
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#000000';
            for (i = 0; i < 60; i++) {
                if (i % 5 !== 0) {
                    x = getX(Math.PI / 30 * i);
                    y = getY(Math.PI / 30 * i);
                    ctx.beginPath();
                    ctx.moveTo(x * 117, y * 117);
                    ctx.lineTo(x * 125, y * 125);
                    ctx.stroke();
                }
            }
            var sec = now.getSeconds() + now.getMilliseconds() / 1000.0;
            var min = now.getMinutes() + sec / 60;
            var hr = now.getHours() % 12 + min / 60;
            ctx.fillStyle = 'black';
            // Write hours
            x = getX(hr * (Math.PI / 6));
            y = getY(hr * (Math.PI / 6));
            ctx.lineWidth = 14;
            ctx.beginPath();
            ctx.moveTo(x * -20, y * -20);
            ctx.lineTo(x * 80, y * 80);
            ctx.stroke();
            // Write minutes
            x = getX((Math.PI / 30) * min);
            y = getY((Math.PI / 30) * min);
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(x * -28, y * -28);
            ctx.lineTo(x * 112, y * 112);
            ctx.stroke();
            // Write seconds
            x = getX(sec * Math.PI / 30);
            y = getY(sec * Math.PI / 30);
            ctx.strokeStyle = '#D40000';
            ctx.fillStyle = '#D40000';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(x * -30, y * -30);
            ctx.lineTo(x * 83, y * 83);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x * 95, y * 95, 10, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.fillStyle = '#555';
            ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };
        return ClockPainter;
    }());
    fobject.ClockPainter = ClockPainter;
})(fobject || (fobject = {}));
/// <reference path="basescene.ts" />
/// <reference path="../fobject/clock.ts" />
var scene;
(function (scene) {
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading(ctx) {
            _super.call(this, ctx);
            var painter = new fobject.ClockPainter();
            this.clock = new fobject.Fobject(painter);
            this.fobjs.push(this.clock);
            console.log("Load's ctor called");
        }
        Loading.prototype.ManualDraw = function () {
            this.clock.Update(0);
            this.clock.Draw(this.context);
        };
        return Loading;
    }(scene.BaseScene));
    scene.Loading = Loading;
})(scene || (scene = {}));
/// <reference path="./loading.ts" />
/// <reference path="./basescene.ts" />
var scene;
(function (scene) {
    var Manager = (function () {
        function Manager(ctx) {
            this.scenes = {
                battle: null,
                credit: null,
                loading: null,
                menu: null
            };
            this.scenes.loading = new scene.Loading(ctx);
            this.Current = this.scenes.loading;
        }
        return Manager;
    }());
    scene.Manager = Manager;
})(scene || (scene = {}));
