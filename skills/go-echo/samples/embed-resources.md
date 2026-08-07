# Embed Resources

Bundle static assets directly into the compiled binary with Go's `embed` package, with a live-reload fallback for development.

```go
package main

import (
	"context"
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"

	"github.com/labstack/echo/v5"
)

//go:embed app
var embededFiles embed.FS

func getFileSystem(useOS bool) http.FileSystem {
	if useOS {
		log.Print("using live mode")
		return http.FS(os.DirFS("app"))
	}

	log.Print("using embed mode")
	fsys, err := fs.Sub(embededFiles, "app")
	if err != nil {
		panic(err)
	}

	return http.FS(fsys)
}

func main() {
	e := echo.New()
	useOS := len(os.Args) > 1 && os.Args[1] == "live"
	assetHandler := http.FileServer(getFileSystem(useOS))
	e.GET("/", echo.WrapHandler(assetHandler))
	e.GET("/static/*", echo.WrapHandler(http.StripPrefix("/static/", assetHandler)))

	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- `//go:embed app` embeds the `app` directory contents into the `embededFiles` variable at compile time; the binary is self-contained.
- Run with `go run server.go live` to serve files directly from disk instead of the embedded filesystem, useful for fast iteration without rebuilding.
- `echo.WrapHandler` adapts a standard `http.Handler` (here, `http.FileServer`) into an Echo handler function.
