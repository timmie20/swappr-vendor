"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVendorProfile } from "@/lib/api-client";

// TODO: Update these types to match backend API response
export type UserRole = "vendor" | "admin" | "staff";

type User = {
  id: string;
  email: string;
  name: string | null;
};

type UserProfile = {
  name: string | null;
  image_url: string | null;
  role: UserRole | null;
};

type UserContextType = {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  profile: null,
  isLoading: false,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  // TODO: Replace with actual API call when backend is ready
  // For now, return mock data to allow development without authentication
  const { data, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      try {
        const response = await getVendorProfile();
        const profileData = response.data;

        return {
          user: {
            id: profileData.id,
            email: profileData.email,
            name: profileData.name,
          },
          profile: {
            name: profileData.name,
            image_url: profileData.image_url,
            role: profileData.role as UserRole,
          },
        };
      } catch (error) {
        console.warn("Failed to fetch user profile, using mock data");
        // Return mock data for development
        return {
          user: {
            id: "mock-vendor-id",
            email: "vendor@swappr.com",
            name: "Mock Vendor",
          },
          profile: {
            name: "Mock Vendor",
            image_url: null,
            role: "vendor" as UserRole,
          },
        };
      }
    },
    staleTime: Infinity,
  });

  const value = {
    user: data?.user ?? null,
    profile: data?.profile ?? null,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
