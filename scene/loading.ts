/// <reference path="basescene.ts" />
/// <reference path="manager.ts" />
/// <reference path="../fobject/github.ts" />

module scene {

    export class Loading extends BaseScene {
        private github: fobject.Fobject<fobject.GitHubPainter>;
        private timer: number;

        constructor() {
            super();

            var g = new fobject.GitHubPainter();
            g.Location = { x: 40, y: 40 };
            g.Scale = { width: 320, height: 320};
            this.github = new fobject.Fobject<fobject.GitHubPainter>(g);
            this.fobjs.push(this.github);
            
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