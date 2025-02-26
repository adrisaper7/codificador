const mis_caracteres = [
    "!", "#", "$", "%", "&"," ", "'", "(", ")", "*", "+", ",", "-", ".", "/",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    ":", ";", "<", "=", ">", "?", "@",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O",
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "[", "]", "^", "_", "`",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o",
    "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "{", "|", "}", "~", '"',"¡", "¿", "§"
];
const historial_ruta = './historial.txt'

function codificador_cesar2(text, clau){
    let textcodificat = text.split('')
    .map(char => String.fromCharCode(((char.charCodeAt(0) + clau)%255)))
    .join('');
    return textcodificat;
}

function quadrat_mes_proper(num){
    let quadrat_mes_proper = 0
    for(i = 1; i*i < num; i++){
        quadrat_mes_proper = Math.pow(i+1,2)
    }
    return  quadrat_mes_proper
}

function escapador(text){
    let textescapador = ""
    for (let lletra of text) {
        let unicode = lletra.charCodeAt(0).toString();
        textescapador += '&#'+ unicode;

    }

    return textescapador;
}
function caracters_a_num_llista(llista, caracters){
    clau_actualitzada = [];
    for(item of caracters){
        for(index in llista){
            if (llista[index] == item){
                clau_actualitzada.push(parseInt(index)) 
            }
        }
    }
    return(clau_actualitzada)
}
function divididor_llista(llista, num){
    llista_actualitzada = []

    for(let j = 0; j <  llista.length; j +=num){
        let subllista = []
        for(let i = 0; i < num && j+i <llista.length; i++ ){
            subllista.push(llista[j+i])
        }
        llista_actualitzada.push(subllista)
    }
    return(llista_actualitzada)
}

function es_quadrat(array){
    let quadrat = true
    for(let i = 0; i < array.length; i++){   
        if (array.length != array[1].length){
            quadrat = false
        }
    }
    return(quadrat)
}

function creador_matriu(files, columnes){
    matriu = [];
    for(i = 0; i < files; i++){
        matriu.push(Array(columnes).fill(0))
    }
    return matriu
}


function multiplicador_de_matrius(matriu_1, matriu_2){
    
    let matriu_final = creador_matriu(matriu_1.length, matriu_2[0].length)
    for(let i = 0; i < matriu_1.length; i++){
        for(let j = 0; j < matriu_2[0].length; j++){
            let numero = 0
            for(let h = 0; h < matriu_1[i].length; h++){
                numero += matriu_1[i][h]*matriu_2[h][j]
            }
            matriu_final[i][j] = numero
        }
    
    }
    return(matriu_final)


}


function codificador_hill(llista, text, clau){
    let num_caracters = clau.length;
    clau = caracters_a_num_llista(llista, clau)
    text = caracters_a_num_llista(llista, text)
    clau = divididor_llista(clau, Math.floor(Math.sqrt(clau.length)))
    console.log(text)
    if(es_quadrat(clau)){
        let i = 0;
        while(clau.length%(text.length) !== 0 && (text.length)%clau.length !== 0 && i < 10){
            console.log(clau.length)
            console.log(text.length)
            console.log(clau.length)%(text.length)
            text.push(llista.length)
            i++
        }
        text = divididor_llista(text, Math.floor(clau.length))
        
        
    
        let text_codificat = ""
        console.log(text)
        console.log(clau)
        for(let i = 0; i < text.length; i++){
            let array_separat= creador_matriu(clau.length,1)
            for (let index = 0; index < clau.length; index++){
                array_separat[index][0] = text[i][index]
            
            }
            console.log(array_separat)

            let array_codificat = multiplicador_de_matrius(clau, array_separat)
            console.log(array_codificat);
            for (let j = 0; j < array_codificat.length; j++){
                for(let h = 0; h < array_codificat[j].length; h++){
                    text_codificat +=llista[array_codificat[j][h]%llista.length]
                }
            }
            
        }
        return text_codificat
    } else{
        return("Clau no es un quadrat. Caracters: " + num_caracters + " Quadrat mes proper: " + quadrat_mes_proper(num_caracters))
    }
}


function codificador_cesar(total_caracteres, text, clau){
    let caracters_actualitzats = [];
    text_actualizado = "";

    

    if (isNaN(clau)){
        console.log("hola")
        return("Error: Clau no es un numero")
    }  
    else {
        clau = clau%(total_caracteres.length-1);
        let numeru = 0;
        for(let i = 0; i < total_caracteres.length; i++){
            if(i + clau >= total_caracteres.length){
                numeru = i + clau -total_caracteres.length;
            }
            else{
                numeru = i + clau;
            }
            caracters_actualitzats.push(total_caracteres[numeru]);


            
        }
        for (let caracter of text) {
            text_actualizado += caracters_actualitzats[total_caracteres.findIndex(char => char === caracter)];
        }
        
        return(text_actualizado)
    }

}

