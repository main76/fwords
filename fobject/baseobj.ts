module fobject {

    export class Fobject<T extends IDrawable> implements IDrawable, IDisposable {
        
        protected instance: T;
        public Priority: number;

        constructor(i: T, p: number = 0) {
            this.instance = i;
            this.Priority = p;
        }

        public Update(elasped: number): void {
            if (this.instance) {
                this.instance.Update(elasped);
            }
        }

        public Draw(context: CanvasRenderingContext2D): void {
            if (this.instance) {
                this.instance.Draw(context);
            }
        }

        public Dispose(): void {
            this.instance = null;
        }
    }

    export interface IDrawable extends IFrameType {
        Draw(context: CanvasRenderingContext2D): void;
    }

    export interface IFrameType {
        Update(elasped: number): void;
    }

    export interface IDisposable {
        Dispose(): void;
    }

    export interface ILasyLoad {
        Init(): void;
    }

}
