const HTML_ATTRS =  [{"attr":"aria-activedescendant","global":true,"tags":null},{"attr":"aria-atomic","global":true,"tags":null},{"attr":"aria-autocomplete","global":true,"tags":null},{"attr":"aria-busy","global":true,"tags":null},{"attr":"aria-checked","global":true,"tags":null},{"attr":"aria-colcount","global":true,"tags":null},{"attr":"aria-colindex","global":true,"tags":null},{"attr":"aria-colspan","global":true,"tags":null},{"attr":"aria-controls","global":true,"tags":null},{"attr":"aria-current","global":true,"tags":null},{"attr":"aria-describedat","global":true,"tags":null},{"attr":"aria-describedby","global":true,"tags":null},{"attr":"aria-disabled","global":true,"tags":null},{"attr":"aria-dropeffect","global":true,"tags":null},{"attr":"aria-errormessage","global":true,"tags":null},{"attr":"aria-expanded","global":true,"tags":null},{"attr":"aria-flowto","global":true,"tags":null},{"attr":"aria-grabbed","global":true,"tags":null},{"attr":"aria-haspopup","global":true,"tags":null},{"attr":"aria-hidden","global":true,"tags":null},{"attr":"aria-invalid","global":true,"tags":null},{"attr":"aria-kbdshortcuts","global":true,"tags":null},{"attr":"aria-label","global":true,"tags":null},{"attr":"aria-labelledby","global":true,"tags":null},{"attr":"aria-level","global":true,"tags":null},{"attr":"aria-live","global":true,"tags":null},{"attr":"aria-modal","global":true,"tags":null},{"attr":"aria-multiline","global":true,"tags":null},{"attr":"aria-multiselectable","global":true,"tags":null},{"attr":"aria-orientation","global":true,"tags":null},{"attr":"aria-owns","global":true,"tags":null},{"attr":"aria-placeholder","global":true,"tags":null},{"attr":"aria-posinset","global":true,"tags":null},{"attr":"aria-pressed","global":true,"tags":null},{"attr":"aria-readonly","global":true,"tags":null},{"attr":"aria-relevant","global":true,"tags":null},{"attr":"aria-required","global":true,"tags":null},{"attr":"aria-roledescription","global":true,"tags":null},{"attr":"aria-rowcount","global":true,"tags":null},{"attr":"aria-rowindex","global":true,"tags":null},{"attr":"aria-rowspan","global":true,"tags":null},{"attr":"aria-selected","global":true,"tags":null},{"attr":"aria-setsize","global":true,"tags":null},{"attr":"aria-sort","global":true,"tags":null},{"attr":"aria-valuemax","global":true,"tags":null},{"attr":"aria-valuemin","global":true,"tags":null},{"attr":"aria-valuenow","global":true,"tags":null},{"attr":"aria-valuetext","global":true,"tags":null},{"attr":"accesskey","prop":"accessKey","global":true,"tags":null},{"attr":"class","prop":"className","global":true,"tags":null},{"attr":"contenteditable","prop":"contentEditable","global":true,"tags":null},{"attr":"contextmenu","global":true,"tags":null},{"attr":"dir","prop":"dir","global":true,"tags":null},{"attr":"draggable","prop":"draggable","global":true,"tags":null},{"attr":"dropzone","global":true,"tags":null},{"attr":"hidden","prop":"hidden","global":true,"tags":null},{"attr":"id","prop":"id","global":true,"tags":null},{"attr":"itemid","global":true,"tags":null},{"attr":"itemprop","global":true,"tags":null},{"attr":"itemref","global":true,"tags":null},{"attr":"itemscope","global":true,"tags":null},{"attr":"itemtype","global":true,"tags":null},{"attr":"lang","prop":"lang","global":true,"tags":null},{"attr":"role","global":true,"tags":null},{"attr":"spellcheck","prop":"spellcheck","global":true,"tags":null},{"attr":"style","prop":"style","global":true,"tags":null},{"attr":"tabindex","prop":"tabIndex","global":true,"tags":null},{"attr":"title","prop":"title","global":true,"tags":null},{"attr":"translate","prop":"translate","global":true,"tags":null},{"attr":"manifest","global":false,"tags":["html"]},{"attr":"href","prop":"href","global":false,"tags":["base","link","a","area"]},{"attr":"target","prop":"target","global":false,"tags":["base","a","area","form"]},{"attr":"crossorigin","prop":"crossOrigin","global":false,"tags":["link","img","video","audio","script"]},{"attr":"rel","prop":"rel","global":false,"tags":["link","a","area"]},{"attr":"media","prop":"media","global":false,"tags":["link","style"]},{"attr":"hreflang","global":false,"tags":["link","a","area"]},{"attr":"type","prop":"type","global":false,"tags":["link","style","ol","a","embed","object","source","area","input","button","script"]},{"attr":"sizes","prop":"sizes","global":false,"tags":["link"]},{"attr":"name","prop":"name","global":false,"tags":["meta","iframe","object","param","map","form","input","button","select","textarea","output","fieldset"]},{"attr":"http-equiv","prop":"httpEquiv","global":false,"tags":["meta"]},{"attr":"content","prop":"content","global":false,"tags":["meta"]},{"attr":"charset","prop":"charset","global":false,"tags":["meta","script"]},{"attr":"nonce","prop":"nonce","global":false,"tags":["style","script"]},{"attr":"scoped","global":false,"tags":["style"]},{"attr":"onafterprint","prop":"onafterprint","global":false,"tags":["body"]},{"attr":"onbeforeprint","prop":"onbeforeprint","global":false,"tags":["body"]},{"attr":"onbeforeunload","prop":"onbeforeunload","global":false,"tags":["body"]},{"attr":"onhashchange","prop":"onhashchange","global":false,"tags":["body"]},{"attr":"onlanguagechange","prop":"onlanguagechange","global":false,"tags":["body"]},{"attr":"onmessage","prop":"onmessage","global":false,"tags":["body"]},{"attr":"onoffline","prop":"onoffline","global":false,"tags":["body"]},{"attr":"ononline","prop":"ononline","global":false,"tags":["body"]},{"attr":"onpagehide","prop":"onpagehide","global":false,"tags":["body"]},{"attr":"onpageshow","prop":"onpageshow","global":false,"tags":["body"]},{"attr":"onpopstate","prop":"onpopstate","global":false,"tags":["body"]},{"attr":"onstorage","prop":"onstorage","global":false,"tags":["body"]},{"attr":"onunload","prop":"onunload","global":false,"tags":["body"]},{"attr":"cite","prop":"cite","global":false,"tags":["blockquote","q","del"]},{"attr":"reversed","prop":"reversed","global":false,"tags":["ol"]},{"attr":"start","prop":"start","global":false,"tags":["ol"]},{"attr":"value","prop":"value","global":false,"tags":["li","param","input","button","option","progress","meter"]},{"attr":"download","prop":"download","global":false,"tags":["a","area"]},{"attr":"ping","prop":"ping","global":false,"tags":["a","area"]},{"attr":"datetime","prop":"dateTime","global":false,"tags":["time","del"]},{"attr":"alt","prop":"alt","global":false,"tags":["img","area","input"]},{"attr":"src","prop":"src","global":false,"tags":["img","iframe","embed","video","audio","source","track","input","script"]},{"attr":"srcset","prop":"srcset","global":false,"tags":["img"]},{"attr":"usemap","prop":"useMap","global":false,"tags":["img","object"]},{"attr":"ismap","prop":"isMap","global":false,"tags":["img"]},{"attr":"width","prop":"width","global":false,"tags":["img","iframe","embed","object","video","input","canvas"]},{"attr":"height","prop":"height","global":false,"tags":["img","iframe","embed","object","video","input","canvas"]},{"attr":"srcdoc","prop":"srcdoc","global":false,"tags":["iframe"]},{"attr":"sandbox","prop":"sandbox","global":false,"tags":["iframe"]},{"attr":"seamless","global":false,"tags":["iframe"]},{"attr":"allowfullscreen","prop":"allowFullscreen","global":false,"tags":["iframe"]},{"attr":"data","prop":"data","global":false,"tags":["object"]},{"attr":"typemustmatch","global":false,"tags":["object"]},{"attr":"form","prop":"form","global":false,"tags":["object","label","input","button","select","textarea","output","fieldset"]},{"attr":"poster","prop":"poster","global":false,"tags":["video"]},{"attr":"preload","prop":"preload","global":false,"tags":["video","audio"]},{"attr":"autoplay","prop":"autoplay","global":false,"tags":["video","audio"]},{"attr":"mediagroup","global":false,"tags":["video","audio"]},{"attr":"loop","prop":"loop","global":false,"tags":["video","audio"]},{"attr":"muted","prop":"muted","global":false,"tags":["video","audio"]},{"attr":"controls","prop":"controls","global":false,"tags":["video","audio"]},{"attr":"default","prop":"default","global":false,"tags":["track"]},{"attr":"kind","prop":"kind","global":false,"tags":["track"]},{"attr":"label","prop":"label","global":false,"tags":["track","optgroup","option"]},{"attr":"srclang","prop":"srclang","global":false,"tags":["track"]},{"attr":"coords","prop":"coords","global":false,"tags":["area"]},{"attr":"shape","prop":"shape","global":false,"tags":["area"]},{"attr":"sortable","global":false,"tags":["table"]},{"attr":"border","prop":"border","global":false,"tags":["table"]},{"attr":"span","prop":"span","global":false,"tags":["colgroup","col"]},{"attr":"colspan","prop":"colSpan","global":false,"tags":["td","th"]},{"attr":"rowspan","prop":"rowSpan","global":false,"tags":["td","th"]},{"attr":"headers","prop":"headers","global":false,"tags":["td","th"]},{"attr":"scope","prop":"scope","global":false,"tags":["th"]},{"attr":"sorted","global":false,"tags":["th"]},{"attr":"abbr","prop":"abbr","global":false,"tags":["th"]},{"attr":"accept-charset","prop":"acceptCharset","global":false,"tags":["form"]},{"attr":"action","prop":"action","global":false,"tags":["form"]},{"attr":"autocomplete","prop":"autocomplete","global":false,"tags":["form","input","select","textarea"]},{"attr":"enctype","prop":"enctype","global":false,"tags":["form"]},{"attr":"method","prop":"method","global":false,"tags":["form"]},{"attr":"novalidate","prop":"noValidate","global":false,"tags":["form"]},{"attr":"for","prop":"htmlFor","global":false,"tags":["label","output"]},{"attr":"accept","prop":"accept","global":false,"tags":["input"]},{"attr":"autofocus","prop":"autofocus","global":false,"tags":["input","button","select","textarea"]},{"attr":"checked","prop":"checked","global":false,"tags":["input"]},{"attr":"dirname","prop":"dirName","global":false,"tags":["input","textarea"]},{"attr":"disabled","prop":"disabled","global":false,"tags":["input","button","select","optgroup","option","textarea","fieldset"]},{"attr":"formaction","prop":"formAction","global":false,"tags":["input","button"]},{"attr":"formenctype","prop":"formEnctype","global":false,"tags":["input","button"]},{"attr":"formmethod","prop":"formMethod","global":false,"tags":["input","button"]},{"attr":"formnovalidate","prop":"formNoValidate","global":false,"tags":["input","button"]},{"attr":"formtarget","prop":"formTarget","global":false,"tags":["input","button"]},{"attr":"inputmode","prop":"inputMode","global":false,"tags":["input","textarea"]},{"attr":"list","prop":"list","global":false,"tags":["input"]},{"attr":"max","prop":"max","global":false,"tags":["input","progress","meter"]},{"attr":"maxlength","prop":"maxLength","global":false,"tags":["input","textarea"]},{"attr":"min","prop":"min","global":false,"tags":["input","meter"]},{"attr":"minlength","prop":"minLength","global":false,"tags":["input","textarea"]},{"attr":"multiple","prop":"multiple","global":false,"tags":["input","select"]},{"attr":"pattern","prop":"pattern","global":false,"tags":["input"]},{"attr":"placeholder","prop":"placeholder","global":false,"tags":["input","textarea"]},{"attr":"readonly","prop":"readOnly","global":false,"tags":["input","textarea"]},{"attr":"required","prop":"required","global":false,"tags":["input","select","textarea"]},{"attr":"size","prop":"size","global":false,"tags":["input","select"]},{"attr":"step","prop":"step","global":false,"tags":["input"]},{"attr":"selected","prop":"selected","global":false,"tags":["option"]},{"attr":"cols","prop":"cols","global":false,"tags":["textarea"]},{"attr":"rows","prop":"rows","global":false,"tags":["textarea"]},{"attr":"wrap","prop":"wrap","global":false,"tags":["textarea"]},{"attr":"low","prop":"low","global":false,"tags":["meter"]},{"attr":"high","prop":"high","global":false,"tags":["meter"]},{"attr":"optimum","prop":"optimum","global":false,"tags":["meter"]},{"attr":"open","prop":"open","global":false,"tags":["details"]},{"attr":"async","prop":"async","global":false,"tags":["script"]},{"attr":"defer","prop":"defer","global":false,"tags":["script"]}];

HTML_ATTRS.ofProp = HTML_ATTRS.filter(item => item.prop).reduce((p, item) => {p[item.prop] = item; return p}, {});
HTML_ATTRS.ofAttr = HTML_ATTRS.reduce((p, item) => {p[item.attr] = item; return p}, {});
HTML_ATTRS.isCustomProp = function(propName, tagName){
    let desc =  this.ofProp[propName];
    return desc == null || desc.attr == null || !desc.global && desc.tags.indexOf(tagName.toLowerCase()) == -1;
}
HTML_ATTRS.isCustomAttr = function(attrName, tagName){
    let desc =  this.ofAttr[attrName];
    return desc == null || !desc.global && desc.tags.indexOf(tagName.toLowerCase()) == -1;  // 有的 attr 没有对应的 prop 故不检查 prop == null
}