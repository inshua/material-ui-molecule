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

export const defaultTheme = createMuiTheme();

export const themes = window.THEMES || {}

themes['default'] = defaultTheme;
defaultTheme.name = 'default';

function jssPreset() {
    return {
        plugins: [jssGlobal.default(), jssNested.default(), jssCamelCase.default(), jssDefaultUnit.default(), jssVendorPrefixer.default(), jssPropsSort.default()]
    };
}

jss.default.setup(jssPreset())

const generateClassName = createGenerateClassName();
const sheetOptions = {generateClassName}
const stylesCreatorSavedOptions = {index:-99999999997}

const loadedClasses = {};

export function attachJss(styles, meta, name, theme=defaultTheme){
    const key = `${theme.name}-${meta}-${name}`;
    const exist = loadedClasses[key]
    if(exist) return exist;

    if(typeof styles == 'function'){
        styles = styles(theme);
    }
    const sheet = jss.default.createStyleSheet(styles, _objectSpread({
        meta,
        classNamePrefix: meta,
        flip: theme.direction === 'rtl',
        link: false
    }, sheetOptions, stylesCreatorSavedOptions, {
        name
    }));
    sheet.attach()
    
    loadedClasses[key] = sheet.classes;

    return sheet.classes
};

Molecule.prototype.attachJss = function(styles, meta, name){
    const themeName = this.$el.closest('[theme]').attr('theme') || 'default';
    const theme = themes[themeName] || defaultTheme;
    return attachJss(styles, meta, name, theme);
}
