// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
new Vue({
    el     : '#app',
    data   : {
        topBottomFlag  : false,
        hidepannel     : true,
        FontPannelFlag : false,
        bgColor        : '#f8f9c4',
        passageFontSize: '15px',
        nightFlag      : false,
    },
    mounted: function () {
        this.$nextTick(function () {
        })
    },
    methods: {
        toggleTopBottom     : function () {
            this.topBottomFlag = !this.topBottomFlag
        },
        toggleFontPannel    : function () {

            //如果要实现有动画效果的出现，不能用v-show和v-if,v-if是直接渲染或不渲染到dom里，v-show是通过display:block/none来实现显示隐藏，都会生硬的输出。
            //需要动画效果可以使用绑定一个class，通过绑定的class的移除和加入，在结合原本样式上设置的transition属性来实现
            //dispaly属性具有优先级，如果设置了none，再出现的时候直接忽略transition属性
            this.hidepannel = !this.hidepannel
        },
        changeBgColor       : function (e) {
            var target   = e.currentTarget
            this.bgColor = getComputedStyle(target, null).getPropertyValue('background-color')
        },
        enlargeFontSize     : function (flag) {
            var rate            = 1
            var max             = 25
            var min             = 10
            var passageFontSize = parseInt(this.passageFontSize)
            if (typeof flag == 'undefined' || flag > 0) {
                if (passageFontSize >= max) return
                this.passageFontSize = passageFontSize + rate + 'px'
            } else {
                if (passageFontSize <= min) return
                this.passageFontSize = passageFontSize - rate + 'px'
            }
            console.log(this.passageFontSize)
        },
        toggleDayNight      : function () {
            this.nightFlag = !this.nightFlag
        }

    }
})
