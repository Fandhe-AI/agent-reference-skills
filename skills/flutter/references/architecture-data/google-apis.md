---
source: https://docs.flutter.dev/data-and-backend/google-apis
---

# Google APIs

Use `package:googleapis` from Flutter for APIs that access end-user data via Google authentication (Calendar, Gmail, YouTube, Firebase) in five steps.

## Signature / Usage

Steps: 1. Pick the desired API; 2. Enable the API; 3. Authenticate and determine the current user; 4. Obtain an authenticated HTTP client; 5. Create and use the desired API class.

```dart
// Provides the `YouTubeApi` class.
import 'package:googleapis/youtube/v3.dart';
```

```dart
/// Provides the `GoogleSignIn` class.
import 'package:google_sign_in/google_sign_in.dart';
```

```dart
final GoogleSignIn _googleSignIn = GoogleSignIn.instance;

@override
void initState() {
  super.initState();
  _googleSignIn.initialize();
  // ···
}
```

Listen to authentication events after initialization:

```dart
GoogleSignInAccount? _currentUser;
@override
void initState() {
  super.initState();
  _googleSignIn.initialize().then((_) {
    _googleSignIn.authenticationEvents.listen((event) {
      setState(() {
        _currentUser = switch (event) {
          GoogleSignInAuthenticationEventSignIn() => event.user,
          _ => null,
        };
      });
    });
  });
}
```

Attempt to authenticate a previously signed-in user:

```dart
void initState() {
  super.initState();
  _googleSignIn.initialize().then((_) {
    // ...
    // Attempt to authenticate a previously signed in user.
    _googleSignIn.attemptLightweightAuthentication();
  });
}
```

Request scopes and obtain an authenticated client:

```dart
const relevantScopes = [YouTubeApi.youtubeReadonlyScope];
final authorization = await currentUser.authorizationClient
    .authorizationForScopes(relevantScopes);
```

```dart
import 'package:extension_google_sign_in_as_googleapis_auth/extension_google_sign_in_as_googleapis_auth.dart';
```

```dart
final authenticatedClient = authorization!.authClient(
  scopes: relevantScopes,
);
```

Create the API class and call it:

```dart
final youTubeApi = YouTubeApi(authenticatedClient);

final favorites = await youTubeApi.playlistItems.list(
  ['snippet'],
  playlistId: 'LL', // Liked List
);
```

## Notes

- The only APIs to use directly from a Flutter project are those that access user data using Google authentication. APIs that require service accounts should not be used directly from a Flutter application: that requires shipping service credentials in the app, which is not secure. Create an intermediate service instead.
- Each API is a separate Dart library in `name_version` format (e.g. `youtube_v3`) with one root class ending in `Api` (e.g. `YouTubeApi`). The `Api` class is instantiated in step 5 and exposes the scopes (e.g. `youtubeReadonlyScope`) needed for permissions.
- A Google account and a Google project are required, and the desired API must be enabled (the example enables YouTube Data API v3).
- Sign-in uses the `google_sign_in` package and must be configured for each platform you support. Before interacting with the static `GoogleSignIn.instance`, `initialize` must be called and allowed to complete.
- If the scopes require user interaction, use `authorizeScopes` from an interaction handler instead of `authorizationForScopes`.
- The `authClient` extension comes from `package:extension_google_sign_in_as_googleapis_auth`; its example is a working implementation.
- For Firebase authentication see the "Add a user authentication flow to a Flutter app using FirebaseUI" codelab and "Get Started with Firebase Authentication on Flutter".

## Related

- [Firebase](./firebase.md)
- [Networking](./networking.md)
