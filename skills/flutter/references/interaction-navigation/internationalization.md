---
source: https://docs.flutter.dev/ui/internationalization
---

# Internationalizing Flutter apps

How to internationalize a Flutter app: `flutter_localizations`, generated `AppLocalizations` from `.arb` files via the `gen-l10n` tool and `l10n.yaml`, plurals / selects / number and date formats, locale resolution, and the lower-level `Localizations` / `LocalizationsDelegate` mechanics.

## Signature / Usage

By default, Flutter only provides US English localizations. Add `flutter_localizations` and `intl`:

```console
$ flutter pub add flutter_localizations:"{sdk: flutter}" intl:any
```

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: any
```

Specify `localizationsDelegates` and `supportedLocales`:

```dart
return const MaterialApp(
  title: 'Localizations Sample App',
  localizationsDelegates: GlobalMaterialLocalizations.delegates,
  supportedLocales: [
    Locale('en'), // English
    Locale('es'), // Spanish
  ],
  home: MyHomePage(),
);
```

### Add your own localized messages

1. Add the dependencies (above).
2. Enable the `generate` flag in the `flutter` section of `pubspec.yaml`:

```yaml
# The following section is specific to Flutter.
flutter:
  generate: true # Add this line
```

3. Add `l10n.yaml` to the project root:

```yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
```

4. Add the template `lib/l10n/app_en.arb`:

```json
{
  "helloWorld": "Hello World!",
  "@helloWorld": {
    "description": "The conventional newborn programmer greeting"
  }
}
```

5. Add `app_es.arb` in the same directory:

```json
{
    "helloWorld": "¡Hola Mundo!"
}
```

6. Run `flutter pub get` or `flutter run` (code generation takes place automatically), or run `flutter gen-l10n` to generate the files without running the app.
7. Import `app_localizations.dart` and add `AppLocalizations.delegate`:

```dart
import 'l10n/app_localizations.dart';
```

```dart
return const MaterialApp(
  title: 'Localizations Sample App',
  localizationsDelegates: [
    AppLocalizations.delegate, // Add this line
    ...GlobalMaterialLocalizations.delegates,
  ],
  supportedLocales: [
    Locale('en'), // English
    Locale('es'), // Spanish
  ],
  home: MyHomePage(),
);
```

`AppLocalizations` also provides an auto-generated `supportedLocales` list:

```dart
const MaterialApp(
  title: 'Localizations Sample App',
  localizationsDelegates: [
    AppLocalizations.delegate,
    ...GlobalMaterialLocalizations.delegates,
  ],
  supportedLocales: AppLocalizations.supportedLocales,
);
```

8. Use `AppLocalizations` anywhere in the app:

```dart
appBar: AppBar(
  // The [AppBar] title text should update its message
  // according to the system locale of the target platform.
  // Switching between English and Spanish locales should
  // cause this text to update.
  title: Text(AppLocalizations.of(context)!.helloWorld),
),
```

To localize the device app description, pass the localized string to `MaterialApp.onGenerateTitle`:

```dart
return MaterialApp(
  onGenerateTitle: (context) => DemoLocalizations.of(context).title,
```

### Override the locale

`Localizations.override` is a factory constructor for the `Localizations` widget for the rare situation where a section of your app needs a different locale than the device's:

```dart
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: Text(widget.title)),
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          // Add the following code
          Localizations.override(
            context: context,
            locale: const Locale('es'),
            // Using a Builder to get the correct BuildContext.
            // Alternatively, you can create a new widget and Localizations.override
            // will pass the updated BuildContext to the new widget.
            child: Builder(
              builder: (context) {
                // A toy example for an internationalized Material widget.
                return CalendarDatePicker(
                  initialDate: DateTime.now(),
                  firstDate: DateTime(1900),
                  lastDate: DateTime(2100),
                  onDateChanged: (value) {},
                );
              },
            ),
          ),
        ],
      ),
    ),
  );
}
```

### Placeholders, plurals, and selects

A placeholder (a valid Dart identifier name) becomes a positional parameter in the generated method. Define it in the `placeholders` object in the `.arb` file:

```json
"hello": "Hello {userName}",
"@hello": {
  "description": "A message with a single parameter",
  "placeholders": {
    "userName": {
      "type": "String",
      "example": "Bob"
    }
  }
}
```

```dart
// Examples of internationalized strings.
return Column(
  children: <Widget>[
    // Returns 'Hello John'
    Text(AppLocalizations.of(context)!.hello('John')),
  ],
);
```

Plural syntax (a pluralized message must include a `num` parameter; only `messageOther` is required):

```json
"{countPlaceholder, plural, =0{message0} =1{message1} =2{message2} few{messageFew} many{messageMany} other{messageOther}}"
```

```json
"nWombats": "{count, plural, =0{no wombats} =1{1 wombat} other{{count} wombats}}",
"@nWombats": {
  "description": "A plural message",
  "placeholders": {
    "count": {
      "type": "num",
      "format": "compact"
    }
  }
}
```

```dart
// Examples of internationalized strings.
return Column(
  children: <Widget>[
    ...
    // Returns 'no wombats'
    Text(AppLocalizations.of(context)!.nWombats(0)),
    // Returns '1 wombat'
    Text(AppLocalizations.of(context)!.nWombats(1)),
    // Returns '5 wombats'
    Text(AppLocalizations.of(context)!.nWombats(5)),
  ],
);
```

Select syntax (based on a `String` placeholder, most often used to support gendered languages):

```json
"{selectPlaceholder, select, case{message} ... other{messageOther}}"
```

```json
"pronoun": "{gender, select, male{he} female{she} other{they}}",
"@pronoun": {
  "description": "A gendered message",
  "placeholders": {
    "gender": {
      "type": "String"
    }
  }
}
```

```dart
// Examples of internationalized strings.
return Column(
  children: <Widget>[
    ...
    // Returns 'he'
    Text(AppLocalizations.of(context)!.pronoun('male')),
    // Returns 'she'
    Text(AppLocalizations.of(context)!.pronoun('female')),
    // Returns 'they'
    Text(AppLocalizations.of(context)!.pronoun('other')),
  ],
);
```

#### Escaping syntax

Enable the `use-escaping` flag in `l10n.yaml` to use `{` and `}` as normal characters:

```yaml
use-escaping: true
```

The parser ignores any string wrapped with a pair of single quotes; use two consecutive single quotes for a normal single quote:

```json
{
  "helloWorld": "Hello! '{Isn''t}' this a wonderful day?"
}
```

Resulting string:

```dart
"Hello! {Isn't} this a wonderful day?"
```

### Messages with numbers and currencies

Numbers use the `NumberFormat` class in the `intl` package. `int`, `double`, and `num` types can use these formats (output for 1200000); starred formats offer optional named parameters via the placeholder's `optionalParameters` object.

| Message "format" value | Output for 1200000 |
|------------------------|--------------------|
| `compact` | "1.2M" |
| `compactCurrency`* | "$1.2M" |
| `compactSimpleCurrency`* | "$1.2M" |
| `compactLong` | "1.2 million" |
| `currency`* | "USD1,200,000.00" |
| `decimalPattern` | "1,200,000" |
| `decimalPatternDigits`* | "1,200,000" |
| `decimalPercentPattern`* | "120,000,000%" |
| `percentPattern` | "120,000,000%" |
| `scientificPattern` | "1E6" |
| `simpleCurrency`* | "$1,200,000" |

```json
"numberOfDataPoints": "Number of data points: {value}",
"@numberOfDataPoints": {
  "description": "A message with a formatted int parameter",
  "placeholders": {
    "value": {
      "type": "int",
      "format": "compactCurrency",
      "optionalParameters": {
        "decimalDigits": 2
      }
    }
  }
}
```

### Messages with dates

Placeholder values with type `DateTime` are formatted with `DateFormat` in the `intl` package. There are 41 format variations, identified by the names of their `DateFormat` factory constructors. Here the value is formatted with `DateFormat.yMd`:

```json
"helloWorldOn": "Hello World on {date}",
"@helloWorldOn": {
  "description": "A message with a date parameter",
  "placeholders": {
    "date": {
      "type": "DateTime",
      "format": "yMd"
    }
  }
}
```

In US English the following expression produces "7/9/1959"; in a Russian locale, "9.07.1959":

```dart
AppLocalizations.of(context).helloWorldOn(DateTime.utc(1959, 7, 9))
```

### Localizing for iOS: updating the iOS app bundle

Add the supported languages in the Xcode project so the App Store entry correctly displays them:

1. Open `ios/Runner.xcodeproj`.
2. In the **Project Navigator**, select the `Runner` project file under **Projects**.
3. Select the `Info` tab in the project editor.
4. In the **Localizations** section, click the `Add` button (`+`) to add supported languages and regions; when asked to choose files and reference language, select `Finish`.
5. Xcode automatically creates empty `.strings` files and updates `ios/Runner.xcodeproj/project.pbxproj`; the App Store uses these to determine supported languages and regions.

### Advanced locale definition

Fully differentiating all variants of Chinese requires language code, script code, and country code. To express every variant for `CN`, `TW`, and `HK`:

```dart
supportedLocales: [
  Locale.fromSubtags(languageCode: 'zh'), // generic Chinese 'zh'
  Locale.fromSubtags(
    languageCode: 'zh',
    scriptCode: 'Hans',
  ), // generic simplified Chinese 'zh_Hans'
  Locale.fromSubtags(
    languageCode: 'zh',
    scriptCode: 'Hant',
  ), // generic traditional Chinese 'zh_Hant'
  Locale.fromSubtags(
    languageCode: 'zh',
    scriptCode: 'Hans',
    countryCode: 'CN',
  ), // 'zh_Hans_CN'
  Locale.fromSubtags(
    languageCode: 'zh',
    scriptCode: 'Hant',
    countryCode: 'TW',
  ), // 'zh_Hant_TW'
  Locale.fromSubtags(
    languageCode: 'zh',
    scriptCode: 'Hant',
    countryCode: 'HK',
  ), // 'zh_Hant_HK'
],
```

### Tracking the locale

The `Locale` class identifies the user's language. The `Localizations` widget defines the locale for its child and the localized resources it depends on; `WidgetsApp` creates a `Localizations` widget and rebuilds it if the system locale changes.

```dart
Locale myLocale = Localizations.localeOf(context);
```

### Specifying the app's supportedLocales parameter

`supportedLocales` limits locale changes: the app's `Localizations` widget only follows a device locale change if the new locale is a member of the list. If an exact match isn't found, the first supported locale with a matching `languageCode` is used; if that fails, the first element of `supportedLocales`. To use different resolution, provide a `localeResolutionCallback`, for example to unconditionally accept whatever locale the user selects:

```dart
MaterialApp(
  localeResolutionCallback: (locale, supportedLocales) {
    return locale;
  },
);
```

### Configuring the l10n.yaml file

Run `flutter gen-l10n --help` for the full option list, or use the table:

| Option | Description |
|--------|-------------|
| `arb-dir` | The directory where the template and translated arb files are located. The default is `lib/l10n`. |
| `output-dir` | The directory where the generated localization classes are written. Only relevant to generate the localizations code somewhere else in the project. The app must import the file specified in `output-localization-file` from this directory. Defaults to the directory specified in `arb-dir`. |
| `template-arb-file` | The template arb file used as the basis for generating the Dart localization and messages files. The default is `app_en.arb`. |
| `output-localization-file` | The filename for the output localization and localizations delegate classes. The default is `app_localizations.dart`. |
| `untranslated-messages-file` | The location of a file that describes the localization messages that haven't been translated yet. Creates a JSON file in the format `"locale": ["message_1", "message_2" ... "message_n"]`. If not specified, a summary of untranslated messages is printed on the command line. |
| `output-class` | The Dart class name for the output localization and localizations delegate classes. The default is `AppLocalizations`. |
| `preferred-supported-locales` | The list of preferred supported locales. By default, the supported locales list is generated in alphabetical order. For example, pass `[ en_US ]` to default to American English if a device supports it. |
| `header` | The header (a string) to prepend to the generated Dart localizations files. See also `header-file`. |
| `header-file` | The name of the file containing the header text inserted at the top of each generated Dart file. Place the file in the directory specified in `arb-dir`. See also `header`. |
| `[no-]use-deferred-loading` | Whether to generate the Dart localization file with locales imported as deferred, allowing lazy loading of each locale in Flutter web. Can reduce a web app's initial startup time; for projects with few locales the difference is negligible and might slow startup. Doesn't affect other platforms such as mobile or desktop. |
| `gen-inputs-and-outputs-list` | When specified, generates a JSON file named `gen_l10n_inputs_and_outputs.json` containing the tool's inputs and outputs. The value is the directory where the file is generated; when null, the file isn't generated. |
| `synthetic-package` | Deprecated since Flutter 3.32. Generated files are written into source (the directory specified by `arb-dir`, or `output-dir` if specified), not into a synthetic `package:flutter_gen`. |
| `project-dir` | The path used as the directory of the root Flutter project. When null, the relative path to the present working directory is used. |
| `[no-]required-resource-attributes` | Requires all resource ids to contain a corresponding resource attribute. By default, simple messages won't require metadata (highly recommended); resource attributes are still required for plural messages. |
| `[no-]nullable-getter` | Whether the localizations class getter is nullable. Default true, so `Localizations.of(context)` returns a nullable value for backwards compatibility. If false, a null check is performed on the returned value. |
| `[no-]format` | When specified, runs `dart format` after generating the localization files. |
| `use-escaping` | Whether to enable the use of single quotes as escaping syntax. |
| `[no-]suppress-warnings` | When specified, all warnings are suppressed. |
| `[no-]relax-syntax` | When specified, `{` is treated as a string if not followed by a valid placeholder and `}` is treated as a string if it doesn't close any previous `{` treated as a special character. |
| `[no-]use-named-parameters` | Whether to use named parameters for the generated localization methods. |

### How internationalization in Flutter works

`Localizations` loads and looks up objects holding collections of localized values: apps refer to them with `Localizations.of(context, type)`. When the device locale changes, `Localizations` loads values for the new locale and rebuilds dependent widgets, because it works like an `InheritedWidget`. Values are loaded by the widget's list of `LocalizationsDelegate`s; each delegate must define an asynchronous `load()` method that produces an object encapsulating a collection of localized values. `Localizations` manages a table of objects, one per delegate.

```dart
Localizations.of<MaterialLocalizations>(context, MaterialLocalizations);
```

`MaterialLocalizations` provides a shorthand:

```dart
static MaterialLocalizations of(BuildContext context) {
  return Localizations.of<MaterialLocalizations>(context, MaterialLocalizations);
}

/// References to the localized values defined by MaterialLocalizations
/// are typically written like this:

tooltip: MaterialLocalizations.of(context).backButtonTooltip,
```

#### Defining a class for the app's localized resources (intl based)

```dart
class DemoLocalizations {
  DemoLocalizations(this.localeName);

  static Future<DemoLocalizations> load(Locale locale) {
    final String name =
        locale.countryCode == null || locale.countryCode!.isEmpty
        ? locale.languageCode
        : locale.toString();
    final String localeName = Intl.canonicalizedLocale(name);

    return initializeMessages(localeName).then((_) {
      return DemoLocalizations(localeName);
    });
  }

  static DemoLocalizations of(BuildContext context) {
    return Localizations.of<DemoLocalizations>(context, DemoLocalizations)!;
  }

  final String localeName;

  String get title {
    return Intl.message(
      'Hello World',
      name: 'title',
      desc: 'Title for the Demo application',
      locale: localeName,
    );
  }
}
```

The message catalog providing `initializeMessages()` and the per-locale backing store for `Intl.message()` is produced by an `intl` tool that analyzes source code for classes containing `Intl.message()` calls.

#### Adding support for a new language

An app that needs a language not included in `GlobalMaterialLocalizations` must provide about 70 translations for words or phrases plus the date patterns and symbols for the locale. Define a `GlobalMaterialLocalizations` subclass (here `NnMaterialLocalizations`, Norwegian Nynorsk) and a `LocalizationsDelegate` subclass that serves as its factory (`_NnMaterialLocalizationsDelegate`). The value of `NnMaterialLocalizations.delegate` is all an app needs.

```dart
@override
String get moreButtonTooltip => r'More';

@override
String get aboutListTileTitleRaw => r'About $applicationName';

@override
String get alertDialogLabel => r'Alert';
```

The getters return "raw" Dart strings (`r` prefix) because strings sometimes contain `$` variables, expanded by parameterized localization methods:

```dart
@override
String get pageRowsInfoTitleRaw => r'$firstRow–$lastRow of $rowCount';

@override
String get pageRowsInfoTitleApproximateRaw =>
    r'$firstRow–$lastRow of about $rowCount';
```

```dart
const nnLocaleDatePatterns = {
  'd': 'd.',
  'E': 'ccc',
  'EEEE': 'cccc',
  'LLL': 'LLL',
  // ...
}
```

```dart
const Map<String, Object?> nnDateSymbols = {
  'NAME': 'nn',
  'ERAS': <dynamic>['f.Kr.', 'e.Kr.'],
```

```dart
class _NnMaterialLocalizationsDelegate
    extends LocalizationsDelegate<MaterialLocalizations> {
  const _NnMaterialLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) => locale.languageCode == 'nn';

  @override
  Future<MaterialLocalizations> load(Locale locale) {
    final String localeName = intl.Intl.canonicalizedLocale(locale.toString());

    // The locale (in this case `nn`) needs to be initialized into the custom
    // date symbols and patterns setup that Flutter uses.
    date_symbol_data_custom.initializeDateFormattingCustom(
      locale: localeName,
      patterns: nnLocaleDatePatterns,
      symbols: intl.DateSymbols.deserializeFromMap(nnDateSymbols),
    );

    return SynchronousFuture<MaterialLocalizations>(
      NnMaterialLocalizations(
        localeName: localeName,
        // The `intl` library's NumberFormat class is generated from CLDR data
        // (see https://github.com/dart-lang/i18n/blob/main/pkgs/intl/lib/number_symbols_data.dart).
        // Unfortunately, there is no way to use a locale that isn't defined in
        // this map and the only way to work around this is to use a listed
        // locale's NumberFormat symbols. So, here we use the number formats
        // for 'en_US' instead.
        decimalFormat: intl.NumberFormat('#,##0.###', 'en_US'),
        twoDigitZeroPaddedFormat: intl.NumberFormat('00', 'en_US'),
        // DateFormat here will use the symbols and patterns provided in the
        // `date_symbol_data_custom.initializeDateFormattingCustom` call above.
        // However, an alternative is to simply use a supported locale's
        // DateFormat symbols, similar to NumberFormat above.
        fullYearFormat: intl.DateFormat('y', localeName),
        compactDateFormat: intl.DateFormat('yMd', localeName),
        shortDateFormat: intl.DateFormat('yMMMd', localeName),
        mediumDateFormat: intl.DateFormat('EEE, MMM d', localeName),
        longDateFormat: intl.DateFormat('EEEE, MMMM d, y', localeName),
        yearMonthFormat: intl.DateFormat('MMMM y', localeName),
        shortMonthDayFormat: intl.DateFormat('MMM d'),
      ),
    );
  }

  @override
  bool shouldReload(_NnMaterialLocalizationsDelegate old) => false;
}
```

Add the delegate and language to the app:

```dart
const MaterialApp(
  localizationsDelegates: [
    GlobalWidgetsLocalizations.delegate,
    GlobalMaterialLocalizations.delegate,
    NnMaterialLocalizations.delegate, // Add the newly created delegate
  ],
  supportedLocales: [Locale('en', 'US'), Locale('nn')],
  home: Home(),
),
```

### Alternative internationalization workflows

#### An alternative class for the app's localized resources (no `intl`)

```dart
class DemoLocalizations {
  DemoLocalizations(this.locale);

  final Locale locale;

  static DemoLocalizations of(BuildContext context) {
    return Localizations.of<DemoLocalizations>(context, DemoLocalizations)!;
  }

  static const _localizedValues = <String, Map<String, String>>{
    'en': {'title': 'Hello World'},
    'es': {'title': 'Hola Mundo'},
  };

  static List<String> languages() => _localizedValues.keys.toList();

  String get title {
    return _localizedValues[locale.languageCode]!['title']!;
  }
}
```

Its delegate's `load` returns a `SynchronousFuture` because no asynchronous loading is needed:

```dart
class DemoLocalizationsDelegate
    extends LocalizationsDelegate<DemoLocalizations> {
  const DemoLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) =>
      DemoLocalizations.languages().contains(locale.languageCode);

  @override
  Future<DemoLocalizations> load(Locale locale) {
    // Returning a SynchronousFuture here because an async "load" operation
    // isn't needed to produce an instance of DemoLocalizations.
    return SynchronousFuture<DemoLocalizations>(DemoLocalizations(locale));
  }

  @override
  bool shouldReload(DemoLocalizationsDelegate old) => false;
}
```

#### Using the Dart intl tools

Rebuilding `l10n/messages_all.dart` takes two steps. Generate `l10n/intl_messages.arb` from `lib/main.dart`:

```console
$ dart run intl_translation:extract_to_arb --output-dir=lib/l10n lib/main.dart
```

Then generate `intl_messages_<locale>.dart` for each `intl_<locale>.arb` and `intl_messages_all.dart`:

```console
$ dart run intl_translation:generate_from_arb \
    --output-dir=lib/l10n --no-use-deferred-loading \
    lib/main.dart lib/l10n/intl_*.arb
