# Chakra UI v3 — Components

## Concepts

| Name | Description | Path |
|------|-------------|------|
| Animation | Chakra UI recommends using CSS animations to animate components for optimal performance and control over enter/exit states. | [./concepts/animation.md](./concepts/animation.md) |
| Color Mode | Chakra UI supports light and dark color modes via `next-themes` integration. | [./concepts/color-mode.md](./concepts/color-mode.md) |
| Composition | Patterns for composing and customizing Chakra UI components. | [./concepts/composition.md](./concepts/composition.md) |
| Overview | コンポーネントの概要と基本概念 | [./concepts/overview.md](./concepts/overview.md) |
| Server Components | Guide for using Chakra UI with React Server Components (RSC). | [./concepts/server-components.md](./concepts/server-components.md) |
| Testing | Best practices for testing React components that use Chakra UI, with Vitest or Jest. | [./concepts/testing.md](./concepts/testing.md) |

## Layout

| Name | Description | Path |
|------|-------------|------|
| AbsoluteCenter | Centers a child element absolutely within a relatively-positioned parent, along a specified axis. | [./layout/absolute-center.md](./layout/absolute-center.md) |
| AspectRatio | Constrains a child element to a specific aspect ratio. | [./layout/aspect-ratio.md](./layout/aspect-ratio.md) |
| Bleed | Applies negative margins to allow a child element to "bleed" outside its parent's padding. | [./layout/bleed.md](./layout/bleed.md) |
| Box | The most fundamental layout component. A `div` with Chakra style props. | [./layout/box.md](./layout/box.md) |
| Center | A layout component that centers its children both horizontally and vertically using flexbox. | [./layout/center.md](./layout/center.md) |
| Container | A layout component that constrains content to a maximum width and centers it horizontally. | [./layout/container.md](./layout/container.md) |
| Flex | A `Box` with `display: flex` and shorthand props for common flexbox properties. Also exports `HStack` and `VStack` as convenient aliases. | [./layout/flex.md](./layout/flex.md) |
| Float | Positions a child element at a specific corner or edge of a relatively-positioned parent. Useful for badges, indicators, and status dots. | [./layout/float.md](./layout/float.md) |
| Grid | A `Box` with `display: grid` and shorthand props for CSS Grid layout. Includes `GridItem` for controlling individual grid cells. | [./layout/grid.md](./layout/grid.md) |
| Group | A layout component that groups child elements together, with optional `attached` mode for visually connecting them. | [./layout/group.md](./layout/group.md) |
| ScrollArea | A custom scrollable container with styled scrollbars. Composed of `ScrollArea.Root`, `ScrollArea.Viewport`, `ScrollArea.Content`, `ScrollArea.Scrollbar`, `ScrollArea.Thumb`, and `ScrollArea.Corner`. | [./layout/scroll-area.md](./layout/scroll-area.md) |
| Separator | A horizontal or vertical visual divider between content sections. | [./layout/separator.md](./layout/separator.md) |
| SimpleGrid | A simplified Grid component for common equal-column layouts. | [./layout/simple-grid.md](./layout/simple-grid.md) |
| Splitter | A resizable panel layout component. Composed of `Splitter.Root`, `Splitter.Panel`, `Splitter.ResizeTrigger`, and `Splitter.ResizeTriggerSeparator`. | [./layout/splitter.md](./layout/splitter.md) |
| Stack | A layout component that stacks children with equal spacing. Also exports `HStack` (horizontal) and `VStack` (vertical) aliases. | [./layout/stack.md](./layout/stack.md) |
| Wrap | A layout component that wraps children and adds consistent spacing between them. Children wrap to the next line when the container is too narrow. | [./layout/wrap.md](./layout/wrap.md) |

## Typography

