# navigation3

| Name | Description | Path |
|------|-------------|------|
| DialogSceneStrategy / OverlayScene | Built-in `SceneStrategy` that renders an entry marked with `DialogSceneStrategy.dialog()` metadata inside a Compose `Dialog`, producing an `OverlayScene`. | [dialogscenestrategy.md](./dialogscenestrategy.md) |
| entryProvider / entry | DSL for building the `(key: T) -> NavEntry<T>` function that `NavDisplay` uses to resolve back stack keys into `NavEntry`s. | [entryprovider.md](./entryprovider.md) |
| ListDetailSceneStrategy | Material adaptive `SceneStrategy` that lays out a list pane, detail pane, and optional extra pane side-by-side based on `NavEntry.metadata` pane roles. | [listdetailscenestrategy.md](./listdetailscenestrategy.md) |
| Migrate from Navigation 2 to Navigation 3 | A single, atomic migration path from `NavController`/`NavHost` to Navigation 3's state-based back stack. | [migration-guide.md](./migration-guide.md) |
| Modularize Navigation 3 Code | Splits navigation across feature modules via `EntryProviderScope` extension-function entry builders composed with `entryProvider { }`, optionally wired with Dagger `@IntoSet`. | [modularize.md](./modularize.md) |
| NavBackStack / rememberNavBackStack | `NavBackStack` is a `MutableList<T : NavKey>` backed by a Compose `SnapshotStateList`; `rememberNavBackStack` creates and remembers one across configuration changes and process death. | [navbackstack.md](./navbackstack.md) |
| NavDisplay.TransitionKey / PopTransitionKey / PredictivePopTransitionKey | Per-entry metadata keys that override `NavDisplay`'s global transition specs for a single destination. | [navdisplay-animation.md](./navdisplay-animation.md) |
| NavDisplay | Observes a Navigation 3 back stack and renders it, delegating layout to `SceneStrategy`s and animating between `Scene`s. | [navdisplay.md](./navdisplay.md) |
| NavEntry | Holds a navigation `key` together with the composable `content` it represents. | [naventry.md](./naventry.md) |
| NavEntryDecorator | Wraps every `NavEntry` rendered by `NavDisplay` with the same composable logic, e.g. providing a `CompositionLocal` or cleaning up state. | [naventrydecorator.md](./naventrydecorator.md) |
| Navigation 3 | Navigation 3 (`androidx.navigation3`) is a Compose-first navigation library built around a plain, observable back stack of keys instead of a navigation graph. | [navigation-3.md](./navigation-3.md) |
| NavKey | Marker interface for navigation destination keys that should be `@Serializable` so they can be saved by `rememberNavBackStack`. | [navkey.md](./navkey.md) |
| rememberSaveableStateHolderNavEntryDecorator | Built-in `NavEntryDecorator` that retains a `NavEntry`'s state through configuration changes and process death via `SaveableStateProvider`. | [remembersaveablestateholdernaventrydecorator.md](./remembersaveablestateholdernaventrydecorator.md) |
| rememberViewModelStoreNavEntryDecorator | Built-in `NavEntryDecorator` that creates and provides a `ViewModelStoreOwner` scoped to each `NavEntry`. | [rememberviewmodelstorenaventrydecorator.md](./rememberviewmodelstorenaventrydecorator.md) |
| Scene | The unit that renders one or more `NavEntry`s for a given back stack state, identified by its `key` plus its own class. | [scene.md](./scene.md) |
| SceneDecoratorStrategy | Decorates a `Scene` already produced by a `SceneStrategy`, in a second pass run by `NavDisplay`. | [scenedecoratorstrategy.md](./scenedecoratorstrategy.md) |
| SceneStrategy | Determines how a list of back-stack `NavEntry`s should be arranged into a `Scene`. | [scenestrategy.md](./scenestrategy.md) |
| SinglePaneSceneStrategy | The default `SceneStrategy`: always produces a single-entry `Scene` displaying the last back stack entry. | [singlepanescenestrategy.md](./singlepanescenestrategy.md) |
| SupportingPaneSceneStrategy | Material adaptive `SceneStrategy` that lays out a main pane alongside a supporting pane based on `NavEntry.metadata` pane roles. | [supportingpanescenestrategy.md](./supportingpanescenestrategy.md) |
