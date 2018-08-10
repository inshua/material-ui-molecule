import deepmerge from '/jslib/deepmerge/dist/umd.js'; 

export class ReactComponent{

    constructor(el){
        Molecule.call(this, el);
        this.element = el;
        this.state = null;
        
        setTimeout(()=>{this.componentDidMount()},0)
    }

    collectUserDefinedProps(){      // collect user defined props via tag attributes
        this.userDefinedProps = this.$el.collectProps()
    }

    mixProps(props){
        this.props = deepmerge(props, this.userDefinedProps);
        // this.$el.setAttrs(this.props);  set default attrs to element, should call when render 
    }

    prepareClasses(){
        
    }

    handlePropsChanged(){
        this.collectUserDefinedProps();
        this.mixProps({});
        this.prepareClasses();
        this.render();
    }

    componentDidMount(){

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

    
    render(){
        
    }

    componentDidUpdate(){
        
    }
}

Object.assign(ReactComponent.prototype, Molecule.prototype);