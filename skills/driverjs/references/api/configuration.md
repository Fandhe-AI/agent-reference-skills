# Configuration

Driver.js accepts a configuration object when creating a driver instance. Options can be set at the driver level (global) and overridden at the step level. Options marked "step" below can also be set on a single step, where they override the driver's value.

## Signature / Usage

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  overlayOpacity: 0.5,
  steps: [
    {
      element: "#search",
      popover: { title: "Search", description: "Find anything." },
    },
    {
      element: "#export",
      disableActiveInteraction: true,
      popover: { title: "Export", side: "left" },
    },
  ],
});

driverObj.drive();
```

Each `driver()` call is its own instance with its own configuration, steps and state. Only one instance is on screen at a time: starting one closes any other. To change options later, use `setConfig()` (see Methods). All types on this page are exported from `driver.js`.

## Config Type (Driver-Level Options)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| steps | DriveStep[] | undefined | Array of tour steps. Not needed for `highlight()` |
| animate | boolean | true | Whether to animate transitions |
| duration | number | 400 | Duration of the transition animation in milliseconds. Controls both the speed of the stage moving between steps and the overlay/popover fade-in. Only applies when `animate` is true |
| overlayColor | string | `'#000'` | Backdrop overlay color. Any CSS color |
| overlayOpacity | number | 0.7 | Opacity of backdrop (see Notes for the 0.5 vs 0.7 discrepancy) |
| stagePadding | number | 10 | Distance between element and cutout (px) |
| stageRadius | number | 5 | Border radius of cutout (px) |
| smoothScroll | boolean | false | Smooth scroll to highlighted element |
| scrollIntoView (step) | boolean \| ScrollIntoViewOpts | true | Scroll the highlighted element and the popover into view. An object says where the element ends up, like `{ block: "start" }`. `false` stops driver.js from scrolling (1.13.0; object form 1.14.0). See Scrolling and Focus |
| allowScroll | boolean | true | Whether to allow scrolling the page while the driver is active |
| allowClose | boolean | true | Let the user close the tour: with the close button, Escape or a click on the overlay. `false` also hides the close button |
| overlayClickBehavior | `'close'` \| `'nextStep'` \| `'none'` \| DriverHook | `'close'` | Action on backdrop click. A function replaces the default and receives the same arguments as a hook. `'none'` ignores overlay clicks while Escape and the close button still work (1.9.0) |
| allowKeyboardControl | boolean | true | Arrow keys move between steps and Escape closes. Arrow keys are ignored when their button is hidden or disabled, and Escape is ignored when the close button is disabled (1.9.0) |
| focus (step) | StepFocus | `'popover'` | Where the keyboard goes when a step shows: `"popover"`, `"element"` (the first thing to use in the highlighted element) or `"none"` (it stays where it is). Since 1.14.0 |
| disableActiveInteraction (step) | boolean \| `'clicks'` | false | Block the highlighted element: `true` turns off all pointer events on it, `"clicks"` keeps hover and blocks clicks (`"clicks"` since 1.12.0) |
| advanceOn (step) | `false` \| string \| string[] \| AdvanceOnEvent | off | Complete the step when this event happens on the highlighted element (since 1.11.0) |
| advanceDelay (step) | number | 0 | Milliseconds to pause after `advanceOn` or `advance()` completes a step, before moving on (since 1.12.0) |
| allowedElements (step) | AllowedElements | undefined | Other elements the user may use during a step, like a menu it opens (since 1.11.0) |
| onInteraction (step) | InteractionHook | undefined | Called for every click during a step. Return `false` to block it (since 1.11.0) |
| allowPageInteraction (step) | boolean | false | Let the user use the whole page during a step, not only the highlighted element (since 1.14.0) |
| advanceOnClick (step) | boolean | false | Deprecated: use `advanceOn: "click"`. Keeps working (deprecated in 1.11.0) |
| waitForElement (step) | number | 0 | Milliseconds to wait for a step's element to appear. `Infinity` waits as long as it takes (0 = no wait). The current step stays highlighted, with its popover in a waiting state, while waiting |
| waitForRemovedElement (step) | number | `waitForElement` | Milliseconds a highlighted element that was removed gets to come back before `onElementMissing` runs. Takes `Infinity` (since 1.14.0) |
| skipMissingElement (step) | boolean | false | Skip a step whose element is not on the page |
| onElementMissing (step) | ElementMissing | `'stay'` | What to do when the highlighted element leaves the page for good, or a wait runs out (since 1.11.0; presets since 1.12.0) |
| onWaitingForElement (step) | WaitingForElementHook | undefined | Called when driver.js starts waiting for an element (since 1.13.0) |
| onElementReplaced (step) | DriverHook | undefined | Called when the app re-renders the highlighted element and the step moves to the new one (since 1.13.0) |
| popoverClass | string | undefined | Custom CSS class for popover |
| popoverOffset | number | 10 | Space between the popover and the cutout (px) |
| showButtons | AllowedButtons[] | `['next','previous','close']` (tours); `[]` (`highlight()`) | Buttons to show. An empty array `[]` on the driver hides all buttons (1.11.0; it used to show all of them) |
| disableButtons | AllowedButtons[] | `[]` | Buttons to show but disable |
| showProgress | boolean | false | Show progress text |
| progressText | string | `'{{current}} of {{total}}'` | Progress text template |
| nextBtnText | string | undefined | Custom next button text |
| prevBtnText | string | undefined | Custom previous button text |
| doneBtnText | string | undefined | Custom done button text (last step) |
| closeBtnLabel | string | `'Close'` | Screen reader label (`aria-label`) of the close button (1.9.0) |

The driver-level hooks (`onPopoverRender`, `onPopoverPositioned`, `onHighlightStarted`, `onHighlighted`, `onDeselected`, `onDestroyStarted`, `onDestroyed`, `onNextClick`, `onPrevClick`, `onCloseClick`, `onDoneClick`) are described under Driver Hooks / Callbacks.

### Interaction

By default the user can use the highlighted element, and nothing else on the page. These options change that.

| You want to... | Use |
|----------------|-----|
| Move on when the user clicks, types or picks something | `advanceOn: "click"`, `"input"`, `"change"`, ... |
| Move on only when the result is right | `advanceOn: { event, when }` |
| Accept one gesture on the element and block other clicks | `advanceOn: { event, strict: true }` |
| Take away the Next button so the user has to act | `popover.instruction` |
| Let the user use something outside the element, like a menu | `allowedElements` |
| Let the user use the whole page, like trying something out | `allowPageInteraction: true` |
| Let the user look but not touch | `disableActiveInteraction: true` |
| Keep hover and tooltips, block clicks | `disableActiveInteraction: "clicks"` |
| Decide per click, or react to a wrong click | `onInteraction` |
| Choose what a click on the dimmed page does | `overlayClickBehavior` |

#### advanceOn

```typescript
type AdvanceOnEvent = {
  event: string | string[];
  when?: (
    element: Element,
    step: DriveStep,
    opts: HookOpts & { event: Event }
  ) => boolean;
  strict?: boolean;
};
```

- `event` is any DOM event name that reaches the highlighted element, or a list of them.
- `when` runs after your app has handled the event. The step completes only when it returns `true`.
- `strict: true` (since 1.12.0) makes the element take only that gesture: other clicks, right-clicks and double-clicks on it are blocked and shake the popover. It applies when every event is a pointer gesture (`click`, `dblclick`, `contextmenu`, `auxclick`, pointer and mouse down and up).
- `false` on a step turns off the driver's `advanceOn` for it.

Completing a step runs `onNextClick` like the Next button does, or `onDoneClick` on the last step.

#### onInteraction

```typescript
type InteractionHook = (
  element: Element | undefined,
  step: DriveStep,
  opts: HookOpts & {
    event: MouseEvent;
    region: "element" | "allowed" | "outside";
  }
) => false | void;
```

Called for every `click`, `auxclick`, `contextmenu` and `dblclick` during a step, before your app's handlers. `region` says where it happened: on the highlighted element, on one of the `allowedElements`, or anywhere else. Return `false` to block the event, including the `overlayClickBehavior` it would trigger. Clicks on the popover and key presses are not reported.

#### allowedElements

```typescript
type AllowedElements =
  | string
  | Element
  | Array<string | Element>
  | (() => Element[] | NodeListOf<Element> | null | undefined);
