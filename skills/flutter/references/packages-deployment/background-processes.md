---
source: https://docs.flutter.dev/packages-and-plugins/background-processes
---

# Background processes

Where to find more information on implementing background processes in Flutter: executing Dart code in the background, even if the app isn't the currently active app.

## Signature / Usage

The source page contains no code. The referenced article and plugin are:

```text
Executing Dart in the Background with Flutter Plugins and Geofencing  (Flutter blog, Ben Konyi)
WorkManager plugin: https://pub.dev/packages/workmanager
```

## Notes

- The mechanism involves setting up an isolate. Isolates are Dart's model for multithreading, but an isolate doesn't share memory with the main program. Set up the isolate for background execution using callbacks and a callback dispatcher.
- The WorkManager plugin enables persistent background processing that keeps tasks scheduled through app restarts and system reboots.
- The blog post includes a geofencing example using background execution of Dart code, with links to example code and relevant documentation for Dart, iOS, and Android.
- This is Flutter/Dart isolate-based background execution; Android WorkManager/Services APIs themselves are covered by the android-background-work skill.

## Related

- [Using packages](./using-packages.md)
