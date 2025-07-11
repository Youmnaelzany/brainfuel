"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, PlusIcon, SparkleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

import { RichTextEditor } from "@/components/rich-text-editor/editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CourseSchemaType,
  courseCategories,
  courseLevel,
  courseSchema,
  courseStatus,
} from "@/lib/zodSchemas";

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
      category: "Personal Development",
      status: "Draft",
      slug: "",
      smallDescription: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CourseSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
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
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Title Input Filed */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Slug Input Field & Slug Generate Button Div Wrapper */}
                <div className="flex items-end gap-4">
                  {/* Slug Input */}
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="Slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Slug Generate Button */}
                  <Button
                    type="button"
                    className="w-fit"
                    onClick={() => {
                      const titleValue = form.getValues("title");
                      const slug = slugify(titleValue);
                      form.setValue("slug", slug, { shouldValidate: true });
                    }}
                  >
                    Generate Slug <SparkleIcon className="ml-1 size-4" />
                  </Button>
                </div>
                {/* Small Description Input Field */}
                <FormField
                  control={form.control}
                  name="smallDescription"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Small Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Small Description"
                          {...field}
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Description Input Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <RichTextEditor />
                        {/* <Textarea
                          placeholder=" Description"
                          {...field}
                          className="min-h-[120px]"
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* File key / Thumbnail Image Input Field */}
                <FormField
                  control={form.control}
                  name="fileKey"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Thumbnail Image</FormLabel>
                      <FormControl>
                        <Input placeholder="Thumbnail URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Category Input Field & Level Input Field &
                 Course Duration Input Filed & Course Price Input Field Div Wrapper */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Category Input Field */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courseCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Level Input Field */}
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courseLevel.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Course Duration Input Field */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Course Duration (hours)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Course Duration"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Course Price Input Field */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Course Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Course Price"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Status Input Field */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courseStatus.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* The Submit Button */}
                <Button>
                  Create Course <PlusIcon className="ml-1 size-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
}
