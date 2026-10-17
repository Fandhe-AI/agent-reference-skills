---
source: https://docs.flutter.dev/learn/pathway/tutorial/listenable-builder
---

# ChangeNotifier and ListenableBuilder

Hold state in a `ChangeNotifier` view model and rebuild the UI with `ListenableBuilder`, handling loading / error / data with a switch expression.

View model (from https://docs.flutter.dev/learn/pathway/tutorial/change-notifier):

```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  Exception? error;
  bool isLoading = false;

  ArticleViewModel(this.model) {
    fetchArticle();
  }

  Future<void> fetchArticle() async {
    isLoading = true;
    notifyListeners();
    try {
      summary = await model.getRandomArticleSummary();
      error = null; // Clear any previous errors.
    } on HttpException catch (e) {
      error = e;
      summary = null;
    }
    isLoading = false;
    notifyListeners();
  }
}
```

View:

```dart
class ArticleView extends StatefulWidget {
  const ArticleView({super.key});

  @override
  State<ArticleView> createState() => _ArticleViewState();
}

class _ArticleViewState extends State<ArticleView> {
  final ArticleViewModel viewModel = ArticleViewModel(ArticleModel());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Wikipedia Flutter')),
      body: Center(
        child: ListenableBuilder(
          listenable: viewModel,
          builder: (context, _) {
            return switch ((
              viewModel.isLoading,
              viewModel.summary,
              viewModel.error,
            )) {
              (true, _, _) => const CircularProgressIndicator(),
              (_, _, final Exception e) => Text('Error: $e'),
              (_, final summary?, _) => ArticlePage(
                summary: summary,
                nextArticleCallback: viewModel.fetchArticle,
              ),
              _ => const Text('Something went wrong!'),
            };
          },
        ),
      ),
    );
  }
}
```

## Notes

- `ArticleModel`, `Summary`, `ArticlePage` and `ArticleWidget` are tutorial classes defined in other steps of the source; only the view model and view are excerpted here.
- Call `notifyListeners()` after changing state; `ListenableBuilder` rebuilds its `builder` only when the listened `Listenable` notifies.
- Removed the extra viewModel.fetchArticle() call from initState: the source calls it both in the ArticleViewModel constructor and in initState, which starts two concurrent fetches.
- This is the Model / ViewModel / View split of the Flutter architecture guide; see the architecture-data references and the mvvm-case-study sample.
