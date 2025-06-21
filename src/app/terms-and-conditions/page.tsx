import React from 'react'

const TermsAndConditionsPage = () => {
    return (
        <main className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Conditions Générales d’Utilisation</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Objet</h2>
        <p>
          Les présentes Conditions Générales d’Utilisation (CGU) ont pour objet
          de définir les modalités d’accès et d’utilisation du site par tout
          utilisateur. L’accès au site implique l’acceptation sans réserve des
          présentes CGU.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Accès au site</h2>
        <p>
          Le site est accessible gratuitement à tout utilisateur disposant d’un
          accès à Internet. Aucun espace personnel ou service payant n’est
          proposé. L’éditeur s’efforce d’assurer un accès permanent au site,
          sans pour autant être tenu à une obligation de résultat.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Propriété intellectuelle</h2>
        <p>
          Tous les contenus présents sur ce site (textes, images, graphismes,
          logo, icônes, etc.) sont protégés par le droit de la propriété
          intellectuelle et sont la propriété exclusive de l’éditeur ou de ses
          partenaires. Toute reproduction, représentation ou diffusion, totale
          ou partielle, est interdite sans autorisation écrite préalable.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Responsabilité</h2>
        <p>
          L’éditeur ne peut être tenu responsable des dommages directs ou
          indirects pouvant résulter de l’accès ou de l’utilisation du site,
          incluant l’inaccessibilité, les pertes de données ou la présence de
          virus. Les informations diffusées sont données à titre indicatif et ne
          sauraient engager la responsabilité de l’éditeur.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Liens externes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers. L’éditeur n’a
          aucun contrôle sur ces sites et décline toute responsabilité quant à
          leur contenu ou à leur politique de confidentialité.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Modification des CGU</h2>
        <p>
          L’éditeur se réserve le droit de modifier les présentes CGU à tout
          moment. Les utilisateurs sont invités à les consulter régulièrement
          pour prendre connaissance des éventuelles mises à jour.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
        <p>
          Pour toute question concernant les présentes Conditions Générales
          d’Utilisation, vous pouvez nous contacter à l’adresse suivante :
          <br />
          <a href="mailto:votre-email@exemple.com" className="text-blue-600 underline">
            votre-email@exemple.com
          </a>
        </p>
      </section>
    </main>
    );
}

export default TermsAndConditionsPage;