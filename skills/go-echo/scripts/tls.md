# tls

Start Echo over HTTPS, either with a Let's Encrypt AutoTLS certificate or with existing cert/key files.

## AutoTLS with StartConfig (Echo v5)

```go
m := &autocert.Manager{
    Prompt:     autocert.AcceptTOS,
    HostPolicy: autocert.HostWhitelist("example.com", "www.example.com"),
    // Cache certificates to avoid issues with rate limits (https://letsencrypt.org/docs/rate-limits)
    Cache: autocert.DirCache("/var/www/.cache"),
}

sc := echo.StartConfig{
    Address:   ":443",
    TLSConfig: m.TLSConfig(),
}
if err := sc.Start(context.Background(), e); err != nil {
    e.Logger.Error("failed to start server", "error", err)
}
```

```sh
go run main.go
```

> **警告**: `HostPolicy` に許可ドメインを設定せずに公開すると任意ドメインで証明書発行を試み、Let's Encrypt のレート制限に抵触する恐れがある。`autocert.DirCache` でキャッシュを永続化し、再発行の頻度を抑えること。

## AutoTLS with the v4 API

```go
e.Logger.Fatal(e.StartAutoTLS(":443"))
```

`Echo.StartAutoTLS(address string) error` is the v4 method that starts the server with Let's Encrypt-issued certificates.

## StartTLS with existing cert/key files (v4 API)

```go
e.Logger.Fatal(e.StartTLS(":443", "cert.pem", "key.pem"))
```

`Echo.StartTLS(address string, certFile, keyFile interface{}) error` accepts file paths or in-memory `[]byte` cert/key data.

## StartTLS with StartConfig (Echo v5)

```go
sc := echo.StartConfig{Address: ":1323"}
if err := sc.StartTLS(context.Background(), e, "cert.pem", "key.pem"); err != nil {
    e.Logger.Error("failed to start server", "error", err)
}
```

## Generate a self-signed cert/key for local HTTP/2 or TLS testing

```sh
go run $GOROOT/src/crypto/tls/generate_cert.go --host localhost
```

Produces `cert.pem` and `key.pem` in the current directory, suitable for the `StartTLS` examples above.
