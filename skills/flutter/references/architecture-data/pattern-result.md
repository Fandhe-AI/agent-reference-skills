---
source: https://docs.flutter.dev/app-architecture/design-patterns/result
---

# Error handling with Result objects

Wrap function output in a `Result` (`Ok` or `Error`) instead of throwing, so calling components are forced to handle errors.

## Signature / Usage

Full `Result` class as implemented in the Compass App example:

```dart
/// Utility class that simplifies handling errors.
///
/// Return a [Result] from a function to indicate success or failure.
///
/// A [Result] is either an [Ok] with a value of type [T]
/// or an [Error] with an [Exception].
///
/// Use [Result.ok] to create a successful result with a value of type [T].
/// Use [Result.error] to create an error result with an [Exception].
///
/// Evaluate the result using a switch statement:
/// ```dart
/// switch (result) {
///   case Ok(): {
///     print(result.value);
///   }
///   case Error(): {
///     print(result.error);
///   }
/// }
/// ```
sealed class Result<T> {
  const Result();

  /// Creates a successful [Result], completed with the specified [value].
  const factory Result.ok(T value) = Ok._;

  /// Creates an error [Result], completed with the specified [error].
  const factory Result.error(Exception error) = Error._;
}

/// A successful [Result] with a returned [value].
final class Ok<T> extends Result<T> {
  const Ok._(this.value);

  /// The returned value of this result.
  final T value;

  @override
  String toString() => 'Result<$T>.ok($value)';
}

/// An error [Result] with a resulting [error].
final class Error<T> extends Result<T> {
  const Error._(this.error);

  /// The resulting error of this result.
  final Exception error;

  @override
  String toString() => 'Result<$T>.error($error)';
}
```

Returning a `Result` from a service:

```dart
class ApiClientService {
  // ···

  Future<Result<UserProfile>> getUserProfile() async {
    try {
      final request = await client.get(_host, _port, '/user');
      final response = await request.close();
      if (response.statusCode == 200) {
        final stringData = await response.transform(utf8.decoder).join();
        return Result.ok(UserProfile.fromJson(jsonDecode(stringData)));
      } else {
        return const Result.error(HttpException('Invalid response'));
      }
    } on Exception catch (exception) {
      return Result.error(exception);
    } finally {
      client.close();
    }
  }
}
```

Unwrapping in the view model:

```dart
class UserProfileViewModel extends ChangeNotifier {
  // ···

  UserProfile? userProfile;

  Exception? error;

  Future<void> load() async {
    final result = await userProfileRepository.getUserProfile();
    switch (result) {
      case Ok<UserProfile>():
        userProfile = result.value;
      case Error<UserProfile>():
        error = result.error;
    }
    notifyListeners();
  }
}
```

Improved control flow in a repository (fallback without nested try-catch):

```dart
Future<Result<UserProfile>> getUserProfile() async {
  final apiResult = await _apiClientService.getUserProfile();
  if (apiResult is Ok) {
    return apiResult;
  }

  final databaseResult = await _databaseService.createTemporaryUser();
  if (databaseResult is Ok) {
    return databaseResult;
  }

  return Result.error(Exception('Failed to get user profile'));
}
```

## Notes

- Dart exceptions are unchecked: methods that throw don't declare it and callers aren't required to catch. In large projects exceptions can go unhandled and crash the app.
- `Result` is a `sealed` class that is either `Ok` (read `value`) or `Error` (read `error`), so it can be unwrapped with a switch statement/expression.
- Key takeaways: `Result` forces the calling method to check for errors; improves control flow compared to try-catch blocks; being `sealed`, only `Ok` or `Error` instances exist.
- Ready-to-use implementations exist on pub.dev: `result_dart`, `result_type`, `multiple_result`.
- Flutter design pattern (Dart, MVVM) — distinct from the android-architecture skill's guidance.

## Related

- [The command pattern](./pattern-command.md)
- [Persistent storage architecture: SQL](./pattern-sql.md)
- [Guide to app architecture](./architecture-guide.md)