function descodificador_cesar(total_caracteres, text, clau){
    let caracters_actualitzats = [];
    text_actualizado = "";

    clau = clau%(total_caracteres.length-1);
    let numeru = 0;
    for(let i = 0; i < total_caracteres.length; i++){
        if(i - clau < 0){
            numeru = i - clau +total_caracteres.length;
        }
        else{
            numeru = i - clau;
        }
        caracters_actualitzats.push(total_caracteres[numeru]);


        
    }
    for (let caracter of text) {
        text_actualizado += caracters_actualitzats[total_caracteres.findIndex(char => char === caracter)];
    }
    
    return(text_actualizado)

}

let input = "";
let clau = "";

let boto_codificar = document.getElementById("boto_codificar");
let texto_codificado_titulo = document.getElementById("Texto_codificado_titulo");
let texto_codificado = document.getElementById("Texto_codificado");
let text_codificar = document.getElementById("text_codificar");
let clau_codificar = document.getElementById("clau_codificar");
let titulo_codificador = document.getElementById("titulo_codificador")
let triacodificadors = document.getElementById("codificadors");
let historial_texto = "";
historial_texto = localStorage.getItem('historial_div');
let savedHTML = localStorage.getItem('historial_div');
let historial_div = document.getElementById("historial_div")
let descodificador_cambiat = false;
historial_div.innerHTML = savedHTML; 
let codificador_numero = 0;

if(historial_texto == null){
    historial_texto = "";
    
}

boto_codificar.addEventListener("click", ()=> { 
    input = document.getElementById("input").value;
    clau = document.getElementById("clau_codificadora").value;
    let resultat = "Nan"
    if(!descodificador_cambiat){  
        if(codificador_numero === 0){
            resultat = codificador_cesar(mis_caracteres, input,clau)
            texto_codificado.textContent = resultat;
            historial_texto += "<p class ='historial_texto'>Codificador cèsar(Text: "+escapador(input)+" Clau: "+ clau + " = " + "<p id= 'resultat'>"+escapador(resultat) +"</p>)<br>";
        }
    }
    else{
        if(codificador_numero === 1){
            resultat = codificador_hill(mis_caracteres, input,clau)
            texto_codificado.textContent = resultat;
            historial_texto += "<p class ='historial_texto'>Codificador hill(Text: "+escapador(input)+" Clau: "+ clau + " = " + "<p id= 'resultat'>"+escapador(resultat) +"</p>)<br>";
        }
        
        if(codificador_numero === 0) {
            resultat = descodificador_cesar(mis_caracteres, input,clau)
            texto_codificado.textContent = resultat;
            historial_texto += "<p class ='historial_texto'>Descodificador cèsar(Text: "+escapador(input)+" Clau: "+ clau + " = " + "<p id= 'resultat'>"+escapador(resultat) +"</p>)<br>";   
        }

    }
    document.getElementById("Texto_codificado").textContent = resultat;
    document.getElementById("Texto_codificado").style.block
    localStorage.setItem('historial_div', historial_texto);
    let savedHTML = localStorage.getItem('historial_div');
    let historial_div = document.getElementById("historial_div")
    historial_div.innerHTML = savedHTML; 

})


borrar_historial.addEventListener("click", ()=> { 
    localStorage.clear();
    historial_div.innerHTML= null;
    historial_texto = "";
})


boto_cambiar.addEventListener("click", ()=> {
    if (!descodificador_cambiat){
        descodificador_cambiat = true;
        boto_cambiar.textContent = "Cambia a codificador"
        boto_codificar.textContent = "DESCODIFICAR"
        texto_codificado_titulo.textContent ="Texto descodificado: "
        text_codificar.textContent = "Posa el teu text per descodificar:"
        clau_codificar.textContent = "Posa la teva clau descodificadora"
        console.log(descodificador_cambiat)

        if(valor == "cesar"){
            texto_codificado_titulo.textContent = "CODIFICADOR CÈSAR"
        } 
    }
    else{
        boto_cambiar.textContent = "Cambia a descodificador"
        boto_codificar.textContent = "CODIFICAR"
        texto_codificado_titulo.textContent ="Texto codificado: "
        text_codificar.textContent = "Posa el teu text per codificar:"
        clau_codificar.textContent = "Posa la teva clau codificadora"
        descodificador_cambiat = false;
        console.log(descodificador_cambiat)
    }

})

triacodificadors.addEventListener("change", function(){
    let color = document.getElementById("container").classList
    let valor = triacodificadors.value
    console.log(valor)
    if (valor === "cesar"){
        color.remove("vermell")
        color.remove("blau")
        color.remove("morat")
        color.add("verd")
        codificador_numero = 0;
        titulo_codificador.textContent = "Codificador Cèsar"
        console.log(color)
    }   else if (valor === "hill") {
        color.remove("verd")
        color.remove("morat")
        color.remove("blau")
        color.add("vermell")
        codificador_numero = 1;
        titulo_codificador.textContent = "Codificador Hill"
        console.log(color)
    } else if (valor ==="3"){
        color.remove("vermell")
        color.remove("morat")
        color.remove("verd")
        color.add("blau")
        codificador_numero = 2;
    } else if (valor ==="4"){
        color.remove("vermell")
        color.remove("blau")
        color.remove("verd")
        color.add("morat")
        
        codificador_numero = 3;
    }
})