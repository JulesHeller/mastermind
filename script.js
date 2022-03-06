document.querySelector("#croix").addEventListener("click", rules)
document.querySelector("#question").addEventListener("click", rules)

function rules() {
    document.querySelector(".regles").classList.toggle("hidden");
    document.querySelector(".film").classList.toggle("hidden");
}

document.querySelector("#croix2").addEventListener("click", closeVic)

function closeVic() {
    document.querySelector(".victoire").classList.toggle("hidden");
    document.querySelector(".film").classList.toggle("hidden");
}

document.querySelector("#croix3").addEventListener("click", closeDef)

function closeDef() {
    document.querySelector(".defaite").classList.toggle("hidden");
    document.querySelector(".film").classList.toggle("hidden");
}

document.querySelector("#reload").addEventListener("click", reload)

function reload() {
    hasWon = false;
    hasLost = false;

    this.classList.add("spin")
    start();
    setTimeout(() => {
        this.classList.remove("spin");
    }, 300);
}

document.querySelectorAll(".couleur").forEach(e => {
    e.addEventListener("mousedown", couleurDown)
    e.addEventListener("mouseup", couleurUp)
    e.addEventListener("mouseleave", couleurUp)
})

document.querySelector(".back").addEventListener("mousedown", couleurDown)
document.querySelector(".back").addEventListener("mouseup", couleurUp)
document.querySelector(".back").addEventListener("mouseleave", couleurUp)

function couleurDown() {
    this.classList.add("couleurDown");
}

function couleurUp() {
    this.classList.remove("couleurDown");
}

var combi = "";
var car1 = "";
var car2 = "";
var car3 = "";
var car4 = "";

var numero = 1;
var ligne = 1;
var combiGuess = "";
var positions = "";
var pos1 = "";
var pos2 = "";
var pos3 = "";
var pos4 = "";

var hasWon = false;
var hasLost = false;

start();
function start() {
    document.querySelectorAll(".trou").forEach(e => {
        e.classList.remove("J")
        e.classList.remove("R")
        e.classList.remove("V")
        e.classList.remove("B")
    })

    document.querySelectorAll(".pos").forEach(e => {
        e.style.background = "";
    })

    numero = 1;
    ligne = 1;

    combiGuess = "";
    combi = "";

    let rand = 0;

    for (let i = 0; i < 4; i++) {
        rand = Math.floor(Math.random() * 4);

        if (rand == 0) {
            combi += "J"
        }
        if (rand == 1) {
            combi += "R"
        }
        if (rand == 2) {
            combi += "V"
        }
        if (rand == 3) {
            combi += "B"
        }
    }

    console.log(combi);

    car1 = combi.charAt(0);
    car2 = combi.charAt(1);
    car3 = combi.charAt(2);
    car4 = combi.charAt(3);

    document.querySelector(".trouEx1").classList.add(car1);
    document.querySelector(".trouEx2").classList.add(car2);
    document.querySelector(".trouEx3").classList.add(car3);
    document.querySelector(".trouEx4").classList.add(car4);
}

document.querySelectorAll(".couleur").forEach(e => {
    e.addEventListener("mousedown", addCouleur);
})

function addCouleur() {
    if (!hasWon && !hasLost) {
        let thisCouleur = this.getAttribute("id");
        document.querySelector(".ligne" + ligne + " .trou" + numero).classList.add(thisCouleur);

        combiGuess += thisCouleur;

        if (numero < 4) {
            numero++;

            // console.log(combiGuess);
        } else {
            numero = 1;

            // console.log(combiGuess);

            if (combiGuess == combi) {
                document.querySelectorAll(".lp" + ligne + " *").forEach(e => {
                    e.style.background = "black";
                })

                hasWon = true;

                document.querySelector(".victoire").classList.remove("hidden");
                document.querySelector(".film").classList.remove("hidden");
            } else {
                if (ligne == 8) {
                    hasLost = true;
                }

                comparer();
            }
        }
    }
}

document.querySelector(".back").addEventListener("mousedown", removeCouleur)

