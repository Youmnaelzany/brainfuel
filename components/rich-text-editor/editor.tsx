"use client";

import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Menubar } from "./Menubar";

export function RichTextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
  });

  return (
    <div className="">
      <Menubar editor={editor} />
    </div>
  );
}
