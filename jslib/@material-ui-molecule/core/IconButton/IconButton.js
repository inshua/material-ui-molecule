// @inheritedComponent ButtonBase

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
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: theme.typography.pxToRem(24),
    width: 48,
    height: 48,
    padding: 0,
    borderRadius: '50%',
    color: theme.palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
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
  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: 'inherit',
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the children container element. */
  label: {
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
});

/**
 * Refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icon options.
 */
export default class IconButton extends ButtonBase {

  constructor(el) {
    super(el)
    
    if(this.constructor == IconButton){
      this.handlePropsChanged();
    }
  }

  mixProps(props){
    super.mixProps(deepmerge(IconButton.defaultProps, props));
  }

  prepareClasses(){
    super.prepareClasses();
    this.buttonClasses = this.attachJss(styles, 'MuiIconButton', 'MuiIconButton');
  }

  render(){
    const classes = this.buttonClasses;
    const { children, mClass: classNameProp, color, disabled, ...other } = this.props;
    
    if(this.constructor == IconButton){  // 用户设置的属性已经收集到 userProps，现在清空 class
      this.el.className == ''
    }
    this.props.centerRipple = true;
    this.props.focusRipple = true;
    super.render(); 

    const className = classNames(
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color !== 'default',
          [classes.disabled]: disabled,
        },
        classNameProp,
    );

    this.$el.addClass(className);

    this.$el.find('span#icon')[0].className = classes.label;
  }
}

// IconButton.propTypes = {
//   /**
//    * The icon element.
//    */
//   children: PropTypes.node,
//   /**
//    * Override or extend the styles applied to the component.
//    * See [CSS API](#css-api) below for more details.
//    */
//   classes: PropTypes.object.isRequired,
//   /**
//    * @ignore
//    */
//   className: PropTypes.string,
//   /**
//    * The color of the component. It supports those theme colors that make sense for this component.
//    */
//   color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
//   /**
//    * If `true`, the button will be disabled.
//    */
//   disabled: PropTypes.bool,
//   /**
//    * If `true`, the ripple will be disabled.
//    */
//   disableRipple: PropTypes.bool,
// };

IconButton.defaultProps = {
  color: 'default',
  disabled: false,
};

//export default withStyles(styles, { name: 'MuiIconButton' })(IconButton);
