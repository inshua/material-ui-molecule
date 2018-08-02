import {
  ReactComponent
} from '../../fake-react.js'
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
    if (cb) {
      this.$el.find('span').one('animationend transitionend', () => {
        cb()
      })
    }
    this.handleExit();
  };

  constructor(el) {
    super(el)

    this.assign(Ripple.defaultProps);

    this.state = {
      visible: false,
      leaving: false,
    };

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
    this.$el.find('span')[0].className = childClassName;
  }

}

Ripple.defaultProps = {
  pulsate: false,
};

export default Ripple;