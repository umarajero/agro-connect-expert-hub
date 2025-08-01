import { supabase } from './supabase'

export interface Expert {
  id: string
  user_id: string
  full_name: string
  email: string
  phone: string
  location: string
  specialization: string
  experience: string
  education: string
  certifications?: string
  bio: string
  hourly_rate: number
  availability: string
  status: 'pending' | 'approved' | 'rejected'
  rating: number
  total_reviews: number
  created_at: string
  updated_at: string
}

export interface ExpertApplication {
  full_name: string
  email: string
  phone: string
  location: string
  specialization: string
  experience: string
  education: string
  certifications?: string
  bio: string
  hourly_rate: number
  availability: string
}

export const expertsService = {
  // Submit expert application
  async submitApplication(application: ExpertApplication) {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User must be authenticated to submit expert application')
    }

    const { data, error } = await supabase
      .from('experts')
      .insert({
        user_id: user.id,
        ...application,
        hourly_rate: parseInt(application.hourly_rate.toString())
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  },

  // Get all approved experts
  async getApprovedExperts() {
    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .eq('status', 'approved')
      .order('rating', { ascending: false })

    if (error) {
      throw error
    }

    return data as Expert[]
  },

  // Get expert by ID
  async getExpertById(id: string) {
    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .eq('id', id)
      .eq('status', 'approved')
      .single()

    if (error) {
      throw error
    }

    return data as Expert
  },

  // Get user's expert application
  async getUserApplication() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return null
    }

    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      throw error
    }

    return data as Expert | null
  },

  // Get experts by specialization
  async getExpertsBySpecialization(specialization: string) {
    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .eq('status', 'approved')
      .eq('specialization', specialization)
      .order('rating', { ascending: false })

    if (error) {
      throw error
    }

    return data as Expert[]
  }
}