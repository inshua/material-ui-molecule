/**
 * Molecule 类。 molecule 组件的共同基类。 请按指导手册使用 molecule，不要自己使用构造函数创建。
 * 
 * @class
 * @param container
 *            {HTMLElement} 所附着的 html 元素
 */
const jsondiffp = jsondiffpatch.create({objectHash: function(obj, index) {return obj.key;}});
// jsondiffpatch.clone(obj)

class Molecule {
    constructor(element, props, state){
        this.isMolecule = true;

        this.element = element;
        element.molecule = this;

        this.state = Object.assign(this.getInitialState(), state);
        
        this.children = {};             // key - child      
        this.childrenKeys = [];         // 
        
        this.attributesWillEcho = [];       // 渲染时将需要回显的HTML属性存于此处，渲染最后一步执行回显

        this.context = {};      // 供渲染时传递参数
        
        this.willInit(()=>{
            this.props = {};
            props = this.initProps(props || {});

            // first time render, echo props
            // for event handler this is a bad call, will bind and unbind once
            this.setProps(props, true);
            this.render();
            this.inited();
        });
    }

    initProps(instanceProps){
        let result = {};
        this.runtimeProps = {};
        let def = this.constructor.__defaultProps__ || {};
        for(let propName of Object.keys(def)){
            var prop = def[propName];
            if(propName in instanceProps){     // instance props only give literal value, not Prop object
                let v = instanceProps[propName];
                prop = prop.replaceExpr(v);     // replace instance value to prop define
            }
            if(prop.isRuntime){
                this.runtimeProps[propName] = prop;     // this.runtimeProps store the generator
            }
            result[propName] = prop.getValue(this);     // this.props store exact value
        }
        for(let propName in instanceProps){        // other props not defined in defaultProps
            if(propName in this.props == false){
                result[propName] = instanceProps[propName];
            }
        }
        return result;
    }

    getInitialState(){
        return {};
    }

    createChildren($c, nested){    // 框架从 DOM 生成 createChildren 函数
        return nested;
    }

    renderRuntimeProps(){     
        for(let k of Object.keys(this.runtimeProps)){
            let v = this.runtimeProps[k].getValue(this);
            this.prop(k, v);
        }
    }

    render(){
        this.willRender(()=>{
            this.renderRuntimeProps();
            const children = this.createChildren(this.context);
            this.assignChildren(children);
            this.echoAttributes();
            this.rendered();
        });
    }

    echoAttributes(){
        for(let propName of this.attributesWillEcho){
            let prop = this.getPropDesc(propName);
            if(prop == null){
                // this.element.setAttribute(propName, this.props[propName]);  default dont echo
            } else {
                let attr = HTML_ATTRS.ofProp[propName] || propName;
                var value = this.props[propName];
                if(value != null){
                    if(prop.type == 'o'){
                        value = JSON.stringify(value);
                    }
                    this.element.setAttribute(attr, value);
                } else {
                    this.element.removeAttribute(attr);
                }
            }
        }
        this.attributesWillEcho = [];
    }

    prop(propName, value, force){
        let oldValue = this.props[propName];
        if(oldValue === value){
            if(!force) return;
        } else {
            this.props[propName] = value;
        }
        
        let prop = this.getPropDesc(propName);
        var echo = prop && prop.echo;
        if(propName in this.element){     // related attribute of native prop will auto change, if native prop hasnt attr the prop just set to dom element
            if(prop && prop.type == 'evt'){
                let eventName = propName.substr(2);
                if(oldValue) this.element.removeEventListener(eventName, oldValue); 
                this.element.addEventListener(eventName, value);
            } else if(propName.startsWith('on')){
                this.element[propName] = value;
            } else {
                this.element[propName] = value;
            }
        } else {        // not native property
            if(prop && prop.type == 'evt' || propName.startsWith('on')){        // TODO 有一个缺陷，对于未定义的事件，生成的代码没有提供说明这是事件处理代码，而在界面是有指定的
                let eventName = propName.substr(2);
                if(oldValue) this.element.removeEventListener(eventName, oldValue); 
                this.element.addEventListener(eventName, value);
                //jQuery(this.element).off(eventName, oldValue).on(eventName, value);
                this.props[propName] = value;
            }
            // HTML_ATTRS.isCustomProp(propName, this.element.tagName)
        }
        if(echo){
            this.attributesWillEcho.push(propName); // echo back attribute soon
        }
        return this;
    }

