'use strict'
var gNums = [];
var wins = 0;
var rowsCols = 0;
// var countSeconds = 0;
var timerIndex = 0;

function init() {
    reset();
    startTime();

    rowsCols = getRadioValue();
    createItem(rowsCols);
    renderBoard();


}


function renderBoard() {
    var nums = copyItems(gNums);
    var strHTML = '';
    var index = 0;
    var getSpan = document.querySelector('.number');

    getSpan.innerText = gNums[wins] ? gNums[wins] : 1;

    var rootNum = Math.sqrt(rowsCols);


    for (var i = 0; i < rootNum; i++) {
        strHTML += '<tr>'

        for (var j = 0; j < rootNum; j++) {


            strHTML += `<td data-id="${nums[index]}" class="cursor" onclick="cellClicked(this)">`;

            strHTML += nums[index];

            strHTML += '</td>';
            index++;
        }
        strHTML += '</tr>'
    }


    var elBoard = document.querySelector('.board');

    elBoard.innerHTML = strHTML;



}







function cellClicked(elClicked) {

    //console.log(elClicked);
    var getSpan = document.querySelector('.number');

    var clickedNum = elClicked.innerText;

    if (clickedNum === gNums[wins].toString()) {
        wins++;
        getSpan.innerText = gNums[wins];


        elClicked.classList.add('color');
        if (wins === gNums.length) {
            getSpan.innerText = 'Finish';
            stoptimer(timerIndex);

        }
    }

}
function reset() {

    wins = 0;
    gNums = [];

    var getSpan = document.querySelector('.number');

    getSpan.innerText = gNums[wins];

    // countSeconds = 0;
    stoptimer(timerIndex);


}








function getRadioValue() {
    var radios = document.getElementsByName('radioBtn');
    var radioValue = null;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            radioValue = radios[i].value;


            break;
        }
    }
    return radioValue;
}


function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = rndNum(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function createItem(number) {
    number = +number;
    for (var i = 1; i <= number; i++) {
        gNums.push(i);
    }
    console.log('gNums', gNums);
}

function copyItems(nums) {
    var newItem = nums.slice();
    shuffle(newItem);
    return newItem;
}

function rndNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function startTime() {
    var timerSpan = document.querySelector('.timer');
    var start = Date.now();
    var timer = setInterval(function () {


        // timerSpan.innerText = countSeconds;
        // countSeconds++;

        var end = Date.now() - start;

        timerSpan.innerText = end / 1000;

    }, 1);

    timerIndex = timer;



}


function stoptimer() {

    clearInterval(timerIndex);
}