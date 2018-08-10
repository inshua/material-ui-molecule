import keycode from '/jslib/keycode/index.js';
import ownerWindow from '../utils/ownerWindow.js';
import {  listenForFocusKeys,  detectFocusVisible} from './focusVisible.js';
// import TouchRipple from './TouchRipple';
import createRippleHandler from './createRippleHandler.js';
import {  ReactComponent} from '../../fake-react.js'
import {attachJss} from '../../jss.js'
import deepmerge from '/jslib/deepmerge/dist/umd.js'; 

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 'none',
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none', // Remove Firefox dotted outline.
    },
    '&$disabled': {
      pointerEvents: 'none', // Disable link interactions
      cursor: 'default',
    },
  },
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if keyboard focused. */
  focusVisible: {},
};


/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */
export class ButtonBase extends ReactComponent {

  constructor(el) {
    super(el)

    this.handleMouseDown = createRippleHandler(this, 'MouseDown', 'start', () => {
      clearTimeout(this.focusVisibleTimeout);
      if (this.state.focusVisible) {
        this.setState({
          focusVisible: false
        });
      }
    });

    this.handleMouseUp = createRippleHandler(this, 'MouseUp', 'stop');

    this.handleMouseLeave = createRippleHandler(this, 'MouseLeave', 'stop', event => {
      if (this.state.focusVisible) {
        event.preventDefault();
      }
    });

    this.handleTouchStart = createRippleHandler(this, 'TouchStart', 'start');

    this.handleTouchEnd = createRippleHandler(this, 'TouchEnd', 'stop');

    this.handleTouchMove = createRippleHandler(this, 'TouchMove', 'stop');

    this.handleBlur = createRippleHandler(this, 'Blur', 'stop', () => {
      clearTimeout(this.focusVisibleTimeout);
      if (this.state.focusVisible) {
        this.setState({
          focusVisible: false
        });
      }
    });

    this.handleKeyDown = event => {
      const {
        component,
        focusRipple,
        onKeyDown,
        onClick
      } = this.props;
      const key = keycode(event);

      // Check if key is already down to avoid repeats being counted as multiple activations
      if (focusRipple && !this.keyDown && this.state.focusVisible && this.ripple && key === 'space') {
        this.keyDown = true;
        // event.persist();
        console.log('stop ripple')
        this.ripple.stop(event, () => {
          console.log('start ripple')
          this.ripple.start(event);
        });
      }

      if (onKeyDown) {
        onKeyDown(event);
      }

      // Keyboard accessibility for non interactive elements
      if (
        event.target === event.currentTarget &&
        component &&
        component !== 'button' &&
        (key === 'space' || key === 'enter') &&
        !(this.button.tagName === 'A' && this.button.href)
      ) {
        event.preventDefault();
        if (onClick) {
          onClick(event);
        }
      }
    };

    this.handleKeyUp = event => {
      if (
        this.props.focusRipple &&
        keycode(event) === 'space' &&
        this.ripple &&
        this.state.focusVisible
      ) {
        this.keyDown = false;
        //event.persist();
        this.ripple.stop(event, () => {
          this.ripple.pulsate(event);
        });
      }
      if (this.props.onKeyUp) {
        this.props.onKeyUp(event);
      }
    };

    this.handleFocus = event => {
      if (this.props.disabled) {
        return;
      }

      // Fix for https://github.com/facebook/react/issues/7769
      if (!this.button) {
        this.button = event.currentTarget;
      }

      // event.persist();  
      detectFocusVisible(this, this.button, () => {
        this.onFocusVisibleHandler(event);
      });

      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    };

    this.onFocusVisibleHandler = event => {
      this.keyDown = false;
      this.setState({
        focusVisible: true
      });
  
      if (this.props.onFocusVisible) {
        this.props.onFocusVisible(event);
      }
    };

    this.state = {};

    this.ripple = null;

    this.keyDown = false; // Used to help track keyboard activation keyDown

    this.focusVisibleTimeout = null;

    this.focusVisibleCheckTime = 50;

    this.focusVisibleMaxCheckTimes = 5;

    if(this.constructor == ButtonBase){
      this.handlePropsChanged()
    }
  }

  mixProps(props){
    super.mixProps(deepmerge(ButtonBase.defaultProps, props));
  }

  prepareClasses(){
    this.buttonBaseClasses = this.attachJss(styles, 'MuiButtonBase', 'MuiButtonBase');
  }

  render() {

    const classes = this.buttonBaseClasses;

    let {
      action,
      centerRipple,
      className: classNameProp,
      disabled,
      disableRipple,
      disableTouchRipple,
      focusRipple,
      focusVisibleClassName,
      tabIndex,
      TouchRippleProps,
      type,
      ...other
    } = this.props;

    focusVisibleClassName = classNames(classes.focusVisible, focusVisibleClassName)

    const className = classNames(
      classes.root, {
        [classes.disabled]: this.$el.prop('disabled'),
        [classes.focusVisible]: this.state.focusVisible,
        [focusVisibleClassName]: this.state.focusVisible,
      },
      this.userDefinedProps.className,
    );
    this.el.className = className;

    if (this.el.tagName == 'button') {
      this.el.disabled = disabled;
    } else {
      this.el.role = 'button';
    }

    this.el.tabIndex = disabled ? '-1' : tabIndex

    this.$el.setAttrs(other)

    if (this.props.disabled || this.props.disableRipple) {
      if (this.ripple) {
        this.ripple.$el.remove();
      }
    } else {
      if (!this.ripple) {
        this.ripple = $(document.createElement('span')).attr('m', 'mui.TouchRipple').appendTo(this.el).molecule();
      }
    }
  }


  componentDidMount() {
    this.$el.on('blur', this.handleBlur)
    .on('focus', this.handleFocus)
    .on('keydown', this.handleKeyDown)
    .on('keyup', this.handleKeyUp)
    .on('mousedown', this.handleMouseDown)
    .on('mouseup', this.handleMouseUp)
    .on('mouseleave', this.handleMouseLeave)
    .on('touchend', this.handleTouchEnd)
    .on('touchstart', this.handleTouchStart)
    .on('touchmove', this.handleTouchMove);

    this.button = this.el
    listenForFocusKeys(ownerWindow(this.button));

    if (this.props.action) {
      this.props.action({
        focusVisible: () => {
          this.setState({
            focusVisible: true
          });
          this.button.focus();
        },
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.focusRipple &&
      !this.props.disableRipple &&
      !prevState.focusVisible &&
      this.state.focusVisible
    ) {
      console.log('pulsate')
      this.ripple.pulsate();
    }
  }

  dispose() {
    debugger;
    clearTimeout(this.focusVisibleTimeout);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.focusVisible === 'undefined') {
      return {
        focusVisible: false,
        lastDisabled: nextProps.disabled,
      };
    }

    // The blur won't fire when the disabled state is set on a focused input.
    // We need to book keep the focused state manually.
    if (!prevState.prevState && nextProps.disabled && prevState.focusVisible) {
      return {
        focusVisible: false,
        lastDisabled: nextProps.disabled,
      };
    }

    return {
      lastDisabled: nextProps.disabled,
    };
  }

}

ButtonBase.defaultProps = {
  centerRipple: false,
  disableRipple: false,
  disableTouchRipple: false,
  focusRipple: true,
  tabIndex: '0',
};