```

Windows doesn't support file name wildcarding; list the .arb files generated by `extract_to_arb`:

```console
$ dart run intl_translation:generate_from_arb \
    --output-dir=lib/l10n --no-use-deferred-loading \
    lib/main.dart \
    lib/l10n/intl_en.arb lib/l10n/intl_fr.arb lib/l10n/intl_messages.arb
```

## Notes

- Migration (3.32): localized messages are generated into source, not a synthetic `package:flutter_gen`; the `synthetic-package` option is deprecated (see /release/breaking-changes/flutter-generate-i10n-source).
- Flutter projects will soon be encouraged to use the `material_ui` and `cupertino_ui` packages, but `flutter create` hasn't yet been updated to do this by default. To migrate now, run `dart fix --apply --code=migrate_design_widgets`. (Opt-in in Flutter 3.47; see the release category.)
- If your app is based on `CupertinoApp`, use `GlobalCupertinoLocalizations.delegates`. If it is based on `WidgetsApp`, use `flutter_localizations.GlobalWidgetsLocalizations.delegate` (import `package:flutter_localizations/flutter_localizations.dart` as `flutter_localizations`).
- `GlobalMaterialLocalizations.delegate` provides localized strings and other values for the Material Components library; `GlobalWidgetsLocalizations.delegate` defines the default text direction (left-to-right or right-to-left) for `widgets.dart`.
- The full `Locale.fromSubtags` constructor is preferred as it supports `scriptCode`, though the `Locale` default constructor is still fully valid.
- The Material app has to actually be started to initialize `AppLocalizations`; otherwise `AppLocalizations.of(context)!.helloWorld` causes a null exception.
- In the `.arb` files, the key of each entry is the method name of the getter; the value contains the localized message.
- With `select`, comparison between the parameter and the actual value is case-sensitive: `AppLocalizations.of(context)!.pronoun("Male")` defaults to the "other" case and returns "they".
- When using VS Code, the arb-editor extension adds syntax highlighting, snippets, diagnostics, and quick fixes for `.arb` template files.
- If a user's preferred locale isn't specified in `supportedLocales`, Flutter selects the closest match, which likely contains differences to what the user expects. Other languages like French (`fr_FR`, `fr_CA`) should also be fully differentiated.
- The intl number format limitation: `intl` doesn't share the same flexibility for number formatting, so the formatting of an existing locale (here `en_US`) must be used as a substitute in the new-language delegate.
- The `helloWorldOn` expression and the `MaterialLocalizations.of` shorthand are quoted verbatim from the docs and predate null safety: `Localizations.of<T>` returns `T?` and the generated `AppLocalizations.of` is nullable by default (`nullable-getter`), so null-safe code needs `!` (assuming a `Localizations` ancestor) or explicit null handling, e.g. `AppLocalizations.of(context)!.helloWorldOn(...)`; the framework's own `MaterialLocalizations.of` applies `!` after `debugCheckHasMaterialLocalizations`.
- Flutter `flutter_localizations` / `gen-l10n` / ARB (Dart); distinct from JS i18n libraries and from Android `strings.xml` resources and Apple `.strings` / String Catalog localization in the other skills.

## Related

- [Accessibility technologies](./assistive-technologies.md)
