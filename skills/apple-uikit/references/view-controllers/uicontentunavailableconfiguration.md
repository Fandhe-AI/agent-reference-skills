# UIContentUnavailableConfiguration

A composable description of a view that indicates your app can't display content, with system default styling for common empty states.

## Signature / Usage

```swift
struct UIContentUnavailableConfiguration
```

```swift
var contentUnavailableConfiguration: UIContentUnavailableConfiguration? {
    var config = UIContentUnavailableConfiguration.search()
    config.text = "No Results"
    config.secondaryText = "Check the spelling or try a new search."
    return config
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `image` | `UIImage?` | The image to display |
| `text` | `String?` | The primary text to display |
| `attributedText` | `NSAttributedString?` | An attributed variant of the primary text |
| `secondaryText` | `String?` | The secondary text to display |
| `secondaryAttributedText` | `NSAttributedString?` | An attributed variant of the secondary text |
| `alignment` | `UIContentUnavailableConfiguration.Alignment` | The alignment of the image, text, and buttons |
| `background` | `UIBackgroundConfiguration` | The configuration for the background |
| `directionalLayoutMargins` | `NSDirectionalEdgeInsets` | The margins between the content and edges |
| `axesPreservingSuperviewLayoutMargins` | `UIAxis` | Which margins use inherited layout margins |
| `button` | `UIButton.Configuration` | The primary button configuration |
| `buttonProperties` | `UIContentUnavailableConfiguration.ButtonProperties` | Additional primary button configuration |
| `secondaryButton` | `UIButton.Configuration` | The secondary button configuration |
| `secondaryButtonProperties` | `UIContentUnavailableConfiguration.ButtonProperties` | Additional secondary button configuration |
| `imageToTextPadding` | `CGFloat` | Padding between image and text |
| `textToButtonPadding` | `CGFloat` | Padding between text and buttons |
| `textToSecondaryTextPadding` | `CGFloat` | Padding between primary and secondary text |
| `buttonToSecondaryButtonPadding` | `CGFloat` | Padding between primary and secondary buttons |

## Type Methods

```swift
static func empty() -> UIContentUnavailableConfiguration
// Default configuration for unavailable content

static func loading() -> UIContentUnavailableConfiguration
// Default configuration for content that's loading

static func search() -> UIContentUnavailableConfiguration
// Default configuration for searches that return no results
```

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, tvOS 17.0+, visionOS
- Assign to a view controller's `contentUnavailableConfiguration` property, or to a `UIContentUnavailableView`, to render the empty state.
- Conforms to `UIContentConfiguration`, `Equatable`, `Hashable`.
- `UIContentUnavailableConfigurationState` encapsulates the state used to resolve the configuration.

## Related

- [UIViewController](./uiviewcontroller.md)
