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
import { useTranslation } from "react-i18next";

export const LangChooser = () => {
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <GlobeIcon className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">{t("langChooser.title")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <Form>
          <DropdownMenuLabel>{t("langChooser.title")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <button
                name="lng"
                value="en"
                className="cursor-pointer flex w-full items-center justify-between"
              >
                {t("langChooser.english")}
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                name="lng"
                value="ptBR"
                className="cursor-pointer flex w-full items-center justify-between"
              >
                {t("langChooser.portuguese")}
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
