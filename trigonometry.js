var ctx;
var ang = Math.PI/4;
var clicked;

function init() {
    var g = document.querySelector("#trig");
    g.addEventListener("mousedown",doMouseDown,false);
    g.addEventListener("mouseup",doMouseUp,false);
    g.addEventListener("mouseout",doMouseOut,false);
    g.addEventListener("mousemove",doMouseMove,false);

    ctx = g.getContext("2d");
    draw();
}

window.onload = init;

function draw() {
    clear(ctx);
    var height = ctx.canvas.height;
    var width = ctx.canvas.width;
    var radius = 100;
    var i,n,dx;
    var freq = width/(4*Math.PI);

    ctx.lineWidth = 3;
    ctx.save();
    ctx.translate(0,height);
    ctx.scale(1,-1);
    ctx.translate(width/2,height/2);

    ctx.beginPath();
    ctx.moveTo(0,-height/2);
    ctx.lineTo(0,height/2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(-width/2,0);
    ctx.lineTo(width/2,0);
    ctx.stroke();

    ctx.strokeStyle = "red";
    ctx.beginPath();
    n = 1000;
    dx = width/(50*n);
    ctx.moveTo(-width/2,radius*Math.sin(-n*dx));
    for (i=-n+1; i< n; i++) {
	ctx.lineTo(freq*i*dx,radius*Math.sin(i*dx));
    }
    ctx.stroke();

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    n = 1000;
    dx = height/(50*n);
    ctx.moveTo(radius*Math.cos(-n*dx),-height/2);
    for (i=-n+1; i< n; i++) {
	ctx.lineTo(radius*Math.cos(i*dx),freq*i*dx);
    }
    ctx.stroke();

    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(radius*Math.cos(ang),radius*Math.sin(ang));
    ctx.stroke();

    ctx.setLineDash([2,2]);
    ctx.beginPath();
    ctx.moveTo(freq*ang,0);
    ctx.lineTo(freq*ang,radius*Math.sin(ang));
    ctx.lineTo(radius*Math.cos(ang),radius*Math.sin(ang));
    ctx.lineTo(radius*Math.cos(ang),freq*ang);
    ctx.lineTo(0,freq*ang);
    ctx.stroke();
    ctx.setLineDash([5,0]);
    
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(radius*Math.cos(ang),radius*Math.sin(ang),5,0,2*Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(radius*Math.cos(ang),radius*Math.sin(ang),5,0,2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(freq*ang,radius*Math.sin(ang),5,0,2*Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(freq*ang,radius*Math.sin(ang),5,0,2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(radius*Math.cos(ang),freq*ang,5,0,2*Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(radius*Math.cos(ang),freq*ang,5,0,2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0,freq*ang,5,0,2*Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0,freq*ang,5,0,2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(freq*ang,0,5,0,2*Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(freq*ang,0,5,0,2*Math.PI);
    ctx.stroke();

  
    ctx.restore();
}

function getRelativeCoords(event) {
    if (event.offsetX !== undefined && event.offsetY !== undefined) { return { x: event.offsetX, y: event.offsetY }; }
    return { x: event.layerX, y: event.layerY };
}


function reset(e) {
    var coords = getRelativeCoords(e);
    var pos = [];
    pos.x = coords.x - parseInt(window.getComputedStyle(ctx.canvas).marginLeft,10) - parseInt(window.getComputedStyle(ctx.canvas).marginRight,10);
    pos.y = coords.y - parseInt(window.getComputedStyle(ctx.canvas).marginTop,10) - parseInt(window.getComputedStyle(ctx.canvas).marginBottom,10);

    var height = ctx.canvas.height;
    var width = ctx.canvas.width;

    nang = Math.atan2(-pos.y+height/2,pos.x-width/2);
    if (nang > Math.PI + ang) {
	nang -= 2*Math.PI;
    } else if (nang < ang - Math.PI) {
	nang += 2*Math.PI;
    }
    ang = nang;
    draw();
}

function doMouseOut(e) {
    if (clicked) {
	clicked = false;
	reset(e);
    }
}

function doMouseMove(e) {
    if (clicked) {
	reset(e);
    }
}

function doMouseUp(e) {
    clicked = false;
    reset(e);
}

function doMouseDown(e) {
    console.log("called");
    clicked = true;
    reset(e);
}

function clear(c) {
    c.save();
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    c.restore();
}
