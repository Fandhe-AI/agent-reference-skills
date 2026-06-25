# AVQueuePlayer

A subclass of `AVPlayer` that plays a sequence of player items in order.

## Signature / Usage

```swift
class AVQueuePlayer: AVPlayer

// Create with an initial queue
let items = urls.map { AVPlayerItem(url: $0) }
let player = AVQueuePlayer(items: items)
player.play()

// Append an item to the end of the queue
let nextItem = AVPlayerItem(url: nextURL)
if player.canInsert(nextItem, after: nil) {
    player.insert(nextItem, after: nil)  // nil = append to end
}

// Skip to next item
player.advanceToNextItem()
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `init(items:)` | `init(items: [AVPlayerItem])` | Creates a player preloaded with an ordered queue |
| `items()` | `() -> [AVPlayerItem]` | Returns the current queue as an array |
| `advanceToNextItem()` | `()` | Ends current item and starts the next |
| `canInsert(_:after:)` | `(AVPlayerItem, after: AVPlayerItem?) -> Bool` | Checks if an item can be inserted; `nil` means end of queue |
| `insert(_:after:)` | `(AVPlayerItem, after: AVPlayerItem?)` | Inserts an item after a given item (`nil` appends) |
| `remove(_:)` | `(AVPlayerItem)` | Removes a specific item from the queue |
| `removeAllItems()` | `()` | Clears the entire queue |

## Notes

- iOS 4.1+, iPadOS 4.1+, macOS 10.7+, tvOS 9.0+, visionOS 1.0+, watchOS 1.0+
- Inherits all `AVPlayer` properties and methods.
- An item must not already be enqueued elsewhere; check `canInsert(_:after:)` before inserting.
- When the queue is exhausted, playback stops; set `actionAtItemEnd` on the player if needed.

## Related

- [AVPlayer](./avplayer.md)
- [AVPlayerItem](./avplayeritem.md)
