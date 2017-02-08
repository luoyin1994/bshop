// todo 本地存储
//防止域名重复，导致覆盖
const prefix        = 'html5_reader_'
const StorageGetter = function (key) {
    return localStorage.getItem(prefix + key)
}
const StorageSetter = function (key, val) {
    return localStorage.setItem(prefix + key, val)
}
const getBSONP      = function (url, callback) {
    return $.jsonp({
        url     : url,
        cache   : true,
        callback: 'duokan_fiction_chapter',
        success : function (result) {
            //base64解密返回的数据回去json
            let data = $.base64.decode(result)
            let json = decodeURIComponent(escape(data))
            let jsonObj = JSON.parse(json)
            callback(jsonObj)
        }
    })
}
module.exports      = util = {
    storageGetter: StorageGetter,
    storageSetter: StorageSetter,
    getBSONP     : getBSONP
}