    setProps(props, force){
        if(props == null) return;
        for(var p of Object.getOwnPropertyNames(props)){
            this.prop(p, props[p], force);
        }
    }

    setState(key, value){
        let old = this.state[key];
        if(old != value){
            this.state[key] = value;
            this.render();
        }
    }

    getPropDesc(propName){
        return this.runtimeProps[propName] || this.constructor.__defaultProps__[propName];
    }

    toElement(eleDef){
        if(eleDef instanceof Node) return eleDef;
        
        var key = eleDef.key;
        let children = eleDef.children;
        let tagName = eleDef.$;
        let props = eleDef.props;

        if(key instanceof Function) key = key.call(this);       // 理论上 defaultProps 也可以提供 key，但是没有创建前就计算属性值不妥
        var element = this.children[key];
        if(element == null){
            if(tagName == 'string'){
                element = document.createTextNode(props.textContent);
                delete props['textContent'];
            } else if(tagName == 'comment'){
                element = document.createComment(props.textContent);
                delete props['textContent'];
            } else {
                element = document.createElement(tagName);
            }
            element.key = key;
            
            let MoleculeType = Molecule.TYPES[eleDef.m || 'Molecule'];       // all html children will set a molecule object
            var m = new MoleculeType(element, props);
            m.key = key;
        } else {
            var m = element.molecule;
            m.setProps(props);
        }
        m.assignChildren(children);
        
        return element;
    }

    assignChildren(children){
        this.willFill(()=> {
            this.assignChildrenInner(children);
            this.filled();
        });
    }

    assignChildrenInner(children){
        if(children == null || children.length == 0){
            if(this.childrenKeys.length) this.removeAllChildren()
        } else {
            let newKeys = children.map(c => c.key);
            var delta = jsondiffp.diff(this.childrenKeys, newKeys);
            if(delta){
                //console.log('diff children of ', this.key, ':', delta);
                var oldKeys = this.childrenKeys.slice();
                for(var k in delta){
                    if(k == '_t') continue;     // in diff result, _t:'a' means type: 'array'
                    
                    let [childKey, index, op] = delta[k];
                    if(index == 0 && op == 0){          // remove
                        this.removeChild(childKey);
                    } else if (op == 3){                // move
                        let oldIndex = k.substr(1) * 1;
                        this.swap(oldKeys[oldIndex], oldKeys[index]);
                    } else if(op == null && index == null){     // new
                        let c = children[newKeys.indexOf(childKey)];
                        this.insertAt(k * 1, this.toElement(c));
                        c.done = true;
                    }
                }
            }
            for(let c of children){
                if(!c.done) this.toElement(c);                
            }
        }        
    }

    insertAt(index, element){
        var old = this.childrenKeys[index];
        if(old){
            old = this.children[old];
            element.molecule.willEnter(old, ()=>{
                old.before(element);
                this.childrenKeys.splice(index, 0, element.key);
                this.children[element.key] = element;
                element.molecule.entered();
            });
        } else {
            element.molecule.willEnter(null, ()=>{
                this.element.appendChild(element);
                this.childrenKeys.push(element.key);
                this.children[element.key] = element;
                element.molecule.entered();
            });
        }
    }

    removeAllChildren(){
        for(let k of this.childrenKeys){
            let el = this.children[k];
            el.molecule.willLeave(()=>{
                el.remove();
                el.molecule.leaved(()=>{
                    el.molecule.dispose();
                });
            })
        }
        this.children = {};
        this.childrenKeys = []; 
    }

    removeChild(childKey){
        if(typeof childKey == 'string'){
            this.childrenKeys.splice(this.childrenKeys.indexOf(childKey),1);
            var child = this.children[childKey];
        } else {
            let child = childKey, childKey = child.key;
            this.childrenKeys.splice(this.childrenKeys.indexOf(childKey),1);
        }
        child.molecule.willLeave(()=>{
            child.remove();
            child.molecule.leaved(()=>{
                child.molecule.dispose();
                delete this.children[childKey]
            });
        });
    }

