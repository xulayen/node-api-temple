var Common = {
    TimeFormat: function () {
        return new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    },
    TimeFormat2: function () {
        return new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()+ ' ' + new Date().getHours()+ ':' + new Date().getMinutes()+ ':' + new Date().getSeconds();
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
}

module.exports = exports = Common;