import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://cjnaxbcwanoysrmepczz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqbmF4YmN3YW5veXNybWVwY3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDg4MDEsImV4cCI6MjA2NjI4NDgwMX0.hJBGnr8Azee-ZwOW3vNuwv7FPcDxbFs6vfXEEa39Nok';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };