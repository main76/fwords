/// <reference path="../fobject/baseobj.ts" />

module scene {

    export abstract class BaseScene implements fobject.IFrameType {
        protected context: CanvasRenderingContext2D;
        protected fobjs: Array<fobject.Fobject<fobject.IDrawable>>;

        constructor(ctx: CanvasRenderingContext2D) {
            this.context = ctx;
            this.fobjs = new Array<fobject.Fobject<fobject.IDrawable>>();
        }

        public Update(elasped: number): void {
            this.ClearCanvas();
            this.fobjs.sort(fobj => fobj.Priority);
            this.fobjs.forEach(fobj => {
                fobj.Update(elasped);
                fobj.Draw(this.context);
            });
        }

        protected ClearCanvas(): void {
            let w = this.context.canvas.width;
            let h = this.context.canvas.height;
            this.context.clearRect(0, 0, w, h);
        }
    }

}