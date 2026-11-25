'use client';

import { useRouter } from 'next/navigation';
import type { Tarea } from '@/lib/datos';
import { evento } from '@/lib/gtag';

export function Lista({ tareas }: { tareas: Tarea[] }) {
  const router = useRouter();

  async function alternar(tarea: Tarea) {
    const r = await fetch(`/api/tareas/${tarea.id}`, { method: 'PATCH' }).catch(() => null);
    // Evento propio del módulo: solo cuenta si el servidor aceptó el cambio
    // y la tarea pasó de pendiente a hecha.
    if (r?.ok && !tarea.hecha) {
      evento('tarea_completada', { materia: tarea.materia });
    }
    router.refresh();
  }

  return (
    <ul className="mt-6 space-y-2">
      {tareas.map((tarea) => (
        <li
          key={tarea.id}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
        >
          {/* ╔══════════════════════════════════════════════════╗
              ║  ARREGLO 4 · Los botones que nadie puede usar    ║
              ║                                                  ║
              ║  Dos problemas distintos en tres líneas:          ║
              ║                                                  ║
              ║  1) Un <div> con onClick NO es un botón. No se    ║
              ║     alcanza con Tab, no responde a Enter, y un    ║
              ║     lector de pantalla no lo anuncia. Cámbialo    ║
              ║     por un <button type="button">.                ║
              ║                                                  ║
              ║  2) El botón de borrar solo tiene un emoji        ║
              ║     adentro. Un lector de pantalla lee «bote de   ║
              ║     basura» o no lee nada. Ponle un nombre:       ║
              ║       aria-label={`Borrar ${tarea.titulo}`}       ║
              ║                                                  ║
              ║  Lighthouse lo marca como «Buttons do not have    ║
              ║  an accessible name» en Accesibilidad.            ║
              ╚══════════════════════════════════════════════════╝ */}

          {/* Arreglo 4a: un <button> real, alcanzable con Tab y anunciado */}
          <button
            type="button"
            onClick={() => alternar(tarea)}
            aria-pressed={tarea.hecha}
            aria-label={`Marcar «${tarea.titulo}» como ${tarea.hecha ? 'pendiente' : 'hecha'}`}
            className={`size-5 shrink-0 cursor-pointer rounded border-2 ${
              tarea.hecha ? 'border-uspg-navy bg-uspg-navy' : 'border-slate-400'
            }`}
          />

          <div className="min-w-0 flex-1">
            <p className={tarea.hecha ? 'text-tenue line-through' : 'font-medium'}>
              {tarea.titulo}
            </p>
            <p className="text-xs text-tenue">{tarea.materia}</p>
          </div>

          {/* Arreglo 4b: el botón tiene nombre accesible */}
          <button type="button" className="text-lg" aria-label={`Borrar ${tarea.titulo}`}>
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}
