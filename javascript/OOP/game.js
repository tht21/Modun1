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
    //c.clearRect(0, 0, 368, 568);
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
          if (this.x + 40 <= 340) this.x += 0.01;
          break;
        case 40:
          this.y += 0.01;
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
    this.y += 1;
  };
  // console.log(this.src);

  this.draw = function () {
    this.random();
    c.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}
function drawPoints() {
  // console.log("drawPoints");
  c.font = "20px arial";
  point++;
  c.strokeStyle = "white";
  c.strokeText(`point: ` + point, 20, 40);
}
// function drawPause() {
//   this.img =new Image();
//   this.img.src="img/pause.png"
//  c.drawImage(this.img, 340,20,20,20)
// }
var loads = new Load();
var player = new player("./img/carRed.png", 140, 440, 40, 80);
// var a= new  enemy("./img/carPink.png");
var enemys = [];
enemys.push(new enemy("./img/carGreen.png", 60, 40, 80));
enemys.push(new enemy("./img/carGrey.png", 120, 40, 80));
enemys.push(new enemy("./img/carYellow.png", 340, 40, 80));
enemys.push(new enemy("./img/ambulance.png", 440, 40, 80));
enemys.push(new enemy("./img/carOrange.png", 540, 40, 80));
//tham so player,enemy
function vacham(dt_enemy, dt_player) {
  // console.log(dt_player);
  // console.log(dt_enemy);
  // console.log(
  //   dt_player.x + dt_player.width >= dt_enemy.x &&
  //     dt_enemy.x + dt_enemy.width >= dt_player.x &&
  //     dt_player.y + dt_player.width >= dt_enemy.y &&
  //     dt_enemy.y + dt_enemy.width >= dt_player.y
  // )
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
      this.y = 0;
    }
    this.y += 1;
  };

  this.draw = function () {
    this.animate_chay();

    // clear vach  trang
    c.clearRect(0, 0, 368, 568);
    c.beginPath();
    c.rect(canvas.width / 3 - 5, this.y - 600, 15, 80);
    c.rect(canvas.width / 3 - 5, this.y - 440, 15, 80);
    c.rect(canvas.width / 3 - 5, this.y - 400, 15, 80);
    c.rect(canvas.width / 3 - 5, this.y - 140, 15, 80);
    c.rect(canvas.width / 3 - 5, this.y, 15, 80);
    c.rect(canvas.width / 3 - 5, this.y + 140, 15, 80);
    c.rect(canvas.width / 3 - 5, this.y + 400, 15, 80);
    c.rect(canvas.width / 3 - 5, this.y + 440, 15, 80);
    c.rect(canvas.width / 3 - 5, this.y + 600, 15, 80);

    c.rect((canvas.width * 2) / 3 - 5, this.y - 600, 15, 80);
    c.rect((canvas.width * 2) / 3 - 5, this.y - 440, 15, 80);
    c.rect((canvas.width * 2) / 3 - 5, this.y - 400, 15, 80);
    c.rect((canvas.width * 2) / 3 - 5, this.y - 140, 15, 80);
    c.rect((canvas.width * 2) / 3 - 5, this.y, 15, 80);
    c.rect((canvas.width * 2) / 3 - 5, this.y + 140, 15, 80);
    c.rect((canvas.width * 2) / 3 - 5, this.y + 400, 15, 80);
    c.rect((canvas.width * 2) / 3 - 5, this.y + 440, 15, 80);
    c.rect((canvas.width * 2) / 3 - 5, this.y + 600, 15, 80);

    c.fillStyle = "white";
    c.fill();
  };
}

function endGame() {
  continueGame = false;
  end.innerHTML =
    "Game over!! " +
    "<br>" +
    "your point : " +
    point +
    "<br>" +
    "<button onclick='restart1();' > restart</button>";
}
function startGame() {
  loads.draw();
  drawPoints();
  batdau.innerHTML =
    "Bat dau game " +
    "<br>" +
    "<button onclick='loadGame1()'> bat dau</button>"
}
function loadGame1() {
  batdau.style.display = "none";
  setInterval(() => {
    if (continueGame) {
      //batdau.style.display = "none";
      player.update();
      // loads chay trc draw_player
      loads.draw();
      player.draw_player();
      enemys.forEach((enemy) => {
        enemy.draw();
        vacham(enemy, player);
      });
  
      drawPoints();
    }
  },0.1);
}
function restart1() {
  point = 0;
  end.style.display = "none";
  continueGame = false;
  return location.reload();
}
startGame();
let continueGame = true;
