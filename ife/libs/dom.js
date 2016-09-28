define(function() {
    var myOn = function(elem, event, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(event, handler);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + event, handler);
        } else {
            throw new Error('the element can not bind a event handler.');
        }
    };

    var myExtend = function(target, source) {
    	// if(Object.assign) {
    	// 	return Object.assign(target, source);
    	// }
    	for(key in source) {
    		target[key] = source[key];
    	}
    	return target;
    };
    return {
        myOn: myOn,
        myExtend: myExtend
    }
});