import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseSchemaType, courseSchema } from "@/lib/zodSchemas";

export default function CourseCreation() {
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      price: 0,
      duration: 0,
      level: "Beginner",
      category: "",
      status: "Draft",
      slug: "",
      smallDescription: "",
    },
  });
  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href={"/admin/courses"}
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-2xl font-bold">Create Course</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide basic information about the course
          </CardDescription>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
    </>
  );
}
