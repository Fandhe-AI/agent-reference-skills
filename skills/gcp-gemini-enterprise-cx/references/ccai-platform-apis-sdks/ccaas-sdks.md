---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/ccaas-sdks
---

# CCAI Platform SDKs overview

The CCAI Platform SDKs provide voice and chat support to customers on your website or inside your iOS and Android app. This page lists the capabilities of the web SDK and the mobile SDKs, and what is unique to the iOS and Android SDKs.

## Signature / Usage

### Web SDK

Customers contact your support team directly on your website.

- Instant web calls: an estimated wait time, and an automatic outbound call to the site visitor when their place in the queue is reached.
- Scheduled calls: visitors schedule a time to talk with support.
- Queue deflection: route end users to a message or page on your site.
- Chat support: live chat from your website.
- Proactive triggers: a contact bubble for web calls and chats shown automatically based on a specific page URL, time spent on page, or number of visits to a particular page.
- Mobile web support: customers on mobile devices can also access your web SDK.
- Direct access points: choose which queue, language or channel an end user reaches on a particular page or with predefined account details.

On your page, the web SDK v3 widget is mounted into an element with:

```javascript
ccaas.mount('#ccaas-widget')
```

### Mobile SDKs (iOS and Android)

Voice and chat support inside iPhone, iPad and Android apps. Both SDKs share:

- VoIP calls: voice calls over data instead of minutes.
- PSTN fallback calls: when the data connection is too weak for VoIP, CCAI Platform falls back to a PSTN call while still sending the custom data packet to your CRM record.
- Scheduled calls: AI-powered algorithms predict and provide 15-minute time slots based on agent availability.
- SmartActions: verify users with biometrics (Touch ID and Face ID for iOS and iPad, fingerprint and face for Android) or passcodes, and request photos, videos, screenshots and text input.
- SMS SmartActions: send an SMS to activate SmartActions inside your app.
- Call deflections: configure deflections based on volume and business hours, to schedule a call for another time, provide an email address, forward the call to another number, or forward the call to voicemail.
- Visual queue configuration: direct queues to a particular website (for example a help center article) or to a visual message.
- Direct access points: choose which queue, language or channel an end user reaches when the SDK is invoked in various parts of your app.

### Platform-specific capabilities

- **iOS SDK, CallKit integration** (iOS 10.0 and greater): in-app calls appear on the built-in iOS call screen, are logged in the phone call history, and show a custom icon on the lock screen when receiving a call.
- **iOS SDK, full device screen sharing**: by adding a broadcast extension, support agents can view screens from outside your application.
- **Android SDK, call conversion from native dialer**: detects a user dialing your main support number from the built-in dialer and converts the call into a mobile SDK call.
- **Android SDK, live chat resiliency**: a secondary fallback messaging media layer takes over if the primary layer has an outage.
- **Android SDK, background call notifications (Android 10+)**: specialized notifications for incoming calls when the host app is in the background or the screen is locked, with accept or decline, complying with Android's background activity restrictions.

## Notes

- Snippet taken from https://docs.cloud.google.com/contact-center/ccai-platform/docs/web-sdk-v3-getting-started (the page has no code of its own).
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/ccaas-sdks (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [web-sdk-v3-getting-started.md](./web-sdk-v3-getting-started.md)
- [headless-web-guide.md](./headless-web-guide.md)
- [mobilesdk-overview.md](./mobilesdk-overview.md)
- [sdk-end-user-auth.md](./sdk-end-user-auth.md)
