'use client';

import React, { useEffect } from 'react';

/**
 * Flux Instagram (LightWidget), chargé directement.
 *
 * Contrairement aux vidéos YouTube, ce widget n'a pas besoin d'un accord
 * préalable du visiteur : vérifié le 14/08/2026, ni le script ni l'iframe
 * n'écrivent sur le terminal (aucun Set-Cookie, aucun localStorage,
 * sessionStorage, indexedDB ni document.cookie). L'article 82 de la loi
 * Informatique et Libertés, qui impose le consentement, vise précisément
 * cette écriture : elle n'a pas lieu ici.
 *
 * Reste la connexion vers cdn.lightwidget.com et les images servies par
 * scontent-*.cdninstagram.com, qui transmettent l'IP du visiteur. Ce
 * traitement repose sur l'intérêt légitime et est mentionné dans la
 * politique de confidentialité.
 *
 * À revérifier périodiquement : un tiers peut modifier son script sans
 * préavis. Si des cookies y apparaissent, il faudra repasser ce composant
 * en chargement au clic, comme YouTubeEmbed.
 */
const InstagramWidgetComponent = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <iframe
            src="https://cdn.lightwidget.com/widgets/8f416d58199259829b5789afe1491a7e.html"
            className="lightwidget-widget"
            title="Flux Instagram de Jenny With the Band"
            loading="lazy"
            style={{
                width: '100%',
                border: 0,
                overflow: 'hidden',
            }}
        />
    );
}

export default InstagramWidgetComponent;
