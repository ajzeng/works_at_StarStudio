/**
 * 说明： 弹窗的难点在于拖动时候改变弹窗的位置和大小，因为这两个操作可能相互影响，由于fixed定位的窗口距离浏览器
 * 视口左边的距离等于(obj.style.left + marginLeft + translateX),这里会有各种坑，最后决定使用一种比较简单的
 * 逻辑方式，首先就放弃使用translate (因为被它坑死了)。 初始化窗口位置的时设置, [ left: 50%, top: 50% ] 接着，
 * 取得弹窗尺寸(w,h),设置 [ marginLeft = (-w/2.0), marginTop = (-h/2.0) ] 这里不用-50%的原因是： 在改变
 * 窗口尺寸的时候，假设是拖动窗口右边框、下边框和右下角，要求宽和高变化的时候窗口上边框和左边框的位置不变。在这个
 * 假设下，如果marginLeft设置为-50%,则在窗口宽度变化的时候这个marginLeft是个变值，这样左边框位置就会
 * 变化，如果再同过其他方法设置左边框位置不变就比较复杂，所以设置margin为一个定值比较好处理。 然后，拖动窗口
 * 改变窗口尺寸的时候，通过计算 mousemove时候鼠标位置(c_x, c_y) 与之前 mousedown时候鼠标位置 的差值
 * [e.clientX - c_x, e.clientY -c_y], 可以得到窗口尺寸变化量，窗口尺寸相应的变化即可。 在拖动窗口改变他的位置
 * 的时候。 由于不用translate,所以 窗口距离浏览器适口左边的距离 [ pos_left = obj.style.left + marginLeft ]
 * 有由于 [ pos_left = box.getBoundingClientRect().left ],可以得到pos_left值，所以，在mousedown时候，
 * [ obj.style.left = pos_left - marginLeft ], 在 mousemove的时候，通过计算鼠标在x轴上的变化 
 * [ xx = e.clientX - c_x ], 就可以得到窗口此时的 [ obj.style.left = pos_left + xx ], 至于这里不用 
 * obj.style.left += xx, 是因为初始化窗口位置的时候 obj.style.left = '50%',所以不宜进行计算。
 */
