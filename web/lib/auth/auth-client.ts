import { adminClient } from "better-auth/client/plugins";
import { twoFactorClient } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
import { accessControl, admin, user } from "@/components/auth/permissions";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect: () => {
        window.location.href = "/auth/2fa";
      },
    }),
    adminClient({
      ac: accessControl,
      roles: {
        admin,
        user,
      },
    }),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
