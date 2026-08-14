'use client';

import React, { useEffect, useState } from 'react';

/**
 * Flux Instagram (LightWidget) en "chargement au clic".
 *
 * Le script et l'iframe de LightWidget ouvrent une connexion vers un tiers et
 * peuvent déposer des traceurs : ils ne sont donc injectés qu'après une action
 * explicite du visiteur. Tant qu'il n'a pas cliqué, rien ne quitte le site.
 */
const InstagramWidgetComponent = () => {
    const [hasConsented, setHasConsented] = useState(false);

    useEffect(() => {
        if (!hasConsented) return;

        const script = document.createElement('script');
        script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [hasConsented]);

    if (!hasConsented) {
        return (
            <div className="flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-white/20 bg-black/40 px-4 py-10 text-center">
                <p className="text-sm text-white/90">
                    Le flux Instagram est fourni par un service externe qui peut déposer des
                    cookies. Il ne se charge qu&apos;à votre demande.
                </p>
                <button
                    type="button"
                    onClick={() => setHasConsented(true)}
                    className="rounded border border-white/40 px-4 py-2 text-sm text-white transition-colors hover:bg-red-600 hover:border-red-600"
                >
                    Afficher le flux Instagram
                </button>
                <a
                    href="https://www.instagram.com/jennywiththeband/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/70 underline underline-offset-2 hover:text-white"
                >
                    Ou voir le compte directement sur Instagram
                </a>
            </div>
        );
    }

    return (
        <iframe
            src="https://cdn.lightwidget.com/widgets/8f416d58199259829b5789afe1491a7e.html"
            className="lightwidget-widget"
            title="Flux Instagram de Jenny With the Band"
            style={{
                width: '100%',
                border: 0,
                overflow: 'hidden',
            }}
        />
    );
}

export default InstagramWidgetComponent;
