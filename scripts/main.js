
var inp_as=document.getElementById('a_size'),array_size=inp_as.value;
var inp_gen=document.getElementById("a_generate");
var inp_aspeed=document.getElementById("a_speed");


var butts_algos=document.querySelectorAll(".algos button");

var div_sizes=[];
var divs=[];
var margin_size;
var cont=document.getElementById("array_container");
cont.style="flex-direction:row";



inp_gen.addEventListener("click",generate_array);
inp_as.addEventListener("input",update_array_size);

function generate_array()
{
    cont.innerHTML="";

    for(var i=0;i<array_size;i++)
    {
        div_sizes[i]=Math.floor(Math.random() * 0.5*(inp_as.max - inp_as.min) ) + 10;
        divs[i]=document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:#191970; width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
}

function update_array_size()
{
    array_size=inp_as.value;
    generate_array();
}

window.onload=update_array_size();

for(var i=0;i<butts_algos.length;i++)
{
    butts_algos[i].addEventListener("click",runalgo);
}

function disable_buttons()
{
    for(var i=0;i<butts_algos.length;i++)
    {
        butts_algos[i].classList=[];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled=true;
        inp_as.disabled=true;
        inp_gen.disabled=true;
        inp_aspeed.disabled=true;
    }
}





// Function to analyze array characteristics
function analyzeArray(arr) {
    const n = arr.length;
    
    // Check if array is nearly sorted
    let inversions = 0;
    let sortedCount = 0;
    for(let i = 0; i < n-1; i++) {
        if(arr[i] <= arr[i+1]) sortedCount++;
        if(arr[i] > arr[i+1]) inversions++;
    }
    
    // Calculate characteristics
    const nearlySorted = inversions <= n * 0.1;
    const reverseSorted = inversions >= n * 0.9;
    const partiallySorted = sortedCount >= n * 0.5;
    
    // Determine best algorithm based on characteristics
    if(nearlySorted) {
        return {
            algorithm: "Insertion",
            reason: "Array is nearly sorted - Insertion Sort performs best on nearly sorted arrays with O(n) time"
        };
    }
    else if(reverseSorted) {
        return {
            algorithm: "Quick",
            reason: "Array is reverse sorted - Quick Sort with good pivot selection handles this well"
        };
    }
    else if(n <= 50) {
        return {
            algorithm: "Insertion",
            reason: "Small array size - Insertion Sort performs well on small datasets due to low overhead"
        };
    }
    else if(partiallySorted) {
        return {
            algorithm: "Merge",
            reason: "Partially sorted array - Merge Sort guarantees O(n log n) regardless of input order"
        };
    }
    else {
        return {
            algorithm: "Heap",
            reason: "Random order array - Heap Sort provides consistent O(n log n) performance with O(1) space"
        };
    }
}

// Function to update the best algorithm display
function updateBestAlgoDisplay(selectedAlgo) {
    const recommendation = analyzeArray(div_sizes);
    const bestAlgoSpan = document.getElementById("best_algo");
    
    if(selectedAlgo === recommendation.algorithm) {
        bestAlgoSpan.innerHTML = `${recommendation.algorithm} (Good choice! ${recommendation.reason})`;
        bestAlgoSpan.style.color = "#4CAF50"; // Green for good choice
    } else {
        bestAlgoSpan.innerHTML = `${recommendation.algorithm} would be better (${recommendation.reason})`;
        bestAlgoSpan.style.color = "#FF5722"; // Orange for suggesting a different choice
    }
}

// Modify the existing runalgo function to include recommendation
function runalgo() {
    disable_buttons();
    this.classList.add("butt_selected");
    
    // Update best algorithm recommendation
    updateBestAlgoDisplay(this.innerHTML);
    
    switch(this.innerHTML) {
        case "Bubble": Bubble();
                    break;
        case "Selection": Selection_sort();
                    break;
        case "Insertion": Insertion();
                    break;
        case "Merge": Merge();
                    break;
        case "Quick": Quick();
                    break;
        case "Heap": Heap();
                    break;
    }
}
