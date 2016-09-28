define(function() {
    // 事件监听的兼容版本
    var addEvent = function(elem, event, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(event, handler);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + event, handler);
        } else {
            throw new Error('the element can not bind a event handler.' + event);
        }
    };
    var removeEvent = function(elem, event, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(event, handler, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + event, handler);
        } else {
            throw new Error('the element can not remove a event handler.' + event);
        }
    };
    return {
        addEvent: addEvent,
        removeEvent: removeEvent
    }
});