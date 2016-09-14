/// <reference path="baseobj.ts" />
/// <reference path="../external/fabric.d.ts" />

module fobject {
    export class LogoPainter implements IDrawable {
        public Position: Point;
        public Size: Size;
        private loadingTime: number;
        protected image: HTMLImageElement;

        constructor() {
            this.image = new Image();
            this.image.src = 'res/github.svg';
            this.loadingTime = 0;
            this.Position = { x: 0, y: 0 };
        }

        public Draw(canvas: fabric.IStaticCanvas): void {
            let context = canvas.getContext();
            let alpha = this.loadingTime / 5000 + 0.4;
            context.globalAlpha = alpha > 1 ? 1 : alpha;
            if (this.Size)
                context.drawImage(
                    this.image,
                    this.Position.x, this.Position.y,
                    this.Size.width, this.Size.height
                );
            else context.drawImage(this.image, this.Position.x, this.Position.y);
        }

        public Update(elasped: number): void {
            if (elasped)
                this.loadingTime += elasped;
        }
    }

}
