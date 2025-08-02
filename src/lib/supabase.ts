import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = `Missing Supabase environment variables:
    VITE_SUPABASE_URL: ${supabaseUrl ? 'Set' : 'Missing'}
    VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'Set' : 'Missing'}
    
Please add these variables to your .env file with values from your Supabase project dashboard.`
  
  console.error(errorMessage)
  throw new Error(errorMessage)
}

// Validate URL format
try {
  new URL(supabaseUrl)
} catch (error) {
  throw new Error(`Invalid Supabase URL format: ${supabaseUrl}. Please check your VITE_SUPABASE_URL in the .env file.`)
}

console.log('Supabase configuration loaded:', {
  url: supabaseUrl,
  hasAnonKey: !!supabaseAnonKey,
  urlValid: true
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const auth = {
  signUp: async (email: string, password: string, metadata?: any) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
  },

  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  },

  signOut: async () => {
    return await supabase.auth.signOut()
  },

  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}