# main-config

| Name | Description | Path |
|------|-------------|------|
| addons | Registers addon packages that extend Storybook's functionality. | [addons.md](./addons.md) |
| babel | Customizes Storybook's Babel configuration for Webpack-based projects. | [babel.md](./babel.md) |
| build | Optimizes Storybook's production build output, particularly for testing scenarios. | [build.md](./build.md) |
| core | Configures Storybook's internal features including the dev server, build system, and telemetry. | [core.md](./core.md) |
| docs | Controls Storybook's auto-generated documentation features. | [docs.md](./docs.md) |
| env | Defines custom environment variables accessible throughout your Storybook instance. | [env.md](./env.md) |
| features | Enables or disables Storybook's built-in capabilities and experimental functionalities. | [features.md](./features.md) |
| framework | Required. Configures Storybook based on your UI framework, determining the rendering engine and build tooling. | [framework.md](./framework.md) |
| indexers | Customizes how Storybook discovers and parses story files, enabling custom story formats. | [indexers.md](./indexers.md) |
| logLevel | Controls the verbosity of Storybook's browser console logging. | [log-level.md](./log-level.md) |
| managerHead | Programmatically modifies the manager UI's `<head>` section. | [manager-head.md](./manager-head.md) |
| previewAnnotations | Adds scripts that execute within the story preview environment. Intended for framework maintainers. | [preview-annotations.md](./preview-annotations.md) |
| previewBody | Programmatically modifies the preview iframe's `<body>` element. | [preview-body.md](./preview-body.md) |
| previewHead | Programmatically modifies the preview iframe's `<head>` section. | [preview-head.md](./preview-head.md) |
| refs | Configures Storybook composition by embedding external Storybook instances. | [refs.md](./refs.md) |
| staticDirs | Configures directories containing static files that Storybook serves to stories. | [static-dirs.md](./static-dirs.md) |
| stories | Required. Determines which files Storybook loads as story definitions. | [stories.md](./stories.md) |
| swc | Customizes Storybook's SWC compiler configuration for Webpack-based projects. | [swc.md](./swc.md) |
| tags | Defines custom tags for stories or modifies default behavior of built-in tags. | [tags.md](./tags.md) |
| typescript | Manages how Storybook processes TypeScript files, including type checking and React component documentation. | [typescript.md](./typescript.md) |
| viteFinal | Customizes Storybook's Vite configuration when using a Vite-based builder. | [vite-final.md](./vite-final.md) |
| webpackFinal | Customizes Storybook's Webpack configuration when using a Webpack-based builder. | [webpack-final.md](./webpack-final.md) |
