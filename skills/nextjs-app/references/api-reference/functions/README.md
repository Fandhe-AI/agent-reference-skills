# functions

| Name | Description | Path |
| --- | --- | --- |
| after | Schedule work to run after a response (or prerender) finishes. | [after.md](./after.md) |
| cacheLife | Set the cache lifetime of a `use cache` function or component. | [cacheLife.md](./cacheLife.md) |
| cacheTag | Tag cached data for on-demand invalidation. | [cacheTag.md](./cacheTag.md) |
| unstable_catchError | Programmatic error boundary wrapper (experimental). | [unstable_catchError.md](./unstable_catchError.md) |
| connection | Wait for an incoming request before continuing rendering. | [connection.md](./connection.md) |
| cookies | Read/write HTTP request cookies. | [cookies.md](./cookies.md) |
| draftMode | Enable/disable/check Draft Mode. | [draftMode.md](./draftMode.md) |
| fetch (extended) | Web `fetch()` extended with Next.js caching/revalidation options. | [fetch.md](./fetch.md) |
| forbidden | Render a 403 error page (experimental). | [forbidden.md](./forbidden.md) |
| generateImageMetadata | Generate multiple image variants for a Metadata API file. | [generateImageMetadata.md](./generateImageMetadata.md) |
| generateMetadata | Define static/dynamic `<head>` metadata for SEO. | [generateMetadata.md](./generateMetadata.md) |
| generateSitemaps | Generate multiple sitemaps for an application. | [generateSitemaps.md](./generateSitemaps.md) |
| generateStaticParams | Statically generate dynamic route segments at build time. | [generateStaticParams.md](./generateStaticParams.md) |
| generateViewport | Define the initial viewport of a page. | [generateViewport.md](./generateViewport.md) |
| headers | Read HTTP request headers. | [headers.md](./headers.md) |
| ImageResponse | Generate dynamic images from JSX/CSS. | [ImageResponse.md](./ImageResponse.md) |
| NextRequest | Extended Web Request API for Proxy/Route Handlers. | [NextRequest.md](./NextRequest.md) |
| NextResponse | Extended Web Response API for Proxy/Route Handlers. | [NextResponse.md](./NextResponse.md) |
| notFound | Render the `not-found` UI and a 404 status. | [not-found.md](./not-found.md) |
| permanentRedirect | Redirect with a permanent (308) HTTP status. | [permanentRedirect.md](./permanentRedirect.md) |
| redirect | Redirect with a temporary (307) HTTP status. | [redirect.md](./redirect.md) |
| refresh | Refresh the client router from a Server Action. | [refresh.md](./refresh.md) |
| revalidatePath | Invalidate cached data for a specific path. | [revalidatePath.md](./revalidatePath.md) |
| revalidateTag | Invalidate cached data for a specific cache tag. | [revalidateTag.md](./revalidateTag.md) |
| unauthorized | Render a 401 error page (experimental). | [unauthorized.md](./unauthorized.md) |
| unstable_cache | Cache expensive operation results (superseded by `use cache`). | [unstable_cache.md](./unstable_cache.md) |
| unstable_noStore | Opt a component out of caching (legacy, use `connection` instead). | [unstable_noStore.md](./unstable_noStore.md) |
| unstable_rethrow | Rethrow internal Next.js control-flow errors from a catch block. | [unstable_rethrow.md](./unstable_rethrow.md) |
| updateTag | Immediately update cached data for a tag from a Server Action. | [updateTag.md](./updateTag.md) |
| useLinkStatus | Track the pending navigation state of a `<Link>`. | [useLinkStatus.md](./useLinkStatus.md) |
| useParams | Read a route's dynamic params. | [use-params.md](./use-params.md) |
| usePathname | Read the current URL's pathname. | [usePathname.md](./usePathname.md) |
| useReportWebVitals | Report Core Web Vitals metrics. | [useReportWebVitals.md](./useReportWebVitals.md) |
| useRouter | Programmatically navigate routes. | [useRouter.md](./useRouter.md) |
| useSearchParams | Read the current URL's query string. | [use-search-params.md](./use-search-params.md) |
| useSelectedLayoutSegment | Read the active route segment one level below a layout. | [use-selected-layout-segment.md](./use-selected-layout-segment.md) |
| useSelectedLayoutSegments | Read all active route segments below a layout. | [use-selected-layout-segments.md](./use-selected-layout-segments.md) |
| userAgent | Parse user agent info from a request. | [userAgent.md](./userAgent.md) |
