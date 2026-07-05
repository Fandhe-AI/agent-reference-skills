# File Upload (multipart form)

Handle a `multipart/form-data` POST request, save the uploaded file to disk, and return an HTML confirmation.

```go
package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func upload(c *echo.Context) error {
	// Read form fields
	name := c.FormValue("name")
	email := c.FormValue("email")

	// Source
	file, err := c.FormFile("file")
	if err != nil {
		return err
	}
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	// Destination — sanitize the client-supplied filename to prevent path
	// traversal (e.g. "../../etc/passwd"); never trust file.Filename directly.
	dstPath := filepath.Join("uploads", filepath.Base(file.Filename))
	dst, err := os.Create(dstPath)
	if err != nil {
		return err
	}
	defer dst.Close()

	// Copy
	if _, err = io.Copy(dst, src); err != nil {
		return err
	}

	return c.HTML(http.StatusOK, fmt.Sprintf("<p>File %s uploaded successfully with fields name=%s and email=%s.</p>", file.Filename, name, email))
}

func main() {
	e := echo.New()

	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())

	e.Static("/", "public")
	e.POST("/upload", upload)

	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

```html
<!-- public/index.html -->
<form action="/upload" method="post" enctype="multipart/form-data">
  Name: <input type="text" name="name"><br>
  Email: <input type="email" name="email"><br>
  Files: <input type="file" name="file"><br><br>
  <input type="submit" value="Submit">
</form>
```

## Notes

- `c.FormFile("file")` returns a `*multipart.FileHeader`; call `.Open()` to get a readable `src`.
- `file.Filename` is client-supplied: always strip directory components with `filepath.Base` (and confine writes under a known directory) before using it as a path, otherwise a value like `../../evil` can overwrite arbitrary files. Create the `uploads/` directory beforehand (`os.MkdirAll`).
- For multiple files, use `c.MultipartForm()` and read `form.File["files"]` (input name must have `multiple` attribute) instead of `c.FormFile`.
- `enctype="multipart/form-data"` on the HTML `<form>` is required for file fields to be sent correctly.
