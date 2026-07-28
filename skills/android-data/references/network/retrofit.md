# Retrofit

A type-safe HTTP client for Android and Java/Kotlin from Square. Turns a Kotlin interface annotated with HTTP method annotations into an implementation that performs REST calls, built on OkHttp.

## Signature / Usage

```kotlin
interface UserService {
    @GET("/users/{id}")
    suspend fun getUser(@Path("id") id: String): User

    @POST("/users")
    suspend fun createUser(@Body user: User): User
}

val retrofit = Retrofit.Builder()
    .baseUrl("https://example.com/")
    .addConverterFactory(Json.asConverterFactory("application/json".toMediaType()))
    .build()

val userService = retrofit.create(UserService::class.java)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@GET(path)` / `@POST(path)` / `@PUT` / `@PATCH` / `@DELETE` / `@HEAD` / `@OPTIONS` | annotation | — | HTTP method and relative/absolute path for the request. |
| `@Path("name")` | parameter annotation | — | Replaces a `{name}` placeholder in the URL path. |
| `@Query("name")` | parameter annotation | — | Adds a URL query parameter. |
| `@Body` | parameter annotation | — | Serializes the parameter as the request body. |
| `Retrofit.Builder().baseUrl(url)` | builder | — | Sets the base URL all relative paths are resolved against. |
| `Retrofit.Builder().client(okHttpClient)` | builder | — | Supplies a custom `OkHttpClient`. |
| `Retrofit.Builder().addConverterFactory(factory)` | builder | — | Registers a body converter (e.g. kotlinx.serialization, Moshi, Gson). |
| `suspend fun ...` | Kotlin coroutine | — | Interface methods can be `suspend`; Retrofit dispatches them off the calling thread. |

## Notes

- Third-party library (Square), not part of the Android SDK or Jetpack. Requires Java 8+ / Android API 21+.
- The android.google.com network-ops guide recommends Retrofit (built on OkHttp) as the standard third-party HTTP client choice alongside Ktor.
- `suspend` interface functions avoid the need for `Call<T>`/`enqueue()` boilerplate and integrate directly with coroutines.
- Pair with a repository class to centralize network calls and keep `ViewModel`s free of networking details.

## Related

- [OkHttp](./okhttp.md)
- [kotlinx-serialization-converter](./kotlinx-serialization-converter.md)
- [cronet-okhttp-interceptor](./cronet-okhttp-interceptor.md)
