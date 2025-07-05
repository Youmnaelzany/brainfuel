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
import { GithubIcon, Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [githubPending, startGithubTransition] = useTransition();

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
            toast.error(error.error.message);
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
          onAbort={signInWithGitHub}
          disabled={githubPending}
        >
          {!githubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span className="">Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4 " />
              Sign in with GitHub
            </>
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative px-2 bg-card z-10 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="m@example.com" />
          </div>
          <Button>Continue with email</Button>
        </div>
      </CardContent>
    </Card>
  );
}
