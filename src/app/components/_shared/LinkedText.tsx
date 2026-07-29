import React from 'react';

// Le groupe capturant fait que String.split() conserve les URLs dans le tableau :
// les index pairs sont du texte, les impairs des URLs.
const URL_PATTERN = /(https?:\/\/[^\s<]+)/g;

// Une phrase se termine souvent juste après un lien ("... voir : https://x.com/y.")
// La ponctuation finale ne fait alors pas partie de l'URL.
const TRAILING_PUNCTUATION = /[.,;:!?)\]]+$/;

interface LinkedTextProps {
  text: string;
  className?: string;
}

/**
 * Affiche un texte brut en rendant ses URLs cliquables et en conservant
 * les retours à la ligne. Aucun HTML n'est interprété : pas de risque de XSS.
 */
const LinkedText = ({ text, className = '' }: LinkedTextProps) => {
  // Les descriptions saisies dans Supabase contiennent souvent plusieurs lignes
  // vides d'affilée : on les ramène à une seule pour garder un interligne régulier.
  const parts = text.replace(/\n\s*\n\s*(\n\s*)+/g, '\n\n').split(URL_PATTERN);

  return (
    <p className={`whitespace-pre-line ${className}`}>
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          return part;
        }

        const trailing = part.match(TRAILING_PUNCTUATION)?.[0] ?? '';
        const href = trailing ? part.slice(0, -trailing.length) : part;

        return (
          <React.Fragment key={index}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 underline break-words hover:text-red-400"
            >
              {href}
            </a>
            {trailing}
          </React.Fragment>
        );
      })}
    </p>
  );
};

export default LinkedText;
