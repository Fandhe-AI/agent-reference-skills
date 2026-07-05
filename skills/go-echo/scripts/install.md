# install

Set up a Go module and add Echo as a dependency.

## New project setup

```sh
mkdir myapp && cd myapp
go mod init myapp
go get github.com/labstack/echo/v5
```

Echo v5 is the current actively developed major version and requires Go 1.25+.

## Add Echo to an existing module

```sh
go get github.com/labstack/echo/v5
```

## Install the v4 LTS line instead

```sh
go get github.com/labstack/echo/v4
```

Echo v4 receives security and bug-fix updates only (maintenance mode); prefer v5 for new projects. Because Go uses semantic import versioning, `v4` and `v5` can coexist in the same codebase during a migration.

## Upgrade to the latest release

```sh
go get github.com/labstack/echo/v5
go mod tidy
```

`go mod tidy` removes unused dependencies and adds missing ones after the upgrade.

## Verify the Go toolchain version

```sh
go version
```

Echo v5 requires Go 1.25 or newer.
