---
source: https://reactnative.dev/docs/0.87/legacy/native-components-ios
---

# iOS Native UI Components

Legacy Architecture guide: expose a native iOS view (`MKMapView` example) to JavaScript with an `RCTViewManager` subclass, `RCT_EXPORT_VIEW_PROPERTY`, `RCT_CUSTOM_VIEW_PROPERTY`, and `requireNativeComponent`.

## Signature / Usage

Subclass `RCTViewManager`, add the `RCT_EXPORT_MODULE()` marker, and implement `-(UIView *)view`:

```objectivec
// RNTMapManager.m
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap)

- (UIView *)view
{
  return [[MKMapView alloc] init];
}

@end
```

```tsx
// MapView.tsx
import {requireNativeComponent} from 'react-native';

export default requireNativeComponent('RNTMap');
```

`requireNativeComponent` resolves `RNTMap` to `RNTMapManager`.

### Properties

```objectivec
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
```

```objectivec
RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}
```

In a custom property body, `json` is the raw value from JS, `view` is the manager's view instance, and `defaultView` resets the property when JS sends a null sentinel. A conversion category on `RCTConvert`:

```objectivec
// RCTConvert+Mapkit.h
@interface RCTConvert (Mapkit)

+ (MKCoordinateSpan)MKCoordinateSpan:(id)json;
+ (MKCoordinateRegion)MKCoordinateRegion:(id)json;

@end
```

Typed JS wrapper:

```tsx
export default function MapView(props: {
  region?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  zoomEnabled?: boolean;
}) {
  return <RNTMap {...props} />;
}
```

### Events

Subclass the native view and add an event block property (names must begin with `on`):

```objectivec
// RNTMapView.h
#import <MapKit/MapKit.h>
#import <React/RCTComponent.h>

@interface RNTMapView: MKMapView

@property (nonatomic, copy) RCTBubblingEventBlock onRegionChange;

@end
```

Make the manager the view's delegate and call the block:

```objectivec
RCT_EXPORT_VIEW_PROPERTY(onRegionChange, RCTBubblingEventBlock)

- (UIView *)view
{
  RNTMapView *map = [RNTMapView new];
  map.delegate = self;
  return map;
}

- (void)mapView:(RNTMapView *)mapView regionDidChangeAnimated:(BOOL)animated
{
  if (!mapView.onRegionChange) {
    return;
  }

  MKCoordinateRegion region = mapView.region;
  mapView.onRegionChange(@{
    @"region": @{
      @"latitude": @(region.center.latitude),
      @"longitude": @(region.center.longitude),
      @"latitudeDelta": @(region.span.latitudeDelta),
      @"longitudeDelta": @(region.span.longitudeDelta),
    }
  });
}
```

### Multiple native views

Use refs and `UIManager.dispatchViewManagerCommand` so a command targets one specific instance:

```tsx
class MyNativeView extends React.Component {
  callNativeMethod = () => {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.getViewManagerConfig('RNCMyNativeView').Commands
        .callNativeMethod,
      [],
    );
  };
  // ...
}
```

```objectivec
RCT_EXPORT_METHOD(callNativeMethod:(nonnull NSNumber*) reactTag) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        NativeView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[NativeView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        [view callNativeMethod];
    }];
}
```

### Styles

Native views are `UIView` subclasses, so most style attributes work. For fixed-size components such as `UIDatePicker`, wrap the native component in a flexible outer `View` and size the inner one with constants exported from native:

```objectivec
- (NSDictionary *)constantsToExport
{
  UIDatePicker *dp = [[UIDatePicker alloc] init];
  [dp layoutIfNeeded];

  return @{
    @"ComponentHeight": @(CGRectGetHeight(dp.frame)),
    @"ComponentWidth": @(CGRectGetWidth(dp.frame)),
  };
}
```

## Notes

- Deprecation notice (verbatim): "Native Module and Native Components are our stable technologies used by the legacy architecture. They will be deprecated in the future when the New Architecture will be stable. The New Architecture uses Turbo Native Module and Fabric Native Components to achieve similar results."
- Do not set `frame` or `backgroundColor` on the `UIView` returned by `-view`; React Native overwrites them to match JS layout props. Wrap the view in another `UIView` if you need that control.
- Use a three-letter class prefix other than `RCT` (the guide uses `RNT`) to avoid name collisions; Apple uses two-letter prefixes and React Native uses `RCT`.
- Remember to stretch the view when rendering (`style={{flex: 1}}`), otherwise nothing is visible.
- `RCTBubblingEventBlock` properties must be prefixed with `on`.
- Native view classes (UIKit, MapKit) and Swift: see apple-uikit and apple-swift. This page covers only the React Native bridge surface.
- Intended New Architecture replacement: `native-development/fabric-native-components-ios.md`.

## Related

- [native-components-android.md](./native-components-android.md)
- [native-modules-ios.md](./native-modules-ios.md)
- Fabric Native Components (iOS)
