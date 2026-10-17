---
source: https://kotlinlang.org/docs/kotlin-tour-intermediate-open-special-classes.html
---

# Open Classes and Inheritance

Make a class inheritable with `open`, override members, and mix a parent class with interfaces.

```kotlin
open class Vehicle(val make: String, val model: String) {
    open fun displayInfo() {
        println("Vehicle Info: Make - $make, Model - $model")
    }
}

class Car(make: String, model: String, val numberOfDoors: Int) : Vehicle(make, model) {
    override fun displayInfo() {
        println("Car Info: Make - $make, Model - $model, Number of Doors - $numberOfDoors")
    }
}

fun main() {
    val car1 = Car("Toyota", "Corolla", 4)
    val car2 = Car("Honda", "Civic", 2)

    // Uses the overridden displayInfo() function
    car1.displayInfo()
    // Car Info: Make - Toyota, Model - Corolla, Number of Doors - 4
    car2.displayInfo()
    // Car Info: Make - Honda, Model - Civic, Number of Doors - 2
}
```

Parent class first, then interfaces:

```kotlin
interface EcoFriendly {
    val emissionLevel: String
}

interface ElectricVehicle {
    val batteryCapacity: Double
}

open class Vehicle(val make: String, val model: String)

open class Car(make: String, model: String, val numberOfDoors: Int) : Vehicle(make, model)

class ElectricCar(
    make: String,
    model: String,
    numberOfDoors: Int,
    val capacity: Double,
    val emission: String
) : Car(make, model, numberOfDoors), EcoFriendly, ElectricVehicle {
    override val batteryCapacity: Double = capacity
    override val emissionLevel: String = emission
}
```

## Notes

- A member must be `open` in the parent and marked `override` in the child.
- Overriding properties is not common practice; pass the value through the parent constructor instead, for example `Vehicle(make, model, "Automatic")`.
- When inheriting a class and implementing interfaces, declare the parent class first after the colon.
