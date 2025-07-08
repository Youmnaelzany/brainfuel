"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export function useSignOut() {
  const router = useRouter();

  const handleSignout = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
          toast.success("Successfully logged out!");
        },
        onError: () => {
          toast.error("Failed to signed out!");
        },
      },
    });
  };

  return handleSignout;
}
