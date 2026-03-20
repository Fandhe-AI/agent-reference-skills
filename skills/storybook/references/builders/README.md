# Storybook — Builders

Storybook builders power the platform by spinning up a development environment, compiling JavaScript, CSS, and MDX into an executable bundle, and updating the browser in real-time.

| Name | Description | Path |
|------|-------------|------|
| `Vite` | Bundles stories using Vite with near-instantaneous HMR; ideal for Vite-based projects | [./vite.md](./vite.md) |
| `Webpack` | Default Storybook bundler using Webpack 5 with zero-config support and extensive customization | [./webpack.md](./webpack.md) |
| `Builder API` | Interface for creating custom builders that compile components and stories into browser-runnable bundles | [./builder-api.md](./builder-api.md) |
