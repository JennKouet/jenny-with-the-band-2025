import type { SupabaseClient } from "@supabase/supabase-js";

const isBrowser = typeof window !== "undefined";

function createSupabaseBrowserClient() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- avoid loading Supabase during server pre-render
  const { createClient } = require("@supabase/supabase-js") as typeof import("@supabase/supabase-js");

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: "pkce",
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  );
}

const serverSupabaseStub = new Proxy(
  {},
  {
    get() {
      throw new Error("The browser Supabase client cannot be used during server rendering.");
    },
  }
) as SupabaseClient;

const supabase = isBrowser ? createSupabaseBrowserClient() : serverSupabaseStub;

export default supabase;
