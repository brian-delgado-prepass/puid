# Personal Identity Creator

A web application that creates a unique personal identifier (PUID) based on user information.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-id/deploy-status)](https://app.netlify.com/sites/your-netlify-site/deploys)
[![Cypress Tests](https://github.com/yourusername/your-repo/actions/workflows/cypress.yml/badge.svg)](https://github.com/yourusername/your-repo/actions/workflows/cypress.yml)

## Features

- Multi-step form to collect user information
- Personality profiling
- Personal preferences collection
- Life experiences documentation
- Core values identification
- Generation of a unique phonetic identifier
- Supabase integration for data storage

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Testing

This project uses Vitest for unit and component testing, and Cypress for end-to-end testing.

### Running unit tests

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Running Cypress tests

```bash
# Run Cypress component tests
npm run test:component

# Run Cypress E2E tests in CI mode
npm run test:e2e:ci

# Open Cypress Test Runner (requires a UI)
npm run cypress:open
```

### CI/CD Pipeline

The project uses GitHub Actions for continuous integration and Netlify for continuous deployment:

1. On every push and pull request:
   - Unit tests are run with Vitest
   - Component tests are run with Cypress
   - E2E tests are run with Cypress

2. On push to main branch:
   - All tests are run
   - If tests pass, the app is built and deployed to Netlify

## Test Coverage

The test suite covers:

- Basic form navigation and validation
- Complete user journey through all steps
- Form validation
- Component rendering
- User interactions
- State management
- Accessibility
- Responsive design
- Supabase integration

## License

MIT