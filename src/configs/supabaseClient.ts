import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
	import.meta.env.VITE_SUPABASE_PROJECT_URL,
	import.meta.env.VITE_SUPABASE_API_KEY
);

export default supabase;
