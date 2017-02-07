(function () { //声明闭包，在闭包里做事情不会影响到其他得放
    var Util          = (function () {
        var prefix        = 'bshop_reader_'
        var StorageGetter = function (key) {
            return localStorage.getItem(prefix + key)
        }
        var StorageSetter = function (key, val) {
            return localStorage.getItem(prefix + key, val)
        }
        var getJSONP      = function (url, callback) {
            return $.jsonp({
                url     : url,
                cache   : true,
                callback: 'duokan_fiction_chapter',
                success : function (result) {
                    var data = $.base64.decode(result)
                    var json = decodeURIComponent(escape(data))
                    callback(json)
                }
            })
        }
        return {
            getJSONP     : getJSONP,
            StorageGetter: StorageGetter,
            StorageSetter: StorageSetter
        }
    })()
    var Win           = $(window)
    var Doc           = $(document)
    var RootContainer = $('#fiction_container')
    var initFontSize  = parseInt(Util.StorageGetter('font-size'))
    if (!initFontSize) {
        initFontSize = 14
    }

    var Dom = {
        //把需要多次获取的元素缓存在Dom中
        top_nav                : $('#top-nav'),
        bottom_nav             : $('.bottom_nav'),
        night_day_switch_button: $('#night-button'),
        font_container         : $('.font-container'),
        font_button            : $('#font-button'),
    }

    function main() {
        //todo 整个项目的入口函数
        var readerModle = ReaderModel()
        var readerUI = ReaderBaseFrame()
        readerModle.init(function (data) {
            ReaderBaseFrame()
        })
        EventHanlder()

    }

    function ReaderModel() {
        //todo 实现和阅读器相关的数据交互的方法
        var Chapter_id
        var init                 = function () {
            getFictionInfo(function () {
                getCurChapterContent(Chapter_id, function (data) {
                    //    todo ...
                    UIcallback && UIcallback(data)
                })
            })
        }
        var getFictionInfo       = function (callback) {
            $.get('data/chapter.json', function (data) {
                //    todo 获得信息之后的回调
                Chapter_id = data.chapters[1].chapter_id
                callback && callback()
            }, 'json')
        }
        var getCurChapterContent = function (chapter_id) {
            $.get('data/data1' + chapter_id + '.json', function (data) {
                if (data.result == 0) {
                    var url = data.jsonp
                    Util.getJSONP(url, function (data) {
                        callback && callback(data)
                    })
                }
            }, 'json')
        }
        return {
            init: init
        }

    }

    function ReaderBaseFrame() {
        //todo 渲染基本的UI结构
    }

    function EventHanlder() {
        //todo 交互的事件绑定
        //click 对于移动端pc端使用时有更好的兼容
        //点击中间屏幕toggle显示上线边栏
        $('#action_mid').click(function () {
            if (Dom.top_nav.css('display') == 'none') {
                Dom.bottom_nav.show()
                Dom.top_nav.show()
            } else {
                Dom.bottom_nav.hide()
                Dom.top_nav.hide()
                Dom.font_container.hide()
                Dom.font_button.removeClass('current')
            }
        })
        Dom.font_button.click(function () {
            if (Dom.font_container.css('display') == 'none') {
                Dom.font_container.show()
                Dom.font_button.addClass('current')
            } else {
                Dom.font_container.hide()
                Dom.font_button.removeClass('current')
            }
        })
        Dom.night_day_switch_button.click(function () {
            //   todo 触发背景切换事件

        })

        $('#large-font').click(function () {
            if (initFontSize > 20) {//通过为事件添加判断来设置极值
                return
            }
            initFontSize += 2
            RootContainer.css('font-size', initFontSize)
            Util.StorageSetter('font-size', initFontSize)//每次事件都会存储一个值
        })

        $('#small-font').click(function () {
            if (initFontSize < 12) {
                return
            }
            initFontSize -= 2
            RootContainer.css('font-size', initFontSize)
            Util.StorageSetter('font-size', initFontSize)
        })
        //滚动让上下栏消失
        Win.scroll(function () {
            Dom.top_nav.hide()
            Dom.bottom_nav.hide()
            Dom.font_container.hide()
            Dom.font_button.removeClass('current')
        })
    }

    main()

})()