/**
 * Liste des comptes autorisés à administrer le site.
 *
 * ⚠️ Doit rester synchronisée avec la fonction `public.is_admin()` définie dans
 * Supabase (migration `restrict_writes_to_admin`). Cette liste ne sert qu'à
 * masquer l'interface : la sécurité réelle est assurée par les politiques RLS,
 * qui rejettent toute écriture venant d'un autre compte.
 */
export const ADMIN_EMAILS = ['jennband@gmail.com'];

export const isAdminEmail = (email?: string | null) =>
  !!email && ADMIN_EMAILS.includes(email.toLowerCase());
