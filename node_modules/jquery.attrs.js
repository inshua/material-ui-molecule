const booleanProps = {
    'checked': 1,
    'disabled': 1,
    'selected': 1
}

function typed(value) {
    if (value == 'true') return true;
    if (value == 'false') return false;
    let n = value * 1;
    if (!isNaN(n)) return n;
    return value;
}

function camel2Dash(str) {
    // ensure starts in lower case
    str = str.trim();

    if (str === '') {
        return '';
    }

    str = str[0].toLowerCase() + str.substr(1);

    return str.replace(/([A-Z])/g, function ($1) {
        return '-' + $1.toLowerCase();
    });
};

function dash2Camel(name) {
    return name.replace(/-+(.)/gi, function (match, capture1) {
        return capture1.toUpperCase();
    });
};

+(function ($) {
    $.fn.collectProps = function (defaultAttrs) {
        let result = defaultAttrs || {};
        if (this[0].props) {
            Object.assign(result, this[0].props)
        }
        for (let a of this[0].attributes) {
            let n = a.name;
            if (n.startsWith('m:')) {
                n = n.substr(2);
            }
            if (n == 'props') { // JSON style props, allow store typed data
                if (a.value.trim().length) {
                    let props = JSON.parse(a.value) //TODO parseDate
                    Object.assign(result, props);
                }
            } else {
                let n = a.name;
                if (n == 'class') n = 'className';
                result[dash2Camel(n)] = booleanProps[n] ? this.prop(n) : typed(a.value);
            }
        }
        return result;
    }

    $.fn.setAttrs = function (attrs) {
        for (let n of Object.keys(attrs)) {

            let v = attrs[n];
            if (v != null) {
                if (n == 'className') n == 'class';
                const assign = (n)=> {
                    if (n in this[0] || this[0].hasAttribute(n)) { // 仅修改原生属性或已经被设置过的非原生属性
                        if (booleanProps[n]) {
                            this.prop(n, v)
                        } else {
                            this[0].setAttribute(n, v);
                        }
                        return true;
                    }
                };
                if (!assign(n)){
                    n = camel2Dash(n)
                    assign(n)
                }
            }
        }
        return this;
    }
}(jQuery));