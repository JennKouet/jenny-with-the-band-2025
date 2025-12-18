'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

const AuthCallbackPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const exchangeSession = async () => {
      const hashParams = new URLSearchParams(window.location.hash.replace("#", ""));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          setStatus("error");
          setErrorMessage(error.message);
          return;
        }

        setStatus("success");
        router.replace("/");
        return;
      }

      const currentUrl = new URL(window.location.href);
      const authCode = currentUrl.searchParams.get("code");
      if (!authCode) {
        setStatus("error");
        setErrorMessage("Code d'authentification introuvable.");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(authCode);
      if (error) {
        setStatus("error");
        setErrorMessage(error.message);
        return;
      }

      setStatus("success");
      router.replace("/");
    };

    exchangeSession();
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
