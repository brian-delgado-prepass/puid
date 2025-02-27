/*
  # Create personal identities table

  1. New Tables
    - `personal_identities`
      - `id` (uuid, primary key)
      - `puid` (text, unique)
      - `first_name` (text)
      - `last_name` (text)
      - `birth_year` (text)
      - `personality_type` (text)
      - `favorite_color` (text)
      - `profession` (text)
      - `core_values` (text[])
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `personal_identities` table
    - Add policy for both authenticated and anonymous users to insert data
    - Add policy for both authenticated and anonymous users to read data
*/

CREATE TABLE IF NOT EXISTS personal_identities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  puid text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  birth_year text NOT NULL,
  personality_type text NOT NULL,
  favorite_color text NOT NULL,
  profession text NOT NULL,
  core_values text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE personal_identities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own data" ON personal_identities;
DROP POLICY IF EXISTS "Users can read their own data" ON personal_identities;

-- Create new policies that allow both authenticated and anonymous users
CREATE POLICY "Anyone can insert data"
  ON personal_identities
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read data"
  ON personal_identities
  FOR SELECT
  TO anon, authenticated
  USING (true);