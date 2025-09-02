array = [];
const SORT_TICK_MAX = 20;
let sorting = false;
let sortTick = 0;
let sort_data = {highlighted: [], currentAlgorithm : ""};

function fillArray() {
    for (let i = 0; i < 100; i++) {
        array.push(random(100));
    }
}

function setup() {
    document.getElementById("start-button").addEventListener("click", startSorting);
    document.getElementById("reset-button").addEventListener("click", resetSorting);
    document.getElementById("pause-button").addEventListener("click", pauseSorting);
    document.getElementById("bubble-sort-button").addEventListener("click", selectedBubble);
    document.getElementById("selection-sort-button").addEventListener("click", selectedSelection);
    document.getElementById("insertion-sort-button").addEventListener("click", selectedInsertion);

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
        if(sort_data.highlighted.includes(i)){
            fill(255, 255, 0);
        }
        else{
            fill(255, (array[i]/100)*255, (array[i]/100)*255);
        }
        rect(i * w/100, h - array[i]*h/100, w/100, array[i]*h/100);
    }
}

function sortStep(){
    switch(sort_data.currentAlgorithm) {
        case 'bubble':
            bubbleSortStep();
            break;
        case 'selection':
            selectionSortStep();
            break;
        case 'insertion':
            insertionSortStep();
            break;
    }
}

function draw() {
    // Example: Draw a moving ellipse
    if(sorting){
        if(sortTick < SORT_TICK_MAX){
            sortTick++;
        }
        sortStep()
    }
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
function startSorting() {
    if(sort_data.currentAlgorithm == "") return;
    sorting = true;
}
function resetSorting() {
    console.log("reset");
    switch(sort_data.currentAlgorithm) {
        case 'bubble':
            sort_data = {currentAlgorithm: "bubble", i: array.length-1, j: 0, highlighted: [array.length-1, 0]};
            break;
        case 'selection':
            sort_data = {currentAlgorithm: "selection", i: 0, j: 0, highlighted: [0, 0]};
            break;
        case 'insertion':
            sort_data = {currentAlgorithm: "insertion", i: 0, j: 0, highlighted: [0, 0]};
            break;
    }
    sorting = false;
    array = [];
    fillArray();
}
function pauseSorting() {
    sorting = false;
}
function bubbleSortStep(){
    if(sort_data.i  == 0){
        pauseSorting();
        return;
    }
    if(sort_data.j <= sort_data.i){
        if(array[sort_data.j] > array[sort_data.j+1]){
            let temp = array[sort_data.j];
            array[sort_data.j] = array[sort_data.j+1];
            array[sort_data.j+1] = temp;
            sort_data.highlighted = [sort_data.j, sort_data.j + 1, sort_data.i];
        }
        else{
            sort_data.j++;
            sort_data.highlighted = [sort_data.j, sort_data.i];
        }
    } else{
        sort_data.j = 0;
        sort_data.i--;
        sort_data.highlighted = [sort_data.i, sort_data.j];
    }
    
}
function selectionSortStep(){

}
function insertionSortStep(){
}
function selectedBubble(){
    sort_data = {currentAlgorithm: "bubble", i: array.length-1, j: 0, highlighted: [array.length-1, 0]};
    document.getElementById("bubble-sort-button").classList.add("selected");
    document.getElementById("selection-sort-button").classList.remove("selected");
    document.getElementById("insertion-sort-button").classList.remove("selected");
}
function selectedSelection(){
    sort_data = {currentAlgorithm: "selection", i: 0, j: 0, highlighted: [0, 0]};
    document.getElementById("selection-sort-button").classList.add("selected");
    document.getElementById("bubble-sort-button").classList.remove("selected");
    document.getElementById("insertion-sort-button").classList.remove("selected");
}
function selectedInsertion(){
    sort_data = {currentAlgorithm: "insertion", i: 0, j: 0, highlighted: [0, 0]};
    document.getElementById("insertion-sort-button").classList.add("selected");
    document.getElementById("bubble-sort-button").classList.remove("selected");
    document.getElementById("selection-sort-button").classList.remove("selected");
}