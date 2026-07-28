# R8 Troubleshooting

Common failure modes when enabling R8 (crashes from removed/renamed reflection or serialization members) and how to recover readable stack traces from obfuscated release builds via `mapping.txt` and the `retrace` tool.

## Signature / Usage

```proguard
# Keep classes accessed via reflection
-keep class com.example.serialization.** { *; }

# Keep java.io.Serializable members
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# Enable accurate stack trace recovery
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
```

```bash
# Retrace an obfuscated stack trace from the command line
$ANDROID_HOME/cmdline-tools/latest/bin/retrace \
  app/build/outputs/mapping/release/mapping.txt \
  trace.txt
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `-dontobfuscate` | directive | — | Disables obfuscation entirely; use temporarily to isolate whether a crash is caused by renaming. |
| `-dontoptimize` | directive | — | Disables all optimizations; troubleshooting only. |
| `--verbose` | retrace flag | off | Prints method parameters and return types in the reconstructed stack trace. |
| `--regex <exp>` | retrace flag | built-in pattern | Custom regex for parsing non-standard stack trace line formats. |

## Notes

- `mapping.txt` is written to `app/build/outputs/mapping/<variant>/mapping.txt` and is automatically bundled with the Android App Bundle for Play Console / Firebase Crashlytics deobfuscation.
- `retrace` ships in the SDK Command-line Tools package (`cmdline-tools/<version>/bin/retrace`), available standalone since command-line tools v4.0 (Android Studio 4.2).
- AGP 8.6+ Logcat automatically retraces crash stack traces in Android Studio without a manual `retrace` invocation.
- The **R8 Configuration Analyzer** (AGP 9.3.0-alpha05+ / R8 9.3.7-dev+) reports which keep rules are overly broad and blocking optimization.
- Reflection- and serialization-based access is the most common source of runtime `ClassNotFoundException` / `NoSuchMethodException` after enabling R8; add targeted `-keep` / `-keepclassmembers` rules rather than disabling shrinking wholesale.
- Avoid reflection-heavy dependencies where possible — they are the primary cause of overly broad keep rules that limit R8 optimization.

## Related

- [proguard-rules.md](./proguard-rules.md)
- [shrink-code.md](./shrink-code.md)
