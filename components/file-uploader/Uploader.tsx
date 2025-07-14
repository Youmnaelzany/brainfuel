"use client";

import { useCallback, useEffect, useState } from "react";

import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { RenderEmptyState, RenderErrorState } from "./RenderState";

type UploaderState = {
  error: boolean;
  file: File | null;
  id: string | null;
  uploading: boolean;
  progress: number;
  isDeleting: boolean;
  fileType: "image" | "video";
  objectUrl?: string;
  key?: string; // Added key to state
};

export default function Uploader() {
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
  });

  async function UploadFile(file: File) {
    setFileState((prev: any) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      // 1. get presigned url
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      });

      if (!presignedResponse.ok) {
        toast.error("Failed to get presigned URL");
        setFileState((prev: any) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));
        return;
      }
      const { presignedUrl, key } = await presignedResponse.json();
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function (
          this: XMLHttpRequestUpload,
          event: ProgressEvent<EventTarget>
        ) {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setFileState((prev: any) => ({
              ...prev,
              progress: percent,
            }));
          }
        };
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev: any) => ({
              ...prev,
              progress: 100,
              uploading: false,
              key: key,
            }));
            toast.success("File uploaded successfully");
            resolve();
          } else {
            toast.error("Upload failed");
            setFileState((prev: any) => ({
              ...prev,
              uploading: false,
              error: true,
            }));
            reject(new Error("Upload failed"));
          }
        };
        xhr.onerror = () => {
          toast.error("Upload error");
          setFileState((prev: any) => ({
            ...prev,
            uploading: false,
            error: true,
          }));
          reject(new Error("Upload error"));
        };
        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch {
      toast.error("Something went wrong");
      setFileState((prev: any) => ({
        ...prev,
        progress: 0,
        error: true,
        uploading: false,
      }));
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      // Changed from > 1 to > 0
      const file = acceptedFiles[0];
      setFileState((prev) => ({
        ...prev,
        file: file,
        uploading: false,
        progress: 0,
        objectUrl: URL.createObjectURL(file),
        error: false,
        id: uuidv4(),
        isDeleting: false,
        fileType: "image",
      }));
      UploadFile(file);
    }
  }, []);

  function rejectedFiles(fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const toManyFiles = fileRejection.find((rejection) => {
        return rejection.errors[0].code === "too-many-files";
      });

      const fileSizeToBig = fileRejection.find((rejection) => {
        return rejection.errors[0].code === "file-too-large";
      });

      if (toManyFiles) {
        toast.error("Too many files selected, max is 1 file");
      }

      if (fileSizeToBig) {
        toast.error("File size too big, max is 5mb");
      }
    }
  }

  function renderContent() {
    if (fileState.uploading) {
      return <h1>Uploading ...</h1>;
    }
    if (fileState.error) {
      return <RenderErrorState />;
    }
    if (fileState.objectUrl) {
      return <h1>uploaded file</h1>;
    }
    return <RenderEmptyState isDragActive={isDragActive} />;
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5mb calculation
    onDropRejected: rejectedFiles,
  });

  // Revoke object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (fileState.objectUrl) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative h-64 w-full border-2 border-dashed transition-colors duration-200 ease-in-out",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex h-full w-full items-center justify-center p-4">
        <Input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}
