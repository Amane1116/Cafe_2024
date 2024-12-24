// 初始化地圖
mapboxgl.accessToken = '您的 Mapbox API 密鑰（可略過，因為您使用 MapTiler）';

const map = new mapboxgl.Map({
    container: 'map', // 對應 HTML 中的地圖容器
    style: 'https://api.maptiler.com/maps/a5ced2d4-f6d8-428c-9901-63ac4aa39517/style.json?key=ye1ci2MEfMPvklLaBJeM', // 地圖樣式 URL
    center: [121.54452230936191,25.024586960230437], // 初始中心座標（經度, 緯度）
    zoom: 17 // 初始縮放級別
});

// 新增標點
new mapboxgl.Marker()
    .setLngLat([121.54452230936191,25.024586960230437]) // 標點座標 
    .setPopup(new mapboxgl.Popup().setText('眠貓咖啡屋')) // 新增彈出視窗
    .addTo(map);