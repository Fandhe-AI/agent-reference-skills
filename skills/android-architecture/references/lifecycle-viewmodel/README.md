# lifecycle-viewmodel

| Name | Description | Path |
|------|-------------|------|
| ViewModel | Business-logic / screen-level state holder that survives configuration changes. | [viewmodel.md](./viewmodel.md) |
| viewModel() | Compose function to retrieve/create a ViewModel scoped to a ViewModelStoreOwner. | [viewmodel-compose.md](./viewmodel-compose.md) |
| ViewModelProvider.Factory / viewModelFactory | Instantiates ViewModels with constructor dependencies via CreationExtras. | [viewmodelprovider-factory.md](./viewmodelprovider-factory.md) |
| viewModelScope | Built-in CoroutineScope canceled automatically when the ViewModel is cleared. | [viewmodelscope.md](./viewmodelscope.md) |
| AndroidViewModel | ViewModel subclass carrying an Application reference. | [androidviewmodel.md](./androidviewmodel.md) |
| SavedStateHandle | Key-value map surviving process death, passed into ViewModels. | [savedstatehandle.md](./savedstatehandle.md) |
| Lifecycle | Holds the current State and dispatches Event transitions to observers. | [lifecycle.md](./lifecycle.md) |
| LifecycleOwner | Interface for a component that owns a Lifecycle. | [lifecycleowner.md](./lifecycleowner.md) |
| DefaultLifecycleObserver | Callback interface with one method per lifecycle event. | [defaultlifecycleobserver.md](./defaultlifecycleobserver.md) |
| LifecycleEventObserver | Functional interface receiving every Lifecycle.Event via one callback. | [lifecycleeventobserver.md](./lifecycleeventobserver.md) |
| repeatOnLifecycle | Restarts a coroutine block while the Lifecycle is at least at a given state. | [repeatonlifecycle.md](./repeatonlifecycle.md) |
| flowWithLifecycle | Flow operator gating emissions by lifecycle state. | [flowwithlifecycle.md](./flowwithlifecycle.md) |
| collectAsStateWithLifecycle | Compose extension collecting a Flow into State, lifecycle-aware. | [collectasstatewithlifecycle.md](./collectasstatewithlifecycle.md) |
| LocalLifecycleOwner | CompositionLocal exposing the current LifecycleOwner. | [locallifecycleowner.md](./locallifecycleowner.md) |
| LifecycleEventEffect | Composable effect running a one-shot callback on a specific Lifecycle.Event. | [lifecycleeventeffect.md](./lifecycleeventeffect.md) |
| LifecycleStartEffect | Composable effect pairing ON_START body with mandatory ON_STOP/dispose cleanup. | [lifecyclestarteffect.md](./lifecyclestarteffect.md) |
| LifecycleResumeEffect | Composable effect pairing ON_RESUME body with mandatory ON_PAUSE/dispose cleanup. | [lifecycleresumeeffect.md](./lifecycleresumeeffect.md) |
| LiveData | Lifecycle-aware observable data holder. | [livedata.md](./livedata.md) |
| MutableLiveData | LiveData subclass exposing setValue/postValue. | [mutablelivedata.md](./mutablelivedata.md) |
| observeAsState | Compose extension observing a LiveData as State. | [observeasstate.md](./observeasstate.md) |
| ProcessLifecycleOwner | Singleton LifecycleOwner for the whole application process. | [processlifecycleowner.md](./processlifecycleowner.md) |
| SavedStateRegistry | Interface for components to contribute/consume saved state. | [savedstateregistry.md](./savedstateregistry.md) |