define(function(require, exports, module) {
    var dom = require('./libs/dom'),
        addEvent = dom.addEvent,
        removeEvent = dom.removeEvent,
        utils = require('./libs/utils'),
        expand = utils.expand,
        event = require('./libs/event'),
        gi = function(id, caller) {
            var caller = caller || document;
            return caller.getElementById(id);
        },
        gc = function(name, caller) {
            var caller = caller || document;
            return caller.getElementsByClassName(name);
        };
    // 鼠标指针距离边框距离多少可以拖动修改窗口大小
    var DISTANCE_SIZE = 10;
    /**
     * 弹窗的构造函数
     * @param {string} id      弹窗的Id
     * @param {json} options 初始化参数
     */
    var Popup = function(id, options) {
        if (typeof id != 'string') return null;
        var wrap = this.wrap = document.getElementById(id) || null;
        if (!wrap) return null;
        this.options = {
            width: 400,
            height: 300,
            min_width: 0, // 如果可以改变大小这里设置拖动改变大小的时候最小的宽度
            min_height: 0, // 最小高度
            visible: true,
            move: true, // 窗口是否可以拖动，这里只能按住标题栏拖动
            resize: true, // 窗口是否可以通过拖动边缘改变大小
            adaptive: false, // 窗口大小是否自适应
        };
        this.p_mask = gc('mask', wrap)[0];
        this.p_box = gc('popup-box', wrap)[0];
        this.b_title = gc('popup-title', wrap)[0];
        this.b_content = gc('popup-content', wrap)[0];
        this.b_operation = gc('popup-operation', wrap)[0];
        this.o_yes = gc('popup-yes', wrap)[0];
        this.o_no = gc('popup-no', wrap)[0];
        options = options || {};
        expand(this.options, options); // 合并用户自定义参数
        this.init();
        return this; // 可以链式调用
    };
    Popup.prototype = {
        constructor: Popup,
        // 初始化设置
        init: function() {
            var wrap = this.wrap,
                mask = this.p_mask,
                opt = this.options,
                title = this.b_title;
            // 初始化窗口大小，这里不对外提供接口，所以使用私有函数
            set_size.call(this, opt.width, opt.height);
            console.log(this.options)
            init_position.call(this); // 初始化窗口位置,同理，私有函数
            this.set_adaptive(opt.adaptive); // 初始化设置窗口大小是否自适应，对外提供接口，挂载在原型上
            this.set_visible(opt.visible); // 初始化设置窗口是否展示出来
            this.set_move(opt.move); // 初始化设置窗口是否可以拖动
            this.set_resize(opt.resize); // 初始化设置窗口尺寸是否可以根据鼠标的拖动变化
            addEvent(wrap, 'mousedown', mousedown_handler.bind(this));
            addEvent(wrap, 'mousemove', resize_state_handler.bind(this));
            addEvent(window, 'resize', init_position.bind(this));
            addEvent(mask, 'click', function() {
                this.set_visible(false);
            }.bind(this));
            addEvent(this.o_yes, 'click', function() {
                alert('你点击了确定按钮');
            });
            addEvent(this.o_no, 'click', function() {
                alert('你点击了取消按钮');
            });
            // 下面可以考虑增加一个弹出框文字不能被选择的初始化设置
            return this;
        },
        // 设置窗口大小是否自适应
        set_adaptive: function(flag) {
            if (typeof flag == 'boolean') {
                var box = this.p_box,
                    op = this.b_operation,
                    opt = this.options;
                opt.adaptive = flag;
                if (flag) {
                    op.style.position = 'relative';
                    box.style.width = 'auto';
                    box.style.height = 'auto';
                    this.set_resize(false); // 自适应大小的时候，将关闭resize
                } else {
                    op.style.bottom = '0';
                    op.style.right = '0';
                    set_size.call(this, box.offsetWidth || opt.width, box.offsetHeight || opt.height);
                    // 设置position需要在设置尺寸的下面，因为如果先设置了position,弹窗尺寸已经变化了
                    op.style.position = 'absolute';
                    this.set_resize(opt.resize);
                }
            }
            return this;
        },
        // 设置弹窗是否可见
        set_visible: function(flag) {
            if (typeof flag == 'boolean') {
                this.wrap.style.display = flag ? 'block' : 'none';
            }
            return this;
        },
        // 设置弹窗是否可以改变大小
        set_resize: function(flag) {
            if (typeof flag == 'boolean') {
                this.options.resize = flag;
            }
            return this;
        },
        // 设置弹窗是否可以移动,监听拖动
        set_move: function(flag) {
            if (typeof flag == 'boolean') {
                this.options.move = flag;
                this.b_title.style.cursor = flag ? 'move' : 'default';
                //  一开始将监听写在这个位置是错误的，因为每一次set_move的时候，b_title的mousedown的注册
                //  函数就会增加一个
                // addEvent(this.b_title, 'mousedown', mousedown_handler.bind(this));
            }
            return this;
        }
    };
    // 设置窗口大小
    function set_size(w, h) {
        var box = this.p_box,
            opt = this.options;
        if (!opt.adaptive) {
            var min_w = opt.min_width,
                min_h = opt.min_height;
            w = w > min_w ? w : min_w;
            h = h > min_h ? h : min_h;
        }
        try {
            box.style.width = w + 'px';
            box.style.height = h + 'px';
        } catch (e) {
            throw e;
        }
    }
    // 设置窗口初始位置
    function init_position() {
        var box = this.p_box,
            opt = this.options,
            b_w = box.offsetWidth || opt.width,
            b_h = box.offsetHeight || opt.height;
        box.style.top = '50%';
        box.style.left = '50%';
        box.style.marginLeft = -b_w / 2.0 + 'px';
        box.style.marginTop = -b_h / 2.0 + 'px';
    }
    // 鼠标按下的处理函数
    function mousedown_handler(e) {
        var opt = this.options;
        if (e.target === this.b_title) {
            // 拖动改变弹窗位置
            // 注意js是函数作用域，下面的声明都会在该函数内访问
            var is_move = opt.move,
                wrap = this.wrap,
                box = this.p_box,
                box_ml = parseInt(box.style.marginLeft),
                box_mt = parseInt(box.style.marginTop),
                pos = box.getBoundingClientRect(),
                left = pos.left - box_ml,
                top = pos.top - box_mt,
                c_x = e.clientX,
                c_y = e.clientY;
            var move = function(e) {
                box.style.left = left + e.clientX - c_x + 'px';
                box.style.top = top + e.clientY - c_y + 'px';
            };
            // 这里将监听添加到wrap上原因：如果将监听添加到title上，鼠标拖动的过程中，
            // 鼠标移动速度超过弹窗速度是会出现鼠标离开title的情况，这时候鼠标的mousemove事件
            // 发生在title部分以外，所以窗口就不会移动，就会出现bug
            if (!is_move) {
                removeEvent(wrap, 'mousemove', move);
            } else {
                addEvent(wrap, 'mousemove', move);
                addEvent(wrap, 'mouseup', function(e) {
                    removeEvent(wrap, 'mousemove', move);
                });
            }
        } else {
            // 检测是否是拖动改变尺寸
            var mouse_state = get_cursor_state.call(this, e)
            if (opt.resize && mouse_state != 'default') {
                resize_handler.call(this, e, mouse_state);
            }
        }
    }
    // 鼠标移动过程中根据鼠标是否靠近弹窗右边框和下边框，修改鼠标cursor状态
    function resize_state_handler(e) {
        var opt = this.options,
            is_resize = opt.resize;
        if (is_resize) {
            var state = get_cursor_state.call(this, e);
            this.wrap.style.cursor = state;
        } else {
            this.wrap.style.cursor = 'default';
        }
    }
    // 改变窗口大小的处理函数
    function resize_handler(e, state) {
        // 拖拽改变弹窗尺寸
        var wrap = this.wrap,
            box = this.p_box,
            opt = this.options,
            c_x = e.clientX, // 鼠标按下时候的坐标
            c_y = e.clientY,
            box_w = box.offsetWidth, // 鼠标按下时候弹窗尺寸
            box_h = box.offsetHeight;
        var move = function(e) {
            switch (state) {
                case 'e-resize':
                case 'w-resize':
                    box.style.width = box_w + e.clientX - c_x + 'px';
                    break;
                case 's-resize':
                case 'n-resize':
                    box.style.height = box_h + e.clientY - c_y + 'px';
                    break;
                case 'se-resize':
                case 'nw-resize':
                    box.style.width = box_w + e.clientX - c_x + 'px';
                    box.style.height = box_h + e.clientY - c_y + 'px';
                    break;
                default:
                    break;
            }
        };
        addEvent(wrap, 'mousemove', move);
        addEvent(wrap, 'mouseup', function() {
            removeEvent(wrap, 'mousemove', move);
        });
    }
    // 根据鼠标指针和窗口获取鼠标指针状态
    function get_cursor_state(e) {
        // getBoundingClientRect 默认返回left, top, right, bottom四个参数
        // dom元素相对于视口的位置
        var box = this.p_box,
            position = box.getBoundingClientRect(),
            d_t = position.top,
            d_l = position.left,
            d_b = position.bottom,
            d_r = position.right,
            // box元素自身外尺寸的大小
            // w = box.offsetWidth,
            // h = box.offsetHeight,
            size = DISTANCE_SIZE,
            //鼠标指针相对于视口的位置
            cx = e.clientX,
            cy = e.clientY,
            state = 'default',
            cle = arguments.callee;
        if (!cle.title) {
            cle.title = this.b_title;
            cle.title.h = cle.title.offsetHeight;
        }
        if (cx >= d_r && cx < d_r + size && cy > d_t + cle.title.h && cy <= d_b) {
            state = 'e-resize';
        } else if (cx > d_r - size && cx < d_r && cy > d_t + cle.title.h && cy <= d_b - size) {
            state = 'w-resize';
        } else if (cx > d_l && cx <= d_r && cy >= d_b && cy < d_b + size) {
            state = 's-resize';
        } else if (cx > d_l && cx < d_r - size && cy > d_b - size && cy < d_b) {
            state = 'n-resize';
        } else if (cx > d_r - size && cx < d_r && cy > d_b - size && cy < d_b) {
            state = 'nw-resize';
        } else if (cx > d_r && cx < d_r + size && cy > d_b && cy < d_b + size) {
            state = 'se-resize';
        } else {
            state = 'default';
        }
        return state;
    }
    return Popup;
});