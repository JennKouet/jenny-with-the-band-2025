/**
 * Classes partagées par tous les formulaires d'administration.
 *
 * Centralisé pour que les panneaux d'admin restent cohérents : une retouche
 * ici se propage partout. `font-[roboto]` est indispensable sur la carte, car
 * le <body> applique une police décorative à l'ensemble du site, illisible
 * dans un champ de saisie.
 */
export const adminForm = {
  card:
    'font-[roboto] w-full rounded-lg border border-white/15 bg-black/70 p-4 text-left backdrop-blur-sm',
  eyebrow: 'text-[11px] font-semibold uppercase tracking-widest text-red-500',
  title: 'font-[roboto] text-base font-semibold text-white',
  label: 'block text-sm font-medium text-white',
  input:
    'mt-1.5 w-full rounded border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/40',
  textarea:
    'mt-1.5 w-full rounded border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/40',
  fileInput:
    'mt-1.5 w-full rounded border border-white/25 bg-white/10 px-3 py-2 text-sm text-white file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-red-600 file:px-3 file:py-1.5 file:text-sm file:text-white hover:file:bg-red-500',
  hint: 'mt-1.5 text-xs text-white/50',
  primaryButton:
    'rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50',
  secondaryButton:
    'rounded border border-white/25 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10',
  linkButton: 'text-sm text-white/70 underline transition-colors hover:text-white',
  error: 'text-sm text-red-400',
  success: 'text-sm text-green-400',
} as const;
