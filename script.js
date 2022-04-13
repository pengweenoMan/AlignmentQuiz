var Person = /** @class */ (function () {
    function Person(name, good, law) {
        this.name = name;
        this.good = good !== null && good !== void 0 ? good : 1500;
        this.law = law !== null && law !== void 0 ? law : 1500;
    }
    return Person;
}());
var people = [
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
var person1;
var person2;
var expectedGood;
var expectedLaw;
var newGood1;
var newGood2;
var newLaw1;
var newLaw2;
var isGoodClicked;
var isLawClicked;
var csv = "";
var runCount = 0;
function initializePeople() {
    person1 = people[Math.floor(Math.random() * people.length)];
    person2 = people[Math.floor(Math.random() * people.length)];
    while (person1.name === person2.name) {
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
    document.getElementById("counter").innerHTML = "Run Number: ".concat(runCount);
    document.getElementById("selection1").innerHTML = "";
    document.getElementById("selection2").innerHTML = "";
    people.sort(function (one, two) { return one.good - two.good; });
    updateTable();
}
function updateTable() {
    var table = document.getElementById("standings");
    table.innerHTML = "";
    csv = "";
    for (var _i = 0, people_1 = people; _i < people_1.length; _i++) {
        var person = people_1[_i];
        var row = table.insertRow(0);
        csv += "".concat(person.name, ", ").concat(person.good, ", ").concat(person.law, "\n");
        row.insertCell(0).innerHTML = person.name;
        row.insertCell(1).innerHTML = person.good.toString();
        row.insertCell(2).innerHTML = person.law.toString();
    }
    var link = document.getElementById("downloadLink");
    link.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv));
}
function loadCSV() {
    var input = document.getElementById("input");
    csv = input.value;
    var rows = csv.split("\n");
    people = [];
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
        var row = rows_1[_i];
        var cols = row.split(",");
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
    if (isLawClicked) {
        updateGoodLaw();
        initializePeople();
    }
    else {
        isGoodClicked = true;
        document.getElementById("selection1").innerHTML = person1.name;
    }
}
function good2Clicked() {
    newGood1 = person1.good - 25 * expectedGood;
    newGood2 = person2.good + 25 * expectedGood;
    if (isLawClicked) {
        updateGoodLaw();
        initializePeople();
    }
    else {
        isGoodClicked = true;
        document.getElementById("selection1").innerHTML = person2.name;
    }
}
function law1Clicked() {
    newLaw1 = person1.law + 25 * (1 - expectedLaw);
    newLaw2 = person2.law + 25 * (expectedLaw - 1);
    if (isGoodClicked) {
        updateGoodLaw();
        initializePeople();
    }
    else {
        isLawClicked = true;
        document.getElementById("selection2").innerHTML = person1.name;
    }
}
function law2Clicked() {
    newLaw1 = person1.law - 25 * expectedLaw;
    newLaw2 = person2.law + 25 * expectedLaw;
    if (isGoodClicked) {
        updateGoodLaw();
        initializePeople();
    }
    else {
        isLawClicked = true;
        document.getElementById("selection2").innerHTML = person2.name;
    }
}
function tie1Clicked() {
    newGood1 = person1.good + 25 * (.5 - expectedGood);
    newGood2 = person2.good + 25 * (expectedGood - .5);
    if (isLawClicked) {
        updateGoodLaw();
        initializePeople();
    }
    else {
        isGoodClicked = true;
        document.getElementById("selection1").innerHTML = "Tie";
    }
}
function tie2Clicked() {
    newLaw1 = person1.law + 25 * (.5 - expectedLaw);
    newLaw2 = person2.law + 25 * (expectedLaw - .5);
    if (isGoodClicked) {
        updateGoodLaw();
        initializePeople();
    }
    else {
        isLawClicked = true;
        document.getElementById("selection2").innerHTML = "Tie";
    }
}
