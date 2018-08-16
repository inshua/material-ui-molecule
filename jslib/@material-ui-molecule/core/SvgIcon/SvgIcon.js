import {  ReactComponent } from '../../fake-react.js'
import {  capitalize } from '../utils/helpers.js';
import deepmerge from '/jslib/deepmerge/dist/umd.js';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
    fontSize: 24,
    transition: theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter,
    }),
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  /* Styles applied to the root element if `color="saction"`. */
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
  /* Styles applied to the root element if `fontSize="inherit"`. */
  fontSizeInherit: {
    fontSize: 'inherit',
  },
});

export default class SvgIcon extends ReactComponent {

  constructor(el) {
    super(el)

    if (this.constructor == SvgIcon) {
      this.handlePropsChanged();
    }
  }

  mixProps(props) {
    super.mixProps(deepmerge(SvgIcon.defaultProps, props));
  }

  prepareClasses() {
    super.prepareClasses();
    this.iconClasses = this.attachJss(styles, 'SvgIcon', 'SvgIcon');
  }

  render() {
    const classes = this.iconClasses;
    const {
      children,
      mClass: classNameProp,
      color,
      component: Component,
      fontSize,
      nativeColor,
      titleAccess,
      viewBox,
      ...other
    } = this.props;

    const className = classNames(
      classes.root, {
        [classes.fontSizeInherit]: fontSize === 'inherit',
        [classes[`color${capitalize(color)}`]]: color !== 'inherit',
      },
      classNameProp,
    );

    this.$el.setAttrs(Object.assign(other, {
      viewBox: viewBox,
      color: nativeColor,
      ariaHidden: titleAccess ? false : true
    }));

    this.el.focusable = false;
    this.el.setAttribute('class', className);

    const title = this.$el.find('title');
    if (titleAccess) {
      if (title.length) {
        title.html(titleAccess)
      } else {
        $(document.createElement('title')).html(titleAccess).appendTo(this.el);
      }
    } else {
      if (title.length) title.remove();
    }
  }
}

// SvgIcon.propTypes = {
//   /**
//    * Node passed into the SVG element.
//    */
//   children: PropTypes.node.isRequired,
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
//    * You can use the `nativeColor` property to apply a color attribute to the SVG element.
//    */
//   color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'action', 'error', 'disabled']),
//   /**
//    * The component used for the root node.
//    * Either a string to use a DOM element or a component.
//    */
//   component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
//   /**
//    * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
//    */
//   fontSize: PropTypes.oneOf(['inherit', 'default']),
//   /**
//    * Applies a color attribute to the SVG element.
//    */
//   nativeColor: PropTypes.string,
//   /**
//    * Provides a human-readable title for the element that contains it.
//    * https://www.w3.org/TR/SVG-access/#Equivalent
//    */
//   titleAccess: PropTypes.string,
//   /**
//    * Allows you to redefine what the coordinates without units mean inside an SVG element.
//    * For example, if the SVG element is 500 (width) by 200 (height),
//    * and you pass viewBox="0 0 50 20",
//    * this means that the coordinates inside the SVG will go from the top left corner (0,0)
//    * to bottom right (50,20) and each unit will be worth 10px.
//    */
//   viewBox: PropTypes.string,
// };

SvgIcon.defaultProps = {
  color: 'inherit',
  component: 'svg',
  fontSize: 'default',
  viewBox: '0 0 24 24',
};