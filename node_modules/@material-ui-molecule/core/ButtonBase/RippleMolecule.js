import {  ReactComponent } from '../../fake-react.js'
import deepmerge from '/jslib/deepmerge/dist/umd.js'; 
/**
 * @ignore - internal component.
 */
class Ripple extends ReactComponent {

  handleEnter() {
    this.setState({
      visible: true,
    });
  };

  handleExit() {
    this.setState({
      leaving: true,
    });
  };

  exit(cb) {
    this.handleExit();
    if(cb) cb();
  };

  constructor(el) {
    super(el)

    this.state = {
      visible: false,
      leaving: false,
    };

    if(this.constructor == Ripple){
      this.handlePropsChanged()
    }
  }

  mixProps(props){
    super.mixProps(deepmerge(Ripple.defaultProps, props));
  }

  componentDidMount(){
    this.handleEnter();
  }

  render() {
    const {
      classes,
      className: classNameProp,
      pulsate,
      rippleX,
      rippleY,
      rippleSize,
    } = this.props;

    const {
      visible,
      leaving
    } = this.state;

    const rippleClassName = classNames(
      classes.ripple, {
        [classes.rippleVisible]: visible,
        [classes.ripplePulsate]: pulsate,
      },
      classNameProp,
    );

    const rippleStyles = {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX,
    };

    const childClassName = classNames(classes.child, {
      [classes.childLeaving]: leaving,
      [classes.childPulsate]: pulsate,
    });

    this.el.className = rippleClassName;
    this.$el.css(rippleStyles);
    const $span = this.$el.find('span');
    // console.log('render ripple', this.state, 'assing class', childClassName)
    $span[0].className = childClassName;
    if(this.state.leaving){
      setTimeout(() => {this.el.remove();}, this.props.exitTimeout)
      // $span.one('animationend transitionend', () => {   pulsate 是一个无限循环，得不到 animationend 事件
      //   console.log('leaving done, remove ripple element')
      //   this.el.remove();    
      // })
    }
  }

}

Ripple.defaultProps = {
  pulsate: false,
};

export default Ripple;