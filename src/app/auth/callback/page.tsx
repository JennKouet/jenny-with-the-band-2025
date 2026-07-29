'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

// Le client est configuré avec detectSessionInUrl: true (voir src/lib/supabaseClient.ts),
// donc supabase-js échange lui-même le code OAuth contre une session au chargement.
// On se contente d'attendre cette session : refaire l'échange à la main consommerait
// le code_verifier une seconde fois et ferait échouer la connexion.
const AuthCallbackPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isDone = false;

    const succeed = () => {
      if (isDone) return;
      isDone = true;
      setStatus("success");
      router.replace("/");
    };

    const fail = (message: string) => {
      if (isDone) return;
      isDone = true;
      setStatus("error");
      setErrorMessage(message);
    };

    // Erreur renvoyée par le fournisseur (accès refusé, etc.)
    const params = new URLSearchParams(window.location.search);
    const providerError = params.get("error_description") ?? params.get("error");
    if (providerError) {
      fail(providerError);
      return;
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) succeed();
    });

    // La session peut déjà être établie avant que l'écouteur soit branché.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) succeed();
    });

    const timeoutId = setTimeout(() => {
      fail("La session n'a pas pu être établie. Merci de réessayer.");
    }, 10000);

    return () => {
      isDone = true;
      clearTimeout(timeoutId);
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4 text-center">
      {status === "loading" && <p>Connexion en cours…</p>}
      {status === "success" && <p>Connexion réussie, redirection…</p>}
      {status === "error" && (
        <div>
          <p className="font-semibold">Impossible de finaliser la connexion.</p>
          {errorMessage && <p className="text-sm text-red-300 mt-2">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default AuthCallbackPage;