| Name | Description | Path |
|------|-------------|------|
| Blockquote | A styled blockquote component for displaying quoted content with optional citation and icon. Composed of `Blockquote.Root`, `Blockquote.Content`, `Blockquote.Caption`, and `Blockquote.Icon`. | [./typography/blockquote.md](./typography/blockquote.md) |
| Code | An inline code element for displaying short code snippets within text. | [./typography/code.md](./typography/code.md) |
| CodeBlock | A syntax-highlighted code block component. Requires a syntax highlighting adapter (Shiki or Highlight.js). Composed of `CodeBlock.Root`, `CodeBlock.Header`, `CodeBlock.Content`, `CodeBlock.Code`, `CodeBlock.CodeText`, `CodeBlock.CopyTrigger`, etc. | [./typography/code-block.md](./typography/code-block.md) |
| Em | A semantic inline element for emphasized text, renders as `<em>`. | [./typography/em.md](./typography/em.md) |
| Heading | A semantic heading component that renders `<h2>` by default. Use the `as` prop for different heading levels. | [./typography/heading.md](./typography/heading.md) |
| Highlight | Highlights matching words or phrases within a text string with custom styles. | [./typography/highlight.md](./typography/highlight.md) |
| Kbd | Represents keyboard input or a keyboard shortcut key. | [./typography/kbd.md](./typography/kbd.md) |
| Link | A styled anchor element for navigation. | [./typography/link.md](./typography/link.md) |
| LinkOverlay | Stretches a link to cover a container element, making an entire area clickable while preserving inner links. | [./typography/link-overlay.md](./typography/link-overlay.md) |
| List | A styled list component. Composed of `List.Root` and `List.Item`, with optional `List.Indicator` for custom markers. | [./typography/list.md](./typography/list.md) |
| Mark | A semantic inline element for marking or highlighting text, renders as `<mark>`. | [./typography/mark.md](./typography/mark.md) |
| Prose | A composition component that applies consistent typographic styling to raw HTML content (e.g., from a CMS or markdown renderer). Available as a snippet component. | [./typography/prose.md](./typography/prose.md) |
| RichTextEditor | A rich text editor component powered by Tiptap. Available as a snippet component. | [./typography/rich-text-editor.md](./typography/rich-text-editor.md) |
| Text | The primary text component. A `<p>` element with Chakra style props. | [./typography/text.md](./typography/text.md) |

## Buttons

| Name | Description | Path |
|------|-------------|------|
| Button | A versatile button component with multiple variants, sizes, and loading states. Also exports `IconButton` and `ButtonGroup`. | [./buttons/button.md](./buttons/button.md) |
| CloseButton | A button for dismissing or closing UI elements, renders an `×` icon by default. | [./buttons/close-button.md](./buttons/close-button.md) |
| DownloadTrigger | A trigger element that initiates a file download when clicked. Supports static data, async data, and various MIME types. | [./buttons/download-trigger.md](./buttons/download-trigger.md) |
| IconButton | A square button designed to display a single icon. | [./buttons/icon-button.md](./buttons/icon-button.md) |

## Date and Time

| Name | Description | Path |
|------|-------------|------|
| Calendar | An inline calendar component for selecting dates or date ranges, displayed without a popover trigger. | [./date-time/calendar.md](./date-time/calendar.md) |
| DatePicker | A date picker component with a popover calendar. Composed of `DatePicker.Root`, `DatePicker.Control`, `DatePicker.Input`, `DatePicker.Trigger`, `DatePicker.Positioner`, `DatePicker.Content`, `DatePicker.View`, `DatePicker.ViewControl`, `DatePicker.Table`, and more. | [./date-time/date-picker.md](./date-time/date-picker.md) |

## Forms

| Name | Description | Path |
|------|-------------|------|
| Checkbox | Accessible checkbox input supporting indeterminate state, sizes, and variants. | [./forms/checkbox.md](./forms/checkbox.md) |
| Checkbox Card | Card-style checkbox with optional description and addon sections. | [./forms/checkbox-card.md](./forms/checkbox-card.md) |
| Color Picker | Full-featured color picker with area, channel sliders, eye dropper, and swatch support. | [./forms/color-picker.md](./forms/color-picker.md) |
| Color Swatch | Displays a color swatch box in various sizes and shapes. | [./forms/color-swatch.md](./forms/color-swatch.md) |
| Editable | Inline text editing that toggles between a display and an input state. | [./forms/editable.md](./forms/editable.md) |
| Field | Wraps form controls with a label, helper text, and error message with proper accessibility associations. | [./forms/field.md](./forms/field.md) |
| Fieldset | Groups related form fields with a legend, helper text, and error message. | [./forms/fieldset.md](./forms/fieldset.md) |
| File Upload | Drag-and-drop or click-to-browse file input with file list management. | [./forms/file-upload.md](./forms/file-upload.md) |
| Input | Single-line text input field. | [./forms/input.md](./forms/input.md) |
| Native Select | Native HTML select element with Chakra styling. | [./forms/native-select.md](./forms/native-select.md) |
| Number Input | Numeric input with increment/decrement controls and formatting support. | [./forms/number-input.md](./forms/number-input.md) |
| Password Input | Input field that toggles between visible and masked password text. | [./forms/password-input.md](./forms/password-input.md) |
| Pin Input | One-time password or PIN entry with individual character fields. | [./forms/pin-input.md](./forms/pin-input.md) |
| Radio | Radio button group for single-option selection. | [./forms/radio.md](./forms/radio.md) |
| Radio Card | Card-style radio group with optional description and addon content. | [./forms/radio-card.md](./forms/radio-card.md) |
| Rating | Star rating input with optional half-star support and read-only display mode. | [./forms/rating.md](./forms/rating.md) |
| Segmented Control | Tab-like toggle group for mutually exclusive options with an animated selection indicator. | [./forms/segmented-control.md](./forms/segmented-control.md) |
| Slider | Draggable range input supporting single and multi-thumb configurations. | [./forms/slider.md](./forms/slider.md) |
| Switch | Toggle switch for boolean on/off state. | [./forms/switch.md](./forms/switch.md) |
| Tags Input | Input that creates, displays, and removes tag/chip values. | [./forms/tags-input.md](./forms/tags-input.md) |
| Textarea | Multi-line text input field with optional auto-resize behavior. | [./forms/textarea.md](./forms/textarea.md) |

