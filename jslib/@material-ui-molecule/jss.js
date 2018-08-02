// import _extends from "/jslib/@babel/runtime/helpers/builtin/extends.js";
// import * as mui from '/jslib/@material-ui/core/';
import _objectWithoutProperties from "/jslib/@babel/runtime/helpers/builtin/objectWithoutProperties.js";
import { fade } from '/jslib/@material-ui-molecule/core/styles/colorManipulator.js';
import { capitalize } from '/jslib/@material-ui-molecule/core/utils/helpers.js';
import _objectSpread from  "/jslib/@babel/runtime/helpers/builtin/objectSpread.js";
import warning from '/jslib/warning/browser.js';
import createMuiTheme from '/jslib/@material-ui-molecule/core/styles/createMuiTheme.js'
import deepmerge from '/jslib/deepmerge/dist/umd.js'; 
import createGenerateClassName from '/jslib/@material-ui-molecule/core/styles/createGenerateClassName.js';

// let defaultTheme;

// function getDefaultTheme() {
//     if (defaultTheme) {
//         return defaultTheme;
//     }

//     defaultTheme = createMuiTheme();
//     return defaultTheme;
// } // Link a style sheet with a component

export const defaultTheme = createMuiTheme();

function jssPreset() {
    return {
        plugins: [jssGlobal.default(), jssNested.default(), jssCamelCase.default(), jssDefaultUnit.default(), jssVendorPrefixer.default(), jssPropsSort.default()]
    };
}

jss.default.setup(jssPreset())

const generateClassName = createGenerateClassName();
const sheetOptions = {generateClassName}
const stylesCreatorSavedOptions = {index:-99999999997}

export function attachJss(styles, meta, name, theme=defaultTheme){
    const sheet = jss.default.createStyleSheet(styles, _objectSpread({
        meta,
        classNamePrefix: meta,
        flip: theme.direction === 'rtl',
        link: false
    }, sheetOptions, stylesCreatorSavedOptions, {
        name
    }));
    sheet.attach()
    // console.log(sheet.classes)
    return sheet.classes
}

