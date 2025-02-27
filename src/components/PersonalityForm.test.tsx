import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Helper function to navigate to personality form
const navigateToPersonalityForm = async (user) => {
  // Fill out basics form
  await user.type(screen.getByLabelText(/First Name/i), 'John');
  await user.type(screen.getByLabelText(/Last Name/i), 'Doe');
  
  // Select from dropdowns
  const selects = screen.getAllByRole('combobox');
  await user.selectOptions(selects[0], '01'); // Month
  await user.selectOptions(selects[1], '15'); // Day
  await user.selectOptions(selects[2], '1990'); // Year
  await user.selectOptions(selects[3], 'Male'); // Gender
  
  await user.click(screen.getByRole('button', { name: /Next/i }));
};

describe('Personality Form', () => {
  it('renders all personality form sections', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await navigateToPersonalityForm(user);
    
    // Check for all form sections
    expect(screen.getByText('Personality Profile')).toBeInTheDocument();
    expect(screen.getByText('Personality Type')).toBeInTheDocument();
    expect(screen.getByText(/Personal Traits/i)).toBeInTheDocument();
    expect(screen.getByText(/Key Strengths/i)).toBeInTheDocument();
    expect(screen.getByText(/Personal Challenges/i)).toBeInTheDocument();
  });

  it('allows selecting personality type', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await navigateToPersonalityForm(user);
    
    // Select personality type
    await user.click(screen.getByText('Analytical'));
    
    // Verify it's selected (has different styling)
    const analyticalButton = screen.getByText('Analytical');
    expect(analyticalButton.className).toContain('bg-indigo-100');
  });

  it('allows selecting traits', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await navigateToPersonalityForm(user);
    
    // Select traits
    await user.click(screen.getByText('Ambitious'));
    await user.click(screen.getByText('Curious'));
    await user.click(screen.getByText('Determined'));
    
    // Verify they're selected
    const ambitiousButton = screen.getByText('Ambitious');
    expect(ambitiousButton.className).toContain('bg-indigo-100');
  });

  it('validates form completion before proceeding', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await navigateToPersonalityForm(user);
    
    // Try to proceed without completing the form
    await user.click(screen.getByRole('button', { name: /Next/i }));
    
    // Should still be on the personality form
    expect(screen.getByText('Personality Profile')).toBeInTheDocument();
    
    // Complete the form
    await user.click(screen.getByText('Analytical'));
    await user.click(screen.getByText('Ambitious'));
    await user.click(screen.getByText('Curious'));
    await user.click(screen.getByText('Determined'));
    await user.click(screen.getByText('Problem solving'));
    await user.click(screen.getByText('Critical thinking'));
    await user.click(screen.getByText('Work-life balance'));
    await user.click(screen.getByText('Meeting deadlines'));
    
    // Now should be able to proceed
    await user.click(screen.getByRole('button', { name: /Next/i }));
    
    // Should be on preferences form
    expect(screen.getByText('Personal Preferences')).toBeInTheDocument();
  });
});