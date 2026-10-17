---
source: https://kotlinlang.org/docs/kotlin-tour-intermediate-extension-functions.html
---

# Extension Functions

Add a function to an existing class without modifying its source.

```kotlin
fun String.bold(): String = "<b>$this</b>"

fun main() {
    // "hello" is the receiver
    println("hello".bold())
    // <b>hello</b>
}
```

Extension-oriented design: keep one core function in the class and add convenience functions as extensions.

```kotlin
class HttpClient {
    fun request(method: String, url: String, headers: Map<String, String>): HttpResponse {
        println("Requesting $method to $url with headers: $headers")
        return HttpResponse("Response from $url")
    }
}

fun HttpClient.get(url: String): HttpResponse = request("GET", url, emptyMap())

fun main() {
    val client = HttpClient()

    // The client instance is the receiver
    val getResponseWithExtension = client.get("https://example.com")
}
```

## Notes

- Inside the body, the receiver is accessed with `this`.
- The official snippet does not define `HttpResponse`; declare it yourself before compiling the second example.
- Extension functions are called like member functions, with a period `.`.
