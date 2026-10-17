---
source: https://kotlinlang.org/docs/kotlin-tour-intermediate-open-special-classes.html
---

# Sealed Classes with when

Model a closed set of subtypes with a sealed class and handle every case in a `when` expression.

```kotlin
sealed class DeliveryStatus {
    data class Pending(val sender: String) : DeliveryStatus()
    data class InTransit(val estimatedDeliveryDate: String) : DeliveryStatus()
    data class Delivered(val deliveryDate: String, val recipient: String) : DeliveryStatus()
    data class Canceled(val reason: String) : DeliveryStatus()
}

fun printDeliveryStatus(status: DeliveryStatus) {
    when (status) {
        is DeliveryStatus.Pending -> {
            println("The package is pending pickup from ${status.sender}.")
        }
        is DeliveryStatus.InTransit -> {
            println("The package is in transit and expected to arrive by ${status.estimatedDeliveryDate}.")
        }
        is DeliveryStatus.Delivered -> {
            println("The package was delivered to ${status.recipient} on ${status.deliveryDate}.")
        }
        is DeliveryStatus.Canceled -> {
            println("The delivery was canceled due to: ${status.reason}.")
        }
    }
}

fun main() {
    val status1: DeliveryStatus = DeliveryStatus.Pending("Alice")
    val status3: DeliveryStatus = DeliveryStatus.Delivered("2024-11-18", "Bob")

    printDeliveryStatus(status1)
    // The package is pending pickup from Alice.
    printDeliveryStatus(status3)
    // The package was delivered to Bob on 2024-11-18.
}
```

## Notes

- Child classes of a sealed class can only be created within the same package.
- The `is` operator in each branch smart-casts `status` to the subtype.
- Combine with `data object` for subtypes that carry no state, as in `data object Loading : Status()`.
