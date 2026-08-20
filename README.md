# Loan Decision Bot           

Loan Decision Bot is a modern web app for exploring loan approval decisions using a lightweight rule-based prediction model. It combines a clean React interface with a local prediction engine so you can test applicant scenarios and view a decision explanation without needing a backend service.

## Features           

- Guided loan application form for collecting applicant information
- Local prediction logic based on a bundled model definition
- Clear approval/denial outcome with a simple explanation
- Responsive UI built with React, TypeScript, and Tailwind-inspired styling
- Easy local development workflow with Vite and TanStack Start

## Tech stack

- React 19
- TypeScript
- TanStack Start and TanStack Router
- Vite
- Tailwind CSS-compatible UI patterns

## Project structure

- [src/components](src/components) — form and result UI components
- [src/lib](src/lib) — model data and prediction logic
- [src/routes](src/routes) — app routes and document metadata
- [public](public) — static assets such as the favicon

## Getting started

Make sure you have Node.js and npm installed.

```sh
git clone https://github.com/Ashwinihebbali/loan-approval-prediction-system.git
cd loan-approval-prediction-system
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Build for production

```sh
npm run build
```

## Customize the model

You can update the prediction behavior by editing:

- [src/lib/loan-model.json](src/lib/loan-model.json)
- [src/lib/loan-predict.ts](src/lib/loan-predict.ts)

You can also replace the branding assets in [public](public) to match your own product identity.

## License

This project is available for educational and personal use.
