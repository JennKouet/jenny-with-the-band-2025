import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Vérification de la connexion Supabase (console log)
if (typeof window !== "undefined") {
  supabase
    .from('Articles')
    .select('id')
    .limit(1)
    .then(({ error }) => {
      if (error) {
        console.error("Erreur connexion Supabase :", error.message)
      } else {
        console.log("Connexion Supabase OK")
      }
    });
}

export default supabase
