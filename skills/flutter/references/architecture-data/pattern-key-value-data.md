---
source: https://docs.flutter.dev/app-architecture/design-patterns/key-value-data
---

# Persistent storage architecture: Key-value data

Integrate on-device key-value persistence into an MVVM Flutter app, using a dark mode preference stored via `shared_preferences`.

## Signature / Usage

Service wrapping the `SharedPreferences` plugin:

```dart
class SharedPreferencesService {
  static const String _kDarkMode = 'darkMode';

  Future<void> setDarkMode(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_kDarkMode, value);
  }

  Future<bool> isDarkMode() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_kDarkMode) ?? false;
  }
}
```

Repository (single source of truth for theming settings) exposing an observable stream:

```dart
class ThemeRepository {
  ThemeRepository(this._service);

  final _darkModeController = StreamController<bool>.broadcast();

  final SharedPreferencesService _service;

  /// Get if dark mode is enabled
  Future<Result<bool>> isDarkMode() async {
    try {
      final value = await _service.isDarkMode();
      return Result.ok(value);
    } on Exception catch (e) {
      return Result.error(e);
    }
  }

  /// Set dark mode
  Future<Result<void>> setDarkMode(bool value) async {
    try {
      await _service.setDarkMode(value);
      _darkModeController.add(value);
      return Result.ok(null);
    } on Exception catch (e) {
      return Result.error(e);
    }
  }

  /// Stream that emits theme config changes.
  /// ViewModels should call [isDarkMode] to get the current theme setting.
  Stream<bool> observeDarkMode() => _darkModeController.stream;
}
```

View model with `load` and `toggle` commands:

```dart
class ThemeSwitchViewModel extends ChangeNotifier {
  ThemeSwitchViewModel(this._themeRepository) {
    load = Command0(_load)..execute();
    toggle = Command0(_toggle);
  }

  final ThemeRepository _themeRepository;

  bool _isDarkMode = false;

  /// If true show dark mode
  bool get isDarkMode => _isDarkMode;

  late final Command0<void> load;

  late final Command0<void> toggle;

  /// Load the current theme setting from the repository
  Future<Result<void>> _load() async {
    final result = await _themeRepository.isDarkMode();
    if (result is Ok<bool>) {
      _isDarkMode = result.value;
    }
    notifyListeners();
    return result;
  }

  /// Toggle the theme setting
  Future<Result<void>> _toggle() async {
    _isDarkMode = !_isDarkMode;
    final result = await _themeRepository.setDarkMode(_isDarkMode);
    notifyListeners();
    return result;
  }
}
```

Wiring the app theme to the repository stream:

```dart
class MainAppViewModel extends ChangeNotifier {
  MainAppViewModel(this._themeRepository) {
    _subscription = _themeRepository.observeDarkMode().listen((isDarkMode) {
      _isDarkMode = isDarkMode;
      notifyListeners();
    });
    _load();
  }

  final ThemeRepository _themeRepository;
  StreamSubscription<bool>? _subscription;

  bool _isDarkMode = false;

  bool get isDarkMode => _isDarkMode;

  Future<void> _load() async {
    final result = await _themeRepository.isDarkMode();
    if (result is Ok<bool>) {
      _isDarkMode = result.value;
    }
    notifyListeners();
  }

  @override
  void dispose() {
    _subscription?.cancel();
    super.dispose();
  }
}
```

```dart
ListenableBuilder(
  listenable: _viewModel,
  builder: (context, child) {
    return MaterialApp(
      theme: _viewModel.isDarkMode ? ThemeData.dark() : ThemeData.light(),
      home: child,
    );
  },
  child: //...
)
```

## Notes

- Presentation layer: `ThemeSwitch` widget (a `StatelessWidget` containing a `Switch`) and `ThemeSwitchViewModel`. Data layer: `ThemeRepository` and `SharedPreferencesService`. `ThemeRepository` and `SharedPreferencesService` are created in `main()` and passed to `MainApp` as constructor dependencies.
- `SharedPreferencesService` hides the third-party dependency from the rest of the application.
- Key-value stores suit simple data such as app configuration. For complex data, use SQL (see the SQL pattern page). The page refers to the "Store key-value data on disk" cookbook recipe for basics.
- The official `_toggle()` flips `_isDarkMode` before saving and does not revert it when `setDarkMode()` returns an error, while `ThemeRepository` only emits on success; in production, commit the new value after `Result.ok` (or revert on error) to keep the switch and `MainAppViewModel` in sync.
- Flutter design pattern (Dart, MVVM) — distinct from the android-architecture skill's guidance.

## Related

- [Persistent storage architecture: SQL](./pattern-sql.md)
- [Choose a database for your Flutter app](./choose-a-database.md)
- [The command pattern](./pattern-command.md)
- [Error handling with Result objects](./pattern-result.md)
