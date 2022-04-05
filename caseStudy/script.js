const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");
const end = document.getElementById("endScreen");
const batdau = document.getElementById("batdau");
const points = document.getElementById("point");
var point = 0;
function player(imgSrc, x, y, width, height) {
  this.img = new Image();
  this.img.src = imgSrc;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.draw_player = function () {
    //hien thi player
    //c.clearRect(0, 0, 370, 568);
    c.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  this.update = function () {
    //su kien Trình lắng nghe sự kiện
    document.addEventListener("keydown", (key) => {
      switch (key.keyCode) {
        case 37:
          if (this.x > 0) this.x -= 0.01;
          break;
        case 38:
          if (this.y > 0) this.y -= 0.01;
          break;
        case 39:
          if (this.x + 40 <= 360) this.x += 0.01;
          break;
        case 40:
          if (this.y + 40 <= 640) this.y += 0.01;
          break;
      }
    });
  };
}

function enemy(imgSrc, delay = 0, width, height) {
  this.width = width;
  this.height = height;
  this.img = new Image();
  this.img.src = imgSrc;

  this.x = Math.floor(Math.random() * (canvas.width - this.width));
  this.y = -this.height - delay;
  this.random = function () {
    if (this.y > canvas.height) {
      this.x = Math.floor(Math.random() * (canvas.width - this.width));
      this.y = -this.height;
    }
    this.y += 1.2;
  };
  // console.log(this.src);

  this.draw = function () {
    this.random();
    c.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}
function drawPoints(dt_player,dt_enemy) {
  // console.log("drawPoints");
  c.font = "20px arial";
if (dt_player == dt_enemy) point=point+1;

  c.strokeStyle = "white";
  c.strokeText(`point: ` + point, 20, 40);
}
var loads = new Load();
let audio = new Audio("./audio/audio.mp3");
var player = new player("./img/carOrange.png", 140, 540, 50, 100);
// var a= new  enemy("./img/carPink.png");
var enemys = [];
 enemys.push(new enemy("./img/carGreen.png", 50, 50, 100));
enemys.push(new enemy("./img/ambulance.png", 150, 50, 100));
enemys.push(new enemy("./img/carYellow.png", 360, 50, 100));
enemys.push(new enemy("./img/carPink.png", 640, 50, 100));
//tham so player,enemy
function vacham(dt_enemy, dt_player) {
  // console.log(dt_player);
  // console.log(dt_enemy);
  if (
    (dt_player.x + dt_player.width >= dt_enemy.x &&
      dt_enemy.x + dt_enemy.width >= dt_player.x &&
      dt_player.y + dt_player.width >= dt_enemy.y &&
      dt_enemy.y + dt_enemy.width >= dt_player.y) == true
  ) {
    endGame();
  }
}
//ham  ve vach trang
function Load() {
  this.y = 0;
  this.animate_chay = function () {
    if (this.y > canvas.height) {
      this.y = 0.1;
    }
    this.y += 1;
  };

  this.draw = function () {
    c.beginPath();
    this.animate_chay();
    // clear vach  trang
    c.clearRect(0, 0, 370, 705);

    c.rect(canvas.width / 3 - 10, this.y - 705, 20, 100);
    c.rect(canvas.width / 3 - 10, this.y - 528, 20, 100);
    c.rect(canvas.width / 3 - 10, this.y - 352, 20, 100);
    c.rect(canvas.width / 3 - 10, this.y - 176, 20, 100);
    c.rect(canvas.width / 3 - 10, this.y, 20, 100);
    c.rect(canvas.width / 3 - 10, this.y + 176, 20, 100);
    c.rect(canvas.width / 3 - 10, this.y + 352, 20, 100);
    c.rect(canvas.width / 3 - 10, this.y + 528, 20, 100);
    c.rect(canvas.width / 3 - 10, this.y + 705, 20, 100);

    c.rect((canvas.width * 2) / 3 - 10, this.y - 705, 20, 100);
    c.rect((canvas.width * 2) / 3 - 10, this.y - 528, 20, 100);
    c.rect((canvas.width * 2) / 3 - 10, this.y - 352, 20, 100);
    c.rect((canvas.width * 2) / 3 - 10, this.y - 176, 20, 100);
    c.rect((canvas.width * 2) / 3 - 10, this.y, 20, 100);
    c.rect((canvas.width * 2) / 3 - 10, this.y + 176, 20, 100);
    c.rect((canvas.width * 2) / 3 - 10, this.y + 352, 20, 100);
    c.rect((canvas.width * 2) / 3 - 10, this.y + 528, 20, 100);
    c.rect((canvas.width * 2) / 3 - 10, this.y + 705, 20, 100);

    c.fillStyle = "white";
    c.fill();
  };
}

function endGame() {
  audio.pause();
  continueGame = false;
  end.innerHTML =
    "Game over!! " +
    "<br>" +
    "your point : " +
    point +
    "<br>" +
    "<button class =' btn-9' onclick='restart1();' > RESTART</button>";
}
function startGame() {
  loads.draw();
  drawPoints();
  batdau.innerHTML =
    "<p class='para-typo'>📌Welcome to  Game ViệtPro</p>" +
    '<p class="para-typo">  📌Use Arrow Keys to move</p>' +
    '<p class="para-typo">  📌If you collide with another vehicle, you lose .</p>' +
    "<button class='custom-btn btn-9' onclick='loadGame1()'> START</button></div>";
}
function loadGame1() {
  batdau.style.display = "none";
  setInterval(() => {
    if (continueGame) {
      audio.play();
      // loads chay trc draw_player
      loads.draw();
      player.draw_player();
      player.update();
      enemys.forEach((enemy) => {
        enemy.draw();
        vacham(enemy, player);
      });

      drawPoints();
    }
  }, 1);
}

function restart1() {
  return location.reload();
}
startGame();
let continueGame = true;
