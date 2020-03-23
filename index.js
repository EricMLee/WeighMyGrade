const addButton = document.querySelector('.add');
const container = document.querySelector('.container');
let weightList = [];
var resultField = document.getElementById('resultField');
const modal = document.querySelector('.modal');
var span = document.getElementsByClassName("close")[0];

function createRow(){
    let itemBox = document.createElement('div');
    itemBox.classList.add('box');
    let rowBox = document.createElement('div');
    rowBox.classList.add('row');
    let colBox = document.createElement('div');
    colBox.classList.add('col-4');
    var newContent = document.createTextNode("Catergory: "); 
    let selectBox = document.createElement('select');
    selectBox.id = 'titles';
    let assignmentList = ["Project","Test", "Essay", "Midterm", "Final", "Homework", "Participation", "Lab"];
    let optionList = [];
    for(let i = 0; i < assignmentList.length; i++){
        optionList.push(document.createElement('option'));
        optionList[i].value = 'assignment';
        var text = document.createTextNode(assignmentList[i]);
        optionList[i].appendChild(text);
        selectBox.appendChild(optionList[i]);
    }
    let extraCreditBox = document.createElement('option');
    extraCreditBox.value = 'extracredit';
    var text = document.createTextNode("Extra Credit");
    extraCreditBox.appendChild(text);
    selectBox.appendChild(extraCreditBox);
    let optionBox = document.createElement('option');
    optionBox.value = 'assignment';
    var text = document.createTextNode("etc.");
    optionBox.appendChild(text);
    selectBox.appendChild(optionBox);
    let colBox2 = document.createElement('div');
    colBox2.classList.add('col-4');
    var text = document.createTextNode("Weight ");
    colBox2.appendChild(text);
    let inputBox = document.createElement('input');
    inputBox.id = "weight";
    inputBox.name = "weight";
    inputBox.size = "5";
    colBox2.appendChild(inputBox);
    let colBox3 = document.createElement('div');
    colBox3.classList.add('col-4');
    var text = document.createTextNode("Grade ");
    colBox3.appendChild(text);
    let inputBox2 = document.createElement('input');
    inputBox2.id = "grade";
    inputBox2.name = "grade";
    inputBox2.size = "5";
    const weightAndGrade = {
        select: selectBox,
        weight: inputBox,
        grade: inputBox2
    }
    weightList.push(weightAndGrade);
    colBox3.appendChild(inputBox2); 
    container.appendChild(itemBox);
    itemBox.appendChild(rowBox);
    rowBox.appendChild(colBox);
    colBox.appendChild(newContent);
    colBox.appendChild(selectBox);
    rowBox.appendChild(colBox2);
    rowBox.appendChild(colBox3);
}

function calculate(){
    let weightCounter = 0;
    let gradeCalculate = 0;
    let leftInClass = 0;
    let incorrectInput = false;
    for(let i = 0; i < weightList.length; i++){
        if(weightList[i].select.value == "assignment"){
            if(weightList[i].weight.value == false && weightList[i].grade.value != false || 
                weightList[i].weight.value != false && weightList[i].grade.value == false){
                incorrectInput = true;
            }
            weightCounter += Number(weightList[i].weight.value);
            gradeCalculate += Number(weightList[i].weight.value) * Number(weightList[i].grade.value);
        }else{
            gradeCalculate += Number(weightList[i].weight.value) * Number(weightList[i].grade.value);
        }
    }
    let currentGrade = Number(gradeCalculate) / Number(weightCounter);
    currentGrade = currentGrade.toPrecision(4);
    let beginningMsg = "According to my calculations you have a " + currentGrade + "% in the class.";
    let endingMsg = "";
    if(incorrectInput == true){
        resultField.innerText = "One of your inputs is incorrect!";
        document.querySelector(".modal").style.display = "block";
    }else if(gradeCalculate == false){
        resultField.innerText = "You didn't put any grades in!";
        document.querySelector(".modal").style.display = "block";
    }else if(weightCounter == false){
        resultField.innerText = "You didn't put any weights!";
        document.querySelector(".modal").style.display = "block";
    }else if(weightCounter > 100){
        resultField.innerText = "The weights don't add up!";
        document.querySelector(".modal").style.display = "block";
    }else{
        leftInClass = 100 - weightCounter;
        if(currentGrade < 55){
            if(leftInClass == 0){
                endingMsg = ".. Atleast you got your looks.";
            }else{
                endingMsg = " Panic time! You still have " + leftInClass + "% of the class left.";
            }
        }else if(currentGrade < 70){
            if(leftInClass == 0){
                endingMsg = " Maybe there's a curve?";
            }else{
                endingMsg = " You are at risk of failing! Maybe it's time to pick up that book. You still have " + leftInClass + "% of the class left.";
            }
        }else if(currentGrade < 80){
            if(leftInClass == 0){
                endingMsg = " Hey Cs get degrees.";
            }else{
                endingMsg = " Try not to get bad grades and you should be fine. There is still " + leftInClass + "% of the class left.";  
            }
        }else if(currentGrade < 90){
            if(leftInClass == 0){
                endingMsg = " Good job on your hard work soldier!";
            }else{
                endingMsg = " Power through it! I believe in you. " + leftInClass + "% of the class to go.";  
            }
        }else{
            if(leftInClass == 0){
                endingMsg = " You are a God among insects!"
            }else{
                endingMsg = " Think about all that money you will make and keep that A! Only " + leftInClass + "% of the class left to go.";  
            }
        }
        resultField.innerText = beginningMsg + endingMsg;
        document.querySelector(".modal").style.display = "block";
    }
}

function remove(){
    container.removeChild(container.lastChild);
    weightList.pop();
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
window.onkeypress = function(event){
    if(event.keyCode == 13){
        if(modal.style.display == "block"){
            modal.style.display = "none";
        }
    }
}

createRow();
document.getElementById("add").onclick = function() {createRow();};
document.getElementById("calculate").onclick = function() {calculate();};
document.getElementById("remove").onclick = function() {remove();};