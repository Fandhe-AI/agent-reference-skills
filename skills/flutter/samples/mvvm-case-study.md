---
source: https://docs.flutter.dev/app-architecture/case-study/ui-layer
---

# MVVM Case Study (Compass App)

Structure a feature as a View plus a ViewModel that takes repositories by constructor, notifies via `ChangeNotifier`, and is tested with a fake repository.

View model with injected repositories and UI state:

```dart
class HomeViewModel extends ChangeNotifier {
  HomeViewModel({
   required BookingRepository bookingRepository,
   required UserRepository userRepository,
  }) : _bookingRepository = bookingRepository,
      _userRepository = userRepository;
  final BookingRepository _bookingRepository;
  final UserRepository _userRepository;

  User? _user;
  User? get user => _user;

  List<BookingSummary> _bookings = [];
  List<BookingSummary> get bookings => _bookings;

  // ...
}
```

Notify the view after data changes:

```dart
class HomeViewModel extends ChangeNotifier {
  // ...

 Future<Result> _load() async {
    try {
      final userResult = await _userRepository.getUser();
      switch (userResult) {
        case Ok<User>():
          _user = userResult.value;
          _log.fine('Loaded user');
        case Error<User>():
          _log.warning('Failed to load user', userResult.error);
      }

      // ...

      return userResult;
    } finally {
      notifyListeners();
    }
  }
}
```

View that listens to the view model:

```dart
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key, required this.viewModel});

  final HomeViewModel viewModel;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ...
    );
  }
}

// Inside build:
ListenableBuilder(
  listenable: viewModel,
  builder: (context, _) {
    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(),
        SliverList.builder(
          itemCount: viewModel.bookings.length,
          itemBuilder: (_, index) =>
              _Booking(
                key: ValueKey(viewModel.bookings[index].id),
                booking: viewModel.bookings[index],
                onTap: () =>
                    context.push(Routes.bookingWithId(
                        viewModel.bookings[index].id)
                    ),
                onDismissed: (_) =>
                    viewModel.deleteBooking.execute(
                      viewModel.bookings[index].id,
                    ),
              ),
        ),
      ],
    );
  }
)
```

Dependency injection with `package:provider` (from https://docs.flutter.dev/app-architecture/case-study/dependency-injection):

```dart
runApp(
  MultiProvider(
    providers: [
      Provider(create: (context) => AuthApiClient()),
      Provider(create: (context) => ApiClient()),
      Provider(create: (context) => SharedPreferencesService()),
      ChangeNotifierProvider(
        create: (context) => AuthRepositoryRemote(
          authApiClient: context.read(),
          apiClient: context.read(),
          sharedPreferencesService: context.read(),
        ) as AuthRepository,
      ),
      Provider(create: (context) =>
        DestinationRepositoryRemote(
          apiClient: context.read(),
        ) as DestinationRepository,
      ),
      Provider(create: (context) =>
        ContinentRepositoryRemote(
          apiClient: context.read(),
        ) as ContinentRepository,
      ),
      // In the Compass app, additional service and repository providers live here.
    ],
    child: const MainApp(),
  ),
);
```

ViewModel unit test with a fake repository (from https://docs.flutter.dev/app-architecture/case-study/testing):

```dart
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('HomeViewModel tests', () {
    test('Load bookings', () {
      // HomeViewModel._load is called in the constructor of HomeViewModel.
      final viewModel = HomeViewModel(
        bookingRepository: FakeBookingRepository()
          ..createBooking(kBooking),
        userRepository: FakeUserRepository(),
      );

      expect(viewModel.bookings.isNotEmpty, true);
    });
  });
}

class FakeBookingRepository implements BookingRepository {
  List<Booking> bookings = List.empty(growable: true);

  @override
  Future<Result<void>> createBooking(Booking booking) async {
    bookings.add(booking);
    return Result.ok(null);
  }
  // ...
}
```

## Notes

- Excerpts only: `BookingRepository`, `UserRepository`, `Result` / `Ok` / `Error`, `Command0` / `Command1` and the rest are defined in the Compass app (https://github.com/flutter/samples/tree/main/compass_app), not in this page.
- The `import 'package:flutter_test/flutter_test.dart';` line in the test excerpt was added (not in the source snippet) because `group` / `test` / `expect` come from `package:flutter_test`; `kBooking` is a Compass app test fixture.
- Each view has exactly one view model; repositories stay private members of the view model so views cannot reach the data layer. A view is only aware of one view model, a repository can serve many view models, and a service can serve many repositories.
- The guide notes alternatives to `ChangeNotifier` such as `package:riverpod`, `package:flutter_bloc`, and `package:signals`; Flutter teams recommend `package:provider` for dependency injection in this case study.
- This is the Flutter app architecture guide (UI layer / data layer, MVVM, Dart); it parallels but is distinct from Android's architecture guidance (`ViewModel`, `Repository`) covered by the android-architecture skill.
