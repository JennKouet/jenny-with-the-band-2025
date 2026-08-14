import React from 'react'
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Politique de confidentialité",
    description: "Politique de confidentialité du site Jenny With the Band.",
    path: "/privacy-policies",
    noIndex: true,
});

const PrivatePoliciesPage = () => {
    return (
        <main className="max-w-3xl mx-auto px-4 py-10 text-white mt-20">
            <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p>
                Nous attachons une grande importance à la protection de votre vie
                privée. Cette politique de confidentialité a pour objectif de vous
                informer de manière claire et transparente sur les traitements de
                données mis en œuvre lors de votre visite sur notre site.
                </p>
                <p className="mt-2 font-medium">
                Important : notre site vitrine ne collecte aucune donnée personnelle.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Collecte de données</h2>
                <div>
                Lorsque vous naviguez sur ce site :
                <ul className="list-disc list-inside mt-2">
                    <li>Nous ne vous demandons <strong>aucune information personnelle</strong>.</li>
                    <li>Aucun formulaire de contact, d’inscription ou de commande n’est présent.</li>
                    <li>Aucune inscription à une newsletter ou création de compte n’est possible.</li>
                </ul>
                </div>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Cookies et traceurs</h2>
                <p>
                Notre site n’utilise <strong>aucun cookie ou traceur</strong> à des fins
                statistiques, publicitaires ou de suivi utilisateur. Aucun cookie n’est
                déposé lors de votre simple navigation : c’est pourquoi aucune bannière
                de consentement ne vous est présentée.
                </p>
                <p className="mt-2">
                Les <strong>vidéos YouTube</strong> ne se chargent qu’après un clic de
                votre part. Tant que vous n’en lancez pas la lecture, aucune connexion
                n’est établie avec YouTube. En cliquant, vous acceptez que ce service
                puisse déposer des cookies, soumis à sa propre politique de
                confidentialité.
                </p>
                <p className="mt-2">
                Le <strong>flux Instagram</strong> s’affiche directement, car le service
                qui l’héberge <strong>ne dépose aucun cookie</strong> et n’écrit rien sur
                votre appareil. Son affichage transmet en revanche votre adresse IP aux
                serveurs qui fournissent les images (voir la section « Services tiers »).
                </p>
                <p className="mt-2">
                Des cookies strictement nécessaires au fonctionnement du site peuvent être
                utilisés (notamment pour l’espace d’administration réservé au groupe). Ils
                ne permettent <strong>pas d’identifier personnellement</strong> les
                visiteurs et sont <strong>exemptés de consentement</strong> au sens de la
                réglementation.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Hébergement et sécurité</h2>
                <p>
                Le site est hébergé par un prestataire garantissant un haut niveau de
                sécurité et de confidentialité. Comme tout serveur web, celui-ci peut
                conserver des journaux de connexion techniques (dont l’adresse IP) à des
                fins de sécurité et de bon fonctionnement. Ces journaux ne sont
                <strong> jamais analysés</strong> dans une optique d’identification ou de
                suivi des visiteurs.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Services tiers</h2>
                <p>
                Nous n’utilisons <strong>aucun outil de mesure d’audience ni de publicité</strong>
                (Google Analytics, Facebook Pixel, reCAPTCHA, etc.).
                </p>
                <p className="mt-2">
                Deux services externes permettent d’afficher nos contenus :
                </p>
                <ul className="list-disc list-inside mt-2">
                <li>
                    <strong>YouTube</strong> (Google Ireland Ltd) pour la lecture des vidéos,
                    intégré en mode « sans cookie » et chargé uniquement si vous lancez une
                    vidéo. Les vignettes sont servies depuis notre propre domaine : tant que
                    vous ne cliquez pas, votre navigateur ne contacte pas Google.
                </li>
                <li>
                    <strong>LightWidget</strong> (hébergé par Cloudflare) pour l’affichage du
                    flux Instagram, et <strong>Meta Platforms Ireland Ltd</strong> qui fournit
                    les images de ce flux. Ce contenu s’affiche directement : ces services ne
                    déposent aucun cookie et n’écrivent rien sur votre appareil, mais votre
                    adresse IP et le type de votre navigateur leur sont transmis, ce qui est
                    techniquement nécessaire pour vous délivrer les images.
                </li>
                </ul>
                <p className="mt-2">
                Ce dernier traitement repose sur notre <strong>intérêt légitime</strong> à
                présenter notre actualité. Si vous préférez l’éviter, un bloqueur de contenus
                tiers ou le mode de navigation renforcée de votre navigateur suffit : le reste
                du site fonctionne normalement sans ce flux.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Vos droits</h2>
                <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD),
                vous disposez de droits d’accès, de rectification, d’effacement et
                d’opposition. Toutefois, comme <strong>aucune donnée n’est collectée</strong>,
                l’exercice de ces droits n’est pas nécessaire sur notre site.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
                <p>
                Pour toute question concernant cette politique de confidentialité, vous
                pouvez nous contacter à l’adresse suivante :
                <br />
                <a href="mailto:contact@jennywiththeband.com" className="text-blue-600 underline">
                    contact@jennywiththeband.com
                </a>
                </p>
            </section>
            </main>
    );
}

export default PrivatePoliciesPage;
