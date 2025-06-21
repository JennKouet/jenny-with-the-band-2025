import React from 'react'

const PrivatePoliciesPage = () => {
    return (
        <main className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
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
                <p>
                Lorsque vous naviguez sur ce site :
                <ul className="list-disc list-inside mt-2">
                    <li>Nous ne vous demandons <strong>aucune information personnelle</strong>.</li>
                    <li>Aucun formulaire de contact, d’inscription ou de commande n’est présent.</li>
                    <li>Aucune inscription à une newsletter ou création de compte n’est possible.</li>
                </ul>
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Cookies et traceurs</h2>
                <p>
                Notre site n’utilise <strong>aucun cookie ou traceur</strong> à des fins
                statistiques, publicitaires ou de suivi utilisateur.
                </p>
                <p className="mt-2">
                Des cookies strictement nécessaires au fonctionnement du site peuvent être
                utilisés, mais ils ne permettent <strong>pas d’identifier personnellement</strong>
                les utilisateurs et ne sont <strong>pas conservés</strong> au-delà de votre session.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Hébergement et sécurité</h2>
                <p>
                Le site est hébergé par un prestataire garantissant un haut niveau de
                sécurité et de confidentialité. Aucun fichier journal (log) n’est analysé
                dans une optique d’identification des utilisateurs.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Services tiers</h2>
                <p>
                Nous n’utilisons pas de services tiers susceptibles de collecter des données
                personnelles (tels que Google Analytics, Facebook Pixel, reCAPTCHA, etc.).
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
                <a href="mailto:votre-email@exemple.com" className="text-blue-600 underline">
                    votre-email@exemple.com
                </a>
                </p>
            </section>
            </main>
    );
}

export default PrivatePoliciesPage;