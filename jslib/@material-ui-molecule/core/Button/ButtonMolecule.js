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
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.button,
    lineHeight: '1.4em', // Improve readability for multiline button.
    boxSizing: 'border-box',
    minWidth: 64,
    minHeight: 36,
    padding: '8px 16px',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
    },
  },
  /* Styles applied to the span element that wraps the children. */
  label: {
    width: '100%', // assure the correct width for iOS Safari
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  /* Styles applied to the root element if `variant="text"`. */
  text: {},
  /* Styles applied to the root element if `variant="text"` and `color="primary"`. */
  textPrimary: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the root element if `variant="text"` and `color="secondary"`. */
  textSecondary: {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  flat: {},
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  flatPrimary: {},
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  flatSecondary: {},
  /* Styles applied to the root element if `variant="outlined"`. */
  outlined: {
    border: `1px solid ${
      theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
    }`,
  },
  /* Styles applied to the root element if `variant="[contained | fab]"`. */
  contained: {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    boxShadow: theme.shadows[2],
    '&$focusVisible': {
      boxShadow: theme.shadows[6],
    },
    '&:active': {
      boxShadow: theme.shadows[8],
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.action.disabledBackground,
    },
    '&:hover': {
      backgroundColor: theme.palette.grey.A100,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.grey[300],
      },
      '&$disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },
  },
  /* Styles applied to the root element if `variant="[contained | fab]"` and `color="primary"`. */
  containedPrimary: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  /* Styles applied to the root element if `variant="[contained | fab]"` and `color="secondary"`. */
  containedSecondary: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  raised: {}, // legacy
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  raisedPrimary: {}, // legacy
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  raisedSecondary: {}, // legacy
  /* Styles applied to the root element if `variant="[fab | extendedFab]"`. */
  fab: {
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
    '&:active': {
      boxShadow: theme.shadows[12],
    },
  },
  /* Styles applied to the root element if `variant="extendedFab"`. */
  extendedFab: {
    borderRadius: 48 / 2,
    padding: '0 16px',
    width: 'auto',
    minWidth: 48,
    height: 48,
  },
  /* Styles applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: {},
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: 'inherit',
  },
  /* Styles applied to the root element if `size="mini"` & `variant="[fab | extendedFab]"`. */
  mini: {
    width: 40,
    height: 40,
  },
  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    padding: '7px 8px',
    minWidth: 64,
    minHeight: 32,
    fontSize: theme.typography.pxToRem(13),
  },
  /* Styles applied to the root element if `size="large"`. */
  sizeLarge: {
    padding: '8px 24px',
    minWidth: 112,
    minHeight: 40,
    fontSize: theme.typography.pxToRem(15),
  },
  /* Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: {
    width: '100%',
  },
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