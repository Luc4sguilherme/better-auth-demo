import { betterAuth } from 'better-auth';
import { admin, createAuthMiddleware, twoFactor } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import type { PrismaClient } from 'prisma/generated/client';

export function createBetterAuth(
  prisma: PrismaClient,
  configService: ConfigService,
  emailService: EmailService,
) {
  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    baseURL: configService.getOrThrow('BETTER_AUTH_URL'),
    secret: configService.getOrThrow('BETTER_AUTH_SECRET'),
    trustedOrigins: [configService.getOrThrow('BETTER_AUTH_URL')],
    socialProviders: {
      google: {
        clientId: configService.getOrThrow('GOOGLE_CLIENT_ID'),
        clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
      },
    },
    user: {
      changeEmail: {
        enabled: true,
        updateEmailWithoutVerification: false,
        sendChangeEmailVerification: async ({ user, url, newEmail }) => {
          await emailService.sendChangeEmailVerification({
            user,
            newEmail,
            url,
          });
        },
      },
      deleteUser: {
        enabled: true,
        sendDeleteAccountVerification: async ({ user, url }) => {
          await emailService.sendDeleteAccountVerification({ user, url });
        },
      },
    },
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }) => {
        await emailService.sendPasswordReset({ user, url });
      },
    },
    plugins: [twoFactor(), admin()],
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }) => {
        await emailService.sendEmailVerification({ user, url });
      },
    },
    hooks: {
      after: createAuthMiddleware(async (ctx) => {
        if (ctx.path.startsWith('/sign-up')) {
          const user = ctx.context.newSession?.user;

          if (user != null) {
            await emailService.sendWelcome({ user });
          }
        }
      }),
    },
  });
}

export type BetterAuthInstance = ReturnType<typeof createBetterAuth>;
