/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Table = __webpack_require__(1);
	var data = get_data();
	var t = new Table('app', data).sort_by('id');
	window.t = t;

	function get_data() {
	    var jsonO = {
	        "title": {
	            "id": "编号",
	            "name": "姓名",
	            "chinese": "语文",
	            "math": "数学",
	            "english": "英文",
	            "medicine": "医学",
	            "physical": "物理"
	        },
	        "sortable_title": ["name", "chinese", "medicine", "physical"],
	        "sort_mode": ["asc", "desc", "asc"], // 默认升序
	        "body": [{
	            "id": 0,
	            "name": "Jason",
	            "chinese": "1",
	            "math": "5",
	            "english": "1",
	            "medicine": "8",
	            "physical": "4"
	        }, {
	            "id": 1,
	            "name": "Charles",
	            "chinese": "2",
	            "math": "2",
	            "english": "7",
	            "medicine": "5",
	            "physical": "9"
	        }, {
	            "id": 2,
	            "name": "Richard",
	            "chinese": "7",
	            "math": "4",
	            "english": "7",
	            "medicine": "0",
	            "physical": "6"
	        }, {
	            "id": 3,
	            "name": "George",
	            "chinese": "9",
	            "math": "8",
	            "english": "3",
	            "medicine": "2",
	            "physical": "1"
	        }, {
	            "id": 4,
	            "name": "Matthew",
	            "chinese": "2",
	            "math": "6",
	            "english": "9",
	            "medicine": "5",
	            "physical": "5"
	        }, {
	            "id": 5,
	            "name": "Larry",
	            "chinese": "6",
	            "math": "9",
	            "english": "9",
	            "medicine": "5",
	            "physical": "6"
	        }, {
	            "id": 6,
	            "name": "Brian",
	            "chinese": "1",
	            "math": "0",
	            "english": "2",
	            "medicine": "9",
	            "physical": "9"
	        }, {
	            "id": 7,
	            "name": "Eric",
	            "chinese": "2",
	            "math": "8",
	            "english": "2",
	            "medicine": "1",
	            "physical": "4"
	        }, {
	            "id": 8,
	            "name": "Timothy",
	            "chinese": "4",
	            "math": "8",
	            "english": "3",
	            "medicine": "3",
	            "physical": "6"
	        }, {
	            "id": 9,
	            "name": "Anthony",
	            "chinese": "0",
	            "math": "1",
	            "english": "7",
	            "medicine": "8",
	            "physical": "3"
	        }, {
	            "id": 10,
	            "name": "Matthew",
	            "chinese": "5",
	            "math": "2",
	            "english": "5",
	            "medicine": "2",
	            "physical": "9"
	        }, {
	            "id": 11,
	            "name": "Christopher",
	            "chinese": "4",
	            "math": "3",
	            "english": "0",
	            "medicine": "5",
	            "physical": "9"
	        }, {
	            "id": 12,
	            "name": "Charles",
	            "chinese": "5",
	            "math": "8",
	            "english": "2",
	            "medicine": "0",
	            "physical": "5"
	        }, {
	            "id": 13,
	            "name": "John",
	            "chinese": "2",
	            "math": "4",
	            "english": "2",
	            "medicine": "6",
	            "physical": "0"
	        }, {
	            "id": 14,
	            "name": "John",
	            "chinese": "7",
	            "math": "9",
	            "english": "3",
	            "medicine": "7",
	            "physical": "0"
	        }, {
	            "id": 15,
	            "name": "Thomas",
	            "chinese": "6",
	            "math": "4",
	            "english": "8",
	            "medicine": "3",
	            "physical": "5"
	        }]
	    };
	    return jsonO;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var u = __webpack_require__(2);
	var style = __webpack_require__(3);
	var Table = function Table(id, data, option) {
	    this.parent = document.getElementById(id) || null;
	    this.create(data);
	    this.init();
	};
	Table.prototype.init = function () {
	    var thead, spans, i, len, span;
	    var table = this.table || null;
	    if (table) {
	        thead = table.getElementsByTagName('thead')[0];
	        spans = thead.getElementsByClassName('sort');
	        for (i = 0, len = spans.length; i < len; i++) {
	            span = spans[i];
	            u.addEvent(span, 'click', sort_handler.bind(this));
	        }
	        u.addEvent(window, 'scroll', scroll_handler.bind(this));
	    }
	};
	Table.prototype.sort_by = function (criteria_arr, sort_mode_arr) {
	    // 预处理criteria_arr 和 sort_mode_arr,如果不存在，则设为空数组，如果为字符串，则包装为数组
	    !criteria_arr && (criteria_arr = []);
	    typeof criteria_arr == 'string' && (criteria_arr = [criteria_arr]);
	    !sort_mode_arr && (sort_mode_arr = []);
	    typeof sort_mode_arr == 'string' && (sort_mode_arr = [sort_mode_arr]);
	    var data, title, body;
	    if (u.isArray(criteria_arr) && u.isArray(sort_mode_arr)) {
	        data = this.data;
	        title = data.title;
	        body = data.body;
	        sort(body, criteria_arr, sort_mode_arr);
	        delete_tbody.call(this);
	        update_tbody.call(this);
	    }
	};
	Table.prototype.create = function (data) {
	    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && !!data) {
	        var title = data.title,
	            sortable_title = data.sortable_title,
	            sort_mode = data.sort_mode,
	            body = data.body;
	        var thead = create_thead(title, sortable_title, sort_mode);
	        sort(body, sortable_title, sort_mode);
	        var tbody = create_tbody(title, body);
	        var table = create_table(thead, tbody);
	        this.data = data;
	        this.table = table;
	        this.parent && this.parent.appendChild(table);
	    }
	    return this;
	};
	// help function
	function create_thead(title, sortable_title, sort_mode) {
	    var thead,
	        tr,
	        th,
	        i,
	        len,
	        key,
	        span,
	        idx,
	        keys = u.keys(title);
	    !sortable_title && (sortable_title = []);
	    var sortable_keys = u.keys(sortable_title);
	    !sort_mode && (sort_mode = []);
	    thead = document.createElement('thead');
	    tr = document.createElement('tr');
	    thead.appendChild(tr);
	    for (i = 0, len = keys.length; i < len; i++) {
	        key = keys[i];
	        th = document.createElement('th');
	        th.className = key;
	        tr.appendChild(th);
	        th.appendChild(document.createTextNode(title[key]));
	        idx = sortable_title.indexOf(key);
	        if (idx > -1) {
	            span = document.createElement('span');
	            span.className = 'sort ' + (sort_mode[idx] || 'asc');
	            th.appendChild(span);
	        }
	    }
	    return thead;
	}

	function create_tbody(title, body) {
	    var tbody,
	        tr,
	        td,
	        i,
	        j,
	        len_tr,
	        len_td,
	        tr_data,
	        keys = u.keys(title);
	    if (u.isArray(body)) {
	        tbody = document.createElement('tbody');
	        for (i = 0, len_tr = body.length; i < len_tr; i++) {
	            tr = document.createElement('tr');
	            // tr.className = 'body'
	            tbody.appendChild(tr);
	            tr_data = body[i];
	            for (j = 0, len_td = keys.length; j < len_td; j++) {
	                td = document.createElement('td');
	                tr.appendChild(td);
	                td.appendChild(document.createTextNode(tr_data[keys[j]]));
	            }
	        }
	        return tbody;
	    }
	}

	function create_table(thead, tbody) {
	    var table = document.createElement('table');
	    table.className = 'z-table';
	    table.appendChild(thead);
	    table.appendChild(tbody);
	    return table;
	}

	function delete_tbody() {
	    var table = this.table,
	        tbody = table.getElementsByTagName('tbody')[0];
	    table.removeChild(tbody);
	}

	function update_tbody() {
	    var table = this.table,
	        data = this.data;
	    var tbody = create_tbody(data.title, data.body);
	    table.appendChild(tbody);
	}

	function sort(data, criteria_arr, sort_mode_arr) {
	    !criteria_arr && (criteria_arr = []);
	    !sort_mode_arr && (sort_mode_arr = []);
	    var criteria_arr_len = criteria_arr.length;
	    var compare = function compare(left, right, criteria_arr, sort_mode_arr, index, len) {
	        var flag,
	            criteria = criteria_arr[index],
	            type = sort_mode_arr[index] || 'asc',
	            a = left[criteria],
	            b = right[criteria];
	        if (a > b || a === void 0) flag = 1;else if (a < b || b === void 0) flag = -1;else flag = 0;
	        if (type == 'desc') flag = -flag;
	        if (flag != 0 || index >= len - 1) return flag;else return compare(left, right, criteria_arr, sort_mode_arr, index + 1, len);
	    };
	    criteria_arr_len && data.sort(function (left, right) {
	        return compare(left, right, criteria_arr, sort_mode_arr, 0, criteria_arr.length);
	    });
	}

	function sort_handler(e) {
	    var table = this.table,
	        span = e.target,
	        th = span.parentNode,
	        criteria = th.getAttribute('class'),
	        sort_mode = span.getAttribute('class').replace(/sort/ig, '').replace(/(^\s*)|(\s*$)/ig, '');
	    if (sort_mode == 'asc') sort_mode = 'desc';else sort_mode = 'asc';
	    span.className = 'sort ' + sort_mode;
	    this.sort_by(criteria, sort_mode);
	}

	function scroll_handler(e) {
	    try {
	        var table, loca, thead;
	        !scroll_handler.cache.table && (scroll_handler.cache.table = this.table);
	        table = scroll_handler.cache.table;
	        loca = table.getBoundingClientRect();
	        thead = table.getElementsByTagName('thead')[0];
	        var top = loca.top;
	        if (top < 0) {
	            if (top + loca.height > 0) {
	                thead.style.transform = 'translateY(' + -loca.top + 'px)';
	            }
	        }
	        if (top > 0) {
	            thead.style.transform = 'translateY(' + 0 + 'px)';
	        }
	    } catch (ex) {
	        !scroll_handler.cache && (scroll_handler.cache = {});
	    }
	}
	module.exports = Table;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var U = {};
	var ArrayProto = Array.prototype,
	    ObjProto = Object.prototype,
	    FuncProto = Function.prototype;
	var push = ArrayProto.push,
	    slice = ArrayProto.slice,
	    toString = ArrayProto.toString,
	    hasOwnProperty = ObjProto.hasOwnProperty;
	var nativeIsArray = Array.isArray,
	    nativeKeys = Object.keys;
	U.isArray = nativeIsArray || function (obj) {
	    return toString.call(obj) === '[object Array]';
	};
	U.isObject = function (obj) {
	    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	    return type === 'function' || type === 'object' && !!obj; // !!obj for getting rid of 'null'
	};
	U.has = function (obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	};
	U.keys = nativeKeys || function (obj) {
	    var keys = [];
	    if (!U.isObject(obj)) return keys;
	    for (var key in obj) {
	        if (U.has(obj, key)) {
	            keys.push(key);
	        }
	    }return keys;
	};
	U.addEvent = function (ele, type, handler) {
	    if (ele.addEventListener) {
	        ele.addEventListener(type, handler, false);
	    } else if (ele.attachEvent) {
	        ele.attachEvent('on' + type, handler);
	    } else {
	        ele['on' + type] = handler;
	    }
	};
	U.removeEvent = function (ele, type, handler) {
	    if (ele.removeEventListener) {
	        ele.removeEventListener(type, handler, false);
	    } else if (ele.detachEvent) {
	        ele.detachEvent(type, handler);
	    } else {
	        ele['on' + type] = null;
	    }
	};
	module.exports = U;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./table.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./table.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "body {\r\n\theight: 1600px;\r\n\tpadding-top: 100px;\r\n}\r\n.z-table {\r\n\tborder-collapse:collapse;\r\n}\r\n\r\n.z-table thead {\r\n\tbackground-color: gray;\r\n}\r\n\r\n.z-table td, .z-table th {\r\n\tpadding: 5px 15px;\r\n\tborder: 1px solid gray;\r\n}\r\n\r\n.z-table th {\r\n\tposition: relative;\r\n}\r\n\r\n.z-table th:not(:last-child):after{\r\n\t/*border-right: 1px solid white;*/\r\n\tposition: absolute;\r\n\ttop:0;\r\n\tright: -1px;\r\n\tbottom: 0;\r\n\twidth: 1px;\r\n\tbackground-color: white;\r\n\tcontent: '';\r\n}\r\n\r\n.z-table th span.sort {\r\n\tposition: relative;\r\n\tdisplay: inline-block;\r\n\tmargin-left: 10px;\r\n\twidth: 0;\r\n    height: 0;\r\n    cursor: pointer;\r\n    transition: all .2s;\r\n}\r\n\r\n.z-table th span.sort.asc {\r\n\tborder-left: 5px solid transparent;\r\n    border-right: 5px solid transparent;\r\n    border-bottom: 10px solid white;\r\n}\r\n\r\n.z-table th span.sort.desc {\r\n\tborder-left: 5px solid transparent;\r\n    border-right: 5px solid transparent;\r\n    border-top: 10px solid white;\r\n}", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);