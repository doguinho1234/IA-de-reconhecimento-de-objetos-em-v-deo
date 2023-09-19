objects = [];//array = lista
detectou = "";
objetosDetectados = new Set();
//um conjunto Set() armazena valores e não permite elementos duplicados

function preload() {
    video = createVideo('WIN_20230919_18_28_50_Pro.mp4');
}

function start() {
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objetos"
}

function setup () {
    canvas = createCanvas(640, 420);
    canvas.center();
    video.hide();
}

function modelLoaded() {
    console.log("modelo foi carregado com sucesso!")
    detectou = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

 function gotResult(error, results) {
    if(error) {
         console.log(error);
     }
     console.log(results);
     
     //percorra os resultados e adicione os nomes dos objetos ao conjunto
     for(let i = 0; i < results.length; i++) {
        objetosDetectados.add(results[i].label);
     }

     // Atualize a Lista de objetos nas interface/HTML
     atualizarListaObjetos();
     objects = results;
 }

function atualizarListaObjetos() {
//converta o conjunto em um array para exibição
let listaObjetos = Array.from(objetosDetectados);

// Exiba a lista na interface
let listaHTML = listaObjetos.join(", ");
document.getElementById("listaObjetos").innerHTML = "Objetos Detectados: " + listaHTML;
}

function draw() {
image(video, 0, 0, 640, 420);

if (detectou != "") {
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Objetos Detectados"
        document.getElementById("numberOfObjects").innerHTML = "Quantidade de objetos detectados: " + object.length;
        fill("red");
        percent = floor(objects[i].confidence * 100)
        text(objects[i].label + " "+ percent + "%", objects[i].x, objects[i].y);
        noFill()
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }

    //atualiza a lista de objetos após cada detecção
    atualizarListaObjetos();
}
}