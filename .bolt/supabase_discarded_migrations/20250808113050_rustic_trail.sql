/*
  # Create bookings table for expert consultations

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `farmer_id` (uuid, foreign key to auth.users)
      - `expert_id` (uuid, foreign key to experts)
      - `booking_date` (date)
      - `booking_time` (time)
      - `duration_minutes` (integer, default 60)
      - `total_price` (decimal)
      - `farmer_name` (text)
      - `farmer_email` (text)
      - `farmer_phone` (text)
      - `consultation_reason` (text)
      - `status` (text) - pending, confirmed, cancelled, completed
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bookings` table
    - Add policies for farmers to create and read their own bookings
    - Add policies for experts to read bookings assigned to them
    - Add policies for farmers to update their own pending bookings (for cancellation)
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  expert_id uuid REFERENCES experts(id) ON DELETE CASCADE,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  duration_minutes integer DEFAULT 60,
  total_price decimal(10,2) NOT NULL,
  farmer_name text NOT NULL,
  farmer_email text NOT NULL,
  farmer_phone text NOT NULL,
  consultation_reason text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy for farmers to create bookings
CREATE POLICY "Farmers can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = farmer_id);

-- Policy for farmers to read their own bookings
CREATE POLICY "Farmers can read their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = farmer_id);

-- Policy for experts to read bookings assigned to them
CREATE POLICY "Experts can read their assigned bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM experts 
      WHERE experts.id = bookings.expert_id 
      AND experts.user_id = auth.uid()
    )
  );

-- Policy for farmers to update their own pending bookings (for cancellation)
CREATE POLICY "Farmers can cancel their own pending bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = farmer_id AND status = 'pending')
  WITH CHECK (auth.uid() = farmer_id);

-- Policy for experts to update bookings assigned to them
CREATE POLICY "Experts can update their assigned bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM experts 
      WHERE experts.id = bookings.expert_id 
      AND experts.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM experts 
      WHERE experts.id = bookings.expert_id 
      AND experts.user_id = auth.uid()
    )
  );

-- Create updated_at trigger for bookings
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();