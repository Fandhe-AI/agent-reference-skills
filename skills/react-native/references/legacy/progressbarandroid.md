---
source: https://reactnative.dev/docs/0.87/progressbarandroid
---

# ProgressBarAndroid

Android-only React component used to indicate that the app is loading or there is some activity in the app.

## Signature / Usage

```tsx
import {ProgressBarAndroid} from 'react-native';

<ProgressBarAndroid indeterminate styleAttr="Horizontal" color="#2196F3" />
<ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} />
```

## Options / Props

Inherits View Props (see `components/view.md`).

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| animating | bool | No | Whether to show the ProgressBar (true, the default) or hide it (false). |
| color | color | No | Color of the progress bar. |
| indeterminate | indeterminateType | No | If the progress bar will show indeterminate progress. Can only be false if styleAttr is Horizontal, and requires a `progress` value. |
| progress | number | No | The progress value (between 0 and 1). |
| styleAttr | enum('Horizontal', 'Normal', 'Small', 'Large', 'Inverse', 'SmallInverse', 'LargeInverse') | No | Style of the ProgressBar. Default is Normal. |
| testID | string | No | Used to locate this view in end-to-end tests. |

## Notes

- Deprecated: "Use one of the community packages instead." (reactnative.directory search: progressbar)
- Android only.
- Core component of React Native; distinct from Jetpack Compose ProgressIndicator (android-compose-components) and SwiftUI/UIKit progress views.

## Related

- [view.md](../components/view.md)
- [activityindicator.md](../components/activityindicator.md)
