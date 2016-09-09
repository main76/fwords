/// <reference path="basescene.ts" />
/// <reference path="manager.ts" />
/// <reference path="../fobject/clock.ts" />

module scene {

    export class Loading extends BaseScene {
        private clock: fobject.Fobject<fobject.ClockPainter>;
        private timer: number;

        constructor(ctx: CanvasRenderingContext2D) {
            super(ctx);
            var painter = new fobject.ClockPainter();
            this.clock = new fobject.Fobject<fobject.ClockPainter>(painter);
            this.fobjs.push(this.clock);
            this.timer = 0;
        }

        public Update(elasped: number): void {
            super.Update(elasped);
            this.timer += elasped;
            if (this.timer >= 1000) {
                let manager = Manager.GetInstance();
                let next = manager.scenes.menu;
                if (next)
                    manager.Current = next;
            }
        }
    }

}