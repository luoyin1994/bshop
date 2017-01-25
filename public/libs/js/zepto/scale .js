/**
 * 点击一个元素使另一个元素字体放大缩小
 * @param eventEl 点击的元素
 * @param scaleEls 点击后缩放的元素，单个为或相同多个直接传入，
 *                 多个可以传入对象，格式为{
 *                        element1:{
                            el:真正的对象
                            scale:...
                            scaleExtreme:...
 *                        }
 *                 }
 * @param scaleAttr 必须，正为放大，负为缩小，为每个传入的scaleEls添加箱体用的属性，单个是number，多个是arr
 *                  格式为 1 [1.1,1.8]
 * @param event 可选，默认为click
 */
function scale(eventEl, scaleEls, scaleAttr, event) {//scaleEls可以自定义多个也可以是一个
    var scaleMax = 1.2  //设置title的最大缩放
    var scaleMin = 0.8  //设置title的最小缩放
    if (!event) event = 'click'
    var len = scaleEls.length
    if (len) {//如果传进来的是一个$()对象//纯js对象length属性为undefined
        if (len == 1) {
            scaleEls = {
                title: {
                    el: scaleEls
                }
            }

        } else {
            scaleEls = {
                e: {
                    el: scaleEls
                }
            }
        }
    }
    if (typeof scaleAttr == 'number' && !isNaN(scaleAttr)) {//只有变化率没有极值的时候
        for (var key in scaleEls) {
            scaleEls[key].scale = scaleAttr
        }
    }
    if (Array.isArray(scaleAttr)) { //有则为所有需要改变的目标对象强制增加或修改缩放值
        for (var key in scaleEls) {
            scaleEls[key].scale        = scaleAttr[0]
            scaleEls[key].scaleExtreme = scaleAttr[1]
        }
    }
    if (scaleEls.title) {
        if (scaleEls.title.scale > 1) scaleEls.title.scaleExtreme = scaleMax //首先要判断title的存在，不认后报错
        if (scaleEls.title.scale < 1) scaleEls.title.scaleExtreme = scaleMin
    }
    var initFontSizes = []
    for (key in scaleEls) {
        var initFontSize = scaleEls[key].el.css('font-size').split('px')[0]
        initFontSizes.push(initFontSize)
    }
    eventEl.on(event, function () { //添加事件
        for (key in scaleEls) {
            var scaleRatio = scaleEls[key].el.css('font-size').split('px')[0] / initFontSizes //变动的就需要用变动的数
            if (scaleEls[key].scale < 1 && scaleRatio < scaleEls[key].scaleExtreme) {
                scaleEls[key].el.css({
                    'font-size': scaleEls[key].el.css('font-size')
                })
            } else if (scaleEls[key].scale > 1 && scaleRatio > scaleEls[key].scaleExtreme) {
                scaleEls[key].el.css({
                    'font-size': scaleEls[key].el.css('font-size')
                })
            } else {
                scaleEls[key].el.css({
                    'font-size': scaleEls[key].el.css('font-size').split('px')[0] * scaleEls[key].scale + 'px'
                })
            }
        }
    })
}

module.exports = scale