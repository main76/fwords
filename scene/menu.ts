/// <reference path="basescene.ts" />
/// <reference path="../fobject/text.ts" />
/// <reference path="../app/event.ts" />

module scene {

    export class Menu extends BaseScene {
        private first: fobject.Fobject<fobject.TextPainter>;
        private second: fobject.Fobject<fobject.TextPainter>;
        private third: fobject.Fobject<fobject.TextPainter>;
        private selection: fobject.Fobject<fobject.TextPainter>;
        private currentSelect: fobject._Node_;

        constructor() {
            super();

            this.first = this.CreateText('first', 50, 50);
            this.second = this.CreateText('second', 50, 150);
            this.third = this.CreateText('third', 50, 250);
            this.selection = this.CreateText('>', 35, 0);

            this.fobjs.push(this.first, this.second, this.third, this.selection);
            this.currentSelect = this.CreateSelectionChain();

            core.Keys.GetInstance().AddListener('press', this.OnKeyPress.bind(this));
        }

        private OnKeyPress(key: string): void {
            if (key === 'Up')
                this.currentSelect = this.currentSelect.prev;
            else if (key === 'Down') 
                this.currentSelect = this.currentSelect.next;
        }

        public Update(elasped: number): void {
            this.selection.GetInstance().Position.y = this.currentSelect.data;
            super.Update(elasped);
        }

        private CreateText(text: string, px: number, py: number): fobject.Fobject<fobject.TextPainter> {
            let painter = new fobject.TextPainter(text);
            painter.Position = { x: px, y: py };
            return new fobject.Fobject<fobject.TextPainter>(painter);
        }

        private CreateSelectionChain(): fobject._Node_ {
            let chain1 : fobject._Node_ = {
                data: this.first.GetInstance().Position.y,
                prev: null,
                next: null
            }
            let chain2 : fobject._Node_ = {
                data: this.second.GetInstance().Position.y,
                prev: null,
                next: null
            }
            let chain3 : fobject._Node_ = {
                data: this.third.GetInstance().Position.y,
                prev: null,
                next: null
            }
            chain1.prev = chain3;
            chain2.prev = chain1;
            chain3.prev = chain2;

            chain1.next = chain2;
            chain2.next = chain3;
            chain3.next = chain1;

            return chain1;
        }
    }
}