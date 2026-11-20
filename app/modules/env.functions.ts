import { createServerFn } from "@tanstack/react-start";
import { getEnv, init } from "~/env.server";

export const getPublicEnv = createServerFn().handler(() => {
  init();
  return getEnv();
});
