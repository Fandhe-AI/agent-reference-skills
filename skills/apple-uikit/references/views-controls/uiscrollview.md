# UIScrollView

A view that allows scrolling and zooming of its contained views.

## Signature / Usage

```swift
@MainActor
class UIScrollView : UIView

let scrollView = UIScrollView()
scrollView.contentSize = CGSize(width: 1000, height: 1000)
scrollView.isPagingEnabled = false
scrollView.showsVerticalScrollIndicator = true
scrollView.delegate = self
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `contentOffset` | `CGPoint` | Current scroll position (top-left of visible area) |
| `contentSize` | `CGSize` | Total scrollable area size |
| `contentInset` | `UIEdgeInsets` | Additional inset around the content |
| `adjustedContentInset` | `UIEdgeInsets` | Effective inset including safe area |
| `isScrollEnabled` | `Bool` | Enables or disables scrolling |
| `isPagingEnabled` | `Bool` | Snaps scroll to multiples of the view's bounds |
| `isDirectionalLockEnabled` | `Bool` | Restricts scrolling to one axis at a time |
| `bounces` | `Bool` | Bounces at content edges |
| `alwaysBounceVertical` | `Bool` | Always bounces vertically even if content fits |
| `alwaysBounceHorizontal` | `Bool` | Always bounces horizontally even if content fits |
| `decelerationRate` | `UIScrollView.DecelerationRate` | Scroll deceleration speed (`.normal`, `.fast`) |
| `scrollsToTop` | `Bool` | Status bar tap scrolls to top |
| `showsHorizontalScrollIndicator` | `Bool` | Shows horizontal scroll indicator |
| `showsVerticalScrollIndicator` | `Bool` | Shows vertical scroll indicator |
| `indicatorStyle` | `UIScrollView.IndicatorStyle` | Scroll indicator appearance |
| `zoomScale` | `CGFloat` | Current zoom level |
| `minimumZoomScale` | `CGFloat` | Minimum allowed zoom |
| `maximumZoomScale` | `CGFloat` | Maximum allowed zoom |
| `bouncesZoom` | `Bool` | Allows temporary zoom beyond limits |
| `delegate` | `UIScrollViewDelegate?` | Receives scroll and zoom callbacks |

**Key delegate methods (`UIScrollViewDelegate`):**

| Method | Description |
|--------|-------------|
| `scrollViewDidScroll(_:)` | Called on every scroll offset change |
| `scrollViewDidEndDecelerating(_:)` | Called when scrolling comes to rest |
| `viewForZooming(in:)` | Returns the view to zoom; required for zoom support |
| `scrollViewDidEndZooming(_:with:atScale:)` | Called after zoom gesture ends |

**Programmatic scrolling:**

```swift
scrollView.setContentOffset(CGPoint(x: 0, y: 200), animated: true)
scrollView.scrollRectToVisible(rect, animated: true)
```

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- Superclass of `UITableView`, `UICollectionView`, and `UITextView`.
- For zoom to work: implement `viewForZooming(in:)` and set `minimumZoomScale != maximumZoomScale`.
- Assign `restorationIdentifier` to preserve `contentOffset`, `contentInset`, and `zoomScale` across launches.

## Related

- [UIView](./uiview.md)
- [UIStackView](./uistackview.md)
- [UITextView](./uitextview.md)
