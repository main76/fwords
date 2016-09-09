/// <reference path="baseobj.ts" />

module fobject {
    export class TextPainter implements IDrawable {
        public TextValue: string;
        public FontStyle: string;
        public TextColor: string;
        public TextAlign: string;
        public Position: Point;

        constructor(text: string) {
            this.TextValue = text;
            this.FontStyle = '24px Consolas';
            this.Position = { x: 0, y: 0 };
        }

        public Draw(context: CanvasRenderingContext2D): void {
            context.font = this.FontStyle;
            context.fillText(this.TextValue, this.Position.x, this.Position.y);
        }

        public Update(): void { }
    }

}
