"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { GithubIcon, Loader, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

  // Function to handle GitHub sign-in
  async function signInWithGitHub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Successfully logged in with GitHub!, redirecting..."
            );
          },
          onError: (error) => {
            toast.error("Issue logging in with GitHub, please try again.");
          },
        },
      });
    });
  }

  // Function to handle email sign-in
  async function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email sent! Please check your inbox.");
            router.push(`/verify-request`);
          },
          onError: () => {
            toast.error("Issue logging in with Email, please try again.");
          },
        },
      });
    });
  }
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Login with your GitHub, Email Account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          className="w-full"
          variant="outline"
          onClick={signInWithGitHub}
          disabled={githubPending}
        >
          {githubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span className="">Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign in with GitHub
            </>
          )}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                <span className="">Loading...</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span className="">Continue with email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
