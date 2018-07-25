import _objectSpread from "/jslib/@babel/runtime/helpers/builtin/objectSpread.js";
import _objectWithoutProperties from "/jslib/@babel/runtime/helpers/builtin/objectWithoutProperties.js";
import deepmerge from '/jslib/deepmerge/dist/umd.js'; // < 1kb payload overhead when lodash/merge is > 3kb.

export default function createMixins(breakpoints, spacing, mixins) {
  return _objectSpread({
    gutters: (styles = {}) => {
      return _objectSpread({
        paddingLeft: spacing.unit * 2,
        paddingRight: spacing.unit * 2
      }, styles, {
        [breakpoints.up('sm')]: _objectSpread({
          paddingLeft: spacing.unit * 3,
          paddingRight: spacing.unit * 3
        }, styles[breakpoints.up('sm')])
      });
    },
    toolbar: {
      minHeight: 56,
      [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
        minHeight: 48
      },
      [breakpoints.up('sm')]: {
        minHeight: 64
      }
    }
  }, mixins);
}