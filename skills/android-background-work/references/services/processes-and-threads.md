# Processes and threads

Foundational model for where application components — including `Service` — run: by default, every component runs in a single process on a single main (UI) thread.

## Signature / Usage

```xml
<!-- android:process controls which process a component (including a service) runs in -->
<service android:name=".MyService" android:process=":background" />
<application android:process="com.example.myapp" />
```

```kotlin
// Move blocking work off the main thread, then post results back
Thread {
    val bitmap = processBitmap("image.png")
    imageView.post { imageView.setImageBitmap(bitmap) }
}.start()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:process` | manifest attribute | app's default process | Sets the process a component runs in. A leading `:` creates a private process local to the app; omitting it can share a process across apps with the same Linux user ID and signing certificate. |

## Notes

- A `Service` runs on the app's **main thread** by default, exactly like activities — it does **not** get its own thread automatically. Long-running work inside `onCreate()`/`onStartCommand()`/bound methods must be moved to a worker thread (`HandlerThread`, `Thread`, coroutine) or it blocks the UI and can trigger an ANR after ~5 seconds.
- For a bound service, `onBind()` runs on the UI thread, but calls into the returned `IBinder` from remote clients run on a thread pool and must be implemented thread-safe. See [Bound service](./bound-service.md).
- IPC between processes goes through Binder-based remote procedure calls; `bindService()` is the entry point. See [AIDL](./aidl.md) and [Messenger](./messenger.md).

## Related

- [Service](./service.md)
- [Bound service](./bound-service.md)
