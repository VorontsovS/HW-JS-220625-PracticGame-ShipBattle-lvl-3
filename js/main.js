const btnGenShips = document.querySelector('.btnGenShips');
const containerLeft = document.querySelector ('.containerLeft');
const containerRight = document.querySelector ('.containerRight');
const arrNameShips = ['cruiser', 'frigate', 'boat'];

let arrShipsRed = [];
let arrShipsGrn = [];
// 0name, 1health, 2force, 3energy, 4status, 5number, 6style, 7type, 8statusEP

const genArrShips = (el) => {
    for (i=0; i<10; i++) {
        let z;
        z = Number(Math.floor(Math.random() * 3));
        if (z === 0) { el[i] = ['Cruiser', 100, 35, 60, 1, 0, '', 1, 1]; } 
        if (z === 1) { el[i] = ['Frigate', 70, 75, 75, 1, 0, '', 2, 1]; } 
        if (z === 2) { el[i] = ['Boat', 30, 15, 250, 1, 0, '', 3, 1]; }
        el[i][5] = i+1; // number of ship
        if (el == arrShipsRed) { el[i][6] = `shipR${i} shipR`; }
        if (el == arrShipsGrn) { el[i][6] = `shipG${i} shipG`; }
    }
}

const genDivShip = (el, el2, el3) => {
    el.forEach (elem => {
        const div = document.createElement('div');
        div.className = elem[6] + ' ' + elem[0] + ' ' + 'ship';
        div.innerHTML = 'Ship No.: ' + elem[5] + ' Type: ' +elem[0] + '<br>';
        div.innerHTML += '<div class="' + el3 + 'Hno' + elem[5] + ' Health' + elem[7] + '" id="' + el3 + 'HP' + elem[5] + '">Health: ' + elem[1] + ' HP</div>';
        div.innerHTML += '<div class="' + el3 + 'Fno' + elem[5] + ' Force' + elem[7] + '">Forse: ' + elem[2] + ' FP</div>';
        div.innerHTML += '<div class="' + el3 + 'Eno' + elem[5] + ' Energy' + elem[7] + '" id="' + el3 + 'EP' + elem[5] + '">Energy: ' + elem[3] + ' EP</div>';
        div.innerHTML += '<div class="' + el3 + 'aim' + elem[5]+ ' aim" id="' + el3 + 'aim' + elem[5] + '"></div>';
        el2.appendChild(div);
    })
}

btnGenShips.addEventListener('click', () => {
    genArrShips(arrShipsRed);
    genArrShips(arrShipsGrn);
    genDivShip(arrShipsRed, containerLeft, 'R');
    genDivShip(arrShipsGrn, containerRight, 'G');
    btnGenShips.style.display = 'none';
})

const arrRaim = [];
const arrGaim = [];
for (i=1; i<11; i++) {
    arrRaim.push('Raim'+ i + ' aim');
    arrGaim.push('Gaim'+ i + ' aim');
}
// сформировали массив для проверки на какой прицеп красных кликнули

let Rstep = 0;
let currentFP = 0;
let currentHP = 0;
let currentFPR = 0;
let currentHPR = 0;
let currentFPG = 0;
let currentHPG = 0;
let nomshipGRandom = 0;
let nomshipRRandom = 0;
let gameEnd = 0;
let notdeidArrShipsRed = [];
let notdeidArrShipsGrn = [];
let lengthNASR = 0;
let lengthNASG = 0;
let z;
let y;
const log = document.querySelector('.containerLog');
let curentEPR = 0;
let curentEPG = 0;
const stepOfEP = 50;
let peremEP = 0;
const stepOnEP = 20;
const cruiserEP = 60;
const frigateEP = 75;
const boatEP = 250;
let gz;
let sumOfAllEP = 0;

// функція додаваня енергії
const addEP = (typeOfShip, a, b, nameId) => {
    if (a[7] === typeOfShip && a[4] === 1) {
        if (a[3] === b) {
        } else {
            if (a[3] + stepOnEP >= b) {
                curentEPR = b;
            } else {
                curentEPR = a[3] + stepOnEP;
            };
            a[3] = curentEPR;
            peremEP = curentEPR*150/250;
            //const z = document.getElementById(nameId + (arrShipsRed.indexOf(a)+1));
            z = document.getElementById(nameId + a[5]);
            z.style.boxShadow = 'inset ' + peremEP + 'px 0 lightblue';
            z.innerHTML = 'Energy: ' + curentEPR + ' EP';
        }
    }
};

