/*
  # Create experts table for agricultural expert registration

  1. New Tables
    - `experts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `location` (text)
      - `specialization` (text)
      - `experience` (text)
      - `education` (text)
      - `certifications` (text)
      - `bio` (text)
      - `hourly_rate` (integer)
      - `availability` (text)
      - `status` (text) - pending, approved, rejected
      - `rating` (decimal, default 0)
      - `total_reviews` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `experts` table
    - Add policies for authenticated users to read approved experts
    - Add policies for users to create their own expert applications
    - Add policies for users to read their own applications
*/

CREATE TABLE IF NOT EXISTS experts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  specialization text NOT NULL,
  experience text NOT NULL,
  education text NOT NULL,
  certifications text,
  bio text NOT NULL,
  hourly_rate integer NOT NULL,
  availability text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rating decimal(3,2) DEFAULT 0.00,
  total_reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;

-- Policy for anyone to read approved experts
CREATE POLICY "Anyone can read approved experts"
  ON experts
  FOR SELECT
  USING (status = 'approved');

-- Policy for authenticated users to create expert applications
CREATE POLICY "Authenticated users can create expert applications"
  ON experts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to read their own applications
CREATE POLICY "Users can read their own expert applications"
  ON experts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to update their own applications (only when pending)
CREATE POLICY "Users can update their own pending applications"
  ON experts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_experts_updated_at
  BEFORE UPDATE ON experts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();