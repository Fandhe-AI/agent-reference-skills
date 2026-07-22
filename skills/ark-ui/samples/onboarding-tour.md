# Onboarding Tour

Define an ordered list of steps and drive them with `useTour()`, passing the returned instance to `Tour.Root` via the `tour` prop.

```tsx
import { Tour, useTour } from '@ark-ui/react/tour'
import type { TourStepDetails } from '@ark-ui/react/tour'

const steps: TourStepDetails[] = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome!',
    description: 'Let me show you around.',
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'feature',
    type: 'tooltip',
    placement: 'top-start',
    target: () => document.querySelector('#main-feature'),
    title: 'Main Feature',
    description: 'This is our primary feature.',
    actions: [
      { label: 'Previous', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'All Done!',
    description: "You're ready to explore.",
    actions: [{ label: 'Close', action: 'close' }],
  },
]

export const OnboardingTour = () => {
  const tour = useTour({ steps })

  return (
    <>
      <Tour.Root tour={tour}>
        <Tour.Backdrop />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Title />
            <Tour.Description />
            <Tour.Actions>
              <Tour.ActionTrigger />
            </Tour.Actions>
            <Tour.CloseTrigger />
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>

      <button onClick={() => tour.start()}>Start Tour</button>
    </>
  )
}
```

## Notes

- `useTour({ steps })` creates the tour instance; pass it into `Tour.Root` via the `tour` prop (not children props or context).
- `target` is a function returning the DOM element to anchor a `tooltip`-type step; `dialog`-type steps render centered without a target, and `floating`/`wait` types are also supported.
- Because `tour` is created outside `Tour.Root`, any sibling (e.g. a "Show me around" button) can call `tour.start()` to launch the tour on demand.
- `step.actions` map declaratively to built-in tour actions (`next`, `prev`, `close`, `skip`); `Tour.ActionTrigger` renders one trigger per action.
