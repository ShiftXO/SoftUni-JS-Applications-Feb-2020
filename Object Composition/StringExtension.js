(() => {
    String.prototype.ensureStart = function (str) {
        let a = this.toString().startsWith(str) ? '' : str;
        return a + this.toString();
    }

    String.prototype.ensureEnd = function (str) {
        let a = this.toString().includes(str) ? '' : str;
        return this.toString() + a;
    }

    String.prototype.isEmpty = function () {
        return this.length === 0 ? true : false;
    }

    String.prototype.truncate = function (n) {
        if (n < 4) {
            return '.'.repeat(n);
        } else if (n >= this.length) {
            return this.toString();
        } else if (n < this.length) {
            let lastSpace = this.substr(0, n - 2).lastIndexOf(' ');
            if (lastSpace !== -1) {
                return this.substr(0, lastSpace).concat('...');
            } else {
                return this.substr(0, n - 3).concat('...');
            }
        }
    }

    String.format = function (string, ...params) {
        return params
            .reduce((str, param, i) => {
                return str.replace(`{${i}}`, param);
            }, string);
    }
})();