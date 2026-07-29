import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import { isAdminEmail } from '@/lib/admin';

/**
 * Indique si l'utilisateur connecté est administrateur.
 * Une simple session ne suffit pas : n'importe quel compte Google peut en
 * obtenir une, mais seules les adresses listées dans ADMIN_EMAILS peuvent
 * réellement écrire (voir les politiques RLS côté Supabase).
 */
export default function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const apply = (email?: string | null) => setIsAdmin(isAdminEmail(email));

    supabase.auth.getSession().then(({ data }) => apply(data.session?.user?.email));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      apply(session?.user?.email);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return isAdmin;
}
