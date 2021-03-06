import {  ReactComponent } from '../../fake-react.js'
import {  capitalize } from '../utils/helpers.js';
import deepmerge from '/jslib/deepmerge/dist/umd.js';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    userSelect: 'none',
    fontSize: 24,
    width: '1em',
    height: '1em',
    // Chrome fix for https://bugs.chromium.org/p/chromium/issues/detail?id=820541
    // To remove at some point.
    overflow: 'hidden',
    flexShrink: 0,
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  /* Styles applied to the root element if `color="action"`. */
  colorAction: {
    color: theme.palette.action.active,
  },
  /* Styles applied to the root element if `color="error"`. */
  colorError: {
    color: theme.palette.error.main,
  },
  /* Styles applied to the root element if `color="disabled"`. */
  colorDisabled: {
    color: theme.palette.action.disabled,
  },
  fontSizeInherit: {
    fontSize: 'inherit',
  },
});

export default class Icon extends ReactComponent {

  constructor(el) {
    super(el)

    if (this.constructor == Icon) {
      this.handlePropsChanged();
    }
  }

  mixProps(props) {
    super.mixProps(deepmerge(Icon.defaultProps, props));
  }

  prepareClasses() {
    super.prepareClasses();
    this.iconClasses = this.attachJss(styles, 'Icon', 'Icon');
  }

  render() {
    const classes = this.iconClasses;
    const {
      children,
      mClass: classNameProp,
      color,
      fontSize,
      ...other
    } = this.props;

    const className = classNames(
      'material-icons',
      classes.root,
      {
        [classes[`color${capitalize(color)}`]]: color !== 'inherit',
        [classes[`fontSize${capitalize(fontSize)}`]]: fontSize !== 'default',
      },
      classNameProp,
    );

    this.el.ariaHidden = true;
    this.el.setAttribute('class', className);
  }
}

// Icon.propTypes = {
//   /**
//    * The name of the icon font ligature.
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
//   color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'action', 'error', 'disabled']),
//   /**
//    * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
//    */
//   fontSize: PropTypes.oneOf(['inherit', 'default']),
// };

Icon.defaultProps = {
  color: 'inherit',
  fontSize: 'default',
};

Icon.muiName = 'Icon';

// export default withStyles(styles, { name: 'MuiIcon' })(Icon);
