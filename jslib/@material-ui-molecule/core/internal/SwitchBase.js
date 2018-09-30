// @inheritedComponent IconButton

import IconButton from '../IconButton/IconButton.js';
import deepmerge from '/jslib/deepmerge/dist/umd.js';


export const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'none',
    '&:hover': {
      // Disable the hover effect for the IconButton.
      backgroundColor: 'transparent',
    },
  },
  checked: {},
  disabled: {},
  input: {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
  },
};

/**
 * @ignore - internal component.
 */
export default class SwitchBase extends IconButton {

  constructor(el){
    super(el);
  }

  mixProps(props){
    super.mixProps(deepmerge(SwitchBase.defaultProps, props));
  }

  prepareClasses(){
    super.prepareClasses();
    this.switchBaseClasses = this.attachJss(styles, 'SwitchBase', 'SwitchBase');
  }


  componentDidMount(){
    super.componentDidMount();

    this.input = null;

    this.isControlled = this.props.checked != null;

    if (!this.isControlled) {
      // not controlled, use internal state
      this.state.checked = this.props.defaultChecked !== undefined ? this.props.defaultChecked : false;
    }

    this.handleFocus = event => {
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
  
      const { muiFormControl } = this.context;
      if (muiFormControl && muiFormControl.onFocus) {
        muiFormControl.onFocus(event);
      }
    };
  
    this.handleBlur = event => {
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
  
      const { muiFormControl } = this.context;
      if (muiFormControl && muiFormControl.onBlur) {
        muiFormControl.onBlur(event);
      }
    };
  
    this.handleInputChange = event => {
      const checked = event.target.checked;
  
      if (!this.isControlled) {
        this.setState({ checked });
      }
  
      if (this.props.onChange) {
        this.props.onChange(event, checked);
      }
    };

    this.$el.on('focus', this.handleFocus).on('blur', this.handleBlur);

    const $input = this.$el.find('input');
    $input.on('change', this.handleInputChange);

    if(this.constructor == SwitchBase){
      this.handlePropsChanged();
    }

  }

  render(){
    super.render();

    //const classes = deepmerge(this.classes, this.props.classes || {});
    const classes = this.switchBaseClasses;

    const {
      checkedIcon,
      icon,
      
      autoFocus,
      checked: checkedProp,
      mClass: classNameProp,
      disabled: disabledProp,
      id,
      inputProps,
      inputRef,
      name,

      onBlur,
      onChange,
      onFocus,

      readOnly,
      required,
      tabIndex,
      type,
      value,
      ...other
    } = this.props;

    let disabled = disabledProp;
    if(!disabled && this.$el.closest('[disabled]').prop('disabled')){
      disabled = true;
    }

    if(this.constructor == SwitchBase){  // 用户设置的属性已经收集到 userProps，现在清空 class
      this.el.className == ''
    }

    const checked = this.isControlled ? checkedProp : this.state.checked;
    const hasLabelFor = type === 'checkbox' || type === 'radio';

    this.$el.addClass(classNames(
      this.props.classes.root,
      classes.root,
      {
        [classes.checked]: checked,
        [classes.disabled]: disabled,
      },
      classNameProp,
    ));

    this.$el.prop('disabled', disabled);
    let iconSpan = this.el.querySelector('#check-icon')
    let n =  (checked?  checkedIcon : icon).cloneNode(true);
    n.id = 'check-icon';
    iconSpan.parentNode.insertBefore(n, iconSpan);
    iconSpan.remove();

    const $input = this.$el.find('input');
    $input.attr({
      'auto-focus': autoFocus,
      'checked': checked,
      'class': classes.input,
      'disabled': disabled,
      'id' : hasLabelFor && id,
      'name': name,
      'readonly': readOnly,
      //'ref': inputRef,
      required: required,
      tabIndex: tabIndex,
      type: type,
      value: value,
    })
  }
}

// // NB: If changed, please update Checkbox, Switch and Radio
// // so that the API documentation is updated.
// SwitchBase.propTypes = {
//   /**
//    * If `true`, the input will be focused during the first mount.
//    */
//   autoFocus: PropTypes.bool,
//   /**
//    * If `true`, the component is checked.
//    */
//   checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
//   /**
//    * The icon to display when the component is checked.
//    */
//   checkedIcon: PropTypes.node.isRequired,
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
//    * @ignore
//    */
//   defaultChecked: PropTypes.bool,
//   /**
//    * If `true`, the switch will be disabled.
//    */
//   disabled: PropTypes.bool,
//   /**
//    * If `true`, the ripple effect will be disabled.
//    */
//   disableRipple: PropTypes.bool,
//   /**
//    * The icon to display when the component is unchecked.
//    */
//   icon: PropTypes.node.isRequired,
//   /**
//    * The id of the `input` element.
//    */
//   id: PropTypes.string,
//   /**
//    * If `true`, the component appears indeterminate.
//    */
//   indeterminate: PropTypes.bool,
//   /**
//    * The icon to display when the component is indeterminate.
//    */
//   indeterminateIcon: PropTypes.node,
//   /**
//    * Attributes applied to the `input` element.
//    */
//   inputProps: PropTypes.object,
//   /**
//    * Use that property to pass a ref callback to the native input component.
//    */
//   inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
//   /*
//    * @ignore
//    */
//   name: PropTypes.string,
//   /**
//    * @ignore
//    */
//   onBlur: PropTypes.func,
//   /**
//    * Callback fired when the state is changed.
//    *
//    * @param {object} event The event source of the callback.
//    * You can pull out the new value by accessing `event.target.checked`.
//    * @param {boolean} checked The `checked` value of the switch
//    */
//   onChange: PropTypes.func,
//   /**
//    * @ignore
//    */
//   onFocus: PropTypes.func,
//   /**
//    * It prevents the user from changing the value of the field
//    * (not from interacting with the field).
//    */
//   readOnly: PropTypes.bool,
//   /**
//    * If `true`, the input will be required.
//    */
//   required: PropTypes.bool,
//   /**
//    * @ignore
//    */
//   tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   /**
//    * The input component property `type`.
//    */
//   type: PropTypes.string,
//   /**
//    * The value of the component.
//    */
//   value: PropTypes.string,
// };

SwitchBase.defaultProps = {
  type: 'checkbox',
};

// SwitchBase.contextTypes = {
//   muiFormControl: PropTypes.object,
// };

// export default withStyles(styles, { name: 'MuiSwitchBase' })(SwitchBase);
