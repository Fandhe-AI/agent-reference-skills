---
source: https://reactnative.dev/docs/0.87/legacy/native-modules-ios
---

# iOS Native Modules

Legacy Architecture guide: build a `RCTCalendarModule` Objective-C class implementing `RCTBridgeModule`, export it with `RCT_EXPORT_MODULE` and methods with `RCT_EXPORT_METHOD`.

## Signature / Usage

```objectivec
//  RCTCalendarModule.h
#import <React/RCTBridgeModule.h>
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
@end
```

```objectivec
// RCTCalendarModule.m
#import "RCTCalendarModule.h"
#import <React/RCTLog.h>

@implementation RCTCalendarModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

@end
```

`RCT_EXPORT_MODULE` takes an optional name argument that is not a string literal (`RCT_EXPORT_MODULE(CalendarModuleFoo)`). Without it, the JS name is the Objective-C class name with any "RCT" or "RK" prefix removed.

Call from JavaScript, then rebuild native code (`npm run ios` / `yarn ios`):

```tsx
const {CalendarModule} = NativeModules;
CalendarModule.createCalendarEvent('testName', 'testLocation');
```

### Synchronous methods

```objectivec
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getName)
{
return [[UIDevice currentDevice] name];
}
```

The return type must be an object type (`id`) serializable to JSON (nil, NSNumber, NSString, NSArray, NSDictionary).

### Argument types

| Objective-C | JavaScript |
| --- | --- |
| NSString | string, ?string |
| BOOL | boolean |
| double | number |
| NSNumber | ?number |
| NSArray | Array, ?Array |
| NSDictionary | Object, ?Object |
| RCTResponseSenderBlock | Function (success) |
| RCTResponseSenderBlock, RCTResponseErrorBlock | Function (failure) |
| RCTPromiseResolveBlock, RCTPromiseRejectBlock | Promise |

Any type supported by `RCTConvert` can also be used as an argument.

### Constants

```objectivec
- (NSDictionary *)constantsToExport
{
 return @{ @"DEFAULT_EVENT_NAME": @"New Event" };
}
```

```tsx
const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
```

If you override `constantsToExport()`, also implement `+ requiresMainQueueSetup` (respond NO if the module does not need UIKit).

### Callbacks

```objectivec
RCT_EXPORT_METHOD(createCalendarEventCallback:(NSString *)title location:(NSString *)location callback: (RCTResponseSenderBlock)callback)
{
  NSNumber *eventId = [NSNumber numberWithInt:123];
  callback(@[[NSNull null], eventId]);
}
```

Or two callbacks:

```objectivec
RCT_EXPORT_METHOD(createCalendarEventCallback:(NSString *)title
                  location:(NSString *)location
                  errorCallback: (RCTResponseSenderBlock)errorCallback
                  successCallback: (RCTResponseSenderBlock)successCallback)
{
  @try {
    NSNumber *eventId = [NSNumber numberWithInt:123];
    successCallback(@[eventId]);
  }
  @catch ( NSException *e ) {
    errorCallback(@[e]);
  }
}
```

### Promises

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title
                 location:(NSString *)location
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
 NSInteger eventId = createCalendarEvent();
 if (eventId) {
    resolve(@(eventId));
  } else {
    reject(@"event_failure", @"no event id returned", nil);
  }
}
```

```tsx
const eventId = await CalendarModule.createCalendarEvent('Party', 'my house');
```

### Sending events to JavaScript

Subclass `RCTEventEmitter`, implement `supportedEvents`, and call `sendEventWithName:body:`. Override `startObserving` / `stopObserving` to avoid emitting without listeners.

```objectivec
//  CalendarModule.h
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface CalendarModule : RCTEventEmitter <RCTBridgeModule>
@end
```

```objectivec
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

- (void)calendarEventReminderReceived:(NSNotification *)notification
{
  NSString *eventName = notification.userInfo[@"name"];
  if (hasListeners) {// Only send events if anyone is listening
    [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
  }
}
```

JavaScript subscribes by creating a `NativeEventEmitter` around the module.

### Threading

```objectivec
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
```

Override `methodQueue` to run on a specific queue (for example the main queue for main-thread-only iOS APIs, or a dedicated serial queue for slow work). The queue is shared by all methods of the module; use `dispatch_async` inside one method to offload it alone.

### Dependency injection

```objectivec
id<RCTBridgeDelegate> moduleInitialiser = [[classThatImplementsRCTBridgeDelegate alloc] init];

RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:moduleInitialiser launchOptions:nil];

RCTRootView *rootView = [[RCTRootView alloc]
                        initWithBridge:bridge
                            moduleName:kModuleName
                     initialProperties:nil];
```

### Exporting Swift

```swift
// CalendarModule.swift

@objc(CalendarModule)
class CalendarModule: NSObject {

 @objc(addEvent:location:date:)
 func addEvent(_ name: String, location: String, date: NSNumber) -> Void {
   // Date is ready to use!
 }

 @objc
 func constantsToExport() -> [String: Any]! {
   return ["someKey": "someValue"]
 }

}
```

```objectivec
// CalendarModuleBridge.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarModule, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date)

@end
```

```objectivec
// CalendarModule-Bridging-Header.h
#import <React/RCTBridgeModule.h>
```

`RCT_EXTERN_REMAP_MODULE` and `_RCT_EXTERN_REMAP_METHOD` change the exported JS names.

### Reserved method names: invalidate()

Modules can conform to `RCTInvalidating` by implementing `invalidate()`, which can be invoked when the native bridge is invalidated (for example a dev-mode reload), for cleanup.

## Notes

- Deprecation notice (verbatim): "Native Module and Native Components are our stable technologies used by the legacy architecture. They will be deprecated in the future when the New Architecture will be stable. The New Architecture uses Turbo Native Module and Fabric Native Components to achieve similar results."
- `RCT_EXPORT_METHOD` methods are asynchronous and return void; pass results via callbacks, promises, or events. The macro will not be necessary with TurboModules unless a method relies on RCT argument conversion; React Native intends to remove it, so using `RCTConvert` is discouraged.
- `RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD` is not recommended (performance and threading bugs; the Google Chrome debugger can no longer be used).
- These types work today but will not be supported in TurboModules: `RCTResponseErrorBlock`, NSInteger, CGFloat, float.
- A native module should invoke a callback only once; if never invoked, some memory is leaked.
- Constants are read once at initialization; direct access off the module object will not be supported with TurboModules.
- Static libraries with Swift require Xcode 9 or later; the app project must itself contain Swift code and a bridging header (a single empty `.swift` file and empty bridging header suffices).
- iOS-side platform code (UIKit, Swift, distribution): see apple-uikit, apple-swift, apple-distribution. This page covers only the React Native bridge surface.
- Intended New Architecture replacement: `native-development/turbo-native-modules-ios.md`.

## Related

- [native-modules-intro.md](./native-modules-intro.md)
- [native-modules-android.md](./native-modules-android.md)
- [native-components-ios.md](./native-components-ios.md)
- Turbo Native Modules (iOS)
- Turbo Modules with Swift
