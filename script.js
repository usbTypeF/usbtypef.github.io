var number = 0;
document.body.style.cursor = 'none';

function asdf()
{
    number++;
    console.log(number);
    document.getElementById("number").innerHTML = number;
}

function draw() {
    const canvas = document.getElementById("mouse");
    canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
      
  
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
}

function updatemouse()
{
    const canvas = document.getElementById("mouse");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var x = event.clientX;
    var y = event.clientY;
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.stroke();
}

draw();
