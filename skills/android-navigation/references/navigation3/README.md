# navigation3

| Name | Description | Path |
|------|-------------|------|
| DialogSceneStrategy / OverlayScene | DialogSceneStrategy is a built-in SceneStrategy that renders… | [dialogscenestrategy.md](./dialogscenestrategy.md) |
| entryProvider / entry | DSL for building the (key: T) -> NavEntry<T> function that NavDisplay… | [entryprovider.md](./entryprovider.md) |
| Get started with Navigation 3 | Add the Navigation 3 runtime and UI libraries, plus optional add-ons… | [get-started.md](./get-started.md) |
| ListDetailSceneStrategy | Material adaptive SceneStrategy that lays out a list pane, detail pane… | [listdetailscenestrategy.md](./listdetailscenestrategy.md) |
| Metadata DSL / NavMetadataKey | Metadata shares arbitrary information between NavEntry, Scene and NavDisplay… | [metadata.md](./metadata.md) |
| Migrate from Navigation 2 to Navigation 3 | A single, atomic migration path from NavController/NavHost to Navigation 3… | [migration-guide.md](./migration-guide.md) |
| Modularize Navigation 3 Code | Pattern for splitting Navigation 3 code across Gradle feature modules… | [modularize.md](./modularize.md) |
| NavBackStack / rememberNavBackStack | NavBackStack is a MutableList<T : NavKey> backed by a Compose SnapshotStateList… | [navbackstack.md](./navbackstack.md) |
| NavDisplay.TransitionKey / PopTransitionKey / PredictivePopTransitionKey | Per-entry metadata keys that override NavDisplay's global transition specs… | [navdisplay-animation.md](./navdisplay-animation.md) |
| NavDisplay | Observes a Navigation 3 back stack and renders it, delegating layout to SceneStrategy… | [navdisplay.md](./navdisplay.md) |
| NavEntry | Holds a navigation key together with the composable content it represents… | [naventry.md](./naventry.md) |
| NavEntryDecorator | Wraps every NavEntry rendered by NavDisplay with the same composable logic… | [naventrydecorator.md](./naventrydecorator.md) |
| Navigation 3 | Navigation 3 (androidx.navigation3) is a Compose-first navigation library… | [navigation-3.md](./navigation-3.md) |
| NavKey | Marker interface for navigation destination keys… | [navkey.md](./navkey.md) |
| rememberSaveableStateHolderNavEntryDecorator | Built-in NavEntryDecorator that retains a NavEntry's state through configuration changes… | [remembersaveablestateholdernaventrydecorator.md](./remembersaveablestateholdernaventrydecorator.md) |
| rememberViewModelStoreNavEntryDecorator | Built-in NavEntryDecorator that creates and provides a ViewModelStoreOwner for each NavEntry… | [rememberviewmodelstorenaventrydecorator.md](./rememberviewmodelstorenaventrydecorator.md) |
| Return results (ResultEventBus / ResultEffect) | In-memory event bus (Navigation 3 1.2.0+) for returning results between destinations… | [result-event-bus.md](./result-event-bus.md) |
| Save and manage navigation state | Strategies for saving the back stack and for scoping ViewModel instances to NavEntry objects… | [save-state.md](./save-state.md) |
| Scene | The unit that renders one or more NavEntry objects for a given back stack state… | [scene.md](./scene.md) |
| SceneDecoratorStrategy | Decorates a Scene already produced by a SceneStrategy, in a second pass… | [scenedecoratorstrategy.md](./scenedecoratorstrategy.md) |
| SceneStrategy | Determines how a list of back-stack NavEntry objects is arranged into a Scene… | [scenestrategy.md](./scenestrategy.md) |
| SinglePaneSceneStrategy | The default SceneStrategy: always produces a single-entry Scene for the last back stack entry… | [singlepanescenestrategy.md](./singlepanescenestrategy.md) |
| SupportingPaneSceneStrategy | Material adaptive SceneStrategy that lays out a main pane alongside a supporting pane… | [supportingpanescenestrategy.md](./supportingpanescenestrategy.md) |
