import { GlobeIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Form } from "@remix-run/react";

export const LangChooser = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <GlobeIcon className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <Form>
          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <button
                name="lng"
                value="en"
                className="flex w-full items-center justify-between"
              >
                English
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                name="lng"
                value="ptBR"
                className="flex w-full items-center justify-between"
              >
                Português
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