## Collections

| Name | Description | Path |
|------|-------------|------|
| Combobox | Searchable dropdown with autocomplete and custom value support. | [./collections/combobox.md](./collections/combobox.md) |
| Listbox | Scrollable list of selectable items without a dropdown trigger. | [./collections/listbox.md](./collections/listbox.md) |
| Select | Accessible dropdown select with support for single and multiple selection. | [./collections/select.md](./collections/select.md) |
| Tree View | Hierarchical tree structure with expand/collapse, selection, and async loading support. | [./collections/tree-view.md](./collections/tree-view.md) |

## Overlays

| Name | Description | Path |
|------|-------------|------|
| Action Bar | Floating action bar that appears when items are selected, typically docked at the bottom of the viewport. | [./overlays/action-bar.md](./overlays/action-bar.md) |
| Dialog | Modal dialog with backdrop, focus trapping, and multiple size/placement options. | [./overlays/dialog.md](./overlays/dialog.md) |
| Drawer | Slide-in panel from any edge of the viewport, similar to Dialog. | [./overlays/drawer.md](./overlays/drawer.md) |
| Hover Card | Popover-style card triggered on hover, for previewing content without navigation. | [./overlays/hover-card.md](./overlays/hover-card.md) |
| Menu | Dropdown menu with keyboard navigation, checkbox/radio items, and nested submenus. | [./overlays/menu.md](./overlays/menu.md) |
| Overlay Manager | Programmatic API for opening, closing, and updating overlays (dialogs, drawers, etc.) imperatively. | [./overlays/overlay-manager.md](./overlays/overlay-manager.md) |
| Popover | Floating interactive panel anchored to a trigger element. | [./overlays/popover.md](./overlays/popover.md) |
| Toggle Tip | A tooltip-styled component that toggles open on click rather than hover, combining tooltip appearance with popover behavior. | [./overlays/toggle-tip.md](./overlays/toggle-tip.md) |
| Tooltip | Small informational label that appears on hover or focus of a trigger element. | [./overlays/tooltip.md](./overlays/tooltip.md) |

## Disclosure

| Name | Description | Path |
|------|-------------|------|
| Accordion | A vertically stacked set of interactive headings that reveal or hide associated sections of content. | [./disclosure/accordion.md](./disclosure/accordion.md) |
| Breadcrumb | A navigation component that shows the user's current location within a hierarchy. | [./disclosure/breadcrumb.md](./disclosure/breadcrumb.md) |
| Carousel | A slideshow component for cycling through elements such as images or cards. | [./disclosure/carousel.md](./disclosure/carousel.md) |
| Collapsible | A component that expands and collapses content with an animated transition. | [./disclosure/collapsible.md](./disclosure/collapsible.md) |
| Pagination | A navigation component for moving between pages of content. | [./disclosure/pagination.md](./disclosure/pagination.md) |
| Steps | A multi-step navigation component for guiding users through sequential tasks. | [./disclosure/steps.md](./disclosure/steps.md) |
| Tabs | A set of layered sections of content, known as tab panels, that display one panel at a time. | [./disclosure/tabs.md](./disclosure/tabs.md) |

## Feedback

| Name | Description | Path |
|------|-------------|------|
| Alert | A component used to display a brief, important message in a way that attracts the user's attention. | [./feedback/alert.md](./feedback/alert.md) |
| EmptyState | A component that provides a placeholder UI when there is no data to display. | [./feedback/empty-state.md](./feedback/empty-state.md) |
| Progress | A linear progress bar that shows the completion status of a task. | [./feedback/progress.md](./feedback/progress.md) |
| ProgressCircle | A circular progress indicator that shows the completion status of a task. | [./feedback/progress-circle.md](./feedback/progress-circle.md) |
| Skeleton | A placeholder component that mimics content layout while data is loading. | [./feedback/skeleton.md](./feedback/skeleton.md) |
| Spinner | An animated loading indicator used to signal that content is being fetched or an action is in progress. | [./feedback/spinner.md](./feedback/spinner.md) |
| Status | A small indicator component used to communicate the status of an entity. | [./feedback/status.md](./feedback/status.md) |
| Toast / Toaster | A brief notification message displayed in response to a user action, rendered outside the normal document flow. | [./feedback/toast.md](./feedback/toast.md) |

