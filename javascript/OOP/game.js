const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");
Player = {
  //x,y  toa do vi tri
  x: 150,
  y: 500
};
//ham lawpj di chuyen 100
setInterval(start, 100);

//hin thi
function start() {
  //clearRect xoa gias tri nhap html
  c.clearRect(0, 0, 368, 568);
  c.fillStyle = "black";
  c.fillRect(Player.x, Player.y, 30, 30);
 vatcan()
}

function vatcan() {
    c.fillStyle = "black";
  c.fillRect(10, 10, 30, 30); 
  
}
//su kien Trình lắng nghe sự kiệ
document.addEventListener("keydown", (key) => {
  switch (key.keyCode) {
    case 37: 
    if (Player.x > 0) Player.x -= 5;
    break;   
    case 38:
        Player.y -=5;
        break;
    case 39:
        if (Player.x+30<= 368) Player.x += 5;
        break;
       
    case 40:
   Player.y +=5;
        break;
  }
});
