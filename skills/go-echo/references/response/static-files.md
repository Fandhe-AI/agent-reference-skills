# Static Files

Serves static assets (images, JS, CSS, PDFs, fonts) from the filesystem or an embedded `fs.FS`, either as a whole directory prefix or a single file route.

## Signature / Usage

```go
Echo#Static(prefix, root string)
Echo#StaticFS(prefix string, fs fs.FS)
Echo#File(path, file string)
```

```go
// Serve files from "assets" under "/static/*"
e := echo.New()
e.Static("/static", "assets")
// Request: /static/js/main.js -> serves assets/js/main.js
```

```go
// Serve an embedded filesystem
//go:embed "assets/images"
var images embed.FS

func main() {
	e := echo.New()
	e.StaticFS("/images", echo.MustSubFS(images, "assets/images"))
	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

```go
// Serve a single file (e.g. an index page)
e.File("/", "public/index.html")
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| prefix | string | URL path prefix that maps to `root` |
| root | string | Directory (relative to `Echo#Filesystem`) to serve files from |
| fs | fs.FS | Filesystem implementation to serve from, e.g. `embed.FS` via `echo.MustSubFS` |
| path | string | Route path that serves a single file (`Echo#File`) |
| file | string | File to serve for `path` (`Echo#File`) |

## Notes

- By default Echo uses `os.DirFS(".")` rooted at the current working directory; customize via `e.Filesystem = os.DirFS("assets")`.
- Avoid leading slashes in file paths passed to `Static`/`StaticFS`/`File` when using most `fs.FS` implementations; use relative paths instead.
- `echo.MustSubFS` roots an `fs.FS` (e.g. an `embed.FS`) at the correct subdirectory before passing it to `StaticFS`.
- A dedicated Static middleware is also available for more advanced serving scenarios (e.g. index files, browsing).

## Related

- [File (response)](./file.md)
- [Templates](./templates.md)
