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
import { Link } from "@tanstack/react-router";
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
        <>
          <DropdownMenuLabel>{t("langChooser.title")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                to="."
                search={{ lng: "en" }}
                className="cursor-pointer flex w-full items-center justify-between"
              >
                {t("langChooser.english")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                to="."
                search={{ lng: "ptBR" }}
                className="cursor-pointer flex w-full items-center justify-between"
              >
                {t("langChooser.portuguese")}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
