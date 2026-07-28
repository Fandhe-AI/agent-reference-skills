# Apartment model (STA / MTA) and WinUI 3

COM/WinRT objects live in either a single-threaded apartment (STA) or a multithreaded apartment (MTA). WinUI 3 / Windows App SDK apps run their UI thread as a standard STA — a different flavor from UWP's Application STA (ASTA).

## Signature / Usage

```csharp
// MainPage.xaml.cs — UWP app (ASTA)
if (this.Dispatcher.HasThreadAccess) { /* on the ASTA UI thread */ }

// MainPage.xaml.cs — WinUI 3 / Windows App SDK app (standard STA)
if (this.DispatcherQueue.HasThreadAccess) { /* on the STA UI thread */ }
```

```cpp
// Out-of-process background task host entry point explicitly chooses MTA
// for a worker process that has no UI.
winrt::init_apartment(winrt::apartment_type::multi_threaded);
```

## Options / Props

| Apartment | Behavior |
|------|-------------|
| STA (single-threaded apartment) | Objects created in an STA execute only on the thread that created them; the apartment allows only one method call to execute at a time. WinUI 3's UI thread is a standard STA. |
| ASTA (Application STA, UWP only) | UWP's UI-thread apartment; a variant of STA that additionally blocks reentrancy, which helps avoid a class of reentrancy bugs and deadlocks that standard STA doesn't guard against. |
| MTA (multithreaded apartment) | Objects execute on any thread in the MTA and can be called from multiple threads concurrently. Used for apartment-agnostic worker/COM-server code, e.g. an out-of-process background task host. |

## Notes

- Applies to WinUI 3 / Windows App SDK apps specifically when migrating threading assumptions from UWP: `Microsoft.UI.Dispatching.DispatcherQueue` runs on a standard STA, not ASTA.
- Because standard STA doesn't provide ASTA's reentrancy safeguards, code that unconsciously relied on UWP's non-reentrant UI thread (e.g. assuming a nested `TryEnqueue`/`RunAsync` callback can't interrupt the current XAML event handler) can behave differently after migrating — watch for reentrancy into XAML controls and unexpected re-entry during `await`.
- A WinUI 3 app's UI-owning thread must remain STA; don't move `Microsoft.UI.Xaml` object creation or manipulation to an MTA thread.
- Stowed-exception crashes (`0xc000027b`) during ASTA→STA migration often need `!pde.dse` in WinDbg to see the real callstack, since the crash frequently isn't the point where the exception is thrown.

## Related

- [CoreDispatcher / CoreApplication migration](./core-dispatcher-migration.md)
- [Deadlock avoidance](./deadlock-avoidance.md)
