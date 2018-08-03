// import _extends from "/jslib/@babel/runtime/helpers/builtin/extends.js";
import _objectWithoutProperties from "/jslib/@babel/runtime/helpers/builtin/objectWithoutProperties.js";
import _objectSpread from "/jslib/@babel/runtime/helpers/builtin/objectSpread.js";
// @inheritedComponent ButtonBase
import {  fade } from '../styles/colorManipulator.js';
import { ButtonBase } from '../ButtonBase/ButtonBaseMolecule.js';
import {  capitalize} from '../utils/helpers.js';
import {  ReactComponent } from "../../fake-react.js";
import { defaultTheme, attachJss } from "../../jss.js";
import deepmerge from '/jslib/deepmerge/dist/umd.js'; 

export const styles = theme => ({
  root: _objectSpread({}, theme.typography.button, {
    lineHeight: '1.4em',
    // Improve readability for multiline button.
    boxSizing: 'border-box',
    minWidth: theme.spacing.unit * 11,
    minHeight: 36,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    borderRadius: 4,
    color: theme.palette.text.primary,
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
      duration: theme.transitions.duration.short
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      },
      '&$disabled': {
        backgroundColor: 'transparent'
      }
    },
    '&$disabled': {
      color: theme.palette.action.disabled
    }
  }),
  label: {
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit'
  },
  textPrimary: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  textSecondary: {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  flat: {},
  flatPrimary: {},
  flatSecondary: {},
  outlined: {
    border: `1px solid ${theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`
  },
  colorInherit: {
    color: 'inherit'
  },
  contained: {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    boxShadow: theme.shadows[2],
    '&$focusVisible': {
      boxShadow: theme.shadows[6]
    },
    '&:active': {
      boxShadow: theme.shadows[8]
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.action.disabledBackground
    },
    '&:hover': {
      backgroundColor: theme.palette.grey.A100,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.grey[300]
      },
      '&$disabled': {
        backgroundColor: theme.palette.action.disabledBackground
      }
    }
  },
  containedPrimary: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  containedSecondary: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.secondary.main
      }
    }
  },
  raised: {},
  raisedPrimary: {},
  raisedSecondary: {},
  focusVisible: {},
  disabled: {},
  fab: {
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    fontSize: 24,
    height: 56,
    boxShadow: theme.shadows[6],
    '&:active': {
      boxShadow: theme.shadows[12]
    }
  },
  mini: {
    width: 40,
    height: 40
  },
  sizeSmall: {
    padding: `${theme.spacing.unit - 1}px ${theme.spacing.unit}px`,
    minWidth: theme.spacing.unit * 8,
    minHeight: 32,
    fontSize: theme.typography.pxToRem(13)
  },
  sizeLarge: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
    minWidth: theme.spacing.unit * 14,
    minHeight: 40,
    fontSize: theme.typography.pxToRem(15)
  },
  fullWidth: {
    width: '100%'
  }
});


const defaultClasses = attachJss(styles(defaultTheme), 'MuiButton', 'MuiButton')

export default class Button extends ButtonBase {

  constructor(el) {
    super(el)
    
    if(this.constructor == Button){
      this.handlePropsChanged();
    }
  }

  mixProps(props){
    super.mixProps(deepmerge(Button.defaultProps, props));
  }

  prepareClasses(){
    super.prepareClasses();
    this.buttonClasses = defaultClasses;
  }

  render(){
    const classes = this.buttonClasses;
    const {
      className: classNameProp,
      color,
      disabled,
      disableFocusRipple,
      fullWidth,
      focusVisibleClassName,
      mini,
      size,
      variant
    } = this.props,
    other = _objectWithoutProperties(this.props, ["children", "classes", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "focusVisibleClassName", "mini", "size", "variant"]);
    
    if(this.constructor == Button){
      this.el.className == ''
    }
    this.props.focusRipple = !disableFocusRipple;   // 对外暴露的是 disabledFocusRipple, 此值默认为 false
    super.render();

    const fab = variant === 'fab';
    const contained = variant === 'contained' || variant === 'raised';
    const text = !contained && !fab;
    const className = classNames(classes.root, {
      [classes.contained]: contained || fab,
      [classes.fab]: fab,
      [classes.mini]: fab && mini,
      [classes.colorInherit]: color === 'inherit',
      [classes.textPrimary]: text && color === 'primary',
      [classes.textSecondary]: text && color === 'secondary',
      [classes.flat]: text,
      [classes.flatPrimary]: text && color === 'primary',
      [classes.flatSecondary]: text && color === 'secondary',
      [classes.containedPrimary]: !text && color === 'primary',
      [classes.containedSecondary]: !text && color === 'secondary',
      [classes.raised]: contained || fab,
      [classes.raisedPrimary]: (contained || fab) && color === 'primary',
      [classes.raisedSecondary]: (contained || fab) && color === 'secondary',
      [classes.text]: variant === 'text',
      [classes.outlined]: variant === 'outlined',
      [classes[`size${capitalize(size)}`]]: size !== 'medium',
      [classes.disabled]: disabled,
      [classes.fullWidth]: fullWidth
    }, classNameProp);

    this.el.className = className + ' ' + this.el.className;
    this.$el.setAttrs(other);
    this.$el.find('span')[0].className = classes.label;
  }
}

Button.defaultProps = {
  color: 'default',
  component: 'button',
  disabled: false,
  disableFocusRipple: false,
  fullWidth: false,
  mini: false,
  size: 'medium',
  type: 'button',
  variant: 'text'
};