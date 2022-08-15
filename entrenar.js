

let video;            //variables a utilizar 
let featureExtractor;
let clasificador;
let imgMasc=0;
let imgNoMasc=0;
let perdida=0;

function setup(){  //funcion que se ejecuta al abrir la pagina
noCanvas();
background(51);
video = createCapture(VIDEO);  //campura el video de la webcam
video.size (320,280);
video.parent("contenedorVideo");
featureExtractor = ml5.featureExtractor("MobileNet",modeloListo);  //propiedad de ml5 que permite cargar el modelo a utilizar
clasificador=featureExtractor.classification(video,videoListo);   //permite carfar el video a clasificar
cargabotones();
}

function modeloListo(){             //se carga el modelo de ml5 utilizar
select("#estadoModelo").html("Modelo Cargado!");
}
function videoListo(){
select("#estadoVideo").html("Video Cargado!");  //se carga el video de la webcam
}
function cargabotones(){
botonA= select("#btnMascarilla");
botonA.mousePressed(function(){ //al presionar el boton se ejecuta la fincion de abajo
    clasificador.addImage('Usa mascarilla'); //crea etiqueta de uso de mascarilla
    select("#sumaMascarilla").html(imgMasc++); //aumenta la cantidad 
});
botonB=select("#btnNoMascarilla");
botonB.mousePressed(function(){
    clasificador.addImage('No usa mascarilla');
    select("#sumaNoMascarilla").html(imgNoMasc++);
});

botonEnt = select("#btnEntrenar");
botonEnt.mousePressed(function(){
    clasificador.train(function(vperdida){ //empieza a entrenar en base a las imagenes
        if(vperdida){
            perdida = vperdida;
            select("#perdida").html("Perdida"+perdida);// perdida de informacion, probabilidad de fallar en prediccion
        }else{
            select("#perdida").html("Entrenamiento terminado con una perdida de:"+perdida);
}
});
});
    
botonPred= select("#btnPredecir");
botonPred.mousePressed(function(){
clasificador.classify(muestraResultado);
});
}
function muestraResultado(err,res){
console.log(res);
clasificador.classify(muestraResultado); //clasifica en base a las imagenes de los bonones anteriores
select("#result").html(res);
}


