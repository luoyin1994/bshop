/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports) {

new Vue({
    el     : '#app',
    data   : {
        fictionData    : '',
        topBottomFlag  : false,
        hidepannel     : true,
        FontPannelFlag : false,
        bgColor        : '#ffffe9',
        passageFontSize: '15px',
        nightFlag      : false,
        alertFlag      : false,
        chapterId      : 1,
        chapterTotal   : 1
    },
    mounted: function () {
        var _this = this
        this.$nextTick(function () {
            this.ReaderModel()
            this.ReaderModel.init(function (data) {
                _this.fictionData = data
            })
            this.Util()
            this.getStorage()
        })
    },
    methods: {
        getStorage      : function () {
            this.bgColor         = this.Util.StorageGetter('last_bgColor') ? this.Util.StorageGetter('last_bgColor') : '#ffffe9'
            this.passageFontSize = this.Util.StorageGetter('last_passageFontSize') ? this.Util.StorageGetter('last_passageFontSize') : '15px'
            this.chapterId       = this.Util.StorageGetter('last_chapterId') ? this.Util.StorageGetter('last_chapterId') : 0
            this.nightFlag       = (this.Util.StorageGetter('last_nightFlag') === 'true') ? true : false
        },
        toggleTopBottom : function () {
            this.topBottomFlag = !this.topBottomFlag
        },
        toggleFontPannel: function () {
            //如果要实现有动画效果的出现，不能用v-show和v-if,v-if是直接渲染或不渲染到dom里，v-show是通过display:block/none来实现显示隐藏，都会生硬的输出。
            //需要动画效果可以使用绑定一个class，通过绑定的class的移除和加入，在结合原本样式上设置的transition属性来实现
            //dispaly属性具有优先级，如果设置了none，再出现的时候直接忽略transition属性
            this.hidepannel = !this.hidepannel
        },
        changeBgColor   : function (e) {
            var target   = e.currentTarget
            this.bgColor = getComputedStyle(target, null).getPropertyValue('background-color')
            this.Util.StorageSetter('last_bgColor', this.bgColor)
        },
        enlargeFontSize : function (flag) {
            var rate            = 1
            var max             = 25
            var min             = 10
            var passageFontSize = parseInt(this.passageFontSize)
            if (typeof flag == 'undefined' || flag > 0) {
                if (passageFontSize >= max) return
                this.passageFontSize = passageFontSize + rate + 'px'
            } else if (flag < 0) {
                if (passageFontSize <= min) return
                this.passageFontSize = passageFontSize - rate + 'px'
            } else {
                this.passageFontSize = '15px'
            }
            this.Util.StorageSetter('last_passageFontSize', this.passageFontSize)
        },
        toggleDayNight  : function () {
            this.nightFlag = !this.nightFlag
            this.Util.StorageSetter('last_nightFlag', this.nightFlag)
        },
        prevChapter     : function (e) {
            var _this = this
            this.stopBubble(e)
            this.ReaderModel.prevChapter(function (data) {
                _this.fictionData = data
            })
            console.log(this.chapterId)
        },
        nextChapter     : function (e) {
            var _this = this
            this.stopBubble(e)
            this.ReaderModel.nextChapter(function (data) {
                _this.fictionData = data
            })
            console.log(this.chapterId)
        },
        stopBubble      : function (e) {
            if (e && e.stopPropagation) e.stopPropagation()
            else window.event.cancelBubble = true
        },
        Util            : function () {
            this.Util = (function () {
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
                            var data     = $.base64.decode(result)
                            var json     = decodeURIComponent(escape(data))
                            var jsonData = JSON.parse(json)
                            callback(jsonData)
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
        },
        ReaderModel     : function () {
            var _this        = this
            this.ReaderModel = (function () {
                //    todo 实现和阅读器相关数据交互的方法
                var init                 = function (UIcallback) {
                    getFictionInfo(function () {
                        getCurChapterContent(_this.chapterId, function (data) {
                            //    todo ...
                            UIcallback && UIcallback(data)
                        })
                    })
                }
                var getFictionInfo       = function (callback) {
                    $.get('/test/data/chapter.json', function (data) {
                        //    todo 获取章节信息后的回调
                        // if (_this.chapterId == null) {
                        //     _this.chapterId = data.chapters[0].chapterId
                        // }
                        _this.chapterTotal = data.chapters.length
                        callback && callback()
                    }, 'json')
                }
                var getCurChapterContent = function (chapterId, callback) {
                    $.get('/test/data/data' + chapterId + '.json', function (data) {
                        if (data.result == 0) {
                            var url = data.jsonp
                            _this.Util.getBSONP(url, function (data) {
                                callback && callback(data)
                            })
                        }
                    }, 'json')
                }
                var prevChapter          = function (UIcallback) {
                    _this.chapterId = parseInt(_this.chapterId, 10)
                    _this.chapterId -= 1
                    if (_this.chapterId < 0) {
                        _this.alertFlag = true
                        _this.chapterId = 0
                        return
                    }
                    getCurChapterContent(_this.chapterId, UIcallback)
                    _this.Util.StorageSetter('last_chapterId', _this.chapterId)
                }
                var nextChapter          = function (UIcallback) {
                    _this.chapterId = parseInt(_this.chapterId, 10)
                    _this.chapterId += 1
                    if (_this.chapterId > _this.chapterTotal - 1) {
                        _this.alertFlag = true
                        _this.chapterId = _this.chapterTotal - 1
                        return
                    }
                    getCurChapterContent(_this.chapterId, UIcallback)
                    _this.Util.StorageSetter('last_chapterId', _this.chapterId)
                }
                return {
                    init       : init,
                    prevChapter: prevChapter,
                    nextChapter: nextChapter
                }
            })()
        },
    }
})


/***/ })

/******/ });