
btn_1 = document.getElementById('btn_1');
btn_2 = document.getElementById('btn_2');
var haxVal = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];


btn_1.addEventListener('click', function(){
  var hexCode = "#";
  for (let i = 0; i < 6; i++) {
    hexCode += haxVal[Math.floor(Math.random() * 16)];
    console.log(hexCode);
    btn_1.innerHTML = hexCode;
  }
  updateBackground();
}); 

btn_2.addEventListener('click', function(){
  var hexCode = "#";
  for (let i = 0; i < 6; i++) {
    hexCode += haxVal[Math.floor(Math.random() * 16)];
    console.log(hexCode);
    btn_2.innerHTML = hexCode;
  }
  updateBackground();
}); 


var show_code = document.getElementById('show_code');

function updateBackground() {
  document.body.style.background = `linear-gradient(to bottom, ${btn_1.innerHTML}, ${btn_2.innerHTML})`;
  var show_code = document.getElementById('show_code');
  show_code.innerHTML = "background: " + document.body.style.background;
}


var copyButton = document.getElementById('copy');
copyButton.addEventListener('click', function (){
  var copyText = document.getElementById("copy");

  // Select the text field
  navigator.clipboard.writeText(copyText.textContent).then(() => {
    // Alert the copied text
  
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
})
























