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
U.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
};
U.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj; // !!obj for getting rid of 'null'
};
U.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
};
U.keys = nativeKeys || function(obj) {
    var keys = [];
    if (!U.isObject(obj)) return keys;
    for (var key in obj)
        if (U.has(obj, key)) {
            keys.push(key);
        }
    return keys;
};
U.addEvent = function(ele, type, handler) {
    if (ele.addEventListener) {
        ele.addEventListener(type, handler, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, handler);
    } else {
        ele['on' + type] = handler;
    }
};
U.removeEvent = function(ele, type, handler) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, handler, false);
    } else if (ele.detachEvent) {
        ele.detachEvent(type, handler);
    } else {
        ele['on' + type] = null;
    }
};
module.exports = U;