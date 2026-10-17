---
source: https://reactnative.dev/docs/0.87/network
---

# Networking

Many mobile apps need to load resources from a remote URL. React Native provides the Fetch API, the built-in XMLHttpRequest API, and WebSocket support.

## Signature / Usage

```ts
fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  }),
});
```

Handling the response with `async` / `await`:

```ts
const getMoviesFromApiAsync = async () => {
  try {
    const response = await fetch(
      'https://reactnative.dev/movies.json',
    );
    const json = await response.json();
    return json.movies;
  } catch (error) {
    console.error(error);
  }
};
```

XMLHttpRequest:

```ts
const request = new XMLHttpRequest();
request.onreadystatechange = e => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', request.responseText);
  } else {
    console.warn('error');
  }
};

request.open('GET', 'https://mywebsite.com/endpoint/');
request.send();
```

WebSocket:

```ts
const ws = new WebSocket('ws://host.com/path');

ws.onopen = () => {
  // connection opened
  ws.send('something'); // send a message
};

ws.onmessage = e => {
  // a message was received
  console.log(e.data);
};

ws.onerror = e => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = e => {
  // connection closed
  console.log(e.code, e.reason);
};
```

Custom `NSURLSessionConfiguration` on iOS (call early in the application life cycle):

```objectivec
#import <React/RCTHTTPRequestHandler.h>

-(void)application:(__unused UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

  // set RCTSetCustomNSURLSessionConfigurationProvider
  RCTSetCustomNSURLSessionConfigurationProvider(^NSURLSessionConfiguration *{
     NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
     // configure the session
     return configuration;
  });

  // set up React
  _bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
}
```

## Notes

- Don't forget to catch any errors that may be thrown by `fetch`, otherwise they will be dropped silently.
- iOS: by default, iOS 9.0 or later enforce App Transport Security (ATS), which requires any HTTP connection to use HTTPS. To fetch from a cleartext URL, add an ATS exception (see integration-with-existing-apps); if you know ahead of time which domains you need, it is more secure to add exceptions only for those domains; if the domains are not known until runtime you can disable ATS completely (see publishing-to-app-store). Apple's App Store review requires reasonable justification for disabling ATS.
- Android: as of API Level 28, clear text traffic is also blocked by default. This behaviour can be overridden by setting `android:usesCleartextTraffic` in the app manifest file.
- `XMLHttpRequest` is built into React Native, so third party libraries such as frisbee or axios that depend on it can be used. Caution: the security model for XMLHttpRequest is different than on web as there is no concept of CORS in native apps.
- Known issues with `fetch` and cookie based authentication: the options `redirect:manual` and `credentials:omit` are currently not working with `fetch`. Having same name headers on Android will result in only the latest one being present. Cookie based authentication is currently unstable. As a minimum on iOS, when redirected through a `302`, if a `Set-Cookie` header is present, the cookie is not set properly; since the redirect cannot be handled manually this might cause infinite requests if the redirect is the result of an expired session.
- `RCTSetCustomNSURLSessionConfigurationProvider` allows, for example, setting a custom user agent string for all network requests or supplying an ephemeral `NSURLSessionConfiguration`.
- The 0.87 docs snippet is a legacy-bridge example (`-(void)` delegate method, `_bridge = [[RCTBridge alloc] ...]`); current templates return BOOL from `application:didFinishLaunchingWithOptions:` and start React Native via `RCTReactNativeFactory`, so only the `RCTSetCustomNSURLSessionConfigurationProvider` call (made early, before starting React Native) is the relevant part. The `_bridge` line is kept verbatim from the official page.
- 0.88: iOS SceneDelegate lifecycle support is added (UIScene lifecycle); with it the startup code moves to a SceneDelegate (the next docs call it from `scene:willConnectToSession:options:`). See the 0.88 release blog. On Android, `fetch` needs `android.permission.INTERNET`, which the community template manifest already declares.
- The WebSocket example uses cleartext `ws://` as on the official page; per the ATS / Android API 28 cleartext rules above, use `wss://` in production.

## Related

- [Images](./images.md)
- [Security](./security.md)
