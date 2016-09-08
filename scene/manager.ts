/// <reference path="./loading.ts" />
/// <reference path="./basescene.ts" />

module scene {

    type sceneCollection = {
        battle: BaseScene,
        credit: BaseScene,
        loading: BaseScene,
        menu: BaseScene
    }

    export class Manager {

        public Current: BaseScene;

        private scenes : sceneCollection;

        constructor(ctx: CanvasRenderingContext2D) {
            this.scenes = {
                battle: null,
                credit: null,
                loading: null,
                menu: null
            }
            this.scenes.loading = new Loading(ctx);
            this.Current = this.scenes.loading;
        }
    }
}