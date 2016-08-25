//beeMVC 
var beeMVC = (function(beeMVC){

    //私有变量
    //数据模型的构造函数
    var _Model = function(value) {
        this._value = typeof value === 'undefined' ? '' : value;
        this._listeners = [];
    }

    //覆盖原型，添加方法
    _Model.fn = _Model.prototype = {
        //数据模型改变的时候，触发事件（操作view）
        set:function (value) {
            var that = this;
            that._value = value;
            setTimeout(function () {
                that._listeners.forEach(function (listener) {
                    listener.call(that, value);
                });
            });
        },
        //观察
        watch:function (listener) {
            this._listeners.push(listener);
        },
        //和视图（DOM）建立绑定关系
        bind:function (node) {
            this.watch(function (value) {
                node.innerHTML = value;
            });
        }
    }

    //数据模型
    beeMVC.Model = _Model;

    //控制器
    beeMVC.Controller = function(callback) {
        var models = {};
        var views = Array.prototype.slice.call(document.querySelectorAll('[bind]'), 0);
        views.forEach(function (view) {
            var modelName = view.getAttribute('bind');
            (models[modelName] = models[modelName] || new beeMVC.Model()).bind(view);
        });
        callback.call(this, models);
    }

    return beeMVC;
})(beeMVC||{});



//倒计时
$(function(){

    new beeMVC.Controller(function (models) {
        var n=999;
        function sub() {
            n--;
            models.time.set(n);
        }
        sub();
        setInterval(sub, 1000);
    });

});