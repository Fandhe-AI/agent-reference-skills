# Espresso cheat sheet

One-page summary of Espresso matchers, actions, assertions, data options, and intent matchers, from the official cheat sheet PDF (v2.1.0, 4/21/2015).

## Signature / Usage

```java
onView(ViewMatcher)
    .perform(ViewAction)
    .check(ViewAssertion);

onData(ObjectMatcher)
    .DataOptions
    .perform(ViewAction)
    .check(ViewAssertion);

intended(IntentMatcher);
intending(IntentMatcher)
    .respondWith(ActivityResult);
```

### View Matchers

| Group | Matchers |
|-------|----------|
| User properties | `withId(...)`, `withText(...)`, `withTagKey(...)`, `withTagValue(...)`, `hasContentDescription(...)`, `withContentDescription(...)`, `withHint(...)`, `withSpinnerText(...)`, `hasLinks()`, `hasEllipsizedText()`, `hasMultilineTest()` |
| UI properties | `isDisplayed()`, `isCompletelyDisplayed()`, `isEnabled()`, `hasFocus()`, `isClickable()`, `isChecked()`, `isNotChecked()`, `withEffectiveVisibility(...)`, `isSelected()` |
| Object matcher | `allOf(Matchers)`, `anyOf(Matchers)`, `is(...)`, `not(...)`, `endsWith(String)`, `startsWith(String)`, `instanceOf(Class)` |
| Hierarchy | `withParent(Matcher)`, `withChild(Matcher)`, `hasDescendant(Matcher)`, `isDescendantOfA(Matcher)`, `hasSibling(Matcher)`, `isRoot()` |
| Input | `supportsInputMethods(...)`, `hasIMEAction(...)` |
| Class | `isAssignableFrom(...)`, `withClassName(...)` |
| Root matchers | `isFocusable()`, `isTouchable()`, `isDialog()`, `withDecorView()`, `isPlatformPopup()` |
| See also | Preference matchers, Cursor matchers, Layout matchers |

### Data Options

`inAdapterView(Matcher)`, `atPosition(Integer)`, `onChildView(Matcher)`.

### View Actions

| Group | Actions |
|-------|---------|
| Click / press | `click()`, `doubleClick()`, `longClick()`, `pressBack()`, `pressIMEActionButton()`, `pressKey([int/EspressoKey])`, `pressMenuKey()`, `closeSoftKeyboard()`, `openLink()` |
| Gestures | `scrollTo()`, `swipeLeft()`, `swipeRight()`, `swipeUp()`, `swipeDown()` |
| Text | `clearText()`, `typeText(String)`, `typeTextIntoFocusedView(String)`, `replaceText(String)` |

### View Assertions

| Group | Assertions |
|-------|------------|
| General | `matches(Matcher)`, `doesNotExist()`, `selectedDescendantsMatch(...)` |
| Layout | `noEllipseizedText(Matcher)`, `noMultilineButtons()`, `noOverlaps([Matcher])` |
| Position | `isLeftOf(Matcher)`, `isRightOf(Matcher)`, `isLeftAlignedWith(Matcher)`, `isRightAlignedWith(Matcher)`, `isAbove(Matcher)`, `isBelow(Matcher)`, `isBottomAlignedWith(Matcher)`, `isTopAlignedWith(Matcher)` |

### Intent Matchers

| Group | Matchers |
|-------|----------|
| Intent | `hasAction(...)`, `hasCategories(...)`, `hasData(...)`, `hasComponent(...)`, `hasExtra(...)`, `hasExtras(Matcher)`, `hasExtraWithKey(...)`, `hasType(...)`, `hasPackage()`, `toPackage(String)`, `hasFlag(int)`, `hasFlags(...)`, `isInternal()` |
| URI | `hasHost(...)`, `hasParamWithName(...)`, `hasPath(...)`, `hasParamWithValue(...)`, `hasScheme(...)`, `hasSchemeSpecificPart(...)` |
| Bundle | `hasEntry(...)`, `hasKey(...)`, `hasValue(...)` |
| Component name | `hasClassName(...)`, `hasPackageName(...)`, `hasShortClassName(...)`, `hasMyPackageName()` |

## Notes

- The PDF is dated v2.1.0 (4/21/2015), so it may not list newer APIs. Spellings such as `hasMultilineTest()` and `noEllipseizedText(Matcher)` are reproduced as printed in the PDF and may differ from the current API; verify against the reference pages.

## Related

- [Espresso basics](./basics.md)
- [ViewMatchers](./viewmatchers.md)
- [ViewActions](./viewactions.md)
- [ViewAssertions](./viewassertions.md)
- [Espresso intents](./intents.md)
- [onData](./ondata.md)
