import _ from "underscore";
import {
  crearDeck,
  pedirCarta,
  valorCarta,
  turnoComputadora,
  crearCartaHtml,
} from "./usecases/index";

//Export independieente
//import  crearDeck, { nombree}  from "./usecases/crear-deck";
//import { crearDeck } from "./usecases/crear-deck";
//Exp renombrando
//import { crearDeck as crearNuevodeck } from "./usecases/crear-deck";
//Exp por defecto
//import cualquier nombre from "./usecases/crear-deck";

/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const puntosHTML = document.querySelectorAll("small");
btnDetener.disabled = true;
deck = crearDeck(tipos, especiales);

// Eventos
btnPedir.addEventListener("click", () => {
  btnDetener.disabled = false;
  const carta = pedirCarta(deck);

  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;

  const imgCarta = crearCartaHtml(carta);
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("Lo siento mucho, perdiste");

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador, puntosHTML[1], divCartasComputadora, deck);
  } else if (puntosJugador === 21) {
    console.warn("21, genial!");

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador, puntosHTML[1], divCartasComputadora, deck);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;

  turnoComputadora(puntosJugador, puntosHTML[1], divCartasComputadora, deck);
});

btnNuevo.addEventListener("click", () => {
  console.clear();
  deck = [];

  deck = crearDeck(tipos, especiales);

  puntosJugador = 0;
  puntosComputadora = 0;

  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;

  divCartasComputadora.innerHTML = "";
  divCartasJugador.innerHTML = "";

  btnPedir.disabled = false;

 // btnDetener.disabled = false;
});
