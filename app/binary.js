let array = [];
let array_data = {i:0, j:98, highlighted: [0, 98]};
let randomNum = -1;
let searching = false;
let search_tick = 0;
const TICK_MAX = 20;
function fillArray() {
    for (let i = 1; i < 100; i++) {
        array.push(i);
    }
}

function setup() {
    document.getElementById("start-button").addEventListener("click", startSearching);
    document.getElementById("reset-button").addEventListener("click", resetSearching);
    document.getElementById("pause-button").addEventListener("click", pauseSearching);

    let w = windowWidth*0.8;
    let h = windowHeight*0.6;
    const canvas = createCanvas(w, h);
    canvas.parent('canvas-container');
    searching = false;
    background(220);
    fillArray();
}

function drawArray(w, h) { 
    for (let i = 0; i < array.length; i++) {
        stroke(0);
        if(array_data.highlighted.includes(i)){
            fill(255, 255, 0);
        }
        else if(array[i] === randomNum){
            fill(0, 255, 0);
            console.log("Found it! " + randomNum);
        }
        else{
            fill(255, (array[i]/100)*255, (array[i]/100)*255);
        }
        rect(i * w/100, h - array[i]*h/100, w/100, array[i]*h/100);
    }
}
function draw(){
    if(searching){
        if(search_tick < TICK_MAX){
            search_tick++;
        }
        else{
            search_tick = 0;
            searchStep();
        }
    }
    clear();
    let w = windowWidth*0.8;
    let h = windowHeight*0.6;
    drawArray(w, h);
}

function searchStep(){
    if(array_data.i <= array_data.j){
        let mid = Math.floor((array_data.i + array_data.j) / 2);
        if(array[mid] === randomNum){
            array_data.highlighted = [mid];
            pauseSearching();
        }
        else if(array[mid] < randomNum){
            array_data.i = mid + 1;
            array_data.highlighted = [array_data.j, array_data.i];
        }
        else{
            array_data.j = mid - 1;
            array_data.highlighted = [array_data.j, array_data.i];
        }
    }
}

function windowResized() {
    let w = windowWidth*0.8;
    let h = windowHeight*0.6;
    resizeCanvas(w, h);
}

function startSearching() {
    searching = true;
    randomNum = Math.floor(random(1,100));
    console.log(randomNum)
    array_data.i = 0;
    array_data.j = 100;
    array_data = {i:0, j:98, highlighted: [0, 98]};
    console.log(array_data);
    searchStep();
}
function pauseSearching() {
    searching = false;
}

function resetSearching() {
    searching = false;
    randomNum = -1;
    console.log(randomNum)
    array_data = {i:0, j:98, highlighted: [0, 98]};
}