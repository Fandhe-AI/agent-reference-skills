# JWT Authentication

Issue a JWT on login and protect a route group with `echo-jwt` middleware verifying custom claims.

```go
package main

import (
	"context"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v5"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

type jwtCustomClaims struct {
	Name  string `json:"name"`
	Admin bool   `json:"admin"`
	jwt.RegisteredClaims
}

func login(c *echo.Context) error {
	username := c.FormValue("username")
	password := c.FormValue("password")

	if username != "jon" || password != "shhh!" {
		return echo.ErrUnauthorized
	}

	claims := &jwtCustomClaims{
		"Jon Snow",
		true,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 72)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]string{"token": t})
}

func accessible(c *echo.Context) error {
	return c.String(http.StatusOK, "Accessible")
}

func restricted(c *echo.Context) error {
	token, err := echo.ContextGet[*jwt.Token](c, "user")
	if err != nil {
		return echo.ErrUnauthorized.Wrap(err)
	}
	claims := token.Claims.(*jwtCustomClaims)
	name := claims.Name
	return c.String(http.StatusOK, "Welcome "+name+"!")
}

func main() {
	e := echo.New()

	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())

	e.POST("/login", login)
	e.GET("/", accessible)

	r := e.Group("/restricted")

	config := echojwt.Config{
		NewClaimsFunc: func(c *echo.Context) jwt.Claims {
			return new(jwtCustomClaims)
		},
		SigningKey: []byte("secret"),
	}
	r.Use(echojwt.WithConfig(config))
	r.GET("", restricted)

	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- `e.Group("/restricted")` isolates protected routes; `echojwt.WithConfig(config)` is applied only to that group via `r.Use`.
- `NewClaimsFunc` lets `echo-jwt` populate a custom claims struct instead of the default `jwt.MapClaims`.
- `echo.ContextGet[*jwt.Token](c, "user")` retrieves the verified token that the middleware stored on the context.
- For external key providers (e.g. Google's JWKS endpoint), use `echojwt.Config{KeyFunc: ...}` instead of a static `SigningKey`.
