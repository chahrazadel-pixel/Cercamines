const mida = 10;
let matriu = [];
let mines = 15;
let resposta= []
let numeroBanderes=15
let clicks= 0

// Arrancada inicial
inicialitzarMatriu();
renderitzar();

function inicialitzarMatriu() {
    for (let i = 0; i < mida; i++) {
        matriu[i] = [];
        resposta [i]= []
        for (let j = 0; j < mida; j++) {
            matriu[i][j] = 0; // 0 = Negre / Apagat
            resposta[i][j] = '';
        }
    }
}

//Funció  que calcularà on estan ubicades les mines
function colocarMines(){
    inicialitzarMatriu()
    for (let i = 0; i < mines; i++) {
        let x=Math.trunc(mida*Math.random());
        let y=Math.trunc(mida*Math.random());
        console.log(x, y);
        if(matriu[x][y]=== 0){
            matriu[x][y] = 1;
            resposta[x][y] = '*';

        }else{
            i--
        }
    }
renderitzar();
}

// Aquesta funció idica quina a de ser la resposta segons el que feim
function mostrarResposta(){
    const container=document.getElementById("grid-container");
    container.innerHTML= "";

    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');
            if (resposta[i][j]==='*'){
                div.classList.add('bomba');

            }else{
                if(resposta[i][j]===''){
                    div.classList.add('active');
                    div.innerText= resposta[i][j];

                }else{
                    div.classList.add('active');
                    let p=document.createElement('p');
                    let numero= analitzarvores(i,j);
                    p.textContent = numero;
                    div.appendChild(p);
                }
            }
            container.appendChild(div);
        }
    }

}

// Aquesta funció "dibuixa" els DIVs a l'HTML
function renderitzar() {
    const container = document.getElementById('grid-container');
    container.innerHTML = ""; // Esborrem l'anterior

    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');

// Funció que senyalitza les bombes i el  seu nombre a les voreres
            div.addEventListener('click', function () {
                if(matriu[i][j] === 1){
                    div.classList.add('bomba');
                    alert ('BOOM! Has perdut!');
                    // inicialitzarMatriu();
                   mostrarResposta()

                } else {
                    if (!div.classList.contains('active')) {
                        div.classList.add('active');
                        let p=document.createElement('p');
                        let numero= analitzarvores(i,j);
                        resposta [i][j]=numero;
                        p.textContent = numero;
                        switch(numero){
                            case 1: p.style.color="blue"; break;
                            case 2: p.style.color="orange" ; break;
                            case 3: p.style.color= "red"; break;
                            case 4: p.style.color="yellow"; break;
                            case 5 : p.style.color="blue"; break;
                            case 6: p.style.color="orange"; break;
                            case 7: p.style.color= "red"; break;
                            case 8: p.style.color="yellow"; break;
                            default: p.style.color= "#c5eac7" ; break;
                        }
                        div.appendChild(p);
                        clicks++
                        analitzarfinal()
                    }
                    }

            })
            // Funció del botó per posar-les i indica cuantes banderes utilitzam

            div.addEventListener('auxclick', function (event) {
                event.preventDefault()
                if(div.classList.contains('bandera')) {
                    div.classList.contains('bandera');
                    div.innerText ="";
                    numeroBanderes++
                }else{
                    div.classList.add('bandera');
                    div.innerText ="🚩";
                    numeroBanderes--
                }
                document.getElementById('banderes').innerHTML= '🚩:'+ numeroBanderes;
            })
            container.appendChild(div);
        }
    }
}

// Aquesta funció analitzar les vores de cada cazella per poder indicar cuantes bombes hi ha
function analitzarvores(i,j) {
    let comptador = 0;
    if (matriu[i-1]?.[j-1]===1 ){
        comptador++
    }if (matriu [i+1]?.[j+1]===1){
        comptador++;
    }if(matriu [i]?.[j-1]===1){
        comptador++
    }if(matriu[i]?.[j+1]===1){
        comptador++
    }if(matriu[i-1]?.[j]===1){
        comptador++
    } if(matriu[i+1]?.[j]===1){
        comptador++
    } if (matriu[i-1]?.[j+1]===1 ){
        comptador++;
    }if (matriu [i+1]?.[j-1]===1){
        comptador++;
}
    return comptador;
}

// Aquesta funció el que fa es identificar si ja has guanyat
function analitzarfinal(){
    if(clicks === mida*mida-mines){
        alert('HAS GUANYAT! ENHORABONA!')
    }
}


