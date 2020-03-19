function solve() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }

            this.weight = weight;
            this.melonSort = melonSort;
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }

        toString() {
            let type = `Element: ${this.constructor.name.replace('melon', '')}`;
            let sort = `Sort: ${this.melonSort}`;
            let index = `Element Index: ${this.elementIndex}`;
            let res = [type, sort, index];

            return res.join('\n');
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Melolemonmelon extends Watermelon {
        _elements = ['Water', 'Fire', 'Earth', 'Air'];
        _el = 0;
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        morph() {
            this._el++;
            if (this._el > this._elements.length) {
                this._el = 0;
            }
        }

        toString() {
            let type = `Element: ${this._elements[this._el]}`;
            let sort = `Sort: ${this.melonSort}`;
            let index = `Element Index: ${this.elementIndex}`;
            let res = [type, sort, index];

            return res.join('\n');
        }
    }

    return { Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon }
}

solve();