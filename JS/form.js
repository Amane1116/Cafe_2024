// 預設值設定函數
function setDefaultValues() {
    const today = new Date();

    // 設定日期為今天的格式 YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份補零
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    document.getElementById('date').value = todayString;

    // 設定時間為當前時間，格式 HH:MM
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    document.getElementById('time').value = currentTime;

    // 設定人數為 1
    document.getElementById('guests').value = 1;
}

// 在頁面載入時執行
window.addEventListener('DOMContentLoaded', setDefaultValues);