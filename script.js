var number = 0;
var plus, minus = 1;
var b, a = 1;
document.getElementById("test").innerHTML = number;
document.getElementById("test2").innerHTML = minus;
document.getElementById("test3").innerHTML = a;

function asdf()
{
    plus = a * minus;
    number += plus;
    document.getElementById("test").innerHTML = number.toFixed(1);
}

function add()
{
    minus += number / 100
    number = 0;
    document.getElementById("test").innerHTML = number.toFixed(1);
    document.getElementById("test2").innerHTML = minus.toFixed(1);
}

function big()
{
    if(number >= 10)
    {
        a += Math.log10(number) - 1;
        number = 0;
        document.getElementById("test").innerHTML = number.toFixed(1);
        document.getElementById("test2").innerHTML = minus.toFixed(1);
        document.getElementById("test3").innerHTML = a.toFixed(1);
    }
}

function updatemouse()
{
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var x = event.clientX;
    var y = event.clientY;
    ctx.fillRect((x - window.height), (y - screen.height * 0.2)/4, 10, 10);
    /*ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();*/
}
