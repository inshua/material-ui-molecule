import _objectSpread from  "/jslib/@babel/runtime/helpers/builtin/objectSpread.js";
import _objectWithoutProperties from "/jslib/@babel/runtime/helpers/builtin/objectWithoutProperties.js";
import deepmerge from '/jslib/deepmerge/dist/umd.js'; // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from '/jslib/warning/browser.js';

import createTypography from './createTypography.js';
import createBreakpoints from './createBreakpoints.js';
import createPalette from './createPalette.js';
import createMixins from './createMixins.js';
import shadows from './shadows.js';
import transitions from './transitions.js';
import zIndex from './zIndex.js';
import spacing from './spacing.js';

function createMuiTheme(options = {}) {

  const {
    palette: paletteInput = {},
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    typography: typographyInput = {},
    shadows: shadowsInput
  } = options,
        other = _objectWithoutProperties(options, ["palette", "breakpoints", "mixins", "typography", "shadows"]);

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);

  const muiTheme = _objectSpread({
    breakpoints,
    direction: 'ltr',
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    overrides: {},
    // Inject custom styles
    palette,
    props: {},
    // Inject custom properties
    shadows: shadowsInput || shadows,
    typography: createTypography(palette, typographyInput)
  }, deepmerge({
    transitions,
    spacing,
    zIndex
  }, other));

  process.env.NODE_ENV !== "production" ? warning(muiTheme.shadows.length === 25, 'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.') : void 0;
  return muiTheme;
}

export default createMuiTheme;