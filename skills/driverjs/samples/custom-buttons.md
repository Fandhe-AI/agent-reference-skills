# Custom Buttons

Add Skip and Restart buttons from any step, and rename or translate the built-in buttons.

```javascript
const driverObj = driver({
  showButtons: ["next", "previous"],
  steps: [
    // ...
  ],
  onPopoverRender: (popover, { driver }) => {
    const button = document.createElement("button");
    button.className = "driver-popover-footer-btn";

    if (driver.isLastStep()) {
      button.innerText = "Restart";
      button.addEventListener("click", () => driver.drive(0));
    } else {
      button.innerText = "Skip tour";
      button.addEventListener("click", () => driver.destroy());
    }

    popover.footerButtons.prepend(button);
  },
});

driverObj.drive();
```

```javascript
const labels = {
  en: {
    next: "Next",
    prev: "Back",
    done: "Done",
    of: "of",
    close: "Close tour",
  },
  de: {
    next: "Weiter",
    prev: "Zurück",
    done: "Fertig",
    of: "von",
    close: "Tour schließen",
  },
};

const lang = navigator.language.slice(0, 2);
const t = labels[lang] ?? labels.en;

const driverObj = driver({
  showProgress: true,
  nextBtnText: `${t.next} &rarr;`,
  prevBtnText: `&larr; ${t.prev}`,
  doneBtnText: t.done,
  progressText: `{{current}} ${t.of} {{total}}`,
  closeBtnLabel: t.close,
  steps: [
    // ...
  ],
});
```

## Notes

- `onPopoverRender` gets the popover DOM before it shows; the `driver-popover-footer-btn` class gives custom buttons the default button look (needed since 1.6.0)
- The built-in buttons take their text from options and HTML is allowed; set them on a step's `popover` to change one step only, like "Let's go" on the first
- `closeBtnLabel` (the close button's accessible label) is since 1.9.0
- Previously covered by the custom-popover-buttons sample (single Skip button); this one adds Restart and translation
- Source: https://driverjs.com/docs/custom-buttons (driver.js 1.14.0 docs source, apps/docs/src/content/guides/custom-buttons.mdx at tag 1.14.0).

## Related

- [Examples](../references/examples/README.md)
- [Configuration](../references/api/configuration.md)
