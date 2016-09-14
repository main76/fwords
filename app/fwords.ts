/// <reference path="../scene/manager.ts" />
/// <reference path="./event.ts" />
/// <reference path="./canvas.ts" />

module core {
    export class Application {
        private keyboard: Keys;
        private scene: scene.Manager;
        private startTime: Date;
        private lastFrame: any;

        constructor(param: HTMLCanvasElement | string) {
            this.keyboard = Keys.CreateInstance(this);
            this.scene = scene.Manager.CreateInstance(this);
            Canvas.CreateInstance(this, param);
        }

        public Start(timeout: number): void {
            this.startTime = new Date();
            this.lastFrame = this.startTime;
            
            var handler = () => {
                let nowTime: any = new Date();
                let current = this.scene.Current;
                let elasped = nowTime - this.lastFrame;

                this.keyboard.Update();
                current.Update(elasped);

                this.lastFrame = nowTime;
            };
            setInterval(handler.bind(this), timeout);
        }
    }
}
