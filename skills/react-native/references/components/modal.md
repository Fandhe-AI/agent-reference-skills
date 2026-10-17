---
source: https://reactnative.dev/docs/0.87/modal
---

# Modal

A basic way to present content above an enclosing view.

## Signature / Usage

```tsx
import {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
```

## Options / Props

Inherits [View Props](./view.md#options--props).

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| animationType | enum(`'none'`, `'slide'`, `'fade'`) | `none` | | How the modal animates. `slide` slides in from the bottom, `fade` fades into view, `none` appears without an animation. |
| backdropColor | color | white | | The backdrop color of the modal (or background color of the modal's container). Defaults to `white` if not provided and transparent is `false`. Ignored if `transparent` is `true`. |
| hardwareAccelerated | bool | `false` | Android | Whether to force hardware acceleration for the underlying window. |
| navigationBarTranslucent | bool | `false` | Android | Whether your modal should go under the system navigation bar. `statusBarTranslucent` also needs to be set to `true` to make the navigation bar translucent. |
| onDismiss | function | | iOS | Called once the modal has been dismissed. |
| onOrientationChange | function | | iOS | Called when the orientation changes while the modal is being displayed. The orientation provided is only 'portrait' or 'landscape'. Also called on initial render, regardless of the current orientation. |
| allowSwipeDismissal | bool | `false` | iOS | Controls whether the modal can be dismissed by swiping down on iOS. Requires you to implement the `onRequestClose` prop to handle the dismissal. |
| ref | ref setter | | | A ref setter that will be assigned an element node when mounted. |
| onRequestClose | function | | Android, TV: required; iOS: optional | Called when the user taps the hardware back button on Android or the menu button on Apple TV. On iOS, called when a Modal is being dismissed using a drag gesture when `presentationStyle` is `pageSheet` or `formSheet`. When `allowSwipeDismissal` is enabled this callback is called after dismissing the modal. |
| onShow | function | | | Called once the modal has been shown. |
| presentationStyle | enum(`'fullScreen'`, `'pageSheet'`, `'formSheet'`, `'overFullScreen'`) | `fullScreen` if `transparent={false}`; `overFullScreen` if `transparent={true}` | iOS | How the modal appears (generally on larger devices such as iPad or plus-sized iPhones). `fullScreen` covers the screen completely; `pageSheet` covers portrait-width view centered (only on larger devices); `formSheet` covers narrow-width view centered (only on larger devices); `overFullScreen` covers the screen completely, but allows transparency. |
| statusBarTranslucent | bool | `false` | Android | Whether your modal should go under the system statusbar. |
| supportedOrientations | array of enums(`'portrait'`, `'portrait-upside-down'`, `'landscape'`, `'landscape-left'`, `'landscape-right'`) | `['portrait']` | iOS | Allows the modal to be rotated to any of the specified orientations. On iOS, the modal is still restricted by what's specified in your app's Info.plist's UISupportedInterfaceOrientations field. |
| transparent | bool | `false` | | Whether your modal will fill the entire view. Setting this to `true` will render the modal over a transparent background. |
| visible | bool | `true` | | Whether your modal is visible. |

## Notes

- Because of the required `onRequestClose` prop on Android and TV, `BackHandler` events will not be emitted as long as the modal is open.
- When using `presentationStyle` of `pageSheet` or `formSheet`, `supportedOrientations` is ignored on iOS.
- This is the React Native core `Modal` (imported from `react-native`, rendered as a native view). It is distinct from same-named parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [Pressable](./pressable.md)
- [View](./view.md)
- [BackHandler](../apis/backhandler.md)
