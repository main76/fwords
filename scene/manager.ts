/// <reference path="./loading.ts" />
/// <reference path="./menu.ts" />
/// <reference path="./basescene.ts" />
/// <reference path="../app/fwords.ts" />

module scene {

    type sceneCollection = {
        battle: BaseScene,
        credit: BaseScene,
        loading: BaseScene,
        menu: BaseScene
    }

    export class Manager {

        public Current: BaseScene;
        public scenes : sceneCollection;
        protected static instance: Manager;

        public static GetInstance(): Manager {
            if (!Manager.instance)
                throw new Error('Instance has not been Initialized.');
            return Manager.instance;
        }

        public static CreateInstance(app: core.Application, ctx: CanvasRenderingContext2D): Manager {
            if (!(app instanceof core.Application))
                throw new Error('Instance can only be created by the application.');
            if (Manager.instance)
                throw new Error('Instance can only be initialized once');
            Manager.instance = new Manager(ctx);
            return Manager.instance;
        }

        constructor(ctx: CanvasRenderingContext2D) {
            this.scenes = {
                battle: null,
                credit: null,
                loading: null,
                menu: null
            };
            this.scenes.loading = new Loading(ctx);
            this.scenes.menu = new Menu(ctx); // should be aync
            this.Current = this.scenes.loading;
        }
    }
}