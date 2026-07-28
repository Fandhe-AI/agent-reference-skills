# navigation3

> This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

| Name | Description | Path |
|------|-------------|------|
| Navigation 3 | Overview of the library, artifacts, and stability status. | [navigation-3.md](./navigation-3.md) |
| NavKey | Marker interface for `@Serializable` navigation destination keys. | [navkey.md](./navkey.md) |
| NavBackStack / rememberNavBackStack | Observable, saveable back stack of `NavKey`s. | [navbackstack.md](./navbackstack.md) |
| NavEntry | Pairs a navigation key with the composable content it represents. | [naventry.md](./naventry.md) |
| entryProvider / entry | DSL for building the key-to-`NavEntry` resolver function. | [entryprovider.md](./entryprovider.md) |
| NavDisplay | Observes the back stack and renders the resolved `Scene`, with animation support. | [navdisplay.md](./navdisplay.md) |
| NavDisplay.TransitionKey / PopTransitionKey / PredictivePopTransitionKey | Per-entry metadata keys overriding `NavDisplay`'s transition animations. | [navdisplay-animation.md](./navdisplay-animation.md) |
| NavEntryDecorator | Wraps every rendered `NavEntry` with shared composable logic. | [naventrydecorator.md](./naventrydecorator.md) |
| rememberSaveableStateHolderNavEntryDecorator | Built-in decorator retaining entry state across config changes/process death. | [remembersaveablestateholdernaventrydecorator.md](./remembersaveablestateholdernaventrydecorator.md) |
| rememberViewModelStoreNavEntryDecorator | Built-in decorator scoping `ViewModel`s to individual `NavEntry`s. | [rememberviewmodelstorenaventrydecorator.md](./rememberviewmodelstorenaventrydecorator.md) |
| Scene | Unit that renders one or more `NavEntry`s as a distinct visual state. | [scene.md](./scene.md) |
| SceneStrategy | Determines how back stack entries are arranged into a `Scene`. | [scenestrategy.md](./scenestrategy.md) |
| SinglePaneSceneStrategy | Default strategy rendering the last back stack entry alone. | [singlepanescenestrategy.md](./singlepanescenestrategy.md) |
| ListDetailSceneStrategy | Material adaptive strategy for list/detail/extra pane layouts. | [listdetailscenestrategy.md](./listdetailscenestrategy.md) |
| SupportingPaneSceneStrategy | Material adaptive strategy for main/supporting/extra pane layouts. | [supportingpanescenestrategy.md](./supportingpanescenestrategy.md) |
