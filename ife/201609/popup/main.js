define(function(require, exports, module) {
    var Popup = require('./popup'),
        dom = require('./libs/dom'),
        addEvent = dom.addEvent;
    var pop = new Popup('popup', {
    	// 下面这些参数用于初始化
        width: 400,
        height: 200,
        min_width: 0, // 如果可以改变大小这里设置拖动改变大小的时候最小的宽度
        min_height: 0, // 最小高度
        visible: false, // 设置弹窗是否可见
        move: false, // 窗口是否可以拖动，这里只能按住标题栏拖动
        resize: false, // 窗口是否可以通过拖动边缘改变大小
        adaptive: false // 窗口大小是否自适应
    });
    window.pop = pop;
    pop.set_move(true).set_resize(true);
    // 控制窗口是否可以展示
    var btn1 = document.getElementById('btn1');
    btn1 && addEvent(btn1,'click',function(){
    	pop.set_visible(true);
    });
});