import "server-only";


import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";

import { prisma } from "./db";
import { env } from "./env";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "BrainFuel <onboarding@resend.dev>",
          to: [email],
          subject: "BrainFuel - Verify your email",
          html: `
            <p>Hi there,</p>
            <p>To verify your email address, please use the following OTP:</p>
            <p><strong>${otp}</strong></p>
            <p>This OTP is valid for 10 minutes.</p>
            <p>Thank you for using BrainFuel</p>
            <p>Best regards,</p>
            <p>The BrainFuel Team</p>
          `,
        });
      },
    }),
  ],
});
