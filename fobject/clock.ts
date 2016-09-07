/// <reference path="baseobj.ts" />
module fobject {
    export class ClockPainter implements IDrawable {
        private now: Date;

        constructor() {

        }

        public Draw(context: CanvasRenderingContext2D): void {
            this.DrawClock(context);
        }

        public Update(elasped: number): void {
            this.now = new Date();
        }

        private DrawClock(ctx: CanvasRenderingContext2D): void {
            var x, y, i;
            var now = this.now; // alias
            var getX = (angle) => { return -Math.sin(angle + Math.PI); }
            var getY = (angle) => { return Math.cos(angle + Math.PI); }

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
        }
    }
}