document.addEventListener('click', e => {
    arrRaim.forEach(el => {
        if (el === e.target.className &&  Rstep === 0 && arrShipsRed[arrRaim.indexOf(el)][4] === 1 && arrShipsRed[arrRaim.indexOf(el)][8] === 1) {
            y = document.getElementById('Raim' + (arrRaim.indexOf(el)+1));
            y.style.border = '2px solid red';
            Rstep = 1;
            currentFPR = arrShipsRed[arrRaim.indexOf(el)][2];
            log.innerHTML += `<p style="color:red">Red ship №${arrShipsRed[arrRaim.indexOf(el)][5]} ${arrShipsRed[arrRaim.indexOf(el)][0]} shoot with force ${currentFPR}FP</p>`; 
        
            // убавлем єнергию у красного корабля кот стрелляет            
            arrShipsRed[arrRaim.indexOf(el)][3] -= stepOfEP;
            if (arrShipsRed[arrRaim.indexOf(el)][3] < stepOfEP) {
                arrShipsRed[arrRaim.indexOf(el)][8] = 0;
            }
            const z = document.getElementById('REP' + (arrRaim.indexOf(el)+1));
            curentEPR = arrShipsRed[arrRaim.indexOf(el)][3];
            peremEP = curentEPR*150/250;
            z.style.boxShadow = 'inset ' + peremEP + 'px 0 lightblue';
            z.innerHTML = 'Energy: ' + curentEPR + ' EP';

            if (arrShipsRed[arrRaim.indexOf(el)][3] < stepOfEP) {
                arrShipsRed[arrRaim.indexOf(el)][8] = 0;
            }
        }
    })

    // перевірка чи зелені можуть стріляти
    notdeidArrShipsGrn.length = 0;
    notdeidArrShipsGrn = arrShipsGrn.filter (el => el[4] > 0);
    sumOfAllEP = 0;
    notdeidArrShipsGrn.forEach (elem => {
        sumOfAllEP += elem[8];
    })
    if (sumOfAllEP === 0) {
        Rstep = 0;
        log.innerHTML += (`<p style="color:green; font-size:2em">Green have not Enery to shoot - YOU Turn</p>`);
        log.scrollTop = log.scrollHeight;
    }

    arrGaim.forEach(el => {
        if (el === e.target.className &&  Rstep === 1) {
            arrRaim.forEach(el => {
                y = document.getElementById('Raim' + (arrRaim.indexOf(el)+1));
                y.style.border = '2px solid black';
            })

            currentHPG = arrShipsGrn[arrGaim.indexOf(el)][1];

            if (arrShipsGrn[arrGaim.indexOf(el)][4] === 1) {
                const z = document.getElementById('GHP' + (arrGaim.indexOf(el)+1));
                if (currentHPG <= currentFPR) {
                    arrShipsGrn[arrGaim.indexOf(el)][4] = 0;
                    z.style.boxShadow = 'none';
                    z.innerHTML = 'DIED';
                    arrShipsGrn[arrGaim.indexOf(el)][1] = 0;
                    log.innerHTML += `<p style="color:red">Green ship №${arrShipsGrn[arrGaim.indexOf(el)][5]} ${arrShipsGrn[arrGaim.indexOf(el)][0]} with ${currentHPG}HP was sunk (DIED) </p>`;

                } else {
                    log.innerHTML += `<p style="color:red">Green ship №${arrShipsGrn[arrGaim.indexOf(el)][5]} ${arrShipsGrn[arrGaim.indexOf(el)][0]} with ${currentHPG}HP took ${currentFPR}HP of damage</p>`;
                    currentHPG = currentHPG-currentFPR;
                    let peremHP = currentHPG*150/100;
                    z.style.boxShadow = 'inset ' + peremHP + 'px 0 pink';
                    z.innerHTML = 'Health:' + currentHPG + ' HP';
                    arrShipsGrn[arrGaim.indexOf(el)][1] = currentHPG;
                }
            }

            notdeidArrShipsRed.length = 0;
            notdeidArrShipsRed = arrShipsRed.filter (el => el[4] > 0); 
            lengthNASR = notdeidArrShipsRed.length;

            notdeidArrShipsGrn.length = 0;
            notdeidArrShipsGrn = arrShipsGrn.filter (el => el[4] > 0); 
            lengthNASG = notdeidArrShipsGrn.length;

            if (lengthNASG === 0) {
                log.innerHTML += '<p style="color:red; font-size:2em">YOU WIN</p>';
                log.scrollTop = log.scrollHeight;
                return;
            }

            nomshipRRandom = Number(Math.floor(Math.random() * lengthNASR));
            nomshipGRandom = Number(Math.floor(Math.random() * lengthNASG));
            currentHP = notdeidArrShipsRed[nomshipRRandom][1];
            currentFP = notdeidArrShipsGrn[nomshipGRandom][2];
            z = document.getElementById('RHP' + (notdeidArrShipsRed[nomshipRRandom][5]));
            log.innerHTML += `<p style="color:green">Green ship №${arrShipsGrn[notdeidArrShipsGrn[nomshipGRandom][5]-1][5]} ${arrShipsGrn[notdeidArrShipsGrn[nomshipGRandom][5]-1][0]} shoot with force ${currentFP}FP</p>`;

            // зменьшуємо єнергию у зеленого корабля який стріляє
            arrShipsGrn[notdeidArrShipsGrn[nomshipGRandom][5]-1][3] -= stepOfEP;
            if (arrShipsGrn[notdeidArrShipsGrn[nomshipGRandom][5]-1][3] < stepOfEP) {
                arrShipsGrn[notdeidArrShipsGrn[nomshipGRandom][5]-1][8] = 0;
            }
            gz = document.getElementById('GEP' + (notdeidArrShipsGrn[nomshipGRandom][5]));
            curentEPR = arrShipsGrn[notdeidArrShipsGrn[nomshipGRandom][5]-1][3];
            peremEP = curentEPR*150/250;
            gz.style.boxShadow = 'inset ' + peremEP + 'px 0 lightblue';
            gz.innerHTML = 'Energy: ' + curentEPR + ' EP';

            if (arrShipsGrn[notdeidArrShipsGrn[nomshipGRandom][5]-1][3] < stepOfEP) {
                arrShipsGrn[notdeidArrShipsGrn[nomshipGRandom][5]-1][8] = 0;
            }
            // конец блока - убавлем єнергию у зеленого корабля кот стрелляет

            if (currentHP <= currentFP) {
                arrShipsRed[notdeidArrShipsRed[nomshipRRandom][5]-1][4] = 0;
                z.style.boxShadow = 'none';
                z.innerHTML = 'DIED';
                arrShipsRed[notdeidArrShipsRed[nomshipRRandom][5]-1][1] = 0;
                log.innerHTML += `<p style="color:green">Red ship №${arrShipsRed[notdeidArrShipsRed[nomshipRRandom][5]-1][5]} ${arrShipsRed[notdeidArrShipsRed[nomshipRRandom][5]-1][0]} with ${currentHP}HP was sunk (DIED)</p>`;
                arrShipsRed[notdeidArrShipsRed[nomshipRRandom][5]-1][8] = 0;
            } else {
                log.innerHTML += `<p style="color:green">Red ship №${arrShipsRed[notdeidArrShipsRed[nomshipRRandom][5]-1][5]} ${arrShipsRed[notdeidArrShipsRed[nomshipRRandom][5]-1][0]} with ${currentHP}HP took ${currentFP}HP of damage</p>`;
                currentHP = currentHP-currentFP;
                let peremHP = currentHP*150/100;
                z.style.boxShadow = 'inset ' + peremHP + 'px 0 pink';
                z.innerHTML = 'Health: ' + currentHP + ' HP';
                arrShipsRed[notdeidArrShipsRed[nomshipRRandom][5]-1][1] = currentHP;
            }
            
            notdeidArrShipsRed.length = 0;
            notdeidArrShipsRed = arrShipsRed.filter (el => el[4] > 0); 
            lengthNASR = notdeidArrShipsRed.length;
        
            if (lengthNASR === 0) {
                log.innerHTML += '<p style="color:green; font-size:2em">YOU LOST</p>';
                log.scrollTop = log.scrollHeight;
                return;
            }
            
            Rstep = 0;
            log.scrollTop = log.scrollHeight;

            // добавляємо енергії червоним кораблям
            arrShipsRed.forEach (el => {
                addEP(1, el, cruiserEP, 'REP');
                addEP(2, el, frigateEP, 'REP');
                addEP(3, el, boatEP, 'REP');

                if (el[8] === 0) {
                    if (el[3] >= stepOfEP) {
                        el[8] = 1;
                    }
                } 
            })
            // конец пополнения энергии красным

            // добавляємо енергії зеленим кораблям
            arrShipsGrn.forEach (el => {
                addEP(1, el, cruiserEP, 'GEP');
                addEP(2, el, frigateEP, 'GEP');
                addEP(3, el, boatEP, 'GEP');

                if (el[8] === 0) {
                    if (el[3] >= stepOfEP) {
                        el[8] = 1;
                    }
                } 
            })
            // конец пополнения энергии красным

            // перевірка чи красні можуть стріляти
            sumOfAllEP = 0;
            notdeidArrShipsRed.forEach (elem => {
                sumOfAllEP += elem[8];
            })
            if (sumOfAllEP === 0) {
                Rstep = 1;
                log.innerHTML += (`<p style="color:red; font-size:2em">You have not Energy to shoot - CLICK on Green Aim </p>`);
                log.scrollTop = log.scrollHeight;
            }
        }
    })
});