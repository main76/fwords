/// <reference path="basescene.ts" />
/// <reference path="../fobject/clock.ts" />
module scene {

    export class Loading extends BaseScene {
        private clock : fobject.Fobject<fobject.ClockPainter>;

        constructor(ctx : CanvasRenderingContext2D) {
            super(ctx);
            var painter = new fobject.ClockPainter();
            this.clock = new fobject.Fobject<fobject.ClockPainter>(painter);
            this.fobjs.push(this.clock);
            console.log("Load's ctor called");
        }

        public ManualDraw() : void {
            this.clock.Update(0);
            this.clock.Draw(this.context);
        }
    }
    
}