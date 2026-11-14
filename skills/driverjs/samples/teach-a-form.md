# Teach a Form

Explain a form field by field with highlights, or walk users through filling it in with steps that only move on when each field is valid.

```javascript
const driverObj = driver({
  stagePadding: 0,
  onDestroyed: () => document.activeElement?.blur(),
});

const help = {
  "#name": { title: "Name", description: "Your full name" },
  "#education": { title: "Education", description: "Degree" },
  "#age": { title: "Age", description: "In years" },
  "#address": { title: "Address", description: "Street, city" },
};

Object.entries(help).forEach(([selector, popover]) => {
  const element = document.querySelector(selector);

  element.addEventListener("focus", () => {
    driverObj.highlight({ element, popover });
  });
});

document
  .querySelector("#submit-btn")
  .addEventListener("focus", () => driverObj.destroy());
```

```javascript
const driverObj = driver({
  showButtons: ["next", "close"],
  steps: [
    {
      element: "#password",
      advanceOn: {
        event: "input",
        when: element => element.value.length >= 8,
      },
      advanceDelay: 800,
      popover: {
        title: "Choose a password",
        instruction: "Type at least 8 characters.",
      },
    },
    {
      element: "#terms",
      advanceOn: "change",
      popover: {
        title: "The fine print",
        instruction: "Accept the terms.",
      },
    },
    {
      element: "#submit",
      advanceOn: "click",
      popover: {
        title: "Create the account",
        instruction: "Click <b>Create account</b>.",
      },
    },
    {
      element: "#created",
      waitForElement: 1000,
      popover: {
        title: "Account created",
        showButtons: ["next"],
      },
    },
  ],
});

driverObj.drive();
```

## Notes

- First snippet: `highlight()` on focus shows help next to the field the user is in
- Second snippet: `advanceOn` with `when` checks the field on every event, so the step completes the moment the value is valid (`advanceOn` and `when` since 1.11.0; `popover.instruction` and `advanceDelay` since 1.12.0)
- `advanceDelay` shows the done state before moving on
- To say what is wrong instead of waiting, call `driver.nudge("...")` from `when` and return `false` (`nudge()` since 1.11.0; see the Action-Driven Tours guide)
- Source: https://driverjs.com/docs/teach-a-form (driver.js 1.14.0 docs source, apps/docs/src/content/guides/teach-a-form.mdx at tag 1.14.0).
