function dibujo() {
                var fig = document.getElementById("selectFig").value;
                var color = document.getElementById("colorFig").value.toString();         
                colorCont = document.getElementById("colorCont").value.toString();//color para el contorno      
                var back = document.getElementById("back").value.toString();  //color de fondo, leé valor 
                var gradL = document.getElementById("check1").checked;//valor booleano de gradiente líneal
                var gradR = document.getElementById("check2").checked;//valor booleano de gradiente radial
                document.getElementById("check1").checked=false;
                document.getElementById("check2").checked=false;
                canvas1 = document.getElementById("miCanvas");
                contexto= canvas1.getContext("2d");
                var width = canvas1.width;
                var height = canvas1.height; 
                canvas1.style.background=back;     //aplicando fondo al canvas            
                switch(fig) {
                	case 'Rectangulo':
                                var ancho = prompt ("Ancho: ", 0);  //pide los datos para dibujar la figura
                                var alto = prompt ("Alto: ", ancho*2);
                                var paramX = prompt ("CenterX: ", 0);
                                var paramY = prompt ("CenterY: ", 0);
                                if (ancho <=  width && alto <= height ) {//En este seccion se condiciona 
                                    //las variables ingresadas para no sobrepasar los límites del canvas
                                    if(gradR == true){          //Creamos una condicion para dibujar con 
                                        //gradiente radial, que aqui si esta seleccionado el radio button
                                        //empieza con el trazo
                                        contexto.lineWidth=3; //Grosor del contorno
                                        sombra();//Método llamado para poner sombras a nuestra
                                        //figura
                                        radialGradiente(); //Método llamado para dibujar un gradiente 
                                        //radial con valores predefinidos
                                        contexto.strokeStyle=colorCont;
                                        contexto.fillRect(paramX ,paramY ,ancho , alto);
                                        contexto.strokeRect(paramX ,paramY ,ancho , alto);
                                    }
                                    else if(gradL == true){//Creamos una condicion para dibujar con 
                                        //gradiente líneal, que aqui si esta seleccionado el radio button
                                        //empieza con el trazo
                                        contexto.lineWidth=3;
                                        sombra();
                                        linealGradiente();
                                        contexto.strokeStyle=colorCont; //Pintamos la linea con el color
                                        //que seleccionemos para el contorno. Este color es almacenado
                                        //en la variable colorCont, cuando se genera el evento click()
                                        //en el botón de Dibujar
                                        contexto.strokeRect(paramX ,paramY ,ancho , alto); //permite 
                                        //dibujar nuestro unico contorno, ayudado por strokeStyle 
                                        //aplicandole el color seleccionado
                                        contexto.fillRect(paramX ,paramY ,ancho , alto);//Nuestro 
                                        //rectángulo sólido es dibujado con los parámetros
                                        //ingresados
                                        
                                    }else{
                                        sombra();
                                        contexto.lineWidth=3;
                                        contexto.strokeStyle=colorCont;
                                        contexto.fillStyle=color;
                                        contexto.fillRect(paramX ,paramY ,ancho , alto);
                                        //contexto.strokeRect(paramX ,paramY ,ancho , alto);
                                    
                                    };
                                        
                                    
                                }else{
                                    alert("Estan fuera del canvas los parámetros");//Si
                                    //no se cumplen con los parámetros dentro del area
                                    //de canvas aparece este mensaje
                                };
                                break;
	                case 'Circulo':
                                contexto.fillStyle = color;
                                contexto.strokeStyle = colorCont;
                                var radio = prompt ("Radio: ", 0);
                                var centerX = prompt ("CenterX: ", radio);
                                var centerY = prompt ("CenterY: ", radio);
                                if (radio <= height/2) {
                                    if(gradR == true){
                                        contexto.beginPath();
                                        contexto.arc(centerX, centerY, radio, 0, 2 * Math.PI, false);
                                        radialGradiente();
                                        sombra();
                                        contexto.lineWidth=3;
                                        contexto.stroke();
                                        contexto.closePath();
                                        contexto.fill();
                                    }
                                    else if(gradL == true){
                                        contexto.beginPath();
                                        contexto.arc(centerX, centerY, radio, 0, 2 * Math.PI, false);
                                        linealGradiente();
                                        sombra();
                                        contexto.lineWidth=3;
                                        contexto.stroke();
                                        contexto.closePath();//cierra un trazado línea recta desde
                                        // un último a el origen
                                        contexto.fill();//dibujo de una figura sólida
                                    }else{
                                        contexto.beginPath();
                                        sombra();
                                        contexto.lineWidth=3;
                                        contexto.arc(centerX, centerY, radio, 0, 2 * Math.PI, false);
                                        contexto.stroke();
                                        contexto.closePath();
                                        contexto.fill();
                                    };
                                        
                                }else{
                                    alert("Estan fuera del canvas los parámetros");
                                };
	                	break;
	                case 'Triangulo':               	
                                contexto.beginPath();
                                var puntaA = prompt ("Punto inicial (x): ", 0);
                                var puntaB = prompt ("Punto inicial (y): ", puntaA);
                                var derA = prompt ("Lado derecho (x) "+"(Mayor a: "+puntaA+"):", puntaA*2);
                                var derB = prompt ("Lado derecho (y) "+"(Mayor a: "+puntaB+"):", derA);
                                var izqA = prompt ("Lado izquierdo (x) "+"(Menor a: "+puntaA+"):", derA-puntaA*2);
                                var izqB = prompt ("Lado izquierdo (y) "+"(Mayor a: "+puntaB+"):", derB);
                                if ((puntaA>=0 && puntaA<width) && (puntaB>=0 && puntaB<height) && (derA || derB || izqA || izqB)<width && (derA || derB || izqA || izqB)>=0) {
                                    if(gradR == true){
                                        contexto.moveTo(puntaA,puntaB);
                                        contexto.lineTo(derA,derB);
                                        contexto.lineTo(izqA,izqB);
                                        radialGradiente();
                                        sombra();
                                        contexto.fill(); 
                                    } 
                                    else if(gradL == true){
                                        contexto.moveTo(puntaA,puntaB);
                                        contexto.lineTo(derA,derB);
                                        contexto.lineTo(izqA,izqB);
                                        linealGradiente();
                                        sombra();
                                        contexto.fill();  
                                    } else{
                                        contexto.moveTo(puntaA,puntaB);
                                        contexto.lineTo(derA,derB);
                                        contexto.lineTo(izqA,izqB);
                                        sombra();
                                        contexto.fill(); 
                                    };
                                }else{
                                    alert("Estan fuera del canvas los parámetros");
                                };
                                
	                	break;
	                case 'BezierCuad':
	                	contexto.lineWidth = 3;
                                var puntoCX = prompt ("Punto control (x): ", 0);
                                var puntoCY = prompt ("Punto control (y): ", 0);
                                var puntoFX = prompt ("Punto final (x): ", 0);
                                var puntoFY = prompt ("Punto final (y): ", 0);
                                if ((puntoFX&&puntoFY)<500 ) {
                                    sombra();
                                    radialGradiente();
                                    contexto.strokeStyle = color;
                                    contexto.beginPath();
                                    contexto.moveTo(50, 250);
                                    contexto.quadraticCurveTo(puntoCX, puntoCY, puntoFX, puntoFY);
                                    //curva de Bezier cuadrática con un punto de controly uno final
                                    contexto.stroke();
                                    
                                } else {
                                    alert("Estan fuera del canvas los parámetros");
                                };
                                
	                	break;
                    case 'BezierCub':
                                contexto.lineWidth = 3;
                                var puntoCX = prompt ("Punto control 1 (x): ", 0);
                                var puntoCY = prompt ("Punto control 1 (y): ", 0);
                                var puntoC2X = prompt ("Punto control 2 (x): ", 0);
                                var puntoC2Y = prompt ("Punto control 2 (y): ", puntoCY);
                                var puntoFX = prompt ("Punto final (x): ", 0);
                                var puntoFY = prompt ("Punto final (y): ", 0);
                                if ((puntoFX&&puntoFY)<500) {
                                    sombra();
                                    contexto.strokeStyle = color;
                                    contexto.beginPath();
                                    contexto.moveTo(250, 50);
                                    contexto.bezierCurveTo(puntoCX,puntoCY, puntoC2X,puntoC2Y, puntoFX,puntoFY);
                                    //curva de Bezier Cúbica con dos punto de control y uno final
                                    contexto.stroke();
                                    
                                }else{
                                    alert("Estan fuera del canvas los parámetros");
                                }
                                
                        break;
                }      
}
function click() {
	var boton = document.getElementById("btnDibujar");
	boton.addEventListener('click', dibujo, false); //cuando tenemos selecionada nuestra figura 
    //color figura, contorno, fondo canvas, gradiente (líneal o radial) y damos click al botón
    //llamada a la función o método "dibujo"

    document.getElementById('clear').addEventListener('click', function() {//Evento para el botón
        //limpiar que limpia nuestro canvas
        contexto.clearRect(0, 0, canvas1.width, canvas1.height);
      }, false);

    var ova = document.getElementById("ovalo");
    if (ova.addEventListener) {
        ova.addEventListener ("CheckboxStateChange", ovalo, false);
    };//este evento se dispara cuando el combobox: 
    //id="ovalo" cambia de estado entonces dibuja un ovalo en la pantalla
}
//método para poner un gradiente líneal a nuestra figura
function linealGradiente(){
    var gradiente=contexto.createLinearGradient(100,100,10,100);
    gradiente.addColorStop(0, "black");
    gradiente.addColorStop(0.5, "red");
    gradiente.addColorStop(1, "white");
    contexto.fillStyle=gradiente;
}
//método para poner un gradiente radial a nuestra figura
function radialGradiente(){ 
    var gradiente=contexto.createRadialGradient(0,0,30,0,0,300);
    gradiente.addColorStop(0.5, "red");
    gradiente.addColorStop(1, "white");
    contexto.fillStyle=gradiente;    
}
//método para poner sombra a nuestra figura
function sombra(){
    var elemento=document.getElementById('miCanvas');
    contexto=elemento.getContext('2d'); 
    contexto.shadowColor=colorCont;
    contexto.shadowOffsetX=4;
    contexto.shadowOffsetY=4;
    contexto.shadowBlur=30;
}
//método que dibuja ovalos
function ovalo(e){
    var checkbox = e.target;
    if (checkbox.checked) {
        var canvas = document.getElementById('miCanvas');
        var contexto = canvas.getContext('2d');
        //valores por defecto para nuestro ovalo
        var centerX = 0; 
        var centerY = 0;
        var radius = 30;

        // Guarda el estado del canvas para aplicar nuevas figuras, lineas, etc.
        contexto.save();

        // Mueve el contexto con un numero aleatorio del 1 al 10
        var x = Math.floor((Math.random() * 10) + 1);
        var y = Math.floor((Math.random() * 10) + 1);
        contexto.translate(canvas.width / x, canvas.height / y);

        // Escala horizontalmente el contexto
        contexto.scale(2, 1);

        // Dibuja el circulo que será convertido en un ovalo con la ayuda de: contexto.scale(2,1);
        contexto.beginPath();
        contexto.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

        // Lo pone en su estado original
        contexto.restore();
        contexto.fillStyle = '#8ED6FF';
        contexto.fill();
        contexto.lineWidth = 2;
        contexto.strokeStyle = 'green';
        contexto.stroke();
    }
}
window.addEventListener('load', click, false);

