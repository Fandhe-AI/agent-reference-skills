---
source: https://reactnative.dev/docs/0.87/turbo-native-modules-ios
---

# Turbo Native Modules: iOS

Write the iOS platform code so that the `localStorage` Turbo Native Module survives after the application is closed. The result is `RCTNativeLocalStorage`, which implements the generated `NativeLocalStorageSpec` interface.

## Signature / Usage

Prepare the Xcode project (6 steps):

1. Open the CocoaPods generated Xcode Workspace.

```bash
cd ios
open TurboModuleExample.xcworkspace
```

2. Right click on app and select `New Group`, call the new group `NativeLocalStorage`.
3. In the `NativeLocalStorage` group, create `New` -> `File from Template`.
4. Use the `Cocoa Touch Class`.
5. Name the Cocoa Touch Class `RCTNativeLocalStorage` with the `Objective-C` language.
6. Rename `RCTNativeLocalStorage.m` -> `RCTNativeLocalStorage.mm` making it an Objective-C++ file.

Implement `localStorage` with `NSUserDefaults`. First update `RCTNativeLocalStorage.h`:

```objc
//  RCTNativeLocalStorage.h
//  TurboModuleExample

#import <Foundation/Foundation.h>
// highlight-add-next-line
#import <NativeLocalStorageSpec/NativeLocalStorageSpec.h>

NS_ASSUME_NONNULL_BEGIN

// highlight-remove-next-line
@interface RCTNativeLocalStorage : NSObject
// highlight-add-next-line
@interface RCTNativeLocalStorage : NSObject <NativeLocalStorageSpec>

@end
```

Then update the implementation (`NativeLocalStorage/RCTNativeLocalStorage.mm`) to use `NSUserDefaults` with a custom suite name:

```objc
//  RCTNativeLocalStorage.m
//  TurboModuleExample

#import "RCTNativeLocalStorage.h"

static NSString *const RCTNativeLocalStorageKey = @"local-storage";

@interface RCTNativeLocalStorage()
@property (strong, nonatomic) NSUserDefaults *localStorage;
@end

@implementation RCTNativeLocalStorage

- (id) init {
  if (self = [super init]) {
    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
}

- (NSString * _Nullable)getItem:(NSString *)key {
  return [self.localStorage stringForKey:key];
}

- (void)setItem:(NSString *)value
          key:(NSString *)key {
  [self.localStorage setObject:value forKey:key];
}

- (void)removeItem:(NSString *)key {
  [self.localStorage removeObjectForKey:key];
}

- (void)clear {
  NSDictionary *keys = [self.localStorage dictionaryRepresentation];
  for (NSString *key in keys) {
    [self removeItem:key];
  }
}

+ (NSString *)moduleName
{
  return @"NativeLocalStorage";
}

@end
```

Register the Native Module in the app by modifying `package.json`:

```json
     "start": "react-native start",
     "test": "jest"
   },
   "codegenConfig": {
     "name": "NativeLocalStorageSpec",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.nativelocalstorage"
     },
     // highlight-add-start
     "ios": {
        "modulesProvider": {
          "NativeLocalStorage": "RCTNativeLocalStorage"
        }
     }
     // highlight-add-end
   },

   "dependencies": {
```

Re-install the pods so that Codegen runs again:

```bash
# from the ios folder
bundle exec pod install
open TurboModuleExample.xcworkspace
```

Build and run on a Simulator:

**npm**

```bash
npm run ios
```

**Yarn**

```bash
yarn run ios
```

## Notes

- You can use Xcode to jump to the Codegen `@protocol NativeLocalStorageSpec`. You can also use Xcode to generate stubs for you.
- The last step updates `package.json` to tell React Native about the link between the JS specs of the Native Module and the concrete implementation of those specs in native code (`ios.modulesProvider`).
- If you now build your application from Xcode, you should be able to build successfully.
- Cross-skill: UIKit / Foundation APIs and Swift belong to apple-uikit / apple-swift; this page covers only the React Native module boundary.

## Related

- [Native Modules: Introduction](./turbo-native-modules-introduction.md)
- [Turbo Native Modules: Android](./turbo-native-modules-android.md)
- [iOS - Using Swift in Your Native Modules](./turbo-modules-with-swift.md)
- [Using Codegen](./using-codegen.md)
