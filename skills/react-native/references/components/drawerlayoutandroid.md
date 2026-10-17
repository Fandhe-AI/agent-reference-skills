---
source: https://reactnative.dev/docs/0.87/drawerlayoutandroid
---

# DrawerLayoutAndroid

React component that wraps the platform `DrawerLayout` (Android only). The drawer is rendered with `renderNavigationView` and direct children are the main view. Deprecated.

## Signature / Usage

**JavaScript**

```js
import {useRef, useState} from 'react';
import {Button, DrawerLayoutAndroid, Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <SafeAreaView style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </SafeAreaView>
  );

  return (
    <SafeAreaProvider>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
          <Button
            title="Change Drawer Position"
            onPress={() => changeDrawerPosition()}
          />
          <Text style={styles.paragraph}>
            Swipe from the side or press button below to see it!
          </Text>
          <Button
            title="Open drawer"
            onPress={() => drawer.current.openDrawer()}
          />
        </SafeAreaView>
      </DrawerLayoutAndroid>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
```

**TypeScript**

```tsx
import {useRef, useState} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';

type DrawerLayoutAndroidInstance = React.ComponentRef<
  typeof DrawerLayoutAndroid
>;

const App = () => {
  const drawer = useRef<DrawerLayoutAndroidInstance>(null);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
    'left',
  );
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current?.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
        <Button
          title="Change Drawer Position"
          onPress={() => changeDrawerPosition()}
        />
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button
          title="Open drawer"
          onPress={() => drawer.current?.openDrawer()}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
```

## Options / Props

Inherits [View Props](./view.md#options--props).

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| drawerBackgroundColor | color | No | Background color of the drawer. Default is `white`. To set opacity use rgba, e.g. `drawerBackgroundColor="rgba(0,0,0,0.5)"`. |
| drawerLockMode | enum('unlocked', 'locked-closed', 'locked-open') | No | Lock mode of the drawer. unlocked (default): responds (open/close) to touch gestures. locked-closed: stays closed and does not respond to gestures. locked-open: stays opened and does not respond to gestures; may still be opened and closed programmatically (`openDrawer`/`closeDrawer`). |
| drawerPosition | enum('left', 'right') | No | Side of the screen from which the drawer slides in. Default `left`. |
| drawerWidth | number | No | Width of the view that is pulled in from the edge of the window. |
| keyboardDismissMode | enum('none', 'on-drag') | No | Whether the keyboard gets dismissed in response to a drag. 'none' (default): drags do not dismiss the keyboard. 'on-drag': dismissed when a drag begins. |
| onDrawerClose | function | No | Called whenever the navigation view has been closed. |
| onDrawerOpen | function | No | Called whenever the navigation view has been opened. |
| onDrawerSlide | function | No | Called whenever there is an interaction with the navigation view. |
| onDrawerStateChanged | function | No | Called when the drawer state has changed. States: idle (no interaction), dragging (interaction in progress), settling (finishing its closing or opening animation). |
| renderNavigationView | function | Yes | The navigation view that will be rendered to the side of the screen and can be pulled in. |
| statusBarBackgroundColor | color | No | Make the drawer take the entire screen and draw the background of the status bar to allow it to open over the status bar. Only has an effect on API 21+. |

### Methods

```tsx
closeDrawer();
openDrawer();
```

| Method | Description |
| --- | --- |
| closeDrawer() | Closes the drawer. |
| openDrawer() | Opens the drawer. |

## Notes

- Deprecated: "Use `react-native-drawer-layout` instead."
- Android only.
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui (Compose drawers), windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend. For navigation libraries see the Navigation page in ui-interaction.

## Related

- [View](./view.md)
- [Navigation](../ui-interaction/navigation.md)
