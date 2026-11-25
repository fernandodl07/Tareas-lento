import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { GA_ID } from '@/lib/gtag';
import { Analitica } from './analitica';
import './globals.css';

// ╔══════════════════════════════════════════════════════════╗
// ║  ARREGLO 6 · La metadata                                 ║
// ║                                                          ║
// ║  Ahora mismo esta página no tiene título ni descripción.  ║
// ║  En la pestaña del navegador dice la URL. En Google       ║
// ║  saldría igual de fea. Y si alguien la comparte en        ║
// ║  WhatsApp, no sale ni imagen ni texto.                    ║
// ║                                                          ║
// ║  Lighthouse lo marca en SEO: «Document does not have a    ║
// ║  meta description».                                       ║
// ║                                                          ║
// ║  export const metadata: Metadata = {                      ║
// ║    title: { default: 'Tareas del curso',                  ║
// ║             template: '%s · Tareas del curso' },          ║
// ║    description: 'Lleva el control de las tareas ...',     ║
// ║    openGraph: {                                           ║
// ║      title: 'Tareas del curso',                           ║
// ║      description: '...',                                  ║
// ║      images: ['/portada.jpg'],                             ║
// ║      type: 'website',                                      ║
// ║    },                                                      ║
// ║  };                                                        ║
// ╚══════════════════════════════════════════════════════════╝

export const metadata: Metadata = {
  title: { default: 'Tareas del curso', template: '%s · Tareas del curso' },
  description:
    'Lleva el control de las tareas de Programación IV: agrega pendientes, márcalos como hechos y no se te pase ninguna entrega.',
  openGraph: {
    title: 'Tareas del curso',
    description: 'Lleva el control de las tareas de Programación IV.',
    images: ['/portada.jpg'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/* ╔════════════════════════════════════════════════════╗
            ║  ARREGLO 7 · El script de Google Analytics         ║
            ║                                                    ║
            ║  Dos <Script> de next/script, los dos con           ║
            ║  strategy="afterInteractive" para que NO bloqueen   ║
            ║  el primer pintado:                                 ║
            ║                                                    ║
            ║  <Script                                            ║
            ║    src={`https://www.googletagmanager.com/gtag/js   ║
            ║          ?id=${GA_ID}`}                             ║
            ║    strategy="afterInteractive" />                   ║
            ║                                                    ║
            ║  <Script id="ga4" strategy="afterInteractive">{`    ║
            ║    window.dataLayer = window.dataLayer || [];       ║
            ║    function gtag(){dataLayer.push(arguments);}      ║
            ║    gtag('js', new Date());                          ║
            ║    gtag('config', '${GA_ID}');                      ║
            ║  `}</Script>                                        ║
            ║                                                    ║
            ║  Ponlos SOLO si GA_ID tiene valor: {GA_ID && (...)} ║
            ╚════════════════════════════════════════════════════╝
        Nota: con GA_ID vacío, `{GA_ID && (...)}` deja un texto "" dentro de
        <head> y rompe la hidratación (React #418). Por eso va con ternario
        y en <body>: next/script los inyecta igual después de interactivo. */}
      <body className="min-h-screen">
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}</Script>
          </>
        ) : null}
        <Analitica />

        <nav className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-3xl gap-6 px-6 py-4">
            <Link href="/" className="font-semibold">
              Tareas
            </Link>
            <Link href="/acerca" className="text-tenue">
              Acerca del curso
            </Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
