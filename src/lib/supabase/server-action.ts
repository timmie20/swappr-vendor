/**
 * Mock Supabase server client for server actions.
 * Replace with real createServerActionClient when Supabase is configured.
 */

type MockResult = { data: unknown; error: { code?: string; message?: string; details?: string } | null };

type MockQueryBuilder = {
  select: (_?: string) => MockQueryBuilder & PromiseLike<MockResult>;
  insert: (_: Record<string, unknown>) => MockQueryBuilder;
  update: (_: Record<string, unknown>) => MockQueryBuilder;
  delete: () => MockQueryBuilder & PromiseLike<MockResult>;
  eq: (_: string, __: string) => MockQueryBuilder;
  in: (_: string, __: unknown[]) => MockQueryBuilder;
  single: () => Promise<MockResult>;
  then<T>(onFulfilled: (value: MockResult) => T | PromiseLike<T>): Promise<T>;
};

function createMockQueryBuilder(): MockQueryBuilder {
  const result: MockResult = { data: [], error: null };
  const thenImpl = <T>(fn: (value: MockResult) => T | PromiseLike<T>) => Promise.resolve(fn(result)) as Promise<T>;
  const chain: MockQueryBuilder = {
    select: () => ({ ...chain, then: thenImpl }),
    insert: () => chain,
    update: () => chain,
    delete: () => ({ ...chain, then: <T>(fn: (value: MockResult) => T | PromiseLike<T>) => Promise.resolve(fn({ data: null, error: null })) as Promise<T> }),
    eq: () => chain,
    in: () => chain,
    single: () => Promise.resolve({ data: null, error: null }),
    then: thenImpl,
  };
  return chain;
}

export function createServerActionClient() {
  return {
    from: (_table: string) => createMockQueryBuilder(),
    storage: {
      from: (_bucket: string) => ({
        upload: (_path: string, _file: File) =>
          Promise.resolve({ data: { path: "" }, error: null }),
        getPublicUrl: (path: string) => ({ data: { publicUrl: path } }),
        remove: (_paths: string[]) => Promise.resolve({ error: null }),
      }),
    },
  };
}
