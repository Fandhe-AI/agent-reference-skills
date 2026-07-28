# FragmentScenario / launchFragmentInContainer

`FragmentScenario` (from the AndroidX `fragment-testing` library) creates a fragment and drives it through lifecycle states in isolation, without depending on a real hosting activity. `launchFragmentInContainer` launches the fragment attached to an empty activity's root view for UI testing with Espresso; `launchFragment` launches it without a container for non-UI tests.

## Signature / Usage

```kotlin
@RunWith(AndroidJUnit4::class)
class MyTestSuite {
    @Test
    fun testEventFragment() {
        val fragmentArgs = bundleOf("selectedListItem" to 0)
        val scenario = launchFragmentInContainer<EventFragment>(fragmentArgs)

        scenario.onFragment { fragment ->
            fragment.myInstanceMethod()
        }
    }
}
```

```kotlin
val scenario = launchFragmentInContainer<EventFragment>(
    initialState = Lifecycle.State.INITIALIZED
)
scenario.moveToState(Lifecycle.State.RESUMED)
scenario.recreate()
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `fragmentArgs` | `Bundle?` | `null` | Arguments bundle passed to the fragment. |
| `initialState` | `Lifecycle.State` | `RESUMED` | Initial lifecycle state to launch into. |

## Notes

- Gradle: `debugImplementation "androidx.fragment:fragment-testing-manifest:$version"` and `androidTestImplementation "androidx.fragment:fragment-testing:$version"`.
- Dependencies can be injected by passing a trailing lambda that constructs the fragment, e.g. `launchFragmentInContainer { EventFragment(someDependency) }`, optionally backed by a custom `FragmentFactory`.
- `launch()` / `launchInContainer()` accept an additional theme argument to apply a custom theme to the hosting activity.
- `moveToState()` transitions through intermediate states; calling it with the current state is a no-op.
- `onFragment { }` runs a block against the fragment instance safely; don't retain the fragment reference outside the block since it can become stale after recreation.
- For dialog fragments (separate window, not attached to the container) use `launchFragment` instead of `launchFragmentInContainer`.
- Run `FragmentScenario` methods on the instrumentation thread.

## Related

- [ActivityScenario](./activityscenario.md)
- [ActivityScenarioRule](./activityscenariorule.md)
