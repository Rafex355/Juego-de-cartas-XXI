//¿Como hago para q funcione el codigo? DIOS ME HAS MIRADO AL OJOS 
//Doble para aumentar la resolucion
var canvas = document.getElementById("canvas");
canvas.width = 1220 * 2;
canvas.height = 400 * 2;
canvas.style.width = 1220 + "px";
canvas.style.height = 400 + "px";
var ctx = canvas.getContext("2d");

// Trabajar con clases, por que sino con que voy a trabajar
class carta {
	// Por lo que vi, static le pertenece a la clase 
	static x = 50;
	static y = 50;

	constructor(valor, palo) {
		this.img = new Image();
		this.valor = valor;
		this.palo = palo;
	}
}

// Variables que vamos a usar
var cartas = [];
var cartasJugador = [];
var cartasCrupier = [];
var indiceCarta = 0;
var palos = ["S", "H", "D", "C"];
//Yo soy bilingue y hablo como quiera
//ademas me estoy ayudando de un video entonces vamos a usar 
//H= Heart(Corazon) 
//S= Spades (Espada o Corazon Negro)
//D= Diamonds (Diamante o Brillo)
//C= Clubs (Trebol)
for (i = 0; i < 4; i++) {
	for (j = 1; j <= 13; j++) {
		cartas.push(new carta(j, palos[i]));
	}
}

//Barajamos las cartas, yo puse para que se muevan 222 veces por que ese numero me gusta
//pero basicamente se puede poner cualquier valor, yo le puse 222 bc its my angel number bitch
//shut the f*** up
for (i = 0; i < 222; i++) {
	cartas.splice(Math.random() * 52, 0, cartas[0]);
    //Aca dice 52 por que hay 52 cartas en un maso pues neni, o que nunca has jugado cartas?
	cartas.shift();
}

function dibujarCarta(CJ) {
	// Tenemos que primero cargar la carta y luego añadir el src
	// Si no las cartas no cargan en la pagina
	CJ.img.onload = () => {
		ctx.drawImage(CJ.img, carta.x, carta.y, 239, 335);
		carta.x += 300;
	};
	// Para cargar la imagen correcta concatenamos el numero y el maso, que coincida con el nombre
	CJ.img.src = "..//imagenes/cartas/" + CJ.valor.toString() + CJ.palo + ".svg";
}

    // Numero limite de cartas que pueda sacar para que el Host
    //tambíen pueda sacar las suyas, acaso es juego de uno solo -.-
    //Puede ser cualquier numero, pero como no nos gusta esperar  le vamos a poner un 6
function pedirCarta() {
	if (indiceCarta < 6) {
		let CJ = cartas[indiceCarta]; //Carta Jugada
		cartasJugador.push(CJ);
		dibujarCarta(CJ);
		indiceCarta++;
	}
}

function plantarme() {
	document.getElementById("pedir").disabled = true;
	document.getElementById("plantar").disabled = true;
	document.getElementById("reset").style.visibility = "visible";
	let pointsUser = 0;
	let pointsCrupier = 0;
	let info = document.getElementById("info");
	// Contamos e imprimimos los puntos del jugador
	for (i in cartasJugador) {
		pointsUser += cartasJugador[i].valor;
	}
	// Sacamos cartas al host y contamos sus puntos
	while (pointsCrupier < 17) {
		cartasCrupier.push(cartas[indiceCarta]);
		pointsCrupier += cartas[indiceCarta].valor;
		indiceCarta++;
	}
	// Puntos de la partida se ponen en info
	info.innerHTML = "Puntuación jugador: " + pointsUser + "<br>Puntuación del host: " + pointsCrupier;
	// Dibujamos las cartas del crupier
	carta.x = 50;
	carta.y = 400;
	for (i in cartasCrupier) {
		dibujarCarta(cartasCrupier[i]);
	}
	// El programa define el ganador en base a los puntos, asi es mi vida 
	if (pointsUser == 21) {
		info.innerHTML +="<br><b>GANADOR ABSOLUTO</b>";
	} else if (pointsUser > 21) {
		info.innerHTML +="<br><b>JUGADOR, has superado el limite, el HOST te ha derrotado</b>";
	} else if (pointsCrupier > 21) {
		info.innerHTML +="<br><b>El HOST ha superado el limite, has ganado</b>";
	} else if (pointsCrupier >= pointsUser) {
		info.innerHTML += "<br><b>Eso tuvo que doler! El HOST ha ganado la partida</b>";
	} else {
		info.innerHTML += "<br><b>Felicitaciones neni, has ganado la partida</b>";
	}
}

//Recarga la pagina cuando se presiona el botton
function playagain() {
	location.reload(true);
}