---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-samples.html
---

# Kotlin Multiplatform samples

Link table of the official JetBrains sample projects from the Kotlin Multiplatform samples page (open the repositories for source).

```sh
git clone https://github.com/JetBrains/kotlinconf-app.git
```

| Name | Repository | What's shared | User interface |
| --- | --- | --- | --- |
| Official KotlinConf application | https://github.com/JetBrains/kotlinconf-app | UI, model, networking, data storage | Jetpack Compose on Android; Compose Multiplatform on iOS, desktop, web |
| Image Viewer | https://github.com/JetBrains/compose-multiplatform/tree/master/examples/imageviewer | UI, model, networking, animation, data storage | Jetpack Compose on Android; Compose Multiplatform on iOS, desktop, web |
| Chat | https://github.com/JetBrains/compose-multiplatform/tree/master/examples/chat | UI, model, networking (embeds Compose Multiplatform components in a SwiftUI interface) | Jetpack Compose on Android; Compose Multiplatform on iOS, desktop, web; SwiftUI on iOS |
| Jetcaster Multiplatform | https://github.com/kotlin-hands-on/jetcaster-kmp-migration | Model, networking, UI, data storage | Compose Multiplatform on Android, iOS, desktop |
| KMM RSS Reader | https://github.com/Kotlin/kmm-production-sample | Model, networking, UI state, data storage | Jetpack Compose on Android; SwiftUI on iOS; Compose Multiplatform on iOS and desktop (experimental branch) |
| Kotlin Multiplatform Sample | https://github.com/Kotlin/kmm-basic-sample | Algorithms (expected and actual declarations) | Jetpack Compose on Android; SwiftUI |

Recommended and community samples listed on the same page:

| Name | Repository |
| --- | --- |
| Confetti | https://github.com/joreilly/Confetti |
| People In Space | https://github.com/joreilly/PeopleInSpace |
| Sessionize / Droidcon | https://github.com/touchlab/DroidconKotlin |
| KaMPKit | https://github.com/touchlab/KaMPKit |
| NYTimes KMP | https://github.com/xxfast/NYTimes-KMP |
| Focus Bloom | https://github.com/JoelKanyi/FocusBloom |
| Recipe App | https://github.com/SEAbdulbasit/recipe-app |
| D-KMP-sample | https://github.com/dbaroncelli/D-KMP-sample |
| Notflix | https://github.com/VictorKabata/Notflix |
| Twine - RSS Reader | https://github.com/msasikanth/twine |
| Shopping By KMP | https://github.com/razaghimahdi/Shopping-By-KMP |
| Music App KMP | https://github.com/SEAbdulbasit/MusicApp-KMP |
| Rijksmuseum | https://github.com/fethij/Rijksmuseum |

## Notes

- The page states it is not accepting contributions; the GitHub topics `kotlin-multiplatform-sample` and `kotlin-multiplatform` list more projects. For a brand new project, the page recommends the web wizard at `https://kmp.jetbrains.com`.
- Some Recommended / community samples need API keys (NYTimes, The Movie Database) or a Firebase account to run.
