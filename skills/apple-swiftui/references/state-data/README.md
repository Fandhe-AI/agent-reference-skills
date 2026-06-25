# State & Data Flow

| Name | Description | Path |
|------|-------------|------|
| State | Property wrapper for value-type state owned and managed by SwiftUI | [state.md](./state.md) |
| Binding | Two-way connection to a value owned by another source of truth | [binding.md](./binding.md) |
| Bindable | Creates bindings to mutable properties of `@Observable` objects | [bindable.md](./bindable.md) |
| Environment | Reads a value or `@Observable` object from the view's environment | [environment.md](./environment.md) |
| EnvironmentValues | Collection of environment values propagated through the view hierarchy | [environmentvalues.md](./environmentvalues.md) |
| EnvironmentObject | Supplies and reads an `ObservableObject` through the environment | [environmentobject.md](./environmentobject.md) |
| StateObject | Owns and instantiates an `ObservableObject` for the lifetime of a view | [stateobject.md](./stateobject.md) |
| ObservedObject | Subscribes to an `ObservableObject` passed in as a view input | [observedobject.md](./observedobject.md) |
| ObservableObject | Combine protocol that emits change notifications via `@Published` properties | [observableobject.md](./observableobject.md) |
| AppStorage | Persists values in `UserDefaults` and invalidates the view on change | [appstorage.md](./appstorage.md) |
| SceneStorage | Per-scene state restoration storage managed by the system | [scenestorage.md](./scenestorage.md) |
| FocusState | Tracks and controls keyboard/input focus within a scene | [focusstate.md](./focusstate.md) |
| Namespace | Provides a stable namespace ID for `matchedGeometryEffect` animations | [namespace.md](./namespace.md) |
