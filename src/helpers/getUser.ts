// TODO: This helper is deprecated - authentication now handled by backend API
// Returning mock user data for development purposes
// Remove this file once all components are updated to use UserContext

type User = {
  id: string;
  email: string;
  [key: string]: any;
};

/**
 * getUser - Returns mock user data for development
 * @deprecated Use UserContext (useUser hook) instead for client components
 * @returns A Promise that resolves to mock user data
 */
export async function getUser(): Promise<User | null> {
  // TODO: Replace with actual auth check when backend is ready
  // For now, return mock vendor user for development
  console.warn('getUser() is deprecated - use UserContext instead');
  
  return {
    id: 'mock-vendor-id',
    email: 'vendor@swappr.com',
    name: 'Mock Vendor',
  };
}
