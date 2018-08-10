import deepmerge from '/jslib/deepmerge/dist/umd.js'; 

export class ReactComponent{

    constructor(el){
        Molecule.call(this, el);
        this.element = el;
        this.state = null;

        setTimeout(()=>{this.componentDidMount()},0)
    }

    handleAttributeChange(attr, mutation){
        if(this.el.hasAttribute('watch-attr') && attr != 'class') {
            const oldValue = mutation.oldValue, newValue = this.el.getAttribute(attr);
            if(oldValue == newValue || oldValue == -1) return;
            console.log(`${this.moleculeName()} ${attr} modified from ${mutation.oldValue} to ${this.el.getAttribute(attr)} `)
            this.handlePropsChanged();
        }
    }

    collectUserDefinedProps(){      // collect user defined props via tag attributes
        this.userDefinedProps = this.$el.collectProps()
    }

    mixProps(props){
        this.props = deepmerge(props, this.userDefinedProps);
        // this.$el.setAttrs(this.props);  set default attrs to element, should call on render 
    }

    prepareClasses(){
        
    }

    /*
    属性变更时执行（只有末端类需要执行，父类都应执行，通常以如下形式调用
    if(this.constructor == ButtonBase){
        this.handlePropsChanged()
    }）。
    在执行 handlePropsChanged 时，如无意外其内部的  mixProps prepareClasses render 都会层层调用父类的函数，因此有末端类的约束。
    如该类不可能有派生类，也可直接调用。一般放在构造函数中调用。
    */
    handlePropsChanged(){   
        this.collectUserDefinedProps(); // 收集用户定义的属性（通过 attributes 或 props attribute 提供）存放于 this.userProps
        this.mixProps({});          // 混合属性。将属性和默认属性混合。Button mix with Button.defaultProps, ButtonBase mix with ButtonBase.defaultProps, ReactComponent mix with this.userProps
        this.prepareClasses();      // 准备样式类
        this.render();              // 渲染
    }

    componentDidMount(){    // 构造函数后执行，可以在这里执行一些挂载事件处理等的程序

    }

    setState(newState){
        const prevState = JSON.parse(JSON.stringify(this.state));

        var changed = false
        if((this.state == null) != (newState == null)){
            this.state = newState;
            changed = true
        }
        for(var k in newState){
            if(this.state[k] != newState[k]){
                this.state[k] = newState[k];
                changed = true;
            }
        }
        if(changed){
            this.render();
            this.componentDidUpdate(this.props, prevState);
        }
        return this;
    }

    
    render(){       // 绘制。不像 react 有虚拟 DOM 比对，这个 render 需要清场。
        
    }

    componentDidUpdate(){   // render 后触发
        
    }
}

for(let k of Object.keys(Molecule.prototype)){
    if(k in ReactComponent.prototype == false){
        ReactComponent.prototype[k] = Molecule.prototype[k];
    }
}