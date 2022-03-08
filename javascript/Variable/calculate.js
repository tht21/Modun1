var x=""; //x dai dien cho phim 123456789
function insert( num){
   document.getElementById("gia_tri_xuat").innerText+=num;
   document.getElementById("gia_tri_xuat").value = x;
}
function key_CE(){
    document.getElementById("gia_tri_xuat").innerText =x;
}
function key_C() {
    let s=document.getElementById("gia_tri_xuat").innerText;
    kq= s.substr(0,s.length-1);
   document.getElementById("gia_tri_xuat").innerText =kq;
}
function calculate() {
     r = document.getElementById("gia_tri_xuat").innerText;
     document.getElementById("gia_tri_xuat").innerText = eval(r);

}