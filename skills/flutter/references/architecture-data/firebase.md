---
source: https://docs.flutter.dev/data-and-backend/firebase
---

# Firebase

Connect a Flutter app to Firebase (Google's managed backend platform) for authentication, Cloud Firestore, Firebase SQL Connect, cloud storage, AI features, and serverless Dart functions. Each service is a separate Firebase Flutter plugin on pub.dev.

## Signature / Usage

Register the app with a Firebase project and generate platform configuration:

```console
$ firebase login
```

```console
$ dart pub global activate flutterfire_cli
```

```console
$ flutter pub add firebase_core
$ flutterfire configure
```

`flutterfire configure` registers the per-platform apps in the Firebase project and generates `lib/firebase_options.dart`. Initialize Firebase in `lib/main.dart` before calling `runApp()`:

```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}
```

Firebase Authentication:

```console
$ flutter pub add firebase_auth
```

```dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasData) {
          return HomeScreen(user: snapshot.data!);
        }
        // Your own sign-in UI.
        return const SignInScreen();
      },
    );
  }
}

Future<UserCredential> signInWithEmail(String email, String password) {
  return FirebaseAuth.instance.signInWithEmailAndPassword(
    email: email,
    password: password,
  );
}
```

Cloud Firestore:

```console
$ flutter pub add cloud_firestore
```

Add a task document to a `tasks` collection and stream live query results into a `ListView`:

```dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

Future<void> addTask(String title) {
  return FirebaseFirestore.instance.collection('tasks').add({
    'title': title,
    'completed': false,
    'createdAt': FieldValue.serverTimestamp(),
  });
}

class TaskList extends StatefulWidget {
  const TaskList({super.key});

  @override
  State<TaskList> createState() => _TaskListState();
}

class _TaskListState extends State<TaskList> {
  // Create the stream once so that it isn't recreated on every rebuild.
  final Stream<QuerySnapshot<Map<String, dynamic>>> _tasksStream =
      FirebaseFirestore.instance
          .collection('tasks')
          .orderBy('createdAt', descending: true)
          .snapshots();

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<QuerySnapshot<Map<String, dynamic>>>(
      stream: _tasksStream,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const Center(child: Text('Something went wrong.'));
        }
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        final docs = snapshot.data!.docs;
        return ListView.builder(
          itemCount: docs.length,
          itemBuilder: (context, index) {
            final data = docs[index].data();
            return ListTile(
              title: Text(data['title'] as String? ?? ''),
            );
          },
        );
      },
    );
  }
}
```

Firebase SQL Connect:

```console
$ flutter pub add firebase_data_connect
```

## Options / Props

| Service | Use case | Package |
| --- | --- | --- |
| Cloud Firestore | NoSQL document database with realtime sync and built-in offline cache | `cloud_firestore` |
| Firebase SQL Connect | Managed PostgreSQL database with generated, type-safe Dart SDKs | `firebase_data_connect` |
| Firebase Authentication | User sign-in with email, phone, and providers like Google or Apple | `firebase_auth` |
| Cloud Storage for Firebase | File uploads and downloads for user photos, videos, and documents | `firebase_storage` |
| Firebase AI Logic | Direct client access to Gemini and Imagen models | `firebase_ai` |
| Cloud Functions for Firebase | Serverless backend logic written in JavaScript, TypeScript, Python, or Dart (experimental) | `cloud_functions` (client), `firebase_functions` (server) |
| Firebase Crashlytics | Realtime crash reporting and diagnostics | `firebase_crashlytics` |

## Notes

- Install the Firebase CLI and sign in with `firebase login` first; detailed platform setup is in "Add Firebase to your Flutter app" (`firebase.google.com/docs/flutter/setup`). The complete plugin list is "Available Firebase Flutter plugins" (`firebase.google.com/docs/flutter/setup#available-plugins`).
- Firebase Authentication supports email and password, phone numbers, anonymous sessions, and federated providers such as Google, Apple, and GitHub.
- Cloud Firestore is the recommended default for a scalable NoSQL database with realtime sync and offline caching (chat apps, collaborative tools, field service apps). Offline persistence is enabled by default on Android and Apple platforms and can be enabled on the web.
- Firebase SQL Connect (formerly Firebase Data Connect) provides a managed PostgreSQL database and a generated type-safe Dart SDK built on `firebase_data_connect`; see the choose-a-database page for comparison.
- Dart support for Cloud Functions for Firebase is experimental: enable the `dartfunctions` experiment in the Firebase CLI before running `firebase init functions`; the APIs might change before a stable release. It uses the `firebase_functions` and `firebase_admin_sdk` packages and lets a single Dart package share data models, JSON serialization, and validation between client and server (see "Sharing code between Flutter apps and Dart backends" on dart.dev).
- Also listed: a blog post on hosting a Flutter app on the web with Firebase, a "Get to know Firebase for Flutter" codelab and video workshop, the FirebaseUI authentication codelab, Firebase AI Logic documentation, and community videos.
- This page covers Firebase from Flutter; backend platforms and ORMs with their own APIs (such as supabase and drizzle) are covered by other skills.
- Source: https://docs.flutter.dev/data-and-backend/firebase (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Choose a database for your Flutter app](./choose-a-database.md)
- [Google APIs](./google-apis.md)
