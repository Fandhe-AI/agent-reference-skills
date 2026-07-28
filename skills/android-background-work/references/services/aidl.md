# AIDL (Android Interface Definition Language)

An IDL for defining a programming interface that both a service and its clients agree on for IPC, letting clients from other applications bind to and multithread against a service.

## Signature / Usage

```aidl
// IRemoteService.aidl
package com.example.android;

interface IRemoteService {
    int getPid();
    void basicTypes(int anInt, long aLong, boolean aBoolean, float aFloat,
            double aDouble, String aString);
}
```

```kotlin
// Implement the generated Stub and expose it from onBind()
class RemoteService : Service() {
    private val binder = object : IRemoteService.Stub() {
        override fun getPid(): Int = Process.myPid()
        override fun basicTypes(
            anInt: Int, aLong: Long, aBoolean: Boolean,
            aFloat: Float, aDouble: Double, aString: String,
        ) { /* ... */ }
    }

    override fun onBind(intent: Intent): IBinder = binder
}

// Client
private var mService: IRemoteService? = null
private val mConnection = object : ServiceConnection {
    override fun onServiceConnected(className: ComponentName, service: IBinder) {
        mService = IRemoteService.Stub.asInterface(service)
    }
    override fun onServiceDisconnected(className: ComponentName) {
        mService = null
    }
}
bindService(Intent(this, RemoteService::class.java), mConnection, Context.BIND_AUTO_CREATE)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Supported primitives | `int`, `long`, `char`, `boolean`, `float`, `double` | — | `short` is not supported. |
| Supported collections | `List`, `Map`, `String`, `CharSequence`, arrays | — | `List`/`Map` elements must themselves be supported types; a `List` is received as `ArrayList`, a `Map` as `HashMap`; parameterized generics like `Map<String,Integer>` are not supported. |
| Directional tags | `in`, `out`, `inout` | `in` | Required on non-primitive parameters; primitives/`String`/`IBinder`/AIDL interfaces default to `in` only. |
| `oneway` | keyword | — | Marks a method as non-blocking for remote callers; local calls remain synchronous. |
| `YourInterface.Stub` | generated class | — | Base class to implement on the service side. |
| `YourInterface.Stub.asInterface(IBinder)` | generated static method | — | Converts a raw `IBinder` into the typed interface on the client side. |

## Notes

- Use AIDL only if you need cross-application IPC **and** true multithreaded handling of concurrent calls; otherwise prefer a plain [Bound service](./bound-service.md) `Binder` (same process) or [Messenger](./messenger.md) (cross-process, single-threaded queue).
- Local-process calls execute on the caller's thread; remote-process calls are dispatched from a thread pool and must be implemented thread-safe. Calls from the same remote object arrive in order.
- Parcelable objects can be declared directly in `.aidl` files (API 29+) or implemented manually via `Parcel`/`Parcelable.Creator`.
- After first release, an AIDL interface must remain backward compatible — clients copy the `.aidl` file, and breaking changes break other apps.
- Trap `DeadObjectException` (connection broken) and `SecurityException` (mismatched interface definitions) on remote calls.

## Related

- [Bound service](./bound-service.md)
- [Messenger](./messenger.md)
