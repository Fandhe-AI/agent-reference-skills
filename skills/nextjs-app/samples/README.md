# samples

| Name | Description | Path |
| --- | --- | --- |
| Server Component Data Fetching with Caching | Fetch data directly in an async Server Component and control `fetch` caching with `cache` / `next.revalidate` / `next.tags` | [server-component-data-fetching.md](./server-component-data-fetching.md) |
| Server Actions Form Submission with useActionState | Submit a `<form>` with a Server Action, validate on the server, and surface pending/error state to the client with `useActionState` | [server-actions-form.md](./server-actions-form.md) |
| Dynamic Route with generateStaticParams | Statically generate every page for a dynamic segment (`[slug]`) at build time, and read the resolved `params` with `await` | [dynamic-route-static-params.md](./dynamic-route-static-params.md) |
| layout / template / loading / error File Convention Structure | Combine the special files of a route segment: a persistent `layout`, a remounting `template`, a Suspense-driven `loading` fallback, and an `error` boundary | [route-file-conventions.md](./route-file-conventions.md) |
| Route Handler with GET and POST | Define a custom REST endpoint under `app/` with a `route.ts` file, using `NextRequest`/`Response` | [route-handler-get-post.md](./route-handler-get-post.md) |
| generateMetadata and Dynamic OG Image | Generate per-route `<head>` metadata from fetched data, and a matching dynamic Open Graph image with `ImageResponse` | [metadata-and-og-image.md](./metadata-and-og-image.md) |
| On-Demand Revalidation with revalidatePath and revalidateTag | Invalidate cached data after a mutation using `revalidatePath` (route-based) or `revalidateTag` (tag-based) inside a Server Action | [on-demand-revalidation.md](./on-demand-revalidation.md) |
| Streaming with Suspense | Send static page content immediately and stream in a slower async component once it resolves, using React `<Suspense>` | [streaming-with-suspense.md](./streaming-with-suspense.md) |
| Parallel + Intercepting Routes Modal | Open `/login` as a modal overlay via client-side navigation while keeping `/login` a full shareable page on direct visit, using a parallel `@auth` slot intercepted with `(.)` | [parallel-intercepting-routes-modal.md](./parallel-intercepting-routes-modal.md) |