    swap(childKey1, childKey2){
        let index1 = this.childrenKeys.indexOf(childKey1), index2 = this.childrenKeys.indexOf(childKey2);
        const c1 = this.children[childKey1], c2 = this.children[childKey2];
        c1.molecule.willSwap(c2, ()=>{
            this.swapNodes(c1, c2);
            let t = this.childrenKeys[index1];
            this.childrenKeys[index1] = this.childrenKeys[index2];
            this.childrenKeys[index2] = t;
        });
    }

    //https://stackoverflow.com/questions/10716986/swap-2-html-elements-and-preserve-event-listeners-on-them/10717422#10717422
    swapNodes(obj1, obj2) {
        var parent2 = obj2.parentNode;
        var next2 = obj2.nextSibling;
        if (next2 === obj1) {
            parent2.insertBefore(obj1, obj2);
        } else {
            obj1.parentNode.insertBefore(obj2, obj1);
            if (next2) {
                parent2.insertBefore(obj1, next2);
            } else {
                parent2.appendChild(obj1);
            }
        }
    }

    dispose(){
        this.removeAllChildren();
        delete this.element['molecule'];
        this.element = null;
    }

    dispatchEvent(eventType, then, eventInitDict){
        if(then == null){
            this.element.dispatchEvent(new Event(eventType, eventInitDict));
        } else {
            let event = new CustomEvent(eventType, {detail: Object.assign({
                molecule : this,
                // bubbles : true,
                tasks: null,  // [promises]
                addTask: function(task){ 
                    if(this.tasks == null) this.tasks = []; 
                    this.tasks.push(task); 
                    return this;
                },
            }, eventInitDict)});
            if(this.element.dispatchEvent(event)){
                if(event.detail && event.detail.tasks){
                    Promise.all(event.detail.tasks).then(()=> then.call(this, event));
                } else {
                    then.call(this, event);
                }
            } else {
                then.call(this, event);
            }
        }
    }

    /*
    * willinit - 在初始完毕触发(子元素仍未装载，this.element 可以得到)
    * willrender - 在即将渲染时触发
    * willfill - 在子元素将装载时触发
    * filled - 在子元素装载后触发
    * rendered - 渲染完毕触发
    * inited - 在初始完毕触发(第一次初始化并已渲染完)
    * willenter - 在将要加入 DOM 树时触发 后续事件为 TODO
    * entered - 加入DOM树后触发
    * willswap - 与其它节点交换触发
    * willleave - 在将要删除时触发
    * leaved - 删除后发生
     */
    willInit(then){ this.dispatchEvent('willinit', then); }
    
    willRender(then) { this.dispatchEvent('willrender', then); }

    willFill(then){ this.dispatchEvent('willfill', then);}

    filled(then){ this.dispatchEvent('filled', then); }

    rendered(then){ this.dispatchEvent('rendered', then); }

    inited(then){ this.dispatchEvent('inited', then); }
    
    willEnter(old, then){ this.dispatchEvent('willenter', then, {old: old});}

    entered(then){this.dispatchEvent('entered', then); }

    willSwap(other, then){ this.dispatchEvent('swap', then, {other: other}); }
    
    willLeave(then){ this.dispatchEvent('willleave', then); }

    leaved(then){ this.dispatchEvent('leaved', then); }



    cloneChildren(expr, baseKey){
        if(baseKey == null) debugger;
        if(expr == null) return [];
        var keyId = 1;
        if(!Array.isArray(expr)){
            return [cloneSolo.call(this, expr)]
        } else {
            return expr.map(cloneSolo.bind(this));
        }

        function cloneSolo(expr){
            if(expr instanceof Node){
                expr = expr.cloneNode(true);
                if(!expr.molecule){
                    expr.molecule = new Molecule(expr);
                    expr.molecule.key = expr.key =  baseKey + '_' + (keyId++);  
                }
                return expr
            } else if(typeof expr == 'object' && expr.$){
                expr = jsondiffpatch.clone(expr);
                if(expr.key == null) {
                    expr.key = baseKey + '_' + (keyId++);
                } else {
                    expr.key = expr.key + '$' + baseKey;    // TODO 解决 for 里的元素已经有 key 导致二义
                }
                return expr;
            } else {
                let def = {$:'string', key: baseKey + '_' + (keyId++), props:{textContent:expr + ''}};
                return def;
            }
        }
    }

