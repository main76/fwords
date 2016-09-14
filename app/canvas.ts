/// <reference path="./event.ts" />
/// <reference path="../external/fabric.d.ts" />

module core {

    export class Canvas {
        protected static instance: fabric.IStaticCanvas;

        public static GetInstance(): fabric.IStaticCanvas {
            if (!Canvas.instance)
                throw new Error('Instance has not been Initialized.');
            return Canvas.instance;
        }

        public static CreateInstance(app: core.Application, param: HTMLCanvasElement | string): fabric.IStaticCanvas {
            if (!(app instanceof core.Application))
                throw new Error('Instance can only be created by the application.');
            if (Canvas.instance)
                throw new Error('Instance can only be initialized once');
            Canvas.instance = new fabric.Canvas(param);
            return Canvas.instance;
        }
    }
    
}
