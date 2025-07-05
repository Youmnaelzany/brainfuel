import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="flex w-full max-w-sm flex-col gap-6">{children}</div>;
}
