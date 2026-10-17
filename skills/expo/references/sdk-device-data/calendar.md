---
source: https://docs.expo.dev/versions/v58.0.0/sdk/calendar/
---

# Calendar

`expo-calendar` provides an API for interacting with the device's system calendars, events, reminders, and associated records, and methods to launch the system-provided calendar UI to view or edit events (on iOS, `EKEventViewController` or `EKEventEditViewController` as a modal).

## Signature / Usage

```sh
npx expo install expo-calendar
```

```jsx
import * as Calendar from 'expo-calendar';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const BasicUsage = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissions();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendars(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log(JSON.stringify(calendars));
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
  );
};

async function createCalendar() {
  const newCalendar = await Calendar.createCalendar({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
  });
  console.log(`Your new calendar: ${JSON.stringify(newCalendar)}`);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
```

Permission hooks:

```ts
const [status, requestPermission] = Calendar.useCalendarPermissions();
const [remindersStatus, requestRemindersPermission] = Calendar.useRemindersPermissions();
```

Config plugin:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-calendar",
        {
          "calendarPermission": "The app needs to access your calendar."
        }
      ]
    ]
  }
}
```

## Options / Props

Unless specified otherwise, all dates are returned in the ISO 8601 format.

Config plugin properties (iOS only):

| Name | Default | Description |
| --- | --- | --- |
| `calendarPermission` | `"Allow $(PRODUCT_NAME) to access your calendar"` | Sets `NSCalendarsUsageDescription` (and `NSCalendarsFullAccessUsageDescription`). |
| `remindersPermission` | `"Allow $(PRODUCT_NAME) to access your reminders"` | Sets `NSRemindersUsageDescription` (and `NSRemindersFullAccessUsageDescription`). |
| `writeOnlyCalendarPermission` | `"Allow $(PRODUCT_NAME) to add events to your calendars"` | Sets `NSCalendarsWriteOnlyAccessUsageDescription` (iOS 17+); only used when `writeOnlyAccess` is `true`. |
| `writeOnlyAccess` | `false` | When `true`, requests write-only calendar access (iOS 17+); sets `NSCalendarsWriteOnlyAccessUsageDescription` and omits `NSCalendarsFullAccessUsageDescription`. |

Hooks:

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `Calendar.useCalendarPermissions(options?: PermissionHookOptions<{ writeOnly: boolean }>)` | Android, iOS | `[PermissionResponse \| null, RequestPermissionMethod<PermissionResponse>, GetPermissionMethod<PermissionResponse>]` | Check or request calendar permissions. On iOS `writeOnly` requests permission to create events without reading existing calendars or events; it does not grant permission to create, update, or delete calendars. |
| `Calendar.useRemindersPermissions(options?: PermissionHookOptions<object>)` | iOS | same tuple | Check or request reminders permissions. |

Module functions (current API):

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `Calendar.getCalendars(entityType?: EntityTypes)` | Android, iOS | `Promise<ExpoCalendar[]>` | Calendars available to the app. `entityType` is iOS only; if not defined, both calendar (write-only is enough) and reminders permissions are required. With iOS 17+ write-only access, `EntityTypes.EVENT` returns a single virtual calendar usable to create events. |
| `Calendar.createCalendar(details?: Partial<Calendar>)` | Android, iOS | `Promise<ExpoCalendar>` | Creates a calendar. `details` default `{}`. |
| `Calendar.getDefaultCalendarSync()` | iOS | `ExpoCalendar` | The user's default calendar (iOS 17+ write-only returns EventKit's virtual calendar). |
| `Calendar.getSourcesSync()` | iOS | `Source[]` | Sources stored on the device. |
| `Calendar.listEvents(calendars: (string \| ExpoCalendar)[], startDate: Date, endDate: Date)` | Android, iOS | `Promise<ExpoCalendarEvent[]>` | Events across multiple calendars (IDs or `ExpoCalendar` objects). For a single calendar use `ExpoCalendar.listEvents`. |
| `Calendar.presentPicker()` | iOS | `Promise<ExpoCalendar \| null>` | Presents the OS calendar picker; `null` when cancelled. |
| `Calendar.getCalendarPermissions(writeOnly?: boolean)` | Android, iOS | `Promise<PermissionResponse>` | Checks calendar permissions. |
| `Calendar.requestCalendarPermissions(writeOnly?: boolean)` | Android, iOS | `Promise<PermissionResponse>` | Requests calendar permissions. |
| `Calendar.getRemindersPermissions()` | iOS | `Promise<PermissionResponse>` | Checks reminders permissions. |
| `Calendar.requestRemindersPermissions()` | iOS | `Promise<PermissionResponse>` | Requests reminders permissions. |

`ExpoCalendar` (Android, iOS): represents a calendar of the Expo Calendar Next API.

| Member | Platforms | Type / Returns | Description |
| --- | --- | --- | --- |
| `id`, `title`, `allowsModifications`, `allowedAvailabilities`, `color?`, `source` | Android, iOS | `string`, `string`, `boolean`, `Availability[]`, `string`, `Source` | Basic properties (`color` is used to display events). |
| `accessLevel?`, `allowedAttendeeTypes?`, `allowedReminders?`, `isPrimary?`, `isSynced?`, `isVisible?`, `name?`, `ownerAccount?`, `timeZone?` | Android | `CalendarAccessLevel`, `AttendeeType[]`, `AlarmMethod[]`, `boolean`, `boolean`, `boolean`, `string \| null`, `string`, `string` | `isSynced`: unexpected behavior may occur if not `true`. |
| `entityType?`, `sourceId?`, `type?` | iOS | `EntityTypes`, `string`, `CalendarType` | Whether used in the Calendar or Reminders app; source ID; calendar type. |
| `addEventWithForm(options?: AddEventWithFormOptions)` | Android, iOS | `Promise<DialogEventResult>` | System dialog to create an event, pre-filled. Requires at minimum write-only calendar permission. |
| `createEvent(details)` | Android, iOS | `Promise<ExpoCalendarEvent>` | `details`: `Partial<Omit<Event, 'creationDate' \| 'lastModifiedDate' \| 'originalStartDate' \| 'isDetached' \| 'status' \| 'organizer'>>`. |
| `createReminder(details: Partial<Reminder>)` | iOS | `Promise<ExpoCalendarReminder>` | Creates a reminder. |
| `delete()` | Android, iOS | `Promise<void>` | Deletes the calendar. |
| `get(calendarId: string)` | Android, iOS | `Promise<ExpoCalendar>` | Gets a calendar by ID; throws if missing. With iOS 17+ write-only access, only the virtual calendar's ID resolves. |
| `listEvents(startDate: Date, endDate: Date)` | Android, iOS | `Promise<ExpoCalendarEvent[]>` | Events in the date range. |
| `listReminders(startDate?: Date \| null, endDate?: Date \| null, status?: ReminderStatus \| null)` | iOS | `Promise<ExpoCalendarReminder[]>` | Reminders matching criteria (all default `null`; `null` status returns completed and incomplete). With both dates, returns reminders overlapping the interval. |
| `update(details: Partial<ModifiableCalendarProperties>)` | Android, iOS | `Promise<void>` | Update `color` / `title`; set a property to `null` to remove it. |

`ExpoCalendarEvent` (Android, iOS):

| Member | Platforms | Type / Returns | Description |
| --- | --- | --- | --- |
| `id`, `calendarId`, `title`, `notes`, `location` (`string \| null`), `timeZone` (`null` = device time zone), `allDay`, `alarms`, `availability`, `status`, `recurrenceRule` (`RecurrenceRule \| null`, `null` for one-time), `startDate`, `endDate` (`string \| Date`) | Android, iOS | various | Core event fields. |
| `accessLevel?`, `endTimeZone?`, `guestsCanInviteOthers?`, `guestsCanModify?`, `guestsCanSeeGuests?`, `instanceId?`, `organizerEmail?`, `originalId?` | Android | `EventAccessLevel`, `string`, `boolean`, `boolean`, `boolean`, `string` (volatile ID of a recurring instance), `string`, `string` (ID of the original recurring event for detached instances) | Android-only fields. |
| `creationDate?`, `isDetached?`, `lastModifiedDate?`, `organizer?`, `originalStartDate?`, `url?` | iOS | `string \| Date`, `boolean`, `string \| Date`, `Organizer` (read-only; only for calendars managed by a service such as Google Calendar or iCloud), `string \| Date`, `string` | iOS-only fields. |
| `createAttendee(attendee: Attendee)` | Android, iOS | `Promise<ExpoCalendarAttendee>` | Adds an attendee. |
| `delete()` | Android, iOS | `Promise<void>` | Deletes the event. |
| `editInCalendar(params?: CalendarDialogParamsNext)` | Android, iOS | `Promise<DialogEventResult>` | OS calendar UI to edit or delete the event. |
| `openInCalendar(params?: CalendarDialogOpenParamsNext)` | Android, iOS | `Promise<OpenEventDialogResult>` | OS calendar UI to preview the event. |
| `get(eventId: string)` | Android, iOS | `Promise<ExpoCalendarEvent>` | Gets an event by ID; throws if missing. |
| `getAttendees()` | Android, iOS | `Promise<ExpoCalendarAttendee[]>` | Attendees of the event (or recurring instance). |
| `getOccurrenceSync(recurringEventOptions?: RecurringEventOptions)` | Android, iOS | `ExpoCalendarEvent` | Event instance; `recurringEventOptions` default `{}`. |
| `update(details: Partial<ModifiableEventProperties>)` | Android, iOS | `Promise<void>` | `ModifiableEventProperties` = `Pick<ExpoCalendarEvent, 'title' \| 'location' \| 'timeZone' \| 'url' \| 'notes' \| 'alarms' \| 'recurrenceRule' \| 'availability' \| 'startDate' \| 'endDate' \| 'allDay'>`; set to `null` to remove. |

`ExpoCalendarAttendee` (Android, iOS): `name`, `role: AttendeeRole`, `status: AttendeeStatus`, `type: AttendeeType` (all platforms); `email: string`, `id?: string` (Android); `isCurrentUser?: boolean`, `url?: string` (iOS). Android methods: `delete(): Promise<void>`, `update(details: Partial<ModifiableAttendeeProperties>): Promise<void>`.

`ExpoCalendarReminder` (iOS only): properties `id?`, `calendarId?`, `title?`, `notes?`, `location?`, `url?`, `timeZone?`, `allDay?`, `alarms?: Alarm[]`, `completed?`, `completionDate?` (setting a nonnull `Date` sets `completed` to `true`), `creationDate?`, `lastModifiedDate?`, `dueDate?`, `startDate?`, `recurrenceRule?: RecurrenceRule \| null`. Methods: `delete(): Promise<void>`, `get(reminderId: string): Promise<ExpoCalendarReminder>` (throws if missing), `update(details: Partial<ModifiableReminderProperties>): Promise<void>` (`Pick<ExpoCalendarReminder, 'title' \| 'location' \| 'timeZone' \| 'url' \| 'notes' \| 'alarms' \| 'recurrenceRule' \| 'startDate' \| 'dueDate' \| 'completed' \| 'completionDate'>`).

Types:

| Type | Definition |
| --- | --- |
| `Alarm` | `absoluteDate?: string` (iOS; overrides `relativeOffset` and `structuredLocation`), `method?: AlarmMethod` (Android; on iOS always a notification), `relativeOffset?: number` (minutes from `startDate`; negative = before), `structuredLocation?: AlarmLocation` |
| `AlarmLocation` | `coords?: { latitude: number, longitude: number }`, `proximity?: string`, `radius?: number`, `title?: string` (iOS) |
| `AddEventWithFormOptions` | `PresentationOptions` plus `alarms?` (iOS), `allDay?`, `endDate?`, `location?`, `notes?`, `recurrenceRule?`, `startDate?`, `title?`, `url?` (iOS) |
| `PresentationOptions` | `startNewActivityTask?: boolean` (Android; launch the Activity as a new task; if `true` resolves with `'done'` immediately). Default: `true` |
| `OpenEventPresentationOptions` | `PresentationOptions` plus `allowsCalendarPreview?: boolean` (iOS; invitations only; default `false`), `allowsEditing?: boolean` (iOS; user-created calendars only; default `false`; if the user edits then dismisses, the action is the last performed, e.g. `canceled`) |
| `CalendarDialogParams` | `id: string`, `instanceStartDate?: string \| Date` (iOS) |
| `DialogEventResult` | `action`: `'done' \| 'saved' \| 'canceled' \| 'deleted'` (Android: always `done`), `id: string \| null` (Android: always `null`; iOS: string when permissions are granted and the user confirms) |
| `OpenEventDialogResult` | `action`: `'done' \| 'canceled' \| 'deleted' \| 'responded'` (Android: always `done`) |
| `RecurrenceRule` | `frequency: Frequency`, `interval?: number` (default `1`), `endDate?: string \| Date` (overrides `occurrence`), `occurrence?: number`; iOS only: `daysOfTheMonth?: number[]` (-31 to 31, Monthly), `daysOfTheWeek?: DaysOfTheWeek[]`, `daysOfTheYear?: number[]` (-366 to 366, Yearly), `monthsOfTheYear?: MonthOfTheYear[]` (Yearly), `setPositions?: number[]` (Yearly), `weeksOfTheYear?: number[]` (-53 to 53, Yearly). Based on the iOS EventKit `EKRecurrenceRule` and the iCal RFC; not every combination makes sense. |
| `DaysOfTheWeek` (iOS) | `dayOfTheWeek: DayOfTheWeek`, `weekNumber?: number` (-53 to 53; `0` ignores the field) |
| `RecurringEventOptions` (iOS) | `futureEvents?: boolean` (apply to the instance at `instanceStartDate` and all future events), `instanceStartDate?: string \| Date` |
| `Source` | `name: string`, `type: string \| SourceType`, `id?: string` (iOS), `isLocalAccount?: boolean` (Android; must be `true` if `type` is `undefined`). If `isLocalAccount` is falsy, `type` must match an account on the device along with `name`, or the OS deletes the calendar. |
| `PermissionResponse` | `canAskAgain: boolean`, `expires: PermissionExpiration` (`'never' \| number`), `granted: boolean`, `status: PermissionStatus` |

Enums (string values unless noted):

| Enum | Platforms | Values |
| --- | --- | --- |
| `AlarmMethod` | Android | `ALARM = "alarm"`, `ALERT = "alert"`, `DEFAULT = "default"`, `EMAIL = "email"`, `SMS = "sms"` |
| `AttendeeRole` | both | Android: `ATTENDEE`, `NONE`, `ORGANIZER`, `PERFORMER`, `SPEAKER`; iOS: `CHAIR`, `NON_PARTICIPANT = "nonParticipant"`, `OPTIONAL`, `REQUIRED`, `UNKNOWN` |
| `AttendeeStatus` | both | `ACCEPTED`, `DECLINED`, `TENTATIVE`; Android: `INVITED`, `NONE`; iOS: `COMPLETED`, `DELEGATED`, `IN_PROCESS = "inProcess"`, `PENDING`, `UNKNOWN` |
| `AttendeeType` | both | `RESOURCE`; Android: `NONE`, `OPTIONAL`, `REQUIRED`; iOS: `GROUP`, `PERSON`, `ROOM`, `UNKNOWN` |
| `Availability` | both | `BUSY`, `FREE`, `TENTATIVE`; iOS: `NOT_SUPPORTED = "notSupported"`, `UNAVAILABLE` |
| `CalendarAccessLevel` | Android | `CONTRIBUTOR`, `EDITOR`, `FREEBUSY`, `NONE`, `OVERRIDE`, `OWNER`, `READ`, `RESPOND`, `ROOT` |
| `CalendarDialogResultActions` | both | `done` (Android: the only possible result; iOS: user simply closed the dialog); iOS: `canceled`, `deleted`, `responded` (saved a pending invitation), `saved` |
| `CalendarType` | iOS | `BIRTHDAYS`, `CALDAV`, `EXCHANGE`, `LOCAL`, `SUBSCRIBED`, `UNKNOWN` |
| `DayOfTheWeek` | iOS | `Sunday = 1` ... `Saturday = 7` (numeric) |
| `EntityTypes` | iOS | `EVENT = "event"`, `REMINDER = "reminder"` |
| `EventAccessLevel` | Android | `CONFIDENTIAL`, `DEFAULT`, `PRIVATE`, `PUBLIC` |
| `EventStatus` | both | `CANCELED`, `CONFIRMED`, `NONE`, `TENTATIVE` |
| `Frequency` | both | `DAILY`, `MONTHLY`, `WEEKLY`, `YEARLY` |
| `MonthOfTheYear` | iOS | `January = 1` ... `December = 12` (numeric) |
| `ReminderStatus` | iOS | `COMPLETED = "completed"`, `INCOMPLETE = "incomplete"` |
| `SourceType` | iOS | `BIRTHDAYS`, `CALDAV`, `EXCHANGE`, `LOCAL`, `MOBILEME`, `SUBSCRIBED` |

Permissions:

| Platform | Key | Description |
| --- | --- | --- |
| Android | `READ_CALENDAR`, `WRITE_CALENDAR` | Add to `expo.android.permissions`. Not needed if you only use the system-provided calendar UI. |
| iOS | `NSCalendarsUsageDescription`, `NSCalendarsFullAccessUsageDescription`, `NSCalendarsWriteOnlyAccessUsageDescription`, `NSRemindersUsageDescription` | Info.plist usage descriptions. |

## Notes

- Platforms (frontmatter `platforms`): Android (device only), iOS (device only). `expo-calendar` is currently unsupported in Expo Go and Snack; use a development build.
- The old promise-based module functions are deprecated and "will throw in runtime"; import them from `expo-calendar/legacy` instead. Replacement mapping from the source: `createAttendeeAsync` -> `event.createAttendee()`; `createCalendarAsync` -> `createCalendar()`; `createEventAsync` -> `calendar.createEvent()`; `createEventInCalendarAsync` -> `calendar.addEventWithForm()`; `createReminderAsync` -> `calendar.createReminder()`; `deleteAttendeeAsync` -> `attendee.delete()`; `deleteCalendarAsync` -> `calendar.delete()`; `deleteEventAsync` -> `event.delete()`; `deleteReminderAsync` -> `reminder.delete()`; `editEventInCalendarAsync` -> `event.editInCalendar()`; `getAttendeesForEventAsync` -> `event.getAttendees()`; `getCalendarPermissionsAsync` -> `getCalendarPermissions()`; `getCalendarsAsync` -> `getCalendars()`; `getDefaultCalendarAsync` -> `getDefaultCalendarSync()`; `getEventAsync` -> `ExpoCalendarEvent.get()`; `getEventsAsync` -> `listEvents()`; `getReminderAsync` -> `ExpoCalendarReminder.get()`; `getRemindersAsync` -> `calendar.listReminders()`; `getRemindersPermissionsAsync` -> `getRemindersPermissions()`; `getSourcesAsync` -> `getSourcesSync()`; `openEventInCalendar` and `openEventInCalendarAsync` -> `event.openInCalendar()`; `requestCalendarPermissionsAsync` and `requestPermissionsAsync` -> `requestCalendarPermissions()`; `requestRemindersPermissionsAsync` -> `requestRemindersPermissions()`; `updateAttendeeAsync` -> `attendee.update()`; `updateCalendarAsync` -> `calendar.update()`; `updateEventAsync` -> `event.update()`; `updateReminderAsync` -> `reminder.update()`. `getSourceAsync` and `isAvailableAsync` are deprecated with the instruction to import from `expo-calendar/legacy` (no replacement named).
- Android has no `getDefaultCalendarSync()` (no single system default calendar: use `getCalendars()` and pick a writable calendar; `isPrimary` helps) and no `getSourcesSync()` (inspect each calendar's `source` field).
- iOS write-only access (iOS 17+): enable `writeOnlyAccess` in the config plugin and pass `true` to `requestCalendarPermissions`. With write-only access, `getCalendars(EntityTypes.EVENT)` / `getDefaultCalendarSync()` return only the virtual calendar, and events can be created with that instance's `calendar.createEvent()`. Listing real calendars, `listEvents` and `presentPicker` require full calendar access.
- The source says getCalendars requires full access but also documents a virtual calendar under write-only access; the note reconciles both.
- The source example omits await on getCalendars, which returns a Promise; await was added.
- To localize iOS permission messages, add the usage description keys to the `ios` object of each locale file; Expo writes them to InfoPlist.strings during prebuild.
- Existing React Native apps (no CNG): add `NSCalendarsUsageDescription`, `NSCalendarsFullAccessUsageDescription` and `NSRemindersUsageDescription` to `ios/[app]/Info.plist` (and `NSCalendarsWriteOnlyAccessUsageDescription` instead of the full-access key for write-only access).
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-calendar

## Related

- [Contacts](./contacts.md)
- [Location](./location.md)
