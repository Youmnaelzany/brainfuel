import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Login with your GitHub, Email Account</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" variant="outline">
          <GithubIcon className="size-4 " />
          Sign in with GitHub
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative px-2 bg-card z-10 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
