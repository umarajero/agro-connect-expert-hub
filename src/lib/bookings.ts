import { supabase } from './supabase'

export interface Booking {
  id: string
  farmer_id: string
  expert_id: string
  booking_date: string
  booking_time: string
  duration_minutes: number
  total_price: number
  farmer_name: string
  farmer_email: string
  farmer_phone: string
  consultation_reason: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at: string
  updated_at: string
  expert?: {
    full_name: string
    specialization: string
    rating: number
  }
}

export interface BookingRequest {
  expert_id: string
  booking_date: string
  booking_time: string
  duration_minutes: number
  total_price: number
  farmer_name: string
  farmer_email: string
  farmer_phone: string
  consultation_reason: string
}

export const bookingsService = {
  // Create a new booking
  async createBooking(bookingData: BookingRequest) {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User must be authenticated to create a booking')
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        farmer_id: user.id,
        ...bookingData
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  },

  // Get farmer's bookings
  async getFarmerBookings() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User must be authenticated')
    }

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        expert:experts(
          full_name,
          specialization,
          rating
        )
      `)
      .eq('farmer_id', user.id)
      .order('booking_date', { ascending: true })

    if (error) {
      throw error
    }

    return data as Booking[]
  },

  // Get expert's bookings
  async getExpertBookings() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User must be authenticated')
    }

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('expert_id', user.id)
      .order('booking_date', { ascending: true })

    if (error) {
      throw error
    }

    return data as Booking[]
  },

  // Cancel a booking
  async cancelBooking(bookingId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  },

  // Update booking status (for experts)
  async updateBookingStatus(bookingId: string, status: 'confirmed' | 'completed') {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  },

  // Check if a time slot is available for an expert
  async checkTimeSlotAvailability(expertId: string, date: string, time: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('id')
      .eq('expert_id', expertId)
      .eq('booking_date', date)
      .eq('booking_time', time)
      .in('status', ['pending', 'confirmed'])

    if (error) {
      throw error
    }

    return data.length === 0
  }
}