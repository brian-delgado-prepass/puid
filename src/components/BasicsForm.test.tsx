import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Basics Form', () => {
  it('renders all form fields', () => {
    render(<App />);
    
    // Check for all form fields
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Try to proceed without filling required fields
    await user.click(screen.getByRole('button', { name: /Next/i }));
    
    // Should still be on the basics form
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
  });

  it('enables next button when all required fields are filled', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Next button should be disabled initially
    const nextButton = screen.getByRole('button', { name: /Next/i });
    
    // Fill out all required fields
    await user.type(screen.getByLabelText(/First Name/i), 'John');
    await user.type(screen.getByLabelText(/Last Name/i), 'Doe');
    
    // Select from dropdowns
    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[0], '01'); // Month
    await user.selectOptions(selects[1], '15'); // Day
    await user.selectOptions(selects[2], '1990'); // Year
    await user.selectOptions(selects[3], 'Male'); // Gender
    
    // Next button should be enabled
    expect(nextButton).not.toBeDisabled();
  });
});