---
source: https://kotlinlang.org/docs/kotlin-tour-intermediate-objects.html
---

# Object Declarations, Data Objects, and Companion Objects

Declare singletons with `object`, print-friendly singletons with `data object`, and class-level members with `companion object`.

```kotlin
interface Auth {
    fun takeParams(username: String, password: String)
}

object DoAuth : Auth {
    override fun takeParams(username: String, password: String) {
        println("input Auth parameters = $username:$password")
    }
}

fun main(){
    // The object is created when the takeParams() function is called
    DoAuth.takeParams("coding_ninja", "N1njaC0ding!")
    // input Auth parameters = coding_ninja:N1njaC0ding!
}
```

```kotlin
data object AppConfig {
    var appName: String = "My Application"
    var version: String = "1.0.0"
}

fun main() {
    println(AppConfig)
    // AppConfig
    
    println(AppConfig.appName)
    // My Application
}
```

```kotlin
class BigBen {
    companion object Bonger {
        fun getBongs(nTimes: Int) {
            repeat(nTimes) { print("BONG ") }
            }
        }
    }

fun main() {
    // Companion object is created when the class is referenced for the
    // first time.
    BigBen.getBongs(12)
    // BONG BONG BONG BONG BONG BONG BONG BONG BONG BONG BONG BONG 
}
```

## Notes

- Objects are lazy and thread-safe, and cannot have constructors.
- A `data object` gets `toString()` and `equals()` but not `copy()`.
- A class can have only one companion object; if unnamed, it is called `Companion`.
