!function(n){var r={};function e(o){if(r[o])return r[o].exports;var c=r[o]={i:o,l:!1,exports:{}};return n[o].call(c.exports,c,c.exports,e),c.l=!0,c.exports}e.m=n,e.c=r,e.d=function(n,r,o){e.o(n,r)||Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:o})},e.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},e.n=function(n){var r=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(r,"a",r),r},e.o=function(n,r){return Object.prototype.hasOwnProperty.call(n,r)},e.p="",e(e.s="./src/index.ts")}({"./node_modules/css-loader/lib/css-base.js":function(module,exports){eval('/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn "@media " + item[2] + "{" + content + "}";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join("");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === "string")\n\t\t\tmodules = [[null, modules, ""]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === "number")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = "(" + item[2] + ") and (" + mediaQuery + ")";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || \'\';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === \'function\') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn \'/*# sourceURL=\' + cssMapping.sourceRoot + source + \' */\'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join(\'\\n\');\n\t}\n\n\treturn [content].join(\'\\n\');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = \'sourceMappingURL=data:application/json;charset=utf-8;base64,\' + base64;\n\n\treturn \'/*# \' + data + \' */\';\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?')},"./src/component.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MelkorBootstrapComponent", function() { return MelkorBootstrapComponent; });\nvar handleVirtualElement = function (virtualElement) {\r\n    virtualElement.children.forEach(function (child) {\r\n        var childTemplate = virtualElement.template.querySelector("" + child.selector);\r\n        if (child.componentRef && childTemplate) {\r\n            virtualElement.template.replaceChild(child.template, childTemplate);\r\n        }\r\n    });\r\n    return virtualElement;\r\n};\r\nvar registerComponent = function (componentDefinition, components) {\r\n    var component = componentDefinition();\r\n    components.set(component.selector.toUpperCase(), component);\r\n    if (component.children) {\r\n        component.children.forEach(function (child) {\r\n            registerComponent(child, components);\r\n        });\r\n    }\r\n};\r\nvar getVirtualElement = function (element, components) {\r\n    var component = components.get(element.tagName);\r\n    if (component) {\r\n        var componentTemplate = htmlToElement(component.template);\r\n        return handleVirtualElement({\r\n            selector: element.tagName,\r\n            template: componentTemplate,\r\n            children: convertHTMLElementChildren(componentTemplate, components),\r\n            componentRef: component\r\n        });\r\n    }\r\n    return handleVirtualElement({\r\n        selector: element.tagName,\r\n        template: element,\r\n        children: convertHTMLElementChildren(element, components)\r\n    });\r\n};\r\nvar convertHTMLElementChildren = function (element, components) {\r\n    return Array.from(element.children).map(function (child) { return getVirtualElement(child, components); });\r\n};\r\nvar initializeVirtualDOM = function (rootComponent, components) {\r\n    return {\r\n        root: getVirtualElement(htmlToElement(rootComponent.template), components)\r\n    };\r\n};\r\nvar htmlToElement = function (html) {\r\n    var template = document.createElement("template");\r\n    template.innerHTML = html;\r\n    return template.content.firstElementChild;\r\n};\r\nvar applyStyles = function (components) {\r\n    components.forEach(function (component) {\r\n        if (component.styles) {\r\n            var css = document.createElement("style");\r\n            css.type = "text/css";\r\n            css.innerHTML = component.styles;\r\n            document.head.appendChild(css);\r\n        }\r\n    });\r\n};\r\nvar MelkorBootstrapComponent = function (definition) {\r\n    var components = new Map();\r\n    var rootComponent = definition();\r\n    registerComponent(definition, components);\r\n    var virtualDOM = initializeVirtualDOM(rootComponent, components);\r\n    applyStyles(components);\r\n    document.addEventListener("DOMContentLoaded", function () {\r\n        document.body.replaceChild(virtualDOM.root.template, document.querySelector("" + rootComponent.selector));\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./src/component.ts?')},"./src/components/child/child.actions.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHILD_ACTIONS", function() { return CHILD_ACTIONS; });\nvar emitClick = function ($sender) {\r\n    console.log("Emitted from child to child");\r\n    $sender.props.childData = "Bye from child";\r\n};\r\nvar emitDouble = function ($sender) {\r\n    console.log("Emitted from child to child");\r\n    $sender.props.childData = "Double Bye from child";\r\n};\r\nvar emitExt = function ($sender, $receiver) {\r\n    console.log("Emitted from child to parent");\r\n    $receiver.props.childData = "Bye from child";\r\n};\r\nvar CHILD_ACTIONS = {\r\n    internal: [\r\n        emitClick,\r\n        emitDouble\r\n    ],\r\n    external: [\r\n        emitExt\r\n    ]\r\n};\r\n\n\n//# sourceURL=webpack:///./src/components/child/child.actions.ts?')},"./src/components/child/child.component.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChildComponent", function() { return ChildComponent; });\n/* harmony import */ var _child_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./child.actions */ "./src/components/child/child.actions.ts");\n/* harmony import */ var _child_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./child.css */ "./src/components/child/child.css");\n/* harmony import */ var _child_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_child_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _child_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./child.html */ "./src/components/child/child.html");\n/* harmony import */ var _child_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_child_html__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\nvar ChildComponent = function () {\r\n    return {\r\n        selector: "child-comp",\r\n        template: _child_html__WEBPACK_IMPORTED_MODULE_2___default.a,\r\n        styles: _child_css__WEBPACK_IMPORTED_MODULE_1___default.a,\r\n        props: {\r\n            childData: "Hello from child property"\r\n        },\r\n        actions: _child_actions__WEBPACK_IMPORTED_MODULE_0__["CHILD_ACTIONS"]\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack:///./src/components/child/child.component.ts?')},"./src/components/child/child.css":function(module,exports,__webpack_require__){eval('exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);\n// imports\n\n\n// module\nexports.push([module.i, ".child-component {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    justify-content: center;\\r\\n    align-items: center;\\r\\n    border: solid 1px lightblue;\\r\\n    margin: 5px;\\r\\n}", ""]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/components/child/child.css?')},"./src/components/child/child.html":function(module,exports){eval('module.exports = "<div class=\\"child-component\\">\\r\\n    <h4>Child</h4>\\r\\n    <p>{{childData}}</p>\\r\\n    <button mk-onclick=\\"emitClick\\">Click child</button>\\r\\n</div>";\n\n//# sourceURL=webpack:///./src/components/child/child.html?')},"./src/components/parent/parent.component.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParentComponent", function() { return ParentComponent; });\n/* harmony import */ var _child_child_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../child/child.component */ "./src/components/child/child.component.ts");\n/* harmony import */ var _parent_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parent.css */ "./src/components/parent/parent.css");\n/* harmony import */ var _parent_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_parent_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _parent_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parent.html */ "./src/components/parent/parent.html");\n/* harmony import */ var _parent_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_parent_html__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\nvar ParentComponent = function () {\r\n    return {\r\n        selector: "parent-comp",\r\n        template: _parent_html__WEBPACK_IMPORTED_MODULE_2___default.a,\r\n        styles: _parent_css__WEBPACK_IMPORTED_MODULE_1___default.a,\r\n        children: [_child_child_component__WEBPACK_IMPORTED_MODULE_0__["ChildComponent"]]\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack:///./src/components/parent/parent.component.ts?')},"./src/components/parent/parent.css":function(module,exports,__webpack_require__){eval('exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);\n// imports\n\n\n// module\nexports.push([module.i, ".parent-component {\\r\\n    border: solid 1px lightseagreen;\\r\\n    margin: 5px;   \\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-content: center;\\r\\n    justify-content: center;\\r\\n}\\r\\n\\r\\n.parent-component .children-wrapper {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-content: center;\\r\\n    justify-content: center;\\r\\n}\\r\\n\\r\\n.parent-component h3 {\\r\\n    text-align: center;\\r\\n}", ""]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/components/parent/parent.css?')},"./src/components/parent/parent.html":function(module,exports){eval('module.exports = "<div class=\\"parent-component\\">\\r\\n    <h3>Parent</h3>   \\r\\n    <child-comp></child-comp>\\r\\n    <div class=\\"children-wrapper\\">\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n        <child-comp></child-comp>\\r\\n    </div>   \\r\\n</div>";\n\n//# sourceURL=webpack:///./src/components/parent/parent.html?')},"./src/components/root.component.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootComponent", function() { return RootComponent; });\n/* harmony import */ var _parent_parent_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parent/parent.component */ "./src/components/parent/parent.component.ts");\n/* harmony import */ var _root_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./root.css */ "./src/components/root.css");\n/* harmony import */ var _root_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_root_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _root_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./root.html */ "./src/components/root.html");\n/* harmony import */ var _root_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_root_html__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\nvar RootComponent = function () {\r\n    return {\r\n        selector: "root",\r\n        template: _root_html__WEBPACK_IMPORTED_MODULE_2___default.a,\r\n        styles: _root_css__WEBPACK_IMPORTED_MODULE_1___default.a,\r\n        children: [_parent_parent_component__WEBPACK_IMPORTED_MODULE_0__["ParentComponent"]]\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack:///./src/components/root.component.ts?')},"./src/components/root.css":function(module,exports,__webpack_require__){eval('exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);\n// imports\n\n\n// module\nexports.push([module.i, ".root .parent-wrapper {\\r\\n    display: flex;\\r\\n    flex-direction: row;\\r\\n    margin: 7px;\\r\\n}", ""]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/components/root.css?')},"./src/components/root.html":function(module,exports){eval('module.exports = "<div class=\\"root\\">\\r\\n    <h1>Root</h1>\\r\\n    <div class=\\"parent-wrapper\\">\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n        <parent-comp></parent-comp>\\r\\n    </div> \\r\\n</div>";\n\n//# sourceURL=webpack:///./src/components/root.html?')},"./src/index.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/component.ts");\n/* harmony import */ var _components_root_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/root.component */ "./src/components/root.component.ts");\n\r\n\r\nconsole.log("DOCUMENT HEAD BEFORE", document.head);\r\nconsole.time("Bootstrapping component");\r\nObject(_component__WEBPACK_IMPORTED_MODULE_0__["MelkorBootstrapComponent"])(_components_root_component__WEBPACK_IMPORTED_MODULE_1__["RootComponent"]);\r\nconsole.timeEnd("Bootstrapping component");\r\n\n\n//# sourceURL=webpack:///./src/index.ts?')}});