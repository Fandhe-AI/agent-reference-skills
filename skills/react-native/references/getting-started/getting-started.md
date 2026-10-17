---
source: https://reactnative.dev/docs/0.87/getting-started
---

# Introduction

Prerequisites and orientation for learning React Native and using these docs. Getting-started instructions live in Get Started with React Native (`environment-setup`).

## Signature / Usage

Interactive examples in the docs are Snack Player snippets such as:

```tsx
import {Text, View} from 'react-native';

const YourApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Try editing me! 🎉</Text>
    </View>
  );
};

export default YourApp;
```

## Notes

- Many different kinds of people use React Native: from advanced iOS developers to React beginners, to people getting started programming for the first time in their career. These docs were written for all learners, no matter their experience level or background.
- How to use these docs: you can start here and read through these docs linearly like a book; or you can read the specific sections you need. Already familiar with React? You can skip the React section (`intro-react`) or read it for a light refresher.
- Prerequisites: to work with React Native, you will need to have an understanding of JavaScript fundamentals (MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- While the docs do their best to assume no prior knowledge of React, Android, or iOS development, these are valuable topics of study for the aspiring React Native developer.
- The Snack Player is a handy tool created by Expo to embed and run React Native projects and share how they render in platforms like Android and iOS. The code is live and editable.
- Optionally, to set up a local development environment, follow `set-up-your-environment` and paste the code examples into your project. (If you are a web developer, you may already have a local environment set up for mobile browser testing!)
- Developer Notes: the docs sometimes provide explanations specific to one platform (Android, iOS, Web), e.g. "Android developers may be familiar with this concept."
- Formatting: menu paths are written in bold and use carets to navigate submenus. Example: **Android Studio > Preferences**
- Next in the docs: the foundation of React Native, Native Components (`intro-react-native-components`).
- React Native core components (`View`, `Text`, ...) are imported from `react-native` and render to native views. They are distinct from react-dom DOM elements (react), SwiftUI / UIKit views (apple-swiftui, apple-uikit), Jetpack Compose (android-compose-components, android-compose-ui), WinUI controls (windows-winui-controls), and Web UI library components (ark-ui, chakra-ui, fandhe-frontend).

## Related

- [Get Started with React Native](./environment-setup.md)
- [Set Up Your Environment](./set-up-your-environment.md)
