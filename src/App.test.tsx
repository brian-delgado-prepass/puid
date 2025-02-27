import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('Personal Identity Creator')).toBeInTheDocument();
  });

  it('renders the basics form initially', () => {
    render(<App />);
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<App />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    
    // Should still be on the basics form
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
  });

  it('allows entering basic information and proceeding to next step', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Fill out basics form
    await user.type(screen.getByLabelText(/First Name/i), 'John');
    await user.type(screen.getByLabelText(/Last Name/i), 'Doe');
    
    // Select from dropdowns
    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[0], '01'); // Month
    await user.selectOptions(selects[1], '15'); // Day
    await user.selectOptions(selects[2], '1990'); // Year
    await user.selectOptions(selects[3], 'Male'); // Gender
    
    // Next button should be enabled
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).not.toBeDisabled();
    
    // Click next and verify we move to personality step
    await user.click(nextButton);
    expect(screen.getByText('Personality Profile')).toBeInTheDocument();
  });

  it('allows navigating back to previous step', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Fill out basics form and go to next step
    await user.type(screen.getByLabelText(/First Name/i), 'John');
    await user.type(screen.getByLabelText(/Last Name/i), 'Doe');
    
    // Select from dropdowns
    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[0], '01'); // Month
    await user.selectOptions(selects[1], '15'); // Day
    await user.selectOptions(selects[2], '1990'); // Year
    await user.selectOptions(selects[3], 'Male'); // Gender
    
    await user.click(screen.getByRole('button', { name: /Next/i }));
    
    // Verify we're on personality step
    expect(screen.getByText('Personality Profile')).toBeInTheDocument();
    
    // Go back to basics
    await user.click(screen.getByRole('button', { name: /Back/i }));
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
  });
});