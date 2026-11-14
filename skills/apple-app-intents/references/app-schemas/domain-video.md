---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-video
---

# Video domain

Make your video app's actions available to Apple Intelligence and Siri by adopting schemas for common video playback and watchlist actions.

## Signature / Usage

```swift
@AppIntent(schema: .video.playContent)
struct PlayContentIntent {
    /// Video content to play.
    var content: <#VideoContent#>

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}
```

The `content` parameter uses a `@UnionValue` enumeration (from the `playContent` page; keep the cases your app supports):

```swift
@UnionValue
enum VideoContent {
    case movie(<#MovieEntity#>)
    case tvShow(<#TVShowEntity#>)
    case tvSeason(<#TVSeasonEntity#>)
    case tvEpisode(<#TVEpisodeEntity#>)
    case freeformVideo(<#FreeformVideoEntity#>)
}
```

## Options / Props

| Schema | Kind | Description | Example phrases |
|--------|------|-------------|-----------------|
| `playContent` | Intent (`AppSchema.VideoIntent`) | An intent schema that plays a piece of video content. | "Play Severance." / "Watch the Inter Miami match." |
| `playTrailer` | Intent (`AppSchema.VideoIntent`) | An intent schema that plays a trailer for a piece of supported video content. | "Play the trailer for Silo." / "Watch the Pluribus trailer." |
| `addToWatchList` | Intent (`AppSchema.VideoIntent`) | An intent schema that adds a piece of video content to a person’s watchlist in the TV app. | "Add The Morning Show to my watchlist." / "Put Shrinking in my up next queue." |
| `removeFromWatchList` | Intent (`AppSchema.VideoIntent`) | An intent schema that removes a piece of video content from a person’s watchlist in the TV app. | "Remove Ted Lasso from my watchlist." / "Delete Foundation from my up next queue." |
| `contentCreator` | Entity (`AppSchema.VideoEntity`) | An entity schema for a content creator. | — |
| `freeformVideo` | Entity (`AppSchema.VideoEntity`) | An entity schema for a freeform video. | — |
| `image` | Entity (`AppSchema.VideoEntity`) | An entity schema for a image. | — |
| `movie` | Entity (`AppSchema.VideoEntity`) | An entity schema for a movie. | — |
| `person` | Entity (`AppSchema.VideoEntity`) | An entity schema for a person. | — |
| `tvEpisode` | Entity (`AppSchema.VideoEntity`) | An entity schema for a tv episode. | — |
| `tvSeason` | Entity (`AppSchema.VideoEntity`) | An entity schema for a tv season. | — |
| `tvShow` | Entity (`AppSchema.VideoEntity`) | An entity schema for a tv show. | — |
| `imageType` | Enum (`AppSchema.VideoEnum`) | An enum schema for a image type parameter. | — |
| `personRole` | Enum (`AppSchema.VideoEnum`) | An enum schema for a person role parameter. | — |
| `videoContentType` | Enum (`AppSchema.VideoEnum`) | An enum schema for a video content type parameter. | — |

## Notes

- The `.video` domain: protocols `AppSchema.VideoIntent`, `AppSchema.VideoEntity`, `AppSchema.VideoEnum`. Entities are "Content and parameter types"; enums are "Types for static parameters". Every schema is available to Siri and Shortcuts.
- iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, tvOS 27.3+, visionOS 27.3+ (the video schema pages list no macOS or watchOS). The domain page itself carries no platform metadata.
- Xcode generates a template implementation when you type `video_` and select a schema from the suggestions list.
- Use-case group (video playback): the `playContent` schema and an `IntentValueQuery` that finds video content for playback form a use-case group. Xcode reports a build warning if your app supports one without the other. To integrate with Apple Intelligence and bring the app to Siri AI, adopt both.
- Entity example from the `movie` page (property list as published):

```swift
@AppEntity(schema: .video.movie)
struct MovieEntity {
    // MARK: Static

    static let defaultQuery = MovieEntityQuery()

    // MARK: Properties

    let id: <#Identifiable.ID#>

    var title: String
    var description: String?
    var genres: [String]
    var castAndCrew: [<#VideoPerson#>]
    var images: [<#VideoImage#>]
    var trailers: [URL]
    var contentRatingValue: String?
    var releaseDate: Date?
    var duration: Duration?

    var displayRepresentation: DisplayRepresentation {
        <#DisplayRepresentation#>
    }

    // MARK: Query

    struct MovieEntityQuery: EntityQuery {
        func entities(for identifiers: [MovieEntity.ID]) async throws -> [MovieEntity] {
            <#code#>
        }
    }
}
```

- Enum example from the `personRole` page:

```swift
@AppEnum(schema: .video.personRole)
enum VideoPersonRole: String {
    case actor
    case director
    case producer
    case writer
    case creator
    case executiveProducer
    case other

    static let caseDisplayRepresentations: [Self: DisplayRepresentation] = [
        .actor: "Actor",
        .director: "Director",
        .producer: "Producer",
        .writer: "Writer",
        .creator: "Creator",
        .executiveProducer: "Executive Producer",
        .other: "Other"
    ]
}
```

- Source: https://developer.apple.com/documentation/appintents/app-schema-domain-video, https://developer.apple.com/documentation/appintents/appschema/videointent/playcontent, https://developer.apple.com/documentation/appintents/appschema/videoentity/movie and https://developer.apple.com/documentation/appintents/appschema/videoenum/personrole (fetched 2026-11-14)

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
- [Photos domain](./domain-photos.md)
