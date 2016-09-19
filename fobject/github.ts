/// <reference path="baseobj.ts" />
/// <reference path="../external/fabric.d.ts" />

module fobject {
    export class GitHubPainter implements IDrawable {

        private lastPos: Point = { x: 0, y: 0 };
        private lastVec: Point = { x: 0, y: 0 };
        private originScale: Size = { width: 1792, height: 1792 };
        private ctx: CanvasRenderingContext2D;
        private loadingTime: number;

        public Location: Point = { x: 0, y: 0 };
        public Scale: Size = { width: 1792, height: 1792 };

        constructor() {
            this.ctx = null;
            this.loadingTime = 0;
        }

        public Draw(canvas: fabric.IStaticCanvas): void {
            this.ctx = canvas.getContext();
            let alpha = this.loadingTime / 5000 + 0.4;
            
            this.ctx.globalAlpha = alpha > 1 ? 1 : alpha;
            this.ctx.translate(this.Location.x, this.Location.y);
            this.ctx.scale(this.Scale.width / this.originScale.width, this.Scale.height / this.originScale.height);
            this.ctx.beginPath();

            this.M(1664, 896);
            this.q(0, 251, -146.5, 451.5);
            this.t(-378.5, 277.5);
            this.q(-27, 5, -39.5, -7);
            this.t(-12.5, -30);
            this.v(-211);
            this.q(0, -97, -52, -142);
            this.q(57, -6, 102.5, -18);
            this.t(94, -39);
            this.t(81, -66.5);
            this.t(53, -105);
            this.t(20.5, -150.5);
            this.q(0, -121, -79, -206);
            this.q(37, -91, -8, -204);
            this.q(-28, -9, -81, 11);
            this.t(-92, 44);
            this.l(-38, 24);
            this.q(-93, -26, -192, -26);
            this.t(-192, 26);
            this.q(-16, -11, -42.5, -27);
            this.t(-83.5, -38.5);
            this.t(-86, -13.5);
            this.q(-44, 113, -7, 204);
            this.q(-79, 85, -79, 206);
            this.q(0, 85, 20.5, 150);
            this.t(52.5, 105);
            this.t(80.5, 67);
            this.t(94, 39);
            this.t(102.5, 18);
            this.q(-40, 36, -49, 103);
            this.q(-21, 10, -45, 15);
            this.t(-57, 5);
            this.t(-65.5, -21.5);
            this.t(-55.5, -62.5);
            this.q(-19, -32, -48.5, -52);
            this.t(-49.5, -24);
            this.l(-20, -3);
            this.q(-21, 0, -29, 4.5);
            this.t(-5, 11.5);
            this.t(9, 14);
            this.t(13, 12);
            this.l(7, 5);
            this.q(22, 10, 43.5, 38);
            this.t(31.5, 51);
            this.l(10, 23);
            this.q(13, 38, 44, 61.5);
            this.t(67, 30);
            this.t(69.5, 7);
            this.t(55.5, -3.5);
            this.l(23, -4);
            this.q(0, 38, 0.5, 89);
            this.t(0.5, 54);
            this.q(0, 18, -13, 30);
            this.t(-40, 7);
            this.q(-232, -77, -378.5, -277.5);
            this.t(-146.5, -451.5);
            this.q(0, -209, 103, -385.5);
            this.t(279.5, -279.5);
            this.t(385.5, -103);
            this.t(385.5, 103);
            this.t(279.5, 279.5);
            this.t(103, 385.5);
            this.Z();

            var gradient = this.ctx.createLinearGradient(0, 0, 1792, 1792);
            gradient.addColorStop(0.2, "red");
            gradient.addColorStop(0.8, "blue");
            // Fill with gradient
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            this.ctx = null;
        }

        private M(x: number, y: number): void {
            this.ctx.moveTo(x, y);
            this.lastPos.x = x;
            this.lastPos.y = y;
        }

        private q(x1: number, y1: number, x: number, y: number): void {
            this.ctx.quadraticCurveTo(this.lastPos.x + x1, this.lastPos.y + y1, this.lastPos.x + x, this.lastPos.y + y);
            this.lastPos.x += x;
            this.lastPos.y += y;
            this.lastVec.x = x - x1;
            this.lastVec.y = y - y1;
        }

        private t(x: number, y: number): void {
            this.q(this.lastVec.x, this.lastVec.y, x, y);
        }

        private l(x: number, y: number): void {
            this.lastPos.x += x;
            this.lastPos.y += y;
            this.ctx.lineTo(this.lastPos.x, this.lastPos.y);
        }

        private v(y: number): void {
            this.l(0, y);
        }

        private Z(): void {
            this.ctx.closePath();
        }

        public Update(elasped: number): void {
            if (elasped)
                this.loadingTime += elasped;
        }
    }

}