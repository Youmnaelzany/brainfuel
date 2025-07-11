import { type Editor } from "@tiptap/react";
import { Bold } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className="">
      <TooltipProvider>
        <div className="">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle>
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
