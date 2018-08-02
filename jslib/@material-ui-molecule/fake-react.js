
export class ReactComponent{

    constructor(el){
        Molecule.call(this, el);
        this.element = el;
        this.props = null;
        this.state = null;
    }
    
    assign(defaultProps){
        this.props = this.$el.collectProps(defaultProps)        
        return this;
    }

    setState(newState){
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
        }
        return this;
    }

    
    render(){

    }
}