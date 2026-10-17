---
source: https://docs.flutter.dev/app-architecture/design-patterns/offline-first
---

# Offline-first support

Implement offline-first reading, writing, and synchronization in a repository that combines a remote API service and a local database service.

## Signature / Usage

Reading with a `Stream` that emits local data first, then server data:

```dart
Stream<UserProfile> getUserProfile() async* {
  // Fetch the user profile from the database
  final userProfile = await _databaseService.fetchUserProfile();
  // Returns the database result if it exists
  if (userProfile != null) {
    yield userProfile;
  }

  // Fetch the user profile from the API
  try {
    final apiUserProfile = await _apiClientService.getUserProfile();
    //Update the database with the API result
    await _databaseService.updateUserProfile(apiUserProfile);
    // Return the API result
    yield apiUserProfile;
  } catch (e) {
    // Handle the error
  }
}
```

Consuming the stream in the view model:

```dart
Future<void> load() async {
  await _userProfileRepository
      .getUserProfile()
      .listen(
        (userProfile) {
          _userProfile = userProfile;
          notifyListeners();
        },
        onError: (error) {
          // handle error
        },
      )
      .asFuture<void>();
}
```

Local data as a fallback (non-stream variant):

```dart
Future<UserProfile> getUserProfile() async {
  try {
    // Fetch the user profile from the API
    final apiUserProfile = await _apiClientService.getUserProfile();
    //Update the database with the API result
    await _databaseService.updateUserProfile(apiUserProfile);

    return apiUserProfile;
  } catch (e) {
    // If the network call failed,
    // fetch the user profile from the database
    final databaseUserProfile = await _databaseService.fetchUserProfile();

    // If the user profile was never fetched from the API
    // it will be null, so throw an  error
    if (databaseUserProfile != null) {
      return databaseUserProfile;
    } else {
      // Handle the error
      throw Exception('User profile not found');
    }
  }
}
```

Writing data, online-only (API first, then database):

```dart
Future<void> updateUserProfile(UserProfile userProfile) async {
  try {
    // Update the API with the user profile
    await _apiClientService.putUserProfile(userProfile);

    // Only if the API call was successful
    // update the database with the user profile
    await _databaseService.updateUserProfile(userProfile);
  } catch (e) {
    // Handle the error
  }
}
```

Writing data, offline-first (database first, then API):

```dart
Future<void> updateUserProfile(UserProfile userProfile) async {
  // Update the database with the user profile
  await _databaseService.updateUserProfile(userProfile);

  try {
    // Update the API with the user profile
    await _apiClientService.putUserProfile(userProfile);
  } catch (e) {
    // Handle the error
  }
}
```

Synchronization: periodic `Timer`, `sync()` method, and `synchronized` flag on the data class:

```dart
Timer.periodic(const Duration(minutes: 5), (timer) => sync());
```

```dart
Future<void> sync() async {
  try {
    // Fetch the user profile from the database
    final userProfile = await _databaseService.fetchUserProfile();

    // Check if the user profile requires synchronization
    if (userProfile == null || userProfile.synchronized) {
      return;
    }

    // Update the API with the user profile
    await _apiClientService.putUserProfile(userProfile);

    // Set the user profile as synchronized
    await _databaseService.updateUserProfile(
      userProfile.copyWith(synchronized: true),
    );
  } catch (e) {
    // Try again later
  }
}
```

```dart
@freezed
abstract class UserProfile with _$UserProfile {
  const factory UserProfile({
    required String name,
    required String photoUrl,
    @Default(false) bool synchronized,
  }) = _UserProfile;
}
```

## Notes

- Repositories act as the single source of truth and combine local and remote data sources behind a single access point, independent of connectivity. The example uses `ApiClientService` (HTTP REST) and `DatabaseService` (SQL), a `UserProfile` data class created with the `freezed` package, and a `UserProfileViewModel`.
- For complex data you might use separate classes: `UserProfileLocal` (database entity), `UserProfileRemote` (API response) and `UserProfile` (UI model); the repository converts between them.
- Read approaches: local fallback; `Stream` (best case emits two values, local then server; emits one if the database has no cached data); only local data (requires preloading and a sync mechanism, e.g. a weather app updated once a day; sync can be a pull-to-refresh, a `Timer`, or a background process).
- Write approaches: online-only (offline-first features then only apply to reads) vs offline-first (if the network call fails the database and API are out of sync, so synchronization is needed).
- Synchronization options: `Timer` in the repository; background processes such as the `workmanager` plugin (running background operations continuously can drain the battery dramatically and some devices limit background processing); only sync when the network is available (`connectivity_plus`) and battery is not low (`battery_plus`); push from the server, e.g. Firebase messaging background messages. The two approaches can be combined.
- The sample `sync()` is illustrative: overlapping `Timer.periodic` runs, or a profile update between the fetch and `updateUserProfile(... synchronized: true)`, can race and mark unsent changes as synchronized; guard against re-entrancy (e.g. an in-progress flag) and compare versions before setting the flag in production.
- Flutter design pattern (Dart, MVVM) — distinct from the android-architecture skill's guidance. Local database and Firebase choices are covered in the choose-a-database and firebase pages; database engine APIs belong to other skills such as supabase or drizzle.

## Related

- [Persistent storage architecture: SQL](./pattern-sql.md)
- [Optimistic state](./pattern-optimistic-state.md)
- [Choose a database for your Flutter app](./choose-a-database.md)