```

Selectors, elements, or a function returning elements. They stay clickable, sit above the overlay and take part in Tab navigation. Selectors and functions are evaluated again as the page changes, so elements that appear later are included. If one still sits under the overlay, set `--driver-allowed-z-index` or target its positioned wrapper. When the highlighted element is inside an allowed element, like an item in an open menu, it gets the `driver-active-element-raised` class and a ring instead of the cutout (1.12.0).

#### allowPageInteraction

With `allowPageInteraction: true` (since 1.14.0) the page stays usable during the step: clicks go through the overlay, Tab moves through the whole page, and arrow keys and Escape typed into the page's own fields stay with the page. The highlighted element still follows `disableActiveInteraction` and a `strict` `advanceOn`, and `onInteraction` is still called. `overlayClickBehavior` doesn't apply, since clicks on the overlay reach the page. The headless build never blocks anything, so it doesn't need it.

#### overlayClickBehavior

`"close"` ends the tour, `"nextStep"` moves on, `"none"` does nothing. On an action step, `"close"` and `"nextStep"` shake the popover instead. `"nextStep"` does nothing while a step waits for its element (1.12.0). A function runs in every case.

#### How Clicks Are Handled

While a tour runs, only the highlighted element, `allowedElements` and the popover take pointer events. A press anywhere else belongs to the tour, and your app never sees it:

- Its `pointerdown`, `mousedown`, `pointerup`, `mouseup`, `click`, `touchstart` and `touchend` are stopped on `window` in the capture phase. Only `window` capture listeners added before the tour started still run.
- Mouse events are also canceled, so focus stays where it was. Touch events are not, so scrolling works.
- A drag that starts in the highlighted element ends normally, wherever it is released.

The same goes for presses on an element with `disableActiveInteraction`, which also blocks the click that Enter or Space makes on it.

Only what the user does is stopped. Events your code dispatches, like `element.click()`, go through.

### Scrolling and Focus

When a step's element is not fully in view, driver.js scrolls it to the middle of the screen, or its top to the top of the screen when it is taller than the screen. `scrollIntoView` takes `block` and `inline` like the DOM's `scrollIntoView()` to put it somewhere else; what you leave out stays as it is. `false` turns scrolling off. A fixed header can be cleared with `scroll-margin-top` on the element.

```typescript
type ScrollIntoViewOpts = { block?: ScrollLogicalPosition; inline?: ScrollLogicalPosition };

