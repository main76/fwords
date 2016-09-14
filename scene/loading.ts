/// <reference path="basescene.ts" />
/// <reference path="manager.ts" />
/// <reference path="../fobject/logo.ts" />

module scene {

    export class Loading extends BaseScene {
        private logo: fobject.Fobject<fobject.LogoPainter>;
        private timer: number;

        constructor() {
            super();
            var painter = new fobject.LogoPainter();
            painter.Position = { x: 40, y: 40 };
            painter.Size = { width: 320, height: 320};
            this.logo = new fobject.Fobject<fobject.LogoPainter>(painter);
            this.fobjs.push(this.logo);
            this.timer = 0;
        }

        public Update(elasped: number): void {
            super.Update(elasped);
            this.timer += elasped;
            if (this.timer >= 5000) {
                let manager = Manager.GetInstance();
                let next = manager.scenes.menu;
                if (next)
                    manager.Current = next;
            }
        }
    }

}