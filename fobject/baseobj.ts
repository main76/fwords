/// <reference path="../external/fabric.d.ts" />

module fobject {

    export class Fobject<T extends IDrawable> implements IDrawable, IDisposable {

        protected instance: T;
        public Priority: number;

        constructor(i: T, p: number = 0) {
            this.instance = i;
            this.Priority = p;
        }

        public GetInstance(): T {
            return this.instance;
        }

        public Update(elasped: number): void {
            if (this.instance) {
                this.instance.Update(elasped);
            }
        }

        public Draw(canvas: fabric.IStaticCanvas): void {
            if (this.instance) {
                canvas.getContext().globalAlpha = 1;
                this.instance.Draw(canvas);
            }
        }

        public Dispose(): void {
            this.instance = null;
        }
    }
    export type Node_ = {
        data: any,
        next: Node_
    };

    export type _Node_ = {
        prev: _Node_,
        data: any,
        next: _Node_
    };

    export type Point = {
        x: number,
        y: number
    };

    export type Size = {
        width: number,
        height: number
    };

    export class Rectangle {
        public LeftTop: Point;
        public Width: number;
        public Height: number;

        constructor(px: number, py: number, width: number, height: number) {
            this.LeftTop = {x: px, y: py};
            this.Width = width;
            this.Height = height;
        }

        public Contains(p: Point): boolean {
            let X = this.LeftTop.x;
            let Y = this.LeftTop.y;
            let x = p.x;
            let y = p.y;
            return X <= x && x < X + this.Width && Y <= y && y < Y + this.Height;
        }

        public IntersectsWith(rect: Rectangle): boolean {
            let X = this.LeftTop.x;
            let Y = this.LeftTop.y;
            return (rect.LeftTop.x < X + this.Width) && (X < (rect.LeftTop.x + rect.Width)) &&
                (rect.LeftTop.y < Y + this.Height) && (Y < rect.LeftTop.y + rect.Height);
        }
    }

    export interface IDrawable extends IFrameType {
        Draw(canvas: fabric.IStaticCanvas): void;
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
