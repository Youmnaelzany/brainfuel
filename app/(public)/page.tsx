import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface featuresProps {
  title: string;
  description: string;
  icon: string;
}

const features: featuresProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Explore a wide range of courses covering various subjects and topics.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive lessons, quizzes, and hands-on projects.",
    icon: "🎮",
  },
  {
    title: "Progress Tracking",
    description:
      "Track your progress, view completed courses, and receive personalized recommendations.",
    icon: "📊",
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and experts for discussions and support.",
    icon: "👥",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center space-y-8 text-center">
          <Badge variant={"outline"}>The Future of Online Education</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Elevate your Learning Experience
          </h1>
          <p className="text-muted-foreground max-w-[700px] md:text-xl">
            Discover a new way to learn with our modern, interactive learning
            management system. Access high-quality courses anytime, anywhere.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/courses"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Explore Courses
            </Link>
            <Link
              href="/login"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              })}
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-32 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
