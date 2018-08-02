+
(function($) {
    $.fn.attrs = function(names) {
        let result = {}
        if(names){
            for(let n of names){
                result[n] = this.attr(n);
            }
        } else {
            for(let a of this[0].attributes){
                result[a.name] = result[a.value];
            }
        }
        return result;
    };

    $.fn.collectProps = function(defaultAttrs){
        let result = defaultAttrs || {};
        if(this[0].props){
            Object.assign(result, this[0].props)
        }
        for(let a of this[0].attributes){
            let n = a.name;
            if(n.startsWith('m:')){
                n = n.substr(2);
            } 
            if(n == 'props'){   // JSON style props, allow store typed data
                if(a.value.trim().length){
                    let props = JSON.parse(a.value)     //TODO parseDate
                    Object.assign(result, props);
                }
            } else {
                result[n] = result[a.value];
            }
        }
        return result;
    }

    $.fn.setAttrs = function(attrs){
        for(let n of Object.keys(attrs)){
            let v = attrs[n];
            if(v != null){
                this[0].setAttribute(n, v);
            }
        }
        return this;
    }
}(jQuery));