function removeCouleur() {
    if (numero != 1) {
        numero--;

        document.querySelector(".ligne" + ligne + " .trou" + numero).classList.remove("J");
        document.querySelector(".ligne" + ligne + " .trou" + numero).classList.remove("R");
        document.querySelector(".ligne" + ligne + " .trou" + numero).classList.remove("V");
        document.querySelector(".ligne" + ligne + " .trou" + numero).classList.remove("B");

        combiGuess = combiGuess.slice(0, -1);
        // console.log(combiGuess);
    } else {
        document.querySelector(".back").classList.add("wobble");

        setTimeout(() => {
            document.querySelector(".back").classList.remove("wobble");
        }, 500)
    }
}

var guess1 = "";
var guess2 = "";
var guess3 = "";
var guess4 = "";
var guessLength = 0;

var car1c = "";
var car2c = "";
var car3c = "";
var car4c = "";

function comparer() {
    guess1 = combiGuess.charAt(0);
    guess2 = combiGuess.charAt(1);
    guess3 = combiGuess.charAt(2);
    guess4 = combiGuess.charAt(3);

    car1c = car1;
    car2c = car2;
    car3c = car3;
    car4c = car4;

    if (guess1 == car1c) {
        positions += "O";
        car1c = "."
    }
    if (guess2 == car2c) {
        positions += "O";
        car2c = "."
    }
    if (guess3 == car3c) {
        positions += "O";
        car3c = "."
    }
    if (guess4 == car4c) {
        positions += "O";
        car4c = "."
    }

    if (guess1 != car1) {
        if (guess1 == car2c) {
            positions += "o";
            car2c = "."
        } else if (guess1 == car3c) {
            positions += "o";
            car3c = "."
        } else if (guess1 == car4c) {
            positions += "o";
            car4c = "."
        }
    }
    if (guess2 != car2) {
        if (guess2 == car1c) {
            positions += "o";
            car1c = "."
        } else if (guess2 == car3c) {
            positions += "o";
            car3c = "."
        } else if (guess2 == car4c) {
            positions += "o";
            car4c = "."
        }
    }
    if (guess3 != car3) {
        if (guess3 == car1c) {
            positions += "o";
            car1c = "."
        } else if (guess3 == car2c) {
            positions += "o";
            car2c = "."
        } else if (guess3 == car4c) {
            positions += "o";
            car4c = "."
        }
    }
    if (guess4 != car4) {
        if (guess4 == car1c) {
            positions += "o";
            car1c = "."
        } else if (guess4 == car2c) {
            positions += "o";
            car2c = "."
        } else if (guess4 == car3c) {
            positions += "o";
            car3c = "."
        }
    }

    posLength = positions.length;

    for (let roger = posLength; roger < 4; roger++) {
        positions += "x";
    }

    pos1 = positions.charAt(0);
    pos2 = positions.charAt(1);
    pos3 = positions.charAt(2);
    pos4 = positions.charAt(3);

    if (pos1 == "O") {
        document.querySelector(".lp" + ligne + " .pos1").style.background = "black";
    }
    if (pos1 == "o") {
        document.querySelector(".lp" + ligne + " .pos1").style.background = "white";
    }

    if (pos2 == "O") {
        document.querySelector(".lp" + ligne + " .pos2").style.background = "black";
    }
    if (pos2 == "o") {
        document.querySelector(".lp" + ligne + " .pos2").style.background = "white";
    }

    if (pos3 == "O") {
        document.querySelector(".lp" + ligne + " .pos3").style.background = "black";
    }
    if (pos3 == "o") {
        document.querySelector(".lp" + ligne + " .pos3").style.background = "white";
    }

    if (pos4 == "O") {
        document.querySelector(".lp" + ligne + " .pos4").style.background = "black";
    }
    if (pos4 == "o") {
        document.querySelector(".lp" + ligne + " .pos4").style.background = "white";
    }

    if (hasLost) {
        document.querySelector(".defaite").classList.remove("hidden");
        document.querySelector(".film").classList.remove("hidden");
    } else {
        ligne++;

        //                                    //
        // Reinitialisation pour chaque ligne //
        //                                    //

        combiGuess = "";
        guess1 = "";
        guess2 = "";
        guess3 = "";
        guess4 = "";
        guessLength = 0;
        positions = "";
        car1c = car1;
        car2c = car2;
        car3c = car3;
        car4c = car4;
    }

    // console.log(positions);
}