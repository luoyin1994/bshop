//闭包不会影响到其他代码
(function () {
    //封装一个类
    var util = (function () {//util获取的是闭包执行后的值，是一个对象
        // todo 本地存储
        //防止域名重复，导致覆盖
        var prefix        = 'html5_reader_'
        var StorageGetter = function (key) {
            return localStorage.getItem(prefix + key)
        }
        var StorageSetter = function (key, val) {
            return localStorage.setItem(prefix + key, val)
        }
        var getBSONP      = function (url, callback) {
            return $.jsonp({
                url     : url,
                cache   : true,
                callback: 'duokan_fiction_chapter',
                success : function (result) {
                    //base64解密返回的数据回去json
                    var data = $.base64.decode(result)
                    var json = decodeURIComponent(escape(data))
                    callback(data)
                }
            })
        }
        //暴露方法
        return {
            StorageGetter: StorageGetter,
            StorageSetter: StorageSetter,
            getBSONP     : getBSONP
        }
    })()

    function main() {
        //    todo 整个项目的入口函数
        var readerModel = ReaderModel()
        readerModel.init()
    }

    function ReaderModel() {
        //    todo 实现和阅读器相关数据交互的方法
        var Chapter_id
        var init                 = function () {
            getFictionInfo(function () {
                getCurChapterContent(Chapter_id, function () {
                    //    todo ...
                })
            })
        }
        var getFictionInfo       = function (callback) {
            $.get('/test/data/chapter.json', function (data) {
                //    todo 获取章节信息后的回调
                Chapter_id = data.chapters[1].chapter_id
                callback && callback()
            }, 'json')
        }
        var getCurChapterContent = function (chapter_id,data) {
            $.get('/test/data/data' + chapter_id + '.json', function (data) {
                if (data.result == 0) {
                    var url = data.jsonp
                    util.getBSONP(url, function (data) {
                        callback && callback(data)
                    })
                }
            },'json')
        }
        return {
            init: init
        }

    }

    function ReaderBaseFrame() {
        //    todo 渲染基本的UI结构
    }

    function EventHanlder() {
        //    todo 交互的事件绑定
    }

    main()
})()
