# Wizard Form / Funnel

Advanced Usage: https://react-hook-form.com/advanced-usage#WizardFormFunnel

It's pretty common to collect user information through different pages and sections. We recommend using a state management library to store user input through different pages or sections. In this example, we are going to use [little state machine](https://github.com/bluebill1049/little-state-machine) as our state management library (you can replace it with [redux](https://github.com/reduxjs/redux) if you are more familiar with it).

## Signature / Usage

**Step 1:** Set up your routes and store.

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createStore } from "little-state-machine"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Result from "./Result"

createStore({
  data: {
    firstName: "",
    lastName: "",
  },
})

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}
```

**Step 2:** Create your pages, collect and submit the data to the store and push to the next form/page.

```javascript
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useStateMachine } from "little-state-machine"
import updateAction from "./updateAction"

export default function Step1() {
  const { register, handleSubmit } = useForm()
  const { actions } = useStateMachine({ actions: { updateAction } })
  const navigate = useNavigate()
  const onSubmit = (data) => {
    actions.updateAction(data)
    navigate("/step2")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="submit" />
    </form>
  )
}
```

**Step 3:** Make your final submission with all the data in the store or display the resulting data.

```javascript
import { useStateMachine } from "little-state-machine"

export default function Result() {
  const { state } = useStateMachine()

  return <pre>{JSON.stringify(state, null, 2)}</pre>
}
```

## Notes

- Following the above pattern, you should be able to build a wizard form/funnel to collect user input data from multiple pages.
- The official example uses `react-router-dom` and `little-state-machine`; the implementation of `updateAction` is not shown in the source.

## Related

- [useform](../api/useform.md)
- [formprovider](../api/formprovider.md)
