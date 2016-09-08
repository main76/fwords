/// <reference path="../scene/manager.ts" />
/// <reference path="./event.ts" />

module core {
    export class Application {
        private scene: scene.Manager;
        private startTime: Date;
        private lastFrame: Date;

        constructor(context: CanvasRenderingContext2D) {
            this.scene = new scene.Manager(context);
            Keys.CreateInstance(this);
        }

        public Start(timeout: number): void {
            this.startTime = new Date();
            this.lastFrame = this.startTime;
            var handler = () => {
                let nowTime = new Date();
                let current = this.scene.Current;
                let elasped = nowTime.getMilliseconds() - this.lastFrame.getMilliseconds();

                current.Update(elasped);
                this.lastFrame = nowTime;
            };
            setInterval(handler, timeout);
        }
    }
}
