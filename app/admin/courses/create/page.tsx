import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function CourseCreation() {
  return (
    <>
      <div>
        <Link
          href={"/admin/courses"}
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <ArrowLeft className="size-4" />
        </Link>
      </div>
    </>
  );
}
