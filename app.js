let cases = [...document.getElementsByClassName("case")];
let joueur = document.getElementById("joueur");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let scoreNul = document.getElementById("score-nul");

let state = {
    joueurEnCours: 1,
    scoreJ1: 0,
    scoreJ2: 0,
    matchNuls: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0,
    c5: 0,
    c6: 0,
    c7: 0,
    c8: 0,
    c9: 0,
};

const resetState = () => {
    joueurEnCours = "1";
    state.c1 = 0;
    state.c2 = 0;
    state.c3 = 0;
    state.c4 = 0;
    state.c5 = 0;
    state.c6 = 0;
    state.c7 = 0;
    state.c8 = 0;
    state.c9 = 0;
};

const verifierVictoire = () => {
    if (
        (state.c1 == state.c2 && state.c2 == state.c3 && state.c1 > 0) ||
        (state.c1 == state.c4 && state.c4 == state.c7 && state.c1 > 0) ||
        (state.c1 == state.c5 && state.c5 == state.c9 && state.c1 > 0) ||
        (state.c1 == state.c5 && state.c5 == state.c8 && state.c1 > 0) ||
        (state.c1 == state.c6 && state.c6 == state.c9 && state.c1 > 0) ||
        (state.c1 == state.c5 && state.c5 == state.c6 && state.c1 > 0) ||
        (state.c1 == state.c8 && state.c6 == state.c9 && state.c1 > 0)
    ) {
        return true;
    } else if(
        state.c1 !== 0 &&
        state.c2 !== 0 &&
        state.c3 !== 0 &&
        state.c4 !== 0 &&
        state.c5 !== 0 &&
        state.c6 !== 0 &&
        state.c7 !== 0 &&
        state.c8!== 0 &&
        state.c9 !== 0
    ) {
        return null;
    } else {
        return false;
    }
};

const showAlert = (message) => {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container';

    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    
    const alertMessage = document.createElement('p');
    alertMessage.textContent = message;
    alertMessage.className = 'alert-message';

    const alertButton = document.createElement('button');
    alertButton.textContent = 'Continuer';
    alertButton.className = 'alert-button';
    
    alertButton.addEventListener('click', () => {
        alertContainer.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(alertContainer);
        }, 300);
    });

    alertBox.appendChild(alertMessage);
    alertBox.appendChild(alertButton);
    alertContainer.appendChild(alertBox);
    document.body.appendChild(alertContainer);
};


const jouerCase = (e) => {
    let idCase = e.target.id;
    if (state[idCase] != 0) return;

    state[idCase] = state.joueurEnCours;

    let isVictoire = verifierVictoire();
    if(isVictoire === true){
        showAlert("Le gagnant est le joueur " + state.joueurEnCours);
        if(state.joueurEnCours == 1){
            state.scoreJ1 ++;
            score1.textContent = state.scoreJ1;
        }else {
            state.scoreJ2 ++;
                score2.textContent = state.scoreJ2;
        }
        resetState();
        cases.forEach(c => c.textContent = "");

    }else if(isVictoire === null) {
        showAlert("Match null");
        state.matchNuls++;
        scoreNul.textContent = state.matchNuls;
        joueur.textContent = "1";
        resetState();
        cases.forEach(c => c.textContent = "");
    }else if(isVictoire === false){
        if(state.joueurEnCours === 1 ){
            e.target.textContent = "x";
            state.joueurEnCours = 2;
            joueur.textContent = "2";
        }else{
            e.target.textContent = "0";
            state.joueurEnCours = 1;
            joueur.textContent = "1";
        }
    }
};

cases.forEach((e1) => {
    e1.addEventListener("click", jouerCase);
})