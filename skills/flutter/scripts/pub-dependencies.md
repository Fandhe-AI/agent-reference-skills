---
source: https://docs.flutter.dev/packages-and-plugins/using-packages
---

# Pub Dependencies

Commands for adding, removing, resolving, and upgrading package dependencies through the `flutter pub` command.

## Add a package

Source: https://docs.flutter.dev/packages-and-plugins/using-packages

```sh
flutter pub add english_words
```

Run from inside the project directory. Platform-specific code in a new package may need a full restart; hot reload and hot restart only update Dart code.

## Add dev dependencies

Source: https://docs.flutter.dev/cookbook/testing/unit/mocking

```sh
flutter pub add http dev:mockito dev:build_runner
```

```sh
flutter pub add dev:test
```

The second command is from https://docs.flutter.dev/cookbook/testing/unit/introduction.

## Add a dependency on the Flutter SDK

Source: https://docs.flutter.dev/testing/integration-tests

```sh
flutter pub add "dev:integration_test:{sdk: flutter}"
```

## Remove a package

Source: https://docs.flutter.dev/packages-and-plugins/using-packages

```sh
flutter pub remove english_words
```

## Fetch dependencies

Source: https://docs.flutter.dev/packages-and-plugins/using-packages

```sh
flutter pub get
```

Run after editing `pubspec.yaml`.

## Upgrade within constraints

Source: https://docs.flutter.dev/install/upgrade

```sh
flutter pub upgrade
```

Updates to the latest compatible versions of all dependencies in `pubspec.yaml`.

## Upgrade to the latest possible versions

Source: https://docs.flutter.dev/install/upgrade

```sh
flutter pub upgrade --major-versions
```

Also updates the constraints in `pubspec.yaml`.

## Find out-of-date dependencies

Source: https://docs.flutter.dev/install/upgrade

```sh
flutter pub outdated
```

## Use the Dart tool to add a package

Source: https://docs.flutter.dev/packages-and-plugins/using-packages

```sh
dart pub add english_words
```

Applies to pure Dart packages.

## Check a package before publishing

Source: https://docs.flutter.dev/packages-and-plugins/developing-packages

```sh
flutter pub publish --dry-run
```

## Publish a package

> **Warning**: Publishing to pub.dev is permanent. Run the dry run first.

Source: https://docs.flutter.dev/packages-and-plugins/developing-packages

```sh
flutter pub publish
```
