import { pedirCarta, valorCarta, crearCartaHtml } from "./";

/**
 * turno de la computadora
 * @param {Number} puntosMinimos: computadora necesita para ganar
 * @param {HTMLElement} puntosHTML: elemento HTML para mostrar los puntos
 * @param {Number} divCartasComputadora: computadora necesita para ganar
 * @param {Array<string>} deck
 */
export const turnoComputadora = (
  puntosMinimos,
  puntosHTML,
  divCartasComputadora,
  deck = []
) => {
  if (!puntosMinimos) {
    alert("Pida una carta!");
    throw new Error("Puntos minimos son necesarios");
  }

  if (!puntosHTML) throw new Error("Argumento puntosHTML es necesario");
  let puntosComputadora = 0;

  do {
    const carta = pedirCarta(deck);

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML.innerText = puntosComputadora;

    const imgCarta = crearCartaHtml(carta);
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Empate");
    } else if (puntosMinimos > 21) {
      alert("Perdiste");
    } else if (puntosComputadora > 21) {
      alert("Ganaste");
    } else {
      alert("Perdiste");
    }
  }, 100);
};
