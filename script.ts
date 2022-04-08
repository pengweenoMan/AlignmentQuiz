class Person {
    name: string;
    good: number;
    law: number;

    constructor(name: string, good?: number, law?: number) {
        this.name = name;
        this.good = good ?? 1500;
        this.law = law ?? 1500;
    }
}

let people = [
    new Person("Akansha"),
    new Person("Brain Pratt"),
    new Person("Carlos"),
    new Person("Cecil"),
    new Person("Dalton"),
    new Person("Dylan"),
    new Person("Ethan"),
    new Person("Henry"),
    new Person("Izzy"),
    new Person("Jake"),
    new Person("Jay"),
    new Person("John Hambleton"),
    new Person("John Quimby"),
    new Person("Josh"),
    new Person("Matteo"),
    new Person("Michio"),
    new Person("Mira"),
    new Person("MJ"),
    new Person("Peyton"),
    new Person("Preston"),
    new Person("Randy"),
    new Person("Rohan"),
    new Person("Ronan"),
    new Person("Sam"),
    new Person("Sawyer"),
    new Person("Tanay"),
    new Person("Will George")
];

let person1;
let person2;
let expectedGood;
let expectedLaw;
let newGood1;
let newGood2;
let newLaw1;
let newLaw2;
let isGoodClicked;
let isLawClicked;
let csv = "";
let runCount = 0;

function initializePeople() {
    person1 = people[Math.floor(Math.random() * people.length)];
    person2 = people[Math.floor(Math.random() * people.length)];

    while(person1.name === person2.name) {
        person2 = people[Math.floor(Math.random() * people.length)];
    }

    expectedGood = 1 / (1 + Math.pow(10, (person2.good - person1.good) / 400));
    expectedLaw = 1 / (1 + Math.pow(10, (person2.law - person1.law) / 400));
    isGoodClicked = false;
    isLawClicked = false;
    
    document.getElementById("person1Good").innerHTML = person1.name;
    document.getElementById("person2Good").innerHTML = person2.name;
    document.getElementById("person1Law").innerHTML = person1.name;
    document.getElementById("person2Law").innerHTML = person2.name;
    document.getElementById("counter").innerHTML = `Run Number: ${runCount}`;
    document.getElementById("selection1").innerHTML = "";
    document.getElementById("selection2").innerHTML = ""; 
    updateTable();
}

function updateTable() {
    let table = document.getElementById("standings") as HTMLTableElement;
    table.innerHTML = "";
    csv = "";

    for(const person of people) {
        let row = table.insertRow(0);
        csv += `${person.name}, ${person.good}, ${person.law}\n`;
        row.insertCell(0).innerHTML = person.name;
        row.insertCell(1).innerHTML = person.good.toString();
        row.insertCell(2).innerHTML = person.law.toString();
    }

    let link = document.getElementById("downloadLink");
    link.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv));
}

function loadCSV() {
    let input = document.getElementById("input") as HTMLInputElement;
    csv = input.value;
    let rows = csv.split("\n");
    people = []

    for(const row of rows) {
        let cols = row.split(",");
        people.push(new Person(cols[0], Number(cols[1]), Number(cols[2])));
    }

    updateTable();
}

/*function choiceClicked(type, choice) {
    
}*/

function updateGoodLaw() {
    person1.good = newGood1;
    person2.good = newGood2;
    person1.law = newLaw1;
    person2.law = newLaw2;
    runCount++;
}

function good1Clicked() {
    newGood1 = person1.good + 25 * (1 - expectedGood);
    newGood2 = person2.good + 25 * (expectedGood - 1);

    if(isLawClicked) {
        updateGoodLaw();
        initializePeople();
    } else {
        isGoodClicked = true;
        document.getElementById("selection1").innerHTML = person1.name;
    } 
}

function good2Clicked() {
    newGood1 = person1.good - 25 * expectedGood;
    newGood2 = person2.good + 25 * expectedGood;

    if(isLawClicked) {
        updateGoodLaw();
        initializePeople();
    } else {
        isGoodClicked = true;
        document.getElementById("selection1").innerHTML = person2.name;
    } 
}

function law1Clicked() {
    newLaw1 = person1.law + 25 * (1 - expectedLaw);
    newLaw2 = person2.law + 25 * (expectedLaw - 1);

    if(isGoodClicked) {
        updateGoodLaw();
        initializePeople();
    } else {
        isLawClicked = true;
        document.getElementById("selection2").innerHTML = person1.name;
    } 
}

function law2Clicked() {
    newLaw1 = person1.law - 25 * expectedLaw;
    newLaw2 = person2.law + 25 * expectedLaw;

    if(isGoodClicked) {
        updateGoodLaw();
        initializePeople();
    } else {
        isLawClicked = true;
        document.getElementById("selection2").innerHTML = person2.name;
    } 
}

function tie1Clicked() {
    newGood1 = person1.good + 25 * (.5 - expectedGood);
    newGood2 = person2.good + 25 * (expectedGood - .5);

    if(isLawClicked) {
        updateGoodLaw();
        initializePeople();
    } else {
        isGoodClicked = true;
        document.getElementById("selection1").innerHTML = "Tie";
    } 
}

function tie2Clicked() {
    newLaw1 = person1.law + 25 * (.5 - expectedLaw);
    newLaw2 = person2.law + 25 * (expectedLaw - .5);

    if(isGoodClicked) {
        updateGoodLaw();
        initializePeople();
    } else {
        isLawClicked = true;
        document.getElementById("selection2").innerHTML = "Tie";
    } 
}
