# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.2 application with TypeScript, using the App Router architecture and Turbopack for development and builds. The project uses Tailwind CSS v4 for styling.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Architecture

### Technology Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Build Tool**: Turbopack (enabled for both dev and build)
- **Font**: Geist and Geist Mono (loaded via next/font/google)

### Project Structure
- `/src/app/`: App Router pages and layouts
  - `layout.tsx`: Root layout with Geist font configuration
  - `page.tsx`: Main application entry point
  - `globals.css`: Global styles and Tailwind imports
- Path alias: `@/*` maps to `./src/*`

### TypeScript Configuration
- Strict mode enabled
- Module resolution: bundler
- Target: ES2017
- JSX: preserve (for Next.js processing)

### ESLint Configuration
- Extends Next.js core-web-vitals and TypeScript rules
- Uses FlatCompat for ESLint v9 compatibility
- Ignores: node_modules, .next, out, build directories