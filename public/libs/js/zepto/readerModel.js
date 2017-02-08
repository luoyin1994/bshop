const util = require('./util')
module.exports =  function() {
    //    todo 实现和阅读器相关数据交互的方法
    let Chapter_id
    let ChapterTotal
    let init                 = function (UIcallback) {
        getFictionInfo(function () {
            getCurChapterContent(Chapter_id, function (data) {
                //    todo ...
                UIcallback && UIcallback(data)
            })
        })
    }
    let getFictionInfo       = function (callback) {
        $.get('/test/data/chapter.json', function (data) {
            //    todo 获取章节信息后的回调
            Chapter_id   = data.chapters[1].chapter_id
            ChapterTotal = data.chapters.length
            callback && callback()
        }, 'json')
    }
    let getCurChapterContent = function (chapter_id, callback) {
        $.get('/test/data/data' + chapter_id + '.json', function (data) {
            if (data.result == 0) {
                let url = data.jsonp
                util.getBSONP(url, function (data) {
                    callback && callback(data)
                })
            }
        }, 'json')
    }
    let prevChapter          = function (UIcallback) {
        Chapter_id = parseInt(Chapter_id, 10)
        if (Chapter_id == 0) {
            return
        }
        Chapter_id -= 1
        getCurChapterContent(Chapter_id, UIcallback)

    }
    let nextChapter          = function (UIcallback) {
        Chapter_id = parseInt(Chapter_id, 10)
        if (Chapter_id == ChapterTotal) {
            return
        }
        Chapter_id += 1
        getCurChapterContent(Chapter_id, UIcallback)
    }
    return {
        init       : init,
        prevChapter: prevChapter,
        nextChapter: nextChapter
    }
}