## Data Display

| Name | Description | Path |
|------|-------------|------|
| Avatar | A component that represents a user with an image or fallback initials/icon. | [./data-display/avatar.md](./data-display/avatar.md) |
| Badge | A small label component used to highlight an item's status or category. | [./data-display/badge.md](./data-display/badge.md) |
| Card | A flexible container component for grouping related content and actions. | [./data-display/card.md](./data-display/card.md) |
| Clipboard | A component that copies text to the clipboard with visual feedback. | [./data-display/clipboard.md](./data-display/clipboard.md) |
| DataList | A component for displaying key-value pairs in a structured list format. | [./data-display/data-list.md](./data-display/data-list.md) |
| Icon | A wrapper component for rendering SVG icons with consistent sizing and color. | [./data-display/icon.md](./data-display/icon.md) |
| Image | A styled wrapper for the HTML `<img>` element with layout and fit utilities. | [./data-display/image.md](./data-display/image.md) |
| Marquee | A continuously scrolling content component for creating animated ticker and logo strip effects. | [./data-display/marquee.md](./data-display/marquee.md) |
| QrCode | A component that generates and renders a QR code from a string value. | [./data-display/qr-code.md](./data-display/qr-code.md) |
| Stat | A component for displaying a statistic with an optional label, trend indicator, and help text. | [./data-display/stat.md](./data-display/stat.md) |
| Table | A component for displaying tabular data with header, body, and footer sections. | [./data-display/table.md](./data-display/table.md) |
| Tag | A small interactive label component used for categorization or filtering, with optional close button. | [./data-display/tag.md](./data-display/tag.md) |
| Timeline | A vertical list component for displaying a sequence of events in chronological order. | [./data-display/timeline.md](./data-display/timeline.md) |

## Internationalization

| Name | Description | Path |
|------|-------------|------|
| FormatByte | Formats a byte value into a human-readable string (e.g. `1450 → "1.45 kB"`), respecting the current locale. | [./i18n/format-byte.md](./i18n/format-byte.md) |
| FormatNumber | Formats a number according to the current locale and specified options, supporting currency, percentage, unit, and compact notations. | [./i18n/format-number.md](./i18n/format-number.md) |
| LocaleProvider | Sets the locale for the app, affecting formatting of dates, numbers, and other locale-specific data across supported Chakra UI components. | [./i18n/locale-provider.md](./i18n/locale-provider.md) |

## Utilities

| Name | Description | Path |
|------|-------------|------|
| Checkmark | A visual indicator used to show checked, unchecked, or indeterminate states. | [./utilities/checkmark.md](./utilities/checkmark.md) |
| ClientOnly | Renders its children exclusively on the client side, preventing server-side rendering of content that depends on browser APIs. | [./utilities/client-only.md](./utilities/client-only.md) |
| EnvironmentProvider | Provides the correct root node and document context for Chakra UI components operating in custom DOM environments such as iframes, Shadow DOM, or Electron. | [./utilities/environment-provider.md](./utilities/environment-provider.md) |
| For | A declarative utility component for iterating over an array and rendering a component for each item. | [./utilities/for.md](./utilities/for.md) |
| Presence | Animates the entry and exit of an element while controlling its render/unmount behavior. | [./utilities/presence.md](./utilities/presence.md) |
| Portal | Renders content outside the normal DOM hierarchy using `ReactDOM.createPortal`, appending to `document.body` by default. | [./utilities/portal.md](./utilities/portal.md) |
| Radiomark | A visual indicator used to show selected and unselected radio states. | [./utilities/radiomark.md](./utilities/radiomark.md) |
| Show | Conditionally renders part of the view based on a boolean condition, with optional fallback content. | [./utilities/show.md](./utilities/show.md) |
| SkipNav | Provides an accessible keyboard-only link that allows users to skip repetitive navigation and jump directly to the main content. | [./utilities/skip-nav.md](./utilities/skip-nav.md) |
| Theme | Forces a scoped section of the component tree to render in a specific color mode (light or dark), independent of the application-level color mode. | [./utilities/theme.md](./utilities/theme.md) |
| VisuallyHidden | Hides content visually while keeping it accessible to screen readers and other assistive technologies. | [./utilities/visually-hidden.md](./utilities/visually-hidden.md) |
