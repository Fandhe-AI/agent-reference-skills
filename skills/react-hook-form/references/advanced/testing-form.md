# Testing Form

Advanced Usage: https://react-hook-form.com/advanced-usage#TestingForm

We recommend using [testing-library](https://testing-library.com/), because it is simple and tests are more focused on user behavior.

## Signature / Usage

**Step 1:** Set up your testing environment.

Please install [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) with the latest version of `jest`, because react-hook-form uses `MutationObserver` to detect inputs, and to get unmounted from the DOM.

```bash
npm install -D @testing-library/jest-dom
```

`setup.js`:

```javascript
import "@testing-library/jest-dom"
```

`jest.config.js`:

```javascript
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setup.js"], // or .ts for TypeScript App
  // ...other settings
}
```

**Note:** If you are using React Native, you don't need to install `@testing-library/jest-dom`, but you need to create setup.js, define `window` object, and include the following lines in the setup file:

```javascript
global.window = {}
global.window = global
```

**Step 2:** Create login form. We have set the role attribute accordingly. These attributes are helpful when writing tests and improving accessibility.

```javascript
import { useForm } from "react-hook-form"

export default function App({ login }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const onSubmit = async (data) => {
    await login(data.email, data.password)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">email</label>
      <input
        id="email"
        {...register("email", {
          required: "required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })}
        type="email"
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      <label htmlFor="password">password</label>
      <input
        id="password"
        {...register("password", {
          required: "required",
          minLength: {
            value: 5,
            message: "min length is 5",
          },
        })}
        type="password"
      />
      {errors.password && <span role="alert">{errors.password.message}</span>}
      <button type="submit">SUBMIT</button>
    </form>
  )
}
```

**Step 3:** Write tests. The following criteria are what we aim to cover with the tests: test submission failure, test validation associated with each input, and test successful submission (excerpt of the official tests below).

```javascript
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import App from "./App"

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password })
})

it("should display required error when value is invalid", async () => {
  render(<App login={mockLogin} />)

  fireEvent.submit(screen.getByRole("button"))

  expect(await screen.findAllByRole("alert")).toHaveLength(2)
  expect(mockLogin).not.toBeCalled()
})

it("should not display error when value is valid", async () => {
  render(<App login={mockLogin} />)

  fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
    target: {
      value: "test@mail.com",
    },
  })

  fireEvent.input(screen.getByLabelText("password"), {
    target: {
      value: "password",
    },
  })

  fireEvent.submit(screen.getByRole("button"))

  await waitFor(() => {
    expect(screen.queryAllByRole("alert")).toHaveLength(0)
    // reset() fires after the async login resolves and triggers a re-render;
    // all post-reset assertions must be inside waitFor so they retry until
    // the DOM reflects the new state.
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue("")
    expect(screen.getByLabelText("password")).toHaveValue("")
  })
  expect(mockLogin).toBeCalledWith("test@mail.com", "password")
})
```

### Resolving act warning during test

If you test a component that uses react-hook-form, you might run into a warning like this, even if you didn't write any asynchronous code for that component:

> Warning: An update to MyComponent inside a test was not wrapped in act(...)

The test merely renders a simple form (using `mode: "onChange"`) and checks for the presence of a button, yet it still logs the warning. To solve this, wait until some element from your UI appears with `find*` queries:

```javascript
import { render, screen } from "@testing-library/react"
import App from "./App"

it("should have a submit button", async () => {
  render(<App />)

  expect(await screen.findByText("SUBMIT")).toBeInTheDocument()

  // Now that the UI was awaited until the async behavior was complete,
  // you can keep asserting with `get*` queries.
  expect(screen.getByRole("textbox")).toBeInTheDocument()
})
```

## Notes

- We are using `waitFor` util and `find*` queries to detect submission feedback, because the `handleSubmit` method is executed asynchronously.
- We are using the `*ByRole` method when querying different elements because that's how users recognize your UI component.
- The act warning occurs because react-hook-form internally uses asynchronous validation handlers. In order to compute the formState, it has to initially validate the form, which is done asynchronously and results in another render. That update happens after the test function returns, which triggers the warning.
- You **must not** wrap your `render()` calls in `act()`.

## Related

- [useform-handlesubmit](../api/useform-handlesubmit.md)
- [accessibility](./accessibility.md)
