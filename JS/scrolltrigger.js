// 引入 GSAP 和 ScrollTrigger CDN（HTML 中）
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

document.addEventListener("DOMContentLoaded", function () {
gsap.registerPlugin(ScrollTrigger);

  // 動畫效果：title-template
const titles = document.querySelectorAll(".title-template");
titles.forEach((title) => {
    gsap.from(title, {
        scrollTrigger: {
        trigger: title,
        start: "top 75%", // 區塊進入視窗 25% 處觸發
        end: "bottom 25%", // 滾動到區塊底部 25% 時結束觸發
        toggleActions: "play none none none", // 只播放一次動畫
        },
        opacity: 0, // 初始透明度
        y: 50, // 從下方移入
        duration: 1, // 動畫持續時間
        ease: "power2.out", // 動畫曲線
    });
});

  // 動畫效果：products
  const products = document.querySelectorAll(".products");
  products.forEach((product) => {
    const items = product.querySelectorAll(".product-intro");
    items.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 90%", // 更早觸發，適合小螢幕
          toggleActions: "play none none none", // 只播放一次動畫
        },
        opacity: 0, // 初始透明度
        y: 50, // 從下方移入
        duration: 0.8, // 動畫持續時間
        delay: index * 0.2, // 依次延遲
        ease: "power2.out", // 動畫曲線
      });
    });
  });
});
