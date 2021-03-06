import _objectSpread from  "/jslib/@babel/runtime/helpers/builtin/objectSpread.js";
import _objectWithoutProperties from "/jslib/@babel/runtime/helpers/builtin/objectWithoutProperties.js";
import deepmerge from '/jslib/deepmerge/dist/umd.js'; // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from '/jslib/warning/browser.js';
import isPlainObject from '/jslib/is-plain-object/index.js';

import createTypography from './createTypography.js';
import createBreakpoints from './createBreakpoints.js';
import createPalette from './createPalette.js';
import createMixins from './createMixins.js';
import shadows from './shadows.js';
import shape from './shape.js';
import transitions from './transitions.js';
import zIndex from './zIndex.js';
import spacing from './spacing.js';

function createMuiTheme(options = {}) {
  const {
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    shadows: shadowsInput,
    typography: typographyInput = {},
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);

  const muiTheme = {
    breakpoints,
    direction: 'ltr',
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    overrides: {}, // Inject custom styles
    palette,
    props: {}, // Inject custom properties
    shadows: shadowsInput || shadows,
    typography: createTypography(palette, typographyInput),
    ...deepmerge(
      {
        shape,
        spacing,
        transitions,
        zIndex,
      },
      other,
      {
        isMergeableObject: isPlainObject,
      },
    ),
  };

  warning(
    muiTheme.shadows.length === 25,
    'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.',
  );

  return muiTheme;
}

export default createMuiTheme;