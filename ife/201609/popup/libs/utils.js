define(function() {
    // 单层对象的合并
    var expand = function(target, source) {
        // if(Object.assign) {
        //  return Object.assign(target, source);
        // }
        for (key in source) {
            target[key] = source[key];
        }
    };
    return {
        expand: expand
    }
});