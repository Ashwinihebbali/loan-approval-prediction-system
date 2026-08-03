# Loan Decision Bot

A small loan approval prediction experience built with React, TypeScript, and TanStack Start. The app loads a local loan model definition and uses it to estimate whether a loan application should be approved based on user input.

## What this app does

- Collects applicant details through a guided loan form.
- Applies a local prediction model to estimate approval likelihood.
- Presents a clear recommendation and explanation for the result.

## Project structure

- [src/components](src/components) — UI for the form and decision output.
- [src/lib](src/lib) — model data and prediction logic.
- [src/routes](src/routes) — application routes and document head metadata.

## Development

You need Node.js and npm installed locally.

```sh
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

## Build

```sh
npm run build
```
