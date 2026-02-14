/**
 * Mock Supabase auth helpers for server routes.
 * Replace with real @supabase/auth-helpers-nextjs when Supabase is configured.
 */

export function createRouteHandlerClient(_options: { cookies: () => unknown }) {
  return {
    auth: {
      resetPasswordForEmail: (
        _email: string,
        _options?: { redirectTo?: string }
      ): Promise<{ error: { message: string } | null }> =>
        Promise.resolve({ error: null }),
      updateUser: (
        _params: { password?: string }
      ): Promise<{ error: { message: string } | null }> =>
        Promise.resolve({ error: null }),
      exchangeCodeForSession: (_code: string) => Promise.resolve(),
    },
  };
}
