array = [];
function fillArray() {
    for (let i = 0; i < 100; i++) {
        array.push(random(100));
    }
}

function setup() {
    let w = windowWidth*0.8;
    let h = windowHeight*0.6;
    const canvas = createCanvas(w, h);
    canvas.parent('canvas-container');

    background(220);
    fillArray();
}

function drawArray(w, h) {
    
    for (let i = 0; i < array.length; i++) {
        stroke(0);
        fill(255, (array[i]/100)*255, (array[i]/100)*255);
        rect(i * w/100, height - array[i]*4, w/100, array[i]*4);
    }
}

function draw() {
    // Example: Draw a moving ellipse
    clear();
    let w = windowWidth*0.8;
    let h = windowHeight*0.6;
    drawArray(w, h);
}
function windowResized() {
    let w = windowWidth*0.8;
    let h = windowHeight*0.6;
    resizeCanvas(w, h);
}