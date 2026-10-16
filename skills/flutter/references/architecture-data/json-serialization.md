---
source: https://docs.flutter.dev/data-and-backend/serialization/json
---

# JSON and serialization

Ways to use JSON in Flutter: manual serialization with `dart:convert`, or automated code generation with `json_serializable`.

## Signature / Usage

Manual model class (`User.fromJson()` / `toJson()`):

```dart
class User {
  final String name;
  final String email;

  User(this.name, this.email);

  User.fromJson(Map<String, dynamic> json)
    : name = json['name'] as String,
      email = json['email'] as String;

  Map<String, dynamic> toJson() => {'name': name, 'email': email};
}
```

```dart
final userMap = jsonDecode(jsonString) as Map<String, dynamic>;
final user = User.fromJson(userMap);

print('Howdy, ${user.name}!');
print('We sent the verification link to ${user.email}.');
```

```dart
String json = jsonEncode(user);
```

`json_serializable` setup and model:

```console
$ flutter pub add json_annotation dev:build_runner dev:json_serializable
```

```dart
import 'package:json_annotation/json_annotation.dart';

/// This allows the `User` class to access private members in
/// the generated file. The value for this is *.g.dart, where
/// the star denotes the source file name.
part 'user.g.dart';

/// An annotation for the code generator to know that this class needs the
/// JSON serialization logic to be generated.
@JsonSerializable()
class User {
  User(this.name, this.email);

  String name;
  String email;

  /// A necessary factory constructor for creating a new User instance
  /// from a map. Pass the map to the generated `_$UserFromJson()` constructor.
  /// The constructor is named after the source class, in this case, User.
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  /// `toJson` is the convention for a class to declare support for serialization
  /// to JSON. The implementation simply calls the private, generated
  /// helper method `_$UserToJson`.
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

Run the generator:

```console
dart run build_runner build --delete-conflicting-outputs
dart run build_runner watch --delete-conflicting-outputs
```

`@JsonKey` customizations:

```dart
/// Tell json_serializable that "registration_date_millis" should be
/// mapped to this property.
@JsonKey(name: 'registration_date_millis')
final int registrationDateMillis;

/// Tell json_serializable to use "defaultValue" if the JSON doesn't
/// contain this key or if the value is `null`.
@JsonKey(defaultValue: false)
final bool isAdult;

/// When `true` tell json_serializable that JSON must contain the key,
/// If the key doesn't exist, an exception is thrown.
@JsonKey(required: true)
final String id;

/// When `true` tell json_serializable that generated code should
/// ignore this field completely.
@JsonKey(ignore: true)
final String verificationCode;
```

Nested classes need `explicitToJson: true`:

```dart
@JsonSerializable(explicitToJson: true)
class User {
  User(this.name, this.address);

  String name;
  Address address;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

## Notes

- Two strategies: manual serialization (built-in `dart:convert`, no dependencies; good for small proofs of concept but `jsonDecode()` returns `dynamic`, so typos surface at runtime) and code generation (`json_serializable`, `built_value`; scales to medium and large projects and catches typos at compile time, but needs initial setup and produces generated files).
- `json_serializable` makes regular classes serializable via annotations; `built_value` provides a higher-level way of defining immutable value classes that can also be serialized. Both are Flutter Favorite packages.
- `@JsonSerializable(fieldRename: FieldRename.snake)` is equivalent to adding `@JsonKey(name: '<snake_case>')` to each field.
- The first time, errors like `Target of URI hasn't been generated: 'user.g.dart'.` are expected until the generator runs. It is safe to start the watcher once and leave it running.
- Without `explicitToJson: true`, a nested object is printed as `Instance of 'address'` instead of its JSON map.
- There is no GSON/Jackson/Moshi equivalent: such a library would require runtime reflection, which is disabled in Flutter because it interferes with tree shaking and app size optimization. Code-generation libraries give similarly easy APIs.
- For parsing a large JSON file without blocking the UI, the cookbook has a background-parsing example using an isolate.

## Related

- [Networking](./networking.md)
- [Google APIs](./google-apis.md)