    wrapChildren(expr, baseKey){        // TODO assignChildren 时支持 DOM Node 和 string/date/base types...
        var keyId = 1;
        if(!Array.isArray(expr)){
            return [wrapSolo.call(this, expr)]
        } else {
            return expr.map(wrapSolo.bind(this));
        }

        function wrapSolo(expr){
            if(expr instanceof Node){
                if(!expr.molecule){
                    expr.molecule = new Molecule(expr);
                    expr.molecule.key = expr.key = baseKey + '_' + (keyId++);  
                }
                return expr
            } else if(typeof expr == 'object' && expr.$){
                if(expr.key == null) {
                    expr.key = baseKey + '-' + (keyId++);
                }
                return expr;
            } else {
                let def = {$:'string', key: baseKey + '-' + (keyId++), props:{textContent:expr + ''}};
                return def;
            }
        }
    }

    wrapHandler(handler){
        let m = this;
        return function(event){
            handler.call(m, event, event.target, m.context);        // event, target, $c
        }
    }

    range(from, to, step = 1){
        return {
            [Symbol.iterator]:function * (){
                if(step > 0){
                    for(var i=from; i<=to; i+=step){
                        yield i;
                    }
                } else {
                    for(var i=from; i>=to; i+=step){
                        yield i;
                    }
                }
            }
        };
    }
}

Molecule.__defaultProps__ = {}

Molecule.TYPES = {'Molecule': Molecule}

Molecule.keyId = 1;

Molecule.extends = function(subclass){
    let defaultProps = [];
    for(var p = subclass; ; p = Object.getPrototypeOf(p.prototype).constructor){
        defaultProps.push(p.defaultProps);
        if(p == Molecule) break;
    }
    defaultProps.reverse();
    let props = Object.assign.apply(null, [{}].concat(defaultProps));
    subclass.__defaultProps__ = props;
    
    Molecule.TYPES[subclass.name] = subclass;
}

Molecule.castType = function(value, type){
    switch(type){
    case 's':
        return typeof value == 'string' ? value : value + '';
    case 'n':
        return typeof value == 'number' ? value : value * 1;
    case 'b':
        switch(typeof value){
        case 'boolean': return value;    
        case 'string':        
            value = value.toLowerCase();
            if(value == 'true') return true;
            if(value == 'false') return false;
            if(value == 'y' || value == 'yes') return true;
            if(value == 'n' || value == 'no') return false;
            return true;
        case 'undefined':
            return true;
        case 'object':
            return value != null;
        default:
            return value ? true : false;
        }
    case 'o':
        return value;
    case 'd':
        switch(typeof value){
        case 'number':
            return new Date(value);
        case 'string':
            return Date.parse(value);
        case 'object':
            return value instanceof Date ? value : new Date(value);
        default:
            return new Date(value);
        }
    default:
        return value;
    }
}

class ExpressionProperty{
    constructor(expression, isRuntime){
        this.expression = expression;
        this.isRuntime = isRuntime;
    }
}

Molecule.EventHandlerProvider = class{
    constructor(handler){
        this.handler = handler;
    }
    getHandler(instance){
        return this.handler.call(instance);
    }
}

// property define
class Prop{
    // /(?<name>[^\/^:]+)(?<type>:[s|n|b|d|o|evt])?(?<isExpr>:x)?(?<isRuntime>:r)?(?<isEcho>:e)?$/
    constructor(expression, type, isRuntime, isNative, echo){
        this.expression = expression;
        this.type = type;
        this.isRuntime = isRuntime;
        this.isNative = isNative;
        if(echo == null){
            if(this.isNative) echo = false;  // native attribute need not echo back
        }
        this.echo = echo && true;       // default false
    }
    getValue(_this){
        if(this.type == 'evt'){     // this.expression will be a function to return function, function(){return this.handleClick} etc
            if(this.expression instanceof Molecule.EventHandlerProvider)
                return _this.wrapHandler(this.expression.getHandler(_this));
            else
                return _this.wrapHandler(this.expression); // this.expression.bind(_this);
        } else {
            let r = this.expression instanceof Function ? this.expression.call(_this, _this.context) : this.expression;        //TODO 这里用 this 未必恰当，可能需要用 this.container，子元素如何获得父元素的属性呢
            return Molecule.castType(r, this.type);
        }
    }
    replaceExpr(expr){
        return new Prop(expr, this.type, this.isRuntime, this.isNative, this.echo);
    }
}