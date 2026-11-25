'use client';

import { useEffect, useState } from 'react';

/**
 * Cuenta cuántas tareas llevan hechas.
 *
 * El número es correcto. La forma de calcularlo es una barbaridad.
 */
export function Pesado() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // ╔════════════════════════════════════════════════════════╗
    // ║  ARREGLO 3 · El hilo bloqueado                         ║
    // ║                                                        ║
    // ║  Esto tarda ~300 ms y corre en el navegador, en el      ║
    // ║  único hilo que también dibuja y atiende los clics.     ║
    // ║  Durante esos 300 ms la página se ve lista pero no      ║
    // ║  responde: presionas y no pasa nada.                    ║
    // ║                                                        ║
    // ║  Lighthouse lo reporta como Total Blocking Time, y es   ║
    // ║  lo que arruina el INP, que mide justo eso: cuánto      ║
    // ║  tarda tu página en reaccionar cuando la tocan.         ║
    // ║                                                        ║
    // ║  El arreglo es borrar el disparate y contar de frente:  ║
    // ║                                                        ║
    // ║    setTotal(4);   // o recibirlo del servidor por props ║
    // ║                                                        ║
    // ║  La lección: si el resultado no depende del navegador,  ║
    // ║  no lo calcules en el navegador.                        ║
    // ╚════════════════════════════════════════════════════════╝

    // Arreglo 3: sin el bucle de 90 millones; el resultado no depende del navegador.
    setTotal(4);
  }, []);

  return (
    <p className="mt-6 text-sm text-tenue">
      Llevas {total} tareas registradas este semestre.
    </p>
  );
}
