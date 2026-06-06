# How To

| Name | Description | Path |
|------|-------------|------|
| Accessibility | React Router renders standard HTML elements by default, providing built-in browser accessibility… | [accessibility.md](./accessibility.md) |
| Client Data | Use `clientLoader` and `clientAction` to fetch and mutate data directly in the browser. | [client-data.md](./client-data.md) |
| Error Boundary | Error boundaries automatically catch errors thrown in loaders, actions, and components, rendering… | [error-boundary.md](./error-boundary.md) |
| Error Reporting | Send errors to external monitoring services from both the server and the client. | [error-reporting.md](./error-reporting.md) |
| Fetchers | Fetchers allow loading and mutating data without causing a navigation. | [fetchers.md](./fetchers.md) |
| File Route Conventions | The `@react-router/fs-routes` package enables file-system based routing where filenames in… | [file-route-conventions.md](./file-route-conventions.md) |
| File Uploads | Handle multipart form file uploads in React Router using `@remix-run/form-data-parser` for… | [file-uploads.md](./file-uploads.md) |
| Form Validation | Validate form input server-side in an action and return errors to the UI without navigating away. | [form-validation.md](./form-validation.md) |
| Headers | Set HTTP response headers from route modules using the `headers` export. | [headers.md](./headers.md) |
| Instrumentation | Add observability (logging, error reporting, performance tracing) by wrapping request handlers… | [instrumentation.md](./instrumentation.md) |
| Middleware | Run code before and after response generation for matched routes. | [middleware.md](./middleware.md) |
| Navigation Blocking | Prevent accidental navigation away from a page when users have unsaved changes, and show a custom… | [navigation-blocking.md](./navigation-blocking.md) |
| Pre-Rendering | Render pages at build time instead of runtime to speed up initial loads for static content. | [pre-rendering.md](./pre-rendering.md) |
| Presets | Presets package React Router configuration so that tools and hosting providers can configure the… | [presets.md](./presets.md) |
| React Server Components | Experimental support for React Server Components (RSC), enabling server-side rendering with direct… | [react-server-components.md](./react-server-components.md) |
| Resource Routes | Routes that serve non-UI resources (PDFs, images, JSON APIs, webhooks) by exporting a `loader`… | [resource-routes.md](./resource-routes.md) |
| Route Module Type Safety | React Router automatically generates route-specific TypeScript types (params, loader data, etc.)… | [route-module-type-safety.md](./route-module-type-safety.md) |
| Security | Key security considerations for React Router applications, focusing on Content Security Policy… | [security.md](./security.md) |
| Server Bundles | Split the server build into multiple bundles, each handling a subset of routes. | [server-bundles.md](./server-bundles.md) |
| SPA Mode | Build a Single Page Application with React Router by disabling runtime server rendering (`ssr:… | [spa.md](./spa.md) |
| Status Codes | Set HTTP response status codes from loaders and actions using the `data()` utility. | [status.md](./status.md) |
| Suspense (Streaming) | Defer non-critical data by returning unawaited promises from loaders, unblocking the initial… | [suspense.md](./suspense.md) |
| Using Handle | The `handle` export lets routes attach arbitrary metadata that ancestor components can read via… | [using-handle.md](./using-handle.md) |
| View Transitions | Animate between page transitions using the browser's View Transitions API. | [view-transitions.md](./view-transitions.md) |
