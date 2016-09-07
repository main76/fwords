/// <reference path="../fobject/baseobj.ts" />
module scene {

    export abstract class BaseScene {
        protected context: CanvasRenderingContext2D;
        protected fobjs: Array<fobject.Fobject<fobject.IDrawable>>;

        constructor(ctx: CanvasRenderingContext2D) {
            this.context = ctx;
            this.fobjs = new Array<fobject.Fobject<fobject.IDrawable>>();
        }

        public Update(elasped: number): void {
            this.fobjs.sort(fobj => fobj.Priority);
            this.fobjs.forEach(fobj => {
                fobj.Update(elasped);
                fobj.Draw(this.context);
            });
        }
    }

}