driver({ scrollIntoView: { inline: "nearest" } }); // a wide table row keeps its first columns in view
```

The cutout and the popover follow the part of the element you can see: a row wider than the panel it scrolls in is only highlighted inside the panel, and the highlight moves as the panel scrolls.

`focus` decides where the keyboard goes when a step shows:

- `"popover"` (default): Next, or the popover itself.
- `"element"`: the first thing to use inside the highlighted element, like the field a step asks the user to fill in. It falls back to the popover when there is nothing to use there, or the element has `disableActiveInteraction: true`.
- `"none"`: it stays where it is. Use it with `allowPageInteraction`, so the user can keep typing where they were.

Either way, a screen reader still reads the popover out. When the tour ends, the keyboard goes back where it was before only if it is still on the popover.

### Missing Elements

| Situation | Option | What happens |
|-----------|--------|--------------|
| The next element renders late | `waitForElement: 3000` | The current step stays, with its popover in a waiting state, until the element appears or the time runs out |
| The element may not exist at all | `skipMissingElement: true` | The step is skipped in the direction of travel |
| The highlighted element is replaced | nothing, or `onElementReplaced` to hear about it | The step follows the new element matching its selector |
| The highlighted element is removed | `onElementMissing` | See below |

`onElementMissing` takes a preset or a function:

- `"stay"` (default): the step stays where the element was.
- `"previous"`: go back one step.
- `"previousAction"`: go back to the last action step whose element is still on the page, or one step back if there is none.

A removed element first gets `waitForRemovedElement` to come back, or `waitForElement` when that is not set. Set `waitForRemovedElement` when the two should differ, like waiting as long as it takes for an element to appear (`waitForElement: Infinity`) but going back soon after it is gone. A driver-level `waitForRemovedElement` applies to every step, including steps that set their own `waitForElement`. With `"stay"` there is no wait. `"previous"` and `"previousAction"` also keep the current step when the next step's `waitForElement` runs out, instead of showing that step without its element.

```typescript
type ElementMissing =
  | "stay"
  | "previous"
  | "previousAction"
  | ElementMissingHook;

type ElementMissingHook = (
  element: Element | undefined,
  step: DriveStep,
  opts: HookOpts & { cause: "removed" | "timeout" }
) => false | void;
```

A function is called with `cause: "removed"` when the highlighted element is gone, and decides what to do. It is called with `cause: "timeout"` when a step's `waitForElement` runs out, with that step and its index; the step then shows without its element unless the function returns `false` or navigates.

`onWaitingForElement` is called when driver.js starts waiting for an element:

- A step's element hasn't appeared yet. `element` is `undefined`, and `opts.index` is that step's index. If another step is showing, it stays the current step until the element appears.
- The highlighted element was removed, and `onElementMissing` is not `"stay"`. `element` is the removed one, which gets `waitForRemovedElement` (or `waitForElement`) to come back. With `"stay"` there is no wait: the step stays, and `onElementReplaced` runs if a new element shows up.

`opts.signal` aborts when the wait ends: the element showed up, the time ran out or the tour moved on. It means "stop showing that you're waiting", not "found". `onHighlighted` or `onElementMissing` tells you how it ended.

```typescript
type WaitingForElementHook = (
  element: Element | undefined,
  step: DriveStep,
  opts: HookOpts & { signal: AbortSignal }
) => void;

driver({
  waitForElement: 3000,
  onWaitingForElement: (element, step, opts) => {
    showSpinner();
    opts.signal.addEventListener("abort", hideSpinner);
  },
});
```

`onElementReplaced` runs after the step has moved to the new element, so `getActiveElement()` already returns it. It doesn't run when the same element is put back.

## Driver Hooks / Callbacks

Hooks can be set at the driver level (apply to all steps) or at the step level (override driver-level; a step's hooks run instead of the driver's).

All hooks (except `onPopoverRender` and `onPopoverPositioned`) follow the `DriverHook` signature:

```typescript
type DriverHook = (
  element: Element | undefined,
  step: DriveStep,
  opts: HookOpts
) => void;

type HookOpts = {
  config: Config;
  state: State;
  driver: Driver;
  // Index of the active step. undefined in highlight().
  index: number | undefined;
  // Why the tour is ending. Only in the destroy hooks.
  reason?: "done" | "close" | "escape" | "overlay" | "replaced" | "api";
  // Aborts when the step is left. Only in onHighlightStarted and
  // onHighlighted.
  signal?: AbortSignal;
};

type DestroyReason = "done" | "close" | "escape" | "overlay" | "replaced" | "api";
```

`DestroyReason` and `HookOpts` are exported types. `onPopoverRender` and `onPopoverPositioned` have the signature `(popover: PopoverDOM, opts: HookOpts) => void`.

| Hook | Runs |
|------|------|
| onHighlightStarted | Before a step's element is highlighted. Gets `opts.signal` (1.12.0) |
| onHighlighted | Once the highlight has settled on the element. Gets `opts.signal` (1.11.0) |
| onDeselected | When a step is left, and when the tour ends. `reason` is set only on the call that runs when the tour is destroyed |
| onDestroyStarted | When the user tries to end the tour. The tour only ends if you call `destroy()` |
| onDestroyed | After the tour has ended |
| onPopoverRender | When a step's popover is built, after it is added to the page and before it is positioned. Change its content here |
| onPopoverPositioned | Every time driver.js places the popover: when it shows, and again on scroll, resize, `refresh()` and `updatePopover()`. Move it here (1.14.0) |
| onNextClick, onPrevClick, onCloseClick | Instead of the button's default action |
| onDoneClick | Instead of `onNextClick` on the last step |

- On the last step the order is: the step's `onDoneClick`, the driver's `onDoneClick`, the step's `onNextClick`, the driver's `onNextClick`. A driver-level `onDoneClick` therefore runs instead of a step's own `onNextClick` there.
- On an action step, pressing the disabled Next, the right arrow key or the overlay doesn't run `onNextClick`; completing the step does.
- The click hooks replace the default: automatic navigation is disabled. Call `moveNext()`, `movePrevious()` or `destroy()` yourself. `onNextClick` also runs for the right arrow key, `overlayClickBehavior: "nextStep"`, `advanceOn` and `advance()`.
- `onDoneClick` can be configured at the driver or step level. Driver.js does not destroy the tour automatically; call `driverObj.destroy()` yourself.
- `options.index` is the zero-based index of the currently active step (equivalent to `driverObj.getActiveIndex()`), or `undefined` when driving a single highlight (1.7.0). It always reflects the active step, so inside the `onDeselected` that runs between steps, it points at the step being moved to.
- Content added in `onPopoverRender` stays for the whole step. A position set there is replaced the next time driver.js places the popover; set it in `onPopoverPositioned` instead, and it stays until the next placement. That hook can run once a frame while the page scrolls, so keep it quick.
- `signal` cleans up listeners for you: `window.addEventListener("saved", onSaved, { signal })`.
- `destroy()` does not run `onDestroyStarted`. Neither does a tour that is replaced by another instance.

```javascript
const driverObj = driver({
  onNextClick: (element, step, { config, state, driver }) => {
    // Custom logic before advancing
    driverObj.moveNext();
  },
});
```

### Why a Tour Ended

`onDestroyStarted`, `onDestroyed` and the `onDeselected` that runs on destroy get `opts.reason` (1.10.0):

| Reason | Meaning |
|--------|---------|
| `"done"` | Moved past the last step, including when the remaining steps were skipped |
| `"close"` | The close button |
| `"escape"` | The Escape key |
| `"overlay"` | A click on the overlay |
| `"replaced"` | Another driver instance started |
| `"api"` | Your code called `destroy()`, or `moveTo()` / `movePrevious()` outside the steps |

A `destroy()` you call from a hook (`onDestroyStarted`, `onCloseClick`, `onNextClick` / `onDoneClick` on the last step, an `overlayClickBehavior` function) keeps the reason of the user action that started it. The reason is not set on the other hooks, or on the `onDeselected` that runs between steps. This hook only asks when the user leaves early:

```javascript
onDestroyStarted: (el, step, { reason }) => {
  if (reason === "done" || confirm("Leave?")) {
    driverObj.destroy();
  }
};
```

## Popover Type (Per-Step Popover Config)

Each step's `popover` property accepts these options. The options that also exist on the driver fall back to the driver's value.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| title | string | undefined | Popover title (HTML allowed). Leave one of title / description out to show only the other |
| description | string | undefined | Popover description (HTML allowed) |
| side | `'top'` \| `'right'` \| `'bottom'` \| `'left'` | `'bottom'` | Side of the target element the popover is placed on. It flips to where it fits when it doesn't fit the viewport |
| align | `'start'` \| `'center'` \| `'end'` | `'start'` | Position along that side: `'start'` lines its leading edge up with the element, `'center'` centers it, `'end'` lines up the trailing edges |
| showButtons | AllowedButtons[] | inherited | Buttons to show |
| disableButtons | AllowedButtons[] | inherited | Buttons to show but disable |
| nextBtnText | string | `'Next'` (inherited) | Next button text (HTML allowed) |
| prevBtnText | string | `'Previous'` (inherited) | Previous button text (HTML allowed) |
| doneBtnText | string | `'Done'` (inherited) | Text of the next button on the last step (HTML allowed) |
| closeBtnLabel | string | `'Close'` | Screen reader label of the close button |
| showProgress | boolean | inherited | Show the step count |
| progressText | string | inherited | Progress text template; `{{current}}` and `{{total}}` are replaced |
| popoverClass | string | inherited | Extra class on the popover, for styling |
| instruction | string | undefined | Makes the step an action step: the user has to do this to move on. HTML is allowed (1.12.0). See Action Steps |
| onPopoverRender | (popover: PopoverDOM, opts: HookOpts) => void | inherited | Render callback |
| onPopoverPositioned | (popover: PopoverDOM, opts: HookOpts) => void | inherited | Called every time the popover is placed (1.14.0) |
| onNextClick | DriverHook | inherited | Next click callback |
| onPrevClick | DriverHook | inherited | Previous click callback |
| onCloseClick | DriverHook | inherited | Close click callback |
| onDoneClick | DriverHook | inherited | Runs instead of `onNextClick` when the done button (next button on the last step) is clicked |

Button behavior (from the Popover guide):

- `showButtons` picks the buttons: `"next"`, `"previous"` and `"close"`. A tour shows all three by default. Set it on the driver for every step, or on a step's `popover`.
- `disableButtons` takes the same values and shows the button greyed out. Previous is disabled on the first step.
- The arrow keys follow the buttons: they do nothing when their button is hidden or disabled. Escape does nothing when the close button is disabled.
- `highlight()` shows no buttons by default. Outside a tour, Next and Previous only do something if you set `onNextClick` and `onPrevClick`.
- `nextBtnText`, `prevBtnText` and `doneBtnText` allow HTML.

```javascript
const driverObj = driver({
  showButtons: ["next", "previous"],
  steps: [
    { element: "#search", popover: { title: "Search" } },
    { element: "#export", popover: { title: "Export" } },
  ],
});

driverObj.drive();
```

### Action Steps

An action step is a step with `popover.instruction` (since 1.12.0). The instruction shows in its own row, ending in a pulsing dot while the step waits, and the step only completes through `advanceOn`, `advance()` or `moveNext()`. The Next button, when `showButtons` has it, stays in its place but looks disabled (`aria-disabled`): pressing it, the right arrow key or the overlay shakes the popover instead of moving on, and `onNextClick` doesn't run. Previous, the close button and Escape work as usual. With `advanceDelay`, the dot becomes a check mark and the row and Next turn green for the pause; screen readers hear your `doneBtnText` ("Done") once. In `highlight()` the instruction is a plain line and nothing is gated.

```javascript
{
  element: "#inbox",
  advanceOn: "click",
  popover: {
    title: "Open your inbox",
    instruction: "Click <b>Inbox</b>.",
  },
}
```

## DriveStep Type

Each entry in the `steps` array (or the argument of `highlight()`) has the following shape:

```typescript
type DriveStep = {
  // What to highlight: a CSS selector (first match), an element, or a
  // function returning one. Without it the popover is centered on the
  // screen.
  element?: string | Element | (() => Element);

  // The popover of this step. See Popover Configuration.
  popover?: Popover;

  // Your own data, readable from the step in any hook.
  data?: Record<string, any>;

  // Per-step versions of the driver options with the same name.
  disableActiveInteraction?: boolean | "clicks";
  allowPageInteraction?: boolean;
  advanceOn?: false | string | string[] | AdvanceOnEvent;
  advanceDelay?: number;
  allowedElements?: AllowedElements;
  onInteraction?: InteractionHook;
  waitForElement?: number;
  waitForRemovedElement?: number;
  skipMissingElement?: boolean;
  onElementMissing?: ElementMissing;
  onWaitingForElement?: WaitingForElementHook;
  onElementReplaced?: DriverHook;
  scrollIntoView?: boolean | ScrollIntoViewOpts;
  focus?: StepFocus;
  advanceOnClick?: boolean;

  // Per-step hooks. They run instead of the driver's.
  onHighlightStarted?: DriverHook;
  onHighlighted?: DriverHook;
  onDeselected?: DriverHook;
};
```

If a step names an element that is not on the page, its popover is centered like a step without one, unless `waitForElement` or `skipMissingElement` says otherwise. The step-level `data` was added in 1.6.0.

```javascript
const steps = [
  {
    element: '#my-element',
    popover: {
      title: 'Feature',
      description: 'This is a feature.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: () => document.querySelector('.dynamic-el'),
    popover: { title: 'Dynamic', description: 'Resolved at runtime.' },
    onHighlighted: (element, step, { config, state, driver }) => {
      console.log('Highlighted:', element);
    },
  },
];
```

Omitting `element` displays the popover as a centered modal without highlighting any element.

## State Type

`driverObj.getState()` returns the state, and hooks get it as `opts.state`.

```typescript
type State = {
  // Whether a tour or highlight is showing.
  isInitialized?: boolean;

  // Index, element and step that are active. No index in highlight().
  activeIndex?: number;
  activeElement?: Element;
  activeStep?: DriveStep;

  // Element and step that were active before.
  previousElement?: Element;
  previousStep?: DriveStep;

  // The popover's DOM elements.
  popover?: PopoverDOM;
};
```

## Notes

- Configuration, steps and state belong to the specific `driver()` instance you set them on (1.7.0). Each call to `driver()` is independent, so several instances can coexist and configuring one never affects another. Only one instance is shown at a time: driving or highlighting with one closes any other active instance (1.9.0).
- The driver-level `disableButtons` now applies to tour steps (1.9.0); it used to be ignored during a tour. A step's own `disableButtons` still replaces it.
- Migration (1.10.x → 1.11.0): `showButtons: []` in the driver config now hides all buttons instead of showing all of them. To show every button, list them or omit the option.
- Migration (1.10.x → 1.11.0): `advanceOnClick` is deprecated in favor of `advanceOn: "click"`; it keeps working. A fast double-click no longer skips a step that advances on click, and `advanceOnClick` ignores clicks while a step animates in (1.12.0).
- Since 1.11.0 the popover no longer takes focus from the highlighted element when a step starts. Since 1.12.1 a new popover focuses Next instead of the close button, so Enter no longer ends the tour. Since 1.14.0 `focus` controls this.
- Since 1.11.0 Escape and arrow keys pressed in a text field, select or ARIA widget inside the highlighted element go to your app instead of the tour, and the tour ignores Escape and arrow keys whose `keydown` your app prevented or stopped.
- Since 1.12.0 clicks on the padding around the highlighted element, or on an element with `disableActiveInteraction`, no longer reach your app's `document` and `body` listeners; use `onInteraction` to see them. `disableActiveInteraction: true` also blocks Enter and Space on the highlighted element. A highlighted element that your framework re-renders is followed automatically.
- Since 1.12.0 `onDestroyStarted` gets the step being entered when the tour is closed during its first animation, not `undefined`; the `State` type no longer lists the internal `__` keys added in 1.11.0; a step's `showProgress: false` wins over `showProgress: true` on the driver.
- Since 1.10.2 the popover title and footer are `div`s instead of `header` and `footer` landmarks, and the centered dummy element gets no aria attributes. Hints and popovers in an open `<dialog>` with a `transform` or `filter` stay next to their element, and tour steps scrolled out of a visible scrollable container are scrolled into view.
- Since 1.14.0 the popover scrolls into view only as far as it needs to, so it no longer undoes where the element was scrolled to; `onDestroyed` runs when the tour is closed before the first step has settled; a `waitForElement` longer than about 24 days no longer runs out at once.
- In the headless build (1.13.0), `onInteraction` reports clicks on `allowedElements` as `region: "allowed"` (1.14.0). The headless build is covered by its own pages, not this one.
- Discrepancy between versions of the official docs: the 1.10.1 docs say `overlayOpacity` defaults to 0.5 and `overlayColor` to black; the 1.14.0 docs (configuration and theming pages) say `"#000"` and 0.7. The 1.14.0 changelog does not mention a change. This page follows 1.14.0 and keeps the 1.14.0 usage example (`overlayOpacity: 0.5`) as written.
- Discrepancy in the official 1.14.0 docs: the Action Steps section ends with "In `highlight()`, `action` is only an instruction line"; the option is named `instruction`, not `action`.
- Popover `side` no longer includes `'over'`: the `Side` type is `"top" | "right" | "bottom" | "left"` (1.14.0 docs). The changelog does not mention its removal; the removal version (reported as 1.6.0) was not re-verified against the 1.5.0 / 1.6.0 sources.
- Naming discrepancy: the 1.6.0 changelog entry calls the option `animationDuration`, but the config key in the docs and in `context.ts` is `duration` (default 400). This page uses `duration`.
- The `AdvanceOn`, `PopoverPatch`, `Side`, `Alignment` and `AllowedButtons` types are also exported (see Methods). `StepFocus` is named in the 1.14.0 Config type but its definition is not shown in the docs; its values are `"popover"`, `"element"` and `"none"`.
- Hints and checklist configuration (`HintsConfig`, `ChecklistConfig`) are covered in the hints and checklists categories.
- Source: https://driverjs.com/docs/configuration (driver.js 1.14.0 docs source, apps/docs/src/content/guides/configuration.mdx at tag 1.14.0); popover and button details from https://driverjs.com/docs/popover (apps/docs/src/content/guides/popover.mdx at tag 1.14.0); version annotations from https://driverjs.com/docs/changelog. Fetched 2026-11-14.

## Related

- [Methods](./methods.md)
- [Theming](./theming.md)
