# Build Your Own Tour UI

Four tours with completely different UIs, built on `driver.js/headless`: a checklist panel, a chat assistant, a hand-drawn spotlight and hints inside a form.

## Signature / Usage

Use this when the popover isn't the right shape for your product. With [`driver.js/headless`](./headless-tours.md), driver.js still runs the tour: it finds each element, waits for it and notices when the user does the step. Everything you see is yours.

The four tours below use the same engine with four very different UIs. The code under each demo is the exact code it runs.

### How Far to Go

| You want to... | Use |
| --- | --- |
| Use your colors and fonts on the popover | [Match Your Brand](https://driverjs.com/docs/match-your-brand), [Theming](https://driverjs.com/docs/theming) |
| Add, rename or translate buttons | [Custom Buttons](https://driverjs.com/docs/custom-buttons) |
| Change the popover's markup | [`onPopoverRender`](https://driverjs.com/docs/popover#event-handlers) |
| Draw everything yourself | `driver.js/headless`, on this page |

### The Pattern

Every headless UI is built from the same few hooks. Put your content in `data` on each step and render it when the step starts:

```js
import { driver } from "driver.js/headless";

const tour = driver({
  steps: [{ element: "#save", advanceOn: "click", data: { text: "Save it" } }],
  onHighlighted: (element, step, opts) => show(element, step.data, opts.index),
  onDeselected: element => unmark(element),
  onWaitingForElement: (element, step, opts) => showLoading(opts.signal),
  onDestroyed: () => hide(),
});

tour.drive();
```

Your own buttons call `tour.moveNext()`, `tour.movePrevious()` and `tour.destroy()`. Steps with `advanceOn` move on by themselves when the user does the thing.

### Checklist Panel

The guide is a panel beside the app that ticks off steps as the user does them. Nothing covers the page, and the current target gets an outline from your own CSS class.

`panel.js`:

```js
import { driver } from "driver.js/headless";

const steps = [
  {
    element: "#hp-new",
    advanceOn: "click",
    data: { title: "Start a project" },
  },
  {
    element: "#hp-name",
    advanceOn: {
      event: "input",
      when: element => element.value.trim().length > 2,
    },
    data: { title: "Give it a name" },
  },
  {
    element: "#hp-create",
    advanceOn: "click",
    data: { title: "Create it" },
  },
];

export function startPanelTour(panel) {
  panel.setAttribute("aria-live", "polite");

  const tour = driver({
    steps,
    onHighlighted: (element, step, opts) => {
      element?.classList.add("is-guided");
      renderPanel(panel, opts.index);
    },
    onElementReplaced: element => {
      element.classList.add("is-guided");
    },
    onDeselected: element => {
      element?.classList.remove("is-guided");
    },
    onDestroyed: (element, step, opts) => {
      renderPanel(panel, opts.reason === "done" ? steps.length : -1);
    },
  });

  tour.drive();
  return tour;
}

function renderPanel(panel, current) {
  const done = Math.max(current, 0);
  const items = steps.map((step, index) => {
    const state = index < current ? "done" : index === current ? "current" : "";
    return `<li class="${state}">${step.data.title}</li>`;
  });

  panel.innerHTML = `
    <p class="panel-count">${done} of ${steps.length} done</p>
    <div class="panel-bar" style="--done: ${done / steps.length}"></div>
    <ol>${items.join("")}</ol>
  `;
}
```

`panel.css`:

```css
.is-guided {
  outline: 2px solid #f59e0b;
  outline-offset: 3px;
  transition: outline-color 0.2s;
}

.tour-panel {
  min-width: 200px;
  padding: 16px;
  border-radius: 10px;
  background: #fffbeb;
  font-size: 14px;
}

.panel-bar {
  height: 6px;
  border-radius: 3px;
  background: #fde68a linear-gradient(#f59e0b, #f59e0b) no-repeat;
  background-size: calc(var(--done) * 100%) 100%;
  transition: background-size 0.3s;
}

.tour-panel ol {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

.tour-panel li {
  padding: 4px 0 4px 26px;
  position: relative;
  color: #78716c;
}

.tour-panel li::before {
  content: "○";
  position: absolute;
  left: 4px;
}

.tour-panel li.current {
  color: #1c1917;
  font-weight: 600;
}

.tour-panel li.current::before {
  content: "→";
  color: #f59e0b;
}

.tour-panel li.done {
  text-decoration: line-through;
}

.tour-panel li.done::before {
  content: "✓";
  color: #16a34a;
}
```

- `onHighlighted` adds a class to the element and redraws the panel. `opts.index` is the current step.
- `onDeselected` takes the class off again, also when the tour ends. If your framework re-renders the button, `onElementReplaced` puts the class on the new one.
- `opts.reason === "done"` in `onDestroyed` tells a finished tour from a closed one.

### Chat Assistant

Each step arrives as a chat message. Upload takes a moment, so the assistant shows that it's waiting until the Share button appears.

`assistant.js`:

```js
import { driver } from "driver.js/headless";

export function startAssistantTour(chat) {
  chat.setAttribute("role", "log");

  const say = (html, kind = "bot") => {
    const message = document.createElement("p");
    message.className = `chat-message ${kind}`;
    message.innerHTML = html;
    chat.append(message);
    chat.scrollTop = chat.scrollHeight;
    return message;
  };

  const tour = driver({
    steps: [
      {
        element: "#ha-upload",
        advanceOn: "click",
        data: { say: "Hi! Let's share a file. Click <b>Upload</b>." },
      },
      {
        element: "#ha-share",
        waitForElement: 5000,
        advanceOn: "click",
        data: { say: "It's up. Now click <b>Share</b> next to it." },
      },
      {
        element: "#ha-copy",
        advanceOn: "click",
        data: { say: "Last one: <b>Copy link</b>." },
      },
    ],
    onHighlightStarted: (element, step) => {
      say(step.data.say);
    },
    onWaitingForElement: (element, step, opts) => {
      const typing = say("Uploading…", "typing");
      opts.signal.addEventListener("abort", () => typing.remove());
    },
    onDestroyed: (element, step, opts) => {
      say(opts.reason === "done" ? "All set! 🎉" : "Talk later 👋");
    },
  });

  tour.drive();
  return tour;
}
```

`assistant.css`:

```css
.chat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 220px;
  overflow-y: auto;
  padding: 12px;
  border-radius: 12px;
  background: #f1f5f9;
  font-size: 14px;
}

.chat-message {
  max-width: 85%;
  margin: 0;
  padding: 8px 12px;
  border-radius: 14px 14px 14px 4px;
  background: #fff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
  animation: chat-in 0.25s ease-out;
}

.chat-message.typing {
  color: #64748b;
  font-style: italic;
}

@keyframes chat-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}
```

- `onHighlightStarted` posts the step's message as soon as its element is found.
- `waitForElement` holds the tour while the upload runs. `onWaitingForElement` shows "Uploading…", and its `signal` removes it when the wait ends.
- The same setup works for an AI assistant: put the step text in `data` and let your chat render it.

### Hand-Drawn Spotlight

Your own highlight: a dashed ring that glides between elements, with a sticky note and your own buttons and keys. No overlay and no popover from driver.js.

`spotlight.js`:

```js
import { driver } from "driver.js/headless";

const steps = [
  { element: "#hs-visits", data: { text: "Visits, live." } },
  { element: "#hs-sales", data: { text: "Sales this week." } },
  { element: "#hs-chart", data: { text: "Your trend at a glance." } },
];

export function startSpotlightTour() {
  const ring = document.createElement("div");
  ring.className = "spot-ring";
  const note = document.createElement("div");
  note.className = "spot-note";
  note.innerHTML = `
    <p></p>
    <small></small>
    <button data-go="back">Back</button>
    <button data-go="next">Next</button>
  `;
  document.body.append(ring, note);

  const [text, count, back, next] = note.children;

  const tour = driver({
    steps,
    onHighlighted: (element, step, opts) => {
      element.scrollIntoView({ block: "nearest" });
      place();

      text.textContent = step.data.text;
      count.textContent = `${opts.index + 1} / ${steps.length}`;
      back.hidden = opts.driver.isFirstStep();
      next.textContent = opts.driver.isLastStep() ? "Done" : "Next";
    },
    onDestroyed: () => {
      listeners.abort();
      ring.remove();
      note.remove();
    },
  });

  function place() {
    const target = tour.getActiveElement();
    if (!target) {
      return;
    }

    const rect = target.getBoundingClientRect();
    ring.style.translate = `${rect.left - 8}px ${rect.top - 8}px`;
    ring.style.width = `${rect.width + 16}px`;
    ring.style.height = `${rect.height + 16}px`;
    note.style.translate = `${rect.left}px ${rect.bottom + 18}px`;
  }

  const listeners = new AbortController();
  const { signal } = listeners;
  window.addEventListener("scroll", place, { capture: true, signal });
  window.addEventListener("resize", place, { signal });

  back.addEventListener("click", () => tour.movePrevious());
  next.addEventListener("click", () => tour.moveNext());

  window.addEventListener(
    "keydown",
    event => {
      const isTyping = event.target.closest?.("input, textarea, select");
      if (isTyping || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (event.key === "ArrowRight") {
        tour.moveNext();
      } else if (event.key === "ArrowLeft" && !tour.isFirstStep()) {
        tour.movePrevious();
      } else if (event.key === "Escape") {
        tour.destroy();
      }
    },
    { signal }
  );

  tour.drive();
  return tour;
}
```

`spotlight.css`:

```css
.spot-ring,
.spot-note {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  transition:
    translate 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
    width 0.35s,
    height 0.35s;
}

.spot-ring {
  border: 3px dashed #ec4899;
  border-radius: 14px;
  pointer-events: none;
  animation: spot-spin 6s linear infinite;
}

.spot-note {
  width: max-content;
  max-width: 260px;
  padding: 12px 14px;
  background: #fef08a;
  box-shadow: 2px 3px 0 #1f2937;
  font-family: "Comic Sans MS", "Marker Felt", cursive;
  rotate: -2deg;
}

.spot-note p {
  margin: 0 0 6px;
  font-size: 15px;
}

.spot-note small {
  margin-right: 6px;
}

.spot-note button {
  margin: 6px 6px 0 0;
  padding: 2px 10px;
  border: 2px solid #1f2937;
  background: #fff;
  font: inherit;
  cursor: pointer;
}

@keyframes spot-spin {
  50% {
    border-color: #8b5cf6;
  }
}
```

- `getBoundingClientRect()` on `tour.getActiveElement()` places the ring, so it stays on the element even after a re-render. A CSS transition on `translate`, `width` and `height` makes it glide.
- The note's buttons are built once and only their text changes, so keyboard focus stays on Next between steps.
- The headless build doesn't scroll or listen to keys, so the code does both: `scrollIntoView()`, then the arrow keys and Escape, skipped while the user types in a field.
- One `AbortController` removes every listener in `onDestroyed`.

### Hints Inside a Form

The guidance is part of the form: a line of help under the current field, and the tour moves on when the field is filled in correctly. Sign up unlocks at the end.

`inline.js`:

```js
import { driver } from "driver.js/headless";

export function startInlineTour() {
  const hint = document.createElement("p");
  hint.className = "inline-hint";
  hint.id = "tour-hint";

  const tour = driver({
    steps: [
      {
        element: "#hi-email",
        advanceOn: {
          event: "change",
          when: element => element.checkValidity(),
        },
        data: { hint: "Your work email. Press Tab when you're done." },
      },
      {
        element: "#hi-password",
        advanceOn: {
          event: "input",
          when: element => element.value.length >= 8,
        },
        data: { hint: "At least 8 characters. Keep typing…" },
      },
      {
        element: "#hi-terms",
        advanceOn: {
          event: "change",
          when: element => element.checked,
        },
        data: { hint: "Tick this one and you're in." },
      },
    ],
    onHighlighted: (element, step) => {
      hint.textContent = step.data.hint;
      element.closest(".field").append(hint);
      element.setAttribute("aria-describedby", hint.id);
    },
    onDeselected: element => {
      element?.removeAttribute("aria-describedby");
    },
    onDestroyed: (element, step, opts) => {
      hint.remove();
      if (opts.reason === "done") {
        document.querySelector("#hi-submit").disabled = false;
      }
    },
  });

  tour.drive();
  return tour;
}
```

`inline.css`:

```css
.field:has(.inline-hint) input {
  border-color: #0ea5e9;
  box-shadow: 0 0 0 4px rgb(14 165 233 / 0.15);
}

.inline-hint {
  margin: 6px 0 0;
  padding-left: 10px;
  border-left: 3px solid #0ea5e9;
  color: #0369a1;
  font-size: 13px;
  animation: hint-in 0.3s ease-out;
}

@keyframes hint-in {
  from {
    opacity: 0;
    translate: -6px 0;
  }
}
```

- `advanceOn` with `when` checks the field and moves on once it's right. The email waits for `change`, so the tour doesn't jump ahead mid-address. The password checks on every keystroke.
- `onHighlighted` moves one hint element into the current field and links it with `aria-describedby`, so screen readers read it too. Focus stays where the user put it.
- `:has(.inline-hint)` styles the current field with plain CSS.

**Uses**: [`driver.js/headless`](./headless-tours.md), [`advanceOn`](https://driverjs.com/docs/action-driven-tours), [`waitForElement` and `onWaitingForElement`](https://driverjs.com/docs/configuration#missing-elements), [hooks](https://driverjs.com/docs/configuration#hooks), [navigation](https://driverjs.com/docs/api#navigation)

## Notes

- `driver.js/headless` is available since 1.13.0.
- The official page shows four live demos next to the code; only the code is reproduced here. The demo markup (`#hp-new`, `#hs-visits` ... ids) belongs to the docs site, so these snippets need your own page structure to run. The `.js` and `.css` files are copied verbatim from `apps/docs/src/examples/headless/` at tag 1.14.0 (the files the page imports with `?raw`).
- The official page lists this recipe in the "Recipes" group; this skill keeps it with the Tours examples because it builds on the headless build.
- Source: https://driverjs.com/docs/build-your-own-tour-ui (driver.js 1.14.0 docs source, apps/docs/src/content/guides/build-your-own-tour-ui.mdx and apps/docs/src/examples/headless/*.{js,css} at tag 1.14.0).

## Related

- [Headless Tours](./headless-tours.md)
- [Action-Driven Tours](./action-driven-tours.md)
- [Highlight & Popover](./highlight-and-popover.md)
- [Configuration](../api/configuration.md)
