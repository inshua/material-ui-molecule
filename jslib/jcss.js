window.THEMES = {};

var allJcsses = [], allJcssesPrototypeSheet = []

function compileJcss(stylesheet){
    if(allJcssesPrototypeSheet.indexOf(stylesheet) == -1){
        allJcssesPrototypeSheet.push(stylesheet);
    } else {
        // prototypeStylesheet changed
    }
    
    let args = stylesheet.getAttribute('args')
    args = args ? args.split(',') : [];

    const text = stylesheet.innerHTML;
    var code = '';
    let end = 0;
    for(let start = text.indexOf('j/*', end); start > -1; ){
        code += text.substring(end, start);
        end = text.indexOf('*/', start + 3)
        code += '${'
        code += text.substring(start + 3, end)
        code += '}'
        end += 2;
        start = text.indexOf('j/*', end);
    }
    code += text.substring(end);
    code = `return \`${code};\``;

    const fun = new Function(...['theme'].concat(args).concat([code]));
    const result = {
        args: args,
        prototypeStylesheet: stylesheet,
        generator : fun,
        instances: {},
        coveredThemes : [],
        selectors: null,
        attach: function(bindings){
            let values = []
            // convert theme name to theme object
            const themeName = bindings.theme || 'default';
            let theme = THEMES[themeName];
            if(theme == null) throw new Error(`theme "${themeName}" not found`);
            if(this.coveredThemes.indexOf(themeName) == -1){
                this.coveredThemes.push(themeName);
            }
            values.push(theme)
            // prepare args
            for (const arg of this.args) {
                values.push(bindings[arg]);
            }
            return this._attach(values);
        },
        _attach: function(values){
            // reuse existed
            const instanceKey = JSON.stringify(values);
            if(this.instances[instanceKey]) return this.instances[instanceKey];

            // generate stylesheet  
            let css = this.generator.apply(null, values);
            let stylesheet = document.createElement('style');
            stylesheet.type = 'text/css';
            stylesheet.innerHTML = css;
            document.head.appendChild(stylesheet);
            this.instances[instanceKey] = stylesheet;
            if(this.selectors == null) {
                this.selectors = Array.prototype.map.call(stylesheet.sheet.rules, rule => rule.selectorText);
            }
            return stylesheet;
        },
        isApplied: function(element){       // does this jcss applied on element?
            for (const selector of this.selectors) {
                if(element.querySelector(selector)){
                    return true;
                }
            }
        },
        isCoveredTheme: function(themeName){
            return this.coveredThemes.indexOf(themeName) != -1
        },
        reattach: function(themeName){
            let theme = THEMES[themeName];
            for (const s of Object.keys(this.instances)) {
                let values = JSON.parse(s)
                if(values[0].themeName != themeName){
                    this._attach([theme].concat(values.slice(1)));
                }
            }
        }
    }
    allJcsses.push(result);
    return result;
};

// $(function observeThemeChange(){
//     // Select the node that will be observed for mutations
//     var targetNode = document.body;

//     // Options for the observer (which mutations to observe)
//     var config = { attributes: true, childList: true, subtree: true };

//     // Callback function to execute when mutations are observed
//     var callback = function(mutationsList) {
//         for(var mutation of mutationsList) {
//             // if (mutation.type == 'childList') {
//             //     console.log('A child node has been added or removed.');
//             // }
//             if (mutation.type == 'attributes') {
//                 if(mutation.attributeName == 'theme'){
//                     let theme = mutation.target.getAttribute('theme');
//                     debugger;
//                     for (const jcss of allJcsses) {
//                         if(jcss.isCoveredTheme(theme) && jcss.isApplied(mutation.target)){
//                             jcss.reattach(theme);
//                         }
//                     }
//                 }
//             }
//         }
//     };

//     // Create an observer instance linked to the callback function
//     var observer = new MutationObserver(callback);

//     // Start observing the target node for configured mutations
//     observer.observe(targetNode, config);

//     // Later, you can stop observing
//     // observer.disconnect();
// });


+(function($) {
    $.fn.compileJcss = function() {
        return compileJcss(this[0]);
    };
}(jQuery));