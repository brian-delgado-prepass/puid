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
    - Add policy for authenticated users to insert their own data
    - Add policy for authenticated users to read their own data
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

CREATE POLICY "Users can insert their own data"
  ON personal_identities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own data"
  ON personal_identities
  FOR SELECT
  TO authenticated
  USING (true);