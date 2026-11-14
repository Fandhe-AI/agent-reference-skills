# Vercel

## Usage

1. Create a new project at https://vercel.com/new.
2. Import the code.
3. Vercel automatically detects Turborepo and applies the correct configuration.

## Notes

- The Turborepo and Vercel integration is zero-config: Vercel automatically recognizes the monorepo structure and Remote Cache is configured automatically.
- No manual setup of `TURBO_TOKEN` / `TURBO_TEAM` is required.
- Source: https://turborepo.dev/docs/guides/ci-vendors/vercel (vercel/turborepo tag v2.11.11, fetched 2026-11-14).

### Vercel CI

Vercel CI runs your Turborepo tasks (tests, linting, type checks) when you push code. It uses your Task Graph to run tasks in dependency order, skips unaffected tasks, and reuses cached results with zero-config Vercel Remote Cache. Each task runs in its own isolated compute instance. Setup: https://vercel.com/docs/ci ; configuration reference (task dependencies, resource sizing): https://vercel.com/docs/ci/configuration ; secrets and other values: https://vercel.com/docs/ci/environment-variables
