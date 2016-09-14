/// <reference path="../fobject/baseobj.ts" />
/// <reference path="../app/canvas.ts" />

module scene {

    export abstract class BaseScene implements fobject.IFrameType {
        protected fobjs: Array<fobject.Fobject<fobject.IDrawable>>;

        constructor() {
            this.fobjs = new Array<fobject.Fobject<fobject.IDrawable>>();
        }

        public Update(elasped: number): void {
            this.ClearCanvas();
            this.fobjs.sort(fobj => fobj.Priority);
            this.fobjs.forEach(fobj => {
                fobj.Update(elasped);
                fobj.Draw(core.Canvas.GetInstance());
            });
        }

        protected ClearCanvas(): void {
            core.Canvas.GetInstance().clear();
        }
    }

}