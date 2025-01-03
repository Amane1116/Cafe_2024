// codepen繪圖模板導入內容

//環境變數
var updateFPS = 30;
var showMouse = true;
var time = 0;
var bgColor = "#022961";

// 唱片半徑
// var cdr = 300;

//唱片放大倍率
var zoommag=0.50;
//唱片起始位置 ww.wh
let viewportWidth = window.innerWidth;
var cdw=(viewportWidth * 200) / 1920;
var cdh = (window.innerHeight / 2) + 50;

//cd圖片讀取html中img標籤的第幾個
var cdimgnum=4;

//控制
var controls = {
  speed: 0,
  fadeRate: 0.99,
  play05x: function () {
    cd.angleSpeed = 0.5;
    controls.fadeRate = 1;
  },
  play1x: function () {
    cd.angleSpeed = 1;
    controls.fadeRate = 1;
  },
  play2x: function () {
    cd.angleSpeed = 2;
    controls.fadeRate = 1;
  }
};
var gui = new dat.GUI();
gui
  .add(controls, "speed", -4, 4)
  .step(0.01)
  .onChange(function (value) {
    if (cd) {
      cd.angleSpeed = value;
    }
  })
  .listen();

gui
  .add(controls, "fadeRate", 0.8, 1)
  .step(0.001)
  .onChange(function (value) {})
  .listen();
gui.add(controls, "play1x");
gui.add(controls, "play2x");
//------------------------
// Vec2

class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  set(x, y) {
    this.x = x;
    this.y = y;
  }
  move(x, y) {
    this.x += x;
    this.y += y;
  }
  add(v) {
    return new Vec2(this.x + v.x, this.y + v.y);
  }
  sub(v) {
    return new Vec2(this.x - v.x, this.y - v.y);
  }
  mul(s) {
    return new Vec2(this.x * s, this.y * s);
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  set length(nv) {
    let temp = this.unit.mul(nv);
    this.set(temp.x, temp.y);
  }
  clone() {
    return new Vec2(this.x, this.y);
  }
  toString() {
    return `(${this.x}, ${this.y})`;
  }
  equal(v) {
    return this.x == v.x && this.y == v.y;
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  get unit() {
    return this.mul(1 / this.length);
  }
}
var a = new Vec2(3, 4);

//------
// CD的基礎建構
//------

class CD {
  // 預設值設定
  constructor(args) {
    let def = {
      r: 400,
      p: new Vec2(0, 0),
      angle: 0,
      dragging: false,
      angleSpeed: 2
    };
    // 將預設值設定到自己身上
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw() {
    ctx.save();
    ctx.rotate(this.angle);
    //繪製circle的函數
    function circle(p, r, fillColor, strokeColor) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
      }
    }
    //底色+陰影
    ctx.shadowBlur = 100;
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    circle(this.p, this.r, "black");
    ctx.shadowBlur = 0;

    //中間的顏色圈跟黑圈
    circle(this.p, 150, "#6EE7FF");
    circle(this.p, 40, "black");

    //畫上圖片
    let img = $("img");
    ctx.globalCompositeOperation = "color-burn";
    if (ww > 768) {
    ctx.drawImage(img[cdimgnum], -this.r * 0.65, -200,400,400);
    }else{
      ctx.drawImage(img[cdimgnum], -this.r * 0.55, -200,400,400);
    }
    ctx.globalCompositeOperation = "source-over";

    //金色線條
    ctx.lineWidth = 10;
    circle(this.p, 130, null, "#d6ae73");
    circle(this.p, 15, "#ddd");
    ctx.lineWidth = 1;

    //網格
    for (var i = 0; i < 40; i++) {
      circle(
        this.p,
        (i * this.r) / 40,
        null,
        `rgba(255,255,255,${(i % 5) / 20})`
      );
    }

    circle(this.p, 160, null, "white");

    // 速度線
    for (var i = 0; i < 10; i++) {
      ctx.beginPath();
      let start_angle = i;
      let end_angle = i + (Math.PI / 2) * this.angleSpeed * 0.5;
      ctx.arc(this.p.x, this.p.y, (this.r * i) / 10, start_angle, end_angle);
      let opacity = (Math.abs(this.angleSpeed) * i) / 20 + 0.1;
      //中間圓白線條
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
      ctx.stroke();
    }

    ctx.restore();
  }
  update() {
    //唱盤速度
    this.angleSpeed *= controls.fadeRate;
    this.angle += this.angleSpeed;

    //如果在唱盤上，滑鼠變可點案
    if (mousePos.sub(new Vec2(cdw, wh / 2)).length < this.r) {
      $("canvas").css("cursor", "pointer");
    } else {
      $("canvas").css("cursor", "initial");
    }

    controls.speed = this.angleSpeed;
  }
}

var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
ctx.circle = function (v, r) {
  this.arc(v.x, v.y, r, 0, Math.PI * 2);
};
ctx.line = function (v1, v2) {
  this.moveTo(v1.x, v1.y);
  this.lineTo(v2.x, v2.y);
};

function initCanvas() {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;
}
initCanvas();

var cd = null;
function init() {
  //初始化CD，畫出一張新的唱片
  cd = new CD({
    r: Math.min(ww, wh) * 0.3,
    angleSpeed: 0
  });

  //CD長大
  TweenMax.to(cd, 2, { r: Math.min(ww, wh) * zoommag });
}
let player = document.getElementById("musicBg");
// player.pause()
// player.play()

function update() {
  time++;
  cd.update();

  //如果滑鼠有被按下
  if (mousePosDown) {
    //如果有上一個按下時的角度
    if (!cd.lastAngle) {
      cd.lastAngle = cd.angle;
    }
    cd.dragging = true;

    //算出拖曳變動的角度
    let delta =
      mousePos.sub(new Vec2(cdw, wh / 2)).angle -
      mousePosDown.sub(new Vec2(cdw, wh / 2)).angle;
    cd.angle = cd.lastAngle + delta;
    cd.angleSpeed = delta;
  } else {
    //放開時清除上次按下的角度
    cd.dragging = false;
    cd.lastAngle = null;
  }

  //音樂播放速度控制
  var cur = cd.angleSpeed;
  let volume = Math.sqrt(Math.abs(cd.angleSpeed));
  if (volume > 1) volume = 1;
  if (cd.angleSpeed > 0 && cur < 0.1) {
    cur = 0.1;
  }
  if (cd.angleSpeed < 0 && cur > -1) {
    cur = -1;
  }
  player.volume = volume;
  if (cur > 0) {
    player.playbackRate = cur;
  }
}

function draw() {
  //清空背景
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, ww, wh);

  //-------------------------
  //   在這裡繪製

  ctx.save();
  ctx.translate(cdw, cdh);
  cd.draw();
  ctx.restore();

  //schedule next render

  requestAnimationFrame(draw);
}
function loaded() {
  initCanvas();
  init();
  requestAnimationFrame(draw);
  setInterval(update, 1000 / updateFPS);
}
window.addEventListener("load", loaded);
window.addEventListener("resize", initCanvas);

//滑鼠事件跟紀錄
var mousePos = new Vec2(0, 0);
var mousePosDown = null;
var mousePosUp = null;

window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseup", mouseup);
window.addEventListener("mousedown", mousedown);
function mousemove(evt) {
  mousePos.set(evt.x, evt.y);

}
function mouseup(evt) {
  mousePos.set(evt.x, evt.y);
  mousePosUp = mousePos.clone();

  //放開時清空
  mousePosDown = null;
}
function mousedown(evt) {
  mousePos.set(evt.x, evt.y);
  mousePosDown = mousePos.clone();
  player.play();
}

