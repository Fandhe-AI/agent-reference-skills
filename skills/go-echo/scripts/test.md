# test

Run tests for Echo handlers written with Go's standard `testing` and `net/http/httptest` packages, as shown in the Echo testing guide.

## Run all tests in the module

```sh
go test ./...
```

## Run tests in the current package with verbose output

```sh
go test -v .
```

Echo's testing guide builds handler tests around `httptest.NewRequest`, `httptest.NewRecorder`, and `e.NewContext(req, rec)` (or `e.ServeHTTP(rec, req)` to exercise the full router with middleware); `go test` runs any `_test.go` file written against that pattern.
