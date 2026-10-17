---
source: https://docs.flutter.dev/reference/create-new-app
---

# Create a new Flutter app

Step-by-step instructions to bootstrap a new Flutter app from VS Code, Android Studio, IntelliJ, Antigravity, or the terminal. First install and set up Flutter, then choose your preferred environment.

## Signature / Usage

```console
$ flutter create --empty my_app
$ cd my_app
$ flutter run
```

`--empty` creates an app with a minimal `main.dart` file; the project name (the only non-option argument) sets the directory and default app name. Run `flutter create --help` to learn about the available creation options.

## Steps by environment

| Environment | Steps |
| --- | --- |
| VS Code (and other Code OSS-based editors) | Install Flutter and set up VS Code. Open the command palette (**View > Command Palette** or Cmd/Ctrl + Shift + P), type `flutter:`, select **Flutter: New Project**. Choose the **Application** template, select the parent directory (don't create the project folder itself), enter a name, wait for `flutter create` to finish, then run and debug. |
| Android Studio | Install Flutter and set up Android Studio (Dart and Flutter plugins). On the welcome dialog click **New Flutter Project**, or **File > New > New Flutter Project...**. Under **Generators** select **Flutter**, verify the **Flutter SDK path**, click **Next**, set **Project name** and (for apps you might publish) **Organization**, then **Create**. |
| IntelliJ (and other JetBrains IDEs) | Install Flutter and set up IntelliJ with the Dart and Flutter plugins. **New Project** (or **File > New > New Project...**), select **Flutter** under **Generators**, verify the **Flutter SDK path**, configure **Project name** / **Project type** / **Organization**, then **Create**. |
| Antigravity | Install and set up Antigravity as described in Get started with AI. Create a sandboxed workspace in the Agent Manager, write a detailed prompt (for example "Create a new Flutter project named my_app. Add a home screen with a list of items and a floating action button"), review and approve the plan, and authorize terminal commands such as `flutter pub add` or `flutter create`. |
| Terminal | Install and set up Flutter. Go to the desired parent directory (don't create the project folder; the `flutter` tool does), run `flutter create <name>` with any flags, `cd` into the project, then `flutter run` and respond to the prompt to select an output device. |

## Notes

- The official page shows `flutter create --empty` and the project name in separate steps; they are combined here into one runnable command (`flutter create` requires the output directory argument).
- Name the app using the `lowercase_with_underscores` convention, following the Effective Dart guidelines.
- To create a Flutter module to embed in an existing app, use the Add to app flow instead.
- Antigravity: the agent asks for permission before running terminal commands or accessing the browser/emulator. The agent here is Antigravity's coding agent, unrelated to Claude Code Agent Skills.

## Related

- [flutter: The Flutter command-line tool](./flutter-cli.md)
- [Flutter SDK overview](./sdk.md)
- [Hot reload](./hot-reload.md)
