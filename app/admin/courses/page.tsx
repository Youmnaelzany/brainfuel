import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function CoursesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link href={"/admin/courses/create"} className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      <div className="">
        <h1 className="">Here you will see all of the courses</h1>
      </div>
    </>
  );
}
