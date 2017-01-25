/**
 * 对应注册单个对象的换出和隐藏事件
 * @param $showEls
 * @param $event
 */
$().__proto__.eventShowOne = function ($showEl, $event, $showEls) {
    $(this).on('click', function () {
        if ($showEl.css('opacity') == 0) {
            if ($showEls) {
                $showEls.css({
                    opacity: 0

                })
            }
            $showEl.css({
                opacity: 1
            })
        } else {
            $showEl.css({
                opacity: 0

            })
        }
    })
    return true
}
/**
 * 对应注册多个对象的换出和隐藏事件
 * @param $showEls
 * @param $event
 */
$().__proto__.eventShowMany = function ($showEls, $event) {
    if ($event) $event = $event
    else $event = 'click'
    for (var i = 0, len = $(this).length; i < len; i++) {
        $($(this)[i]).eventShowOne($($showEls[i]), $event, $showEls)
    }
}