# dev-tools

Common day-to-day commands: verifying the toolchain and hot-reloading during development.

## Check the Go version

```sh
go version
```

Echo v5 requires Go 1.25 or newer; run this first if `go build`/`go run` fails with a toolchain error.

## Hot reload with air (third-party tool, not part of Echo)

[air](https://github.com/air-verse/air) is a community live-reload utility commonly paired with Echo during development; it is not distributed or documented by the Echo project itself. Commands below are sourced from air's own README.

```sh
go install github.com/air-verse/air@latest
```

```sh
air init
```

Creates a `.air.toml` config file in the current directory.

```sh
air
```

Watches the project for file changes and automatically rebuilds/restarts the Echo server.

```sh
air -c .air.toml
```

Run with an explicit config file path.
