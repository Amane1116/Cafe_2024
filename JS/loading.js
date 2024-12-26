var percent = 0;

var timer = setInterval(function () {
    $(".bar").css("width", percent + "%");
    percent += 2.5;
    if (percent > 100) {
        $(".pageLoading").addClass("complete");
        clearInterval(timer);

        // 開啟頁面滾動
        // $("html, body").css("overflow-y", "auto"); 
        // 恢復滾動

        // 將滾動條設回頁面頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}, 30);

// 下方測試
