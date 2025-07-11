import { type Editor } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  Bold,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Italic,
  ListIcon,
  ListOrderedIcon,
  RedoIcon,
  Strikethrough,
  UndoIcon,
  ZapIcon,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import { TooltipProvider } from "../ui/tooltip";

interface iAppProps {
  editor: Editor | null;
}

export function Menubar({ editor }: iAppProps) {
  if (!editor) {
    return null;
  }
  return (
    <div className="border-input bg-card flex flex-wrap items-center gap-1 rounded-t-lg border-x-0 border-t-0 p-2">
      <TooltipProvider>
        {/* Customize Text */}
        <div className="flex flex-wrap gap-1">
          {/* Bold */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive("bold") && "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>
          {/* Italic */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive("italic") && "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>
          {/* Italic */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive("strike") && "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
              >
                <Strikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Strike</p>
            </TooltipContent>
          </Tooltip>
          {/* H1 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive("heading", { level: 1 }) &&
                    "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                <Heading1Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 1</p>
            </TooltipContent>
          </Tooltip>
          {/* H2 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive("heading", { level: 2 }) &&
                    "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <Heading2Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 2</p>
            </TooltipContent>
          </Tooltip>
          {/* H3 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive("heading", { level: 3 }) &&
                    "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <Heading3Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 3</p>
            </TooltipContent>
          </Tooltip>
          {/* BulletList */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive("bulletList") &&
                    "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
              >
                <ListIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>BulletList</p>
            </TooltipContent>
          </Tooltip>
          {/* OrderList */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive("orderedList") &&
                    "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
              >
                <ListOrderedIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>OrderedList</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {/* Border Separator */}
        <div className="bg-border mx-2 h-6 w-px"></div>
        {/* Align Text */}
        <div className="flex flex-wrap gap-1">
          {/* TextAlign Left */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive({ textAlign: "left" }) &&
                    "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
              >
                <AlignLeftIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>TextAlign Left</p>
            </TooltipContent>
          </Tooltip>
          {/* TextAlign Center */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive({ textAlign: "center" }) &&
                    "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive({ textAlign: "center" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
              >
                <AlignCenterIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>TextAlign Center</p>
            </TooltipContent>
          </Tooltip>
          {/* TextAlign Right */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive({ textAlign: "right" }) &&
                    "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive({ textAlign: "right" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
              >
                <AlignRightIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>TextAlign Right</p>
            </TooltipContent>
          </Tooltip>
          {/* TextAlign Justify */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                className={cn(
                  editor.isActive({ textAlign: "justify" }) &&
                    "bg-muted text-muted-foreground"
                )}
                size="sm"
                pressed={editor.isActive({ textAlign: "justify" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
              >
                <AlignJustifyIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>TextAlign Justify</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {/* Border Separator */}
        <div className="bg-border mx-2 h-6 w-px"></div>
        <div className="flex flex-wrap gap-1">
          {/* Undo Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                type="button"
                variant={"ghost"}
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <UndoIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>
          {/* Redo Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                type="button"
                variant={"ghost"}
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <RedoIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>
          {/* Emoji Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                type="button"
                variant={"ghost"}
                onClick={() => editor.chain().focus().setEmoji("zap").run()}
              >
                <ZapIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Emoji</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
