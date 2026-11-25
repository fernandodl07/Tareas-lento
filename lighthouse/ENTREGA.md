# Lighthouse: antes y después (medido sobre `npm run build` + `next start`, móvil)

| Categoría      | Antes | Después |
|----------------|------:|--------:|
| Performance    |    63 |      99 |
| Accessibility  |    92 |     100 |
| Best Practices |    96 |      96 |
| SEO            |    82 |     100 |

| Métrica | Antes  | Después |
|---------|-------:|--------:|
| LCP     | 6.3 s  | 2.1 s   |
| TBT     | 210 ms | 70 ms   |
| CLS     | 0.23   | 0       |

Capturas: `antes.png` y `despues.png` (el "después" ya con GA4 cargado). Reportes completos: `*.report.html`.
`despues-sin-ga.*` es la misma medición sin el script de Google, para comparar: GA4 sube el TBT de 20 a 70 ms y el puntaje se queda en 99.

## GA4
- Scripts con `next/script` y `strategy="afterInteractive"`, solo si existe `NEXT_PUBLIC_GA_ID`.
- `page_view` manual en cada cambio de ruta (`app/analitica.tsx`), con `send_page_view: false` en el config para no contar doble.
- Evento clave: `tarea_creada` (`materia`, `metodo`), se manda solo si el POST respondió OK.
- Evento propio del módulo: `tarea_completada` (`materia`), solo si el PATCH respondió OK y la tarea pasó a hecha.

## Qué arreglo subió más el número y por qué
Cambiar la portada a `next/image` con `priority` y `sizes` fue lo que más subió: la imagen era el LCP y pasó de 835 KB a una versión WebP del tamaño real que se muestra, así el LCP bajó de 6.3 s a 2.1 s.
Le sigue reservar el espacio del aviso (CLS de 0.23 a 0), porque LCP y CLS juntos pesan la mitad del puntaje de Performance.
