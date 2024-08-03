import { createClient } from "@supabase/supabase-js";
import { Database } from "database.types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
  .schema("portfolio");
