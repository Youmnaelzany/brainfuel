"use client";

import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";

import { UserDropdownMenu } from "./UserDropdown";

interface NavigationItem {
  title: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8">
        <Link href={"/"} className="mr-4 flex items-center space-x-2">
          <Image src="/logo.png" alt="logo" width={36} height={36} />
          <span className="font-bold">BrainFuel.</span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="hover:text-primary text-sm font-medium transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? null : session ? (
              <UserDropdownMenu
                email={session.user.email}
                name={session.user.name}
                image={session.user.image || ""}
              />
            ) : (
              <>
                <Link
                  href={"/login"}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Login
                </Link>
                <Link href={"/login"} className={buttonVariants()}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
