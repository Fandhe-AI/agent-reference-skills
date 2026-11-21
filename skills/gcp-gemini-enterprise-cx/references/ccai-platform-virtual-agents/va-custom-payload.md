---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/va-custom-payload
---

# Custom Payloads for Virtual Agents

Custom payload for Dialogflow CX lets a virtual agent render custom responses and citations beyond plain text, and perform actions such as escalation. The CCAI Platform payload is placed under a `ujet` root key in the Dialogflow CX custom payload.

## Signature / Usage

### Custom response and action types

- Custom responses render: Text, Inline buttons, Sticky buttons, Images, Videos, Documents, Complex views (combination of one or more message types).
- Custom actions: Escalations to human agents, Planned transfers to human agents, End support session.
- Sticky buttons and inline buttons cannot coexist in the same payload.
- The chat message format used with the CCAI Platform SDK is the same as the Dialogflow CX custom payload format but doesn't have the `ujet` field in the root.

### Text

```json
{
  "ujet": {
    "type": "text",
    "messages": [
      "Hello",
      "How can I help you?"
    ]
  }
}
```

### Escalation to the same queue

By virtual agent:

```json
{
  "ujet": {
    "type": "action",
    "action": "escalation",
    "escalation_reason": "by_virtual_agent"
  }
}
```

By end-user:

```json
{
  "ujet": {
    "type": "action",
    "action": "escalation",
    "escalation_reason": "by_consumer"
  }
}
```

### Escalation to the targeted queue

```json
{
  "ujet": {
    "type": "action",
    "action": "escalation",
    "escalation_reason": "by_virtual_agent",
    "menu_id": 100,
    "language": "ko"
  }
}
```

### End conversation

```json
{
  "ujet": {
    "type": "action",
    "action": "end"
  }
}
```

### Inline button

```json
{
  "ujet": {
    "type": "inline_button",
    "title": "Select a menu",
    "buttons": [
      {
        "title": "Lorem Ipsum",
        "action": "quick_reply"
      },
      {
        "title": "Lorem Ipsum Dolor Sit Amet",
        "action": "escalation"
      }
    ]
  }
}
```

### Transfer a call to a phone number

If the connection is successful, the virtual agent is removed from the call and the call continues. If it fails, a transfer failure message is played and the call continues with the virtual agent. Replace `+1XXXXXXXXXX` with a destination number you control, such as a test line, and test the transfer with it before you configure a production destination.

Adapted (not in the official docs): the source's destination `+16509424879` is replaced with the placeholder `+1XXXXXXXXXX`, because a dialable number copied from the example would transfer real customer calls to a line you do not control.

```json
{
  "ujet": {
    "type": "action",
    "action": "deflection",
    "deflection_type" : "phone",
    "phone_number": "+1XXXXXXXXXX"
  }
}
```

### Transfer a call to a SIP endpoint

```text
{
  "ujet": {
    "type": "action",
    "action": "deflection",
    "deflection_type" : "sip",
    "sip_uri": "SIP_ENDPOINT",
    "sip_ring_timeout": SIP_RINGING_TIMEOUT
  }
}
```

Replace the following:

- `SIP_ENDPOINT`: The SIP endpoint to transfer the call to. It should look similar to `sip:1-999-123-4567@voip-provider.example.net`.
- `SIP_RINGING_TIMEOUT`: Optional: The number of seconds that the call rings before it times out. Valid values: `10` through `600`, inclusive. If you set a value outside of this range, the system uses the default ringing timeout of 30 seconds. Default: 30 seconds.

### Transfer a call to a SIP endpoint using SIP REFER

With the SIP REFER method you can pass useful information using the header properties.

Adapted (not in the official docs): added the missing commas between properties so the payload is valid JSON, and renamed the two duplicate `x-header` keys to `x-header-1` and `x-header-2` so neither header is lost.

```json
{
    "ujet": {
       "type": "action",
       "action": "deflection",
       "deflection_type" : "sip",
       "sip_uri": "sip:1-999-123-4567@voip-provider.example.net",
       "sip_refer": true,
       "sip_parameters": {
       "x-header-1": "value",
       "x-header-2": "value"
       }
    }
}
```

### Capture session variables from the end-user response

```json
{
  "ujet": {
    "session_variable": {
      "capture_target": "end_user_response",
      "capture_key": "key"
    }
  }
}
```

The next end-user message immediately after a virtual agent sends this custom payload is captured as a session variable with the key `key`.

### Capture session variables from the intent response

```json
{
  "ujet": {
    "session_variable": {
      "capture_target": "payload",
      "capture_type": [
        "comment",
        "agent"
      ],
      "payload": {
        "status": "STATUS",
        "order_id": "ORDER_ID",
        "personal_id": "PERSONAL_ID"
      },
        "invisible_to_agent": ["INVISIBLE_TO_AGENT"],
        "display_order_in_adapter": ["DISPLAY_ORDER_IN_ADAPTER"]
    }
  }
}
```

Replace the following:

- `STATUS`: the status of the order
- `ORDER_ID`: the order ID
- `PERSONAL_ID`: an identifier of the end-user.
- `INVISIBLE_TO_AGENT`: An array of properties that you don't want to be visible in the agent adapter. For example, a value of `"personal_id"` here would prevent the `personal_id` property from displaying in the agent adapter.
- `DISPLAY_ORDER_IN_ADAPTER`: An array of properties for specifying the order that session variables should appear in the agent adapter and in CRM records.

### Content card payload

Adapted (not in the official docs): removed the `# for deep-link click event` comment from the `event_params` line, because comments are not valid in JSON.

```json
{
  "ujet": {
    "type": "content_card",
    "cards": [
      {
        "title": "Title",
        "subtitle": "Subtitle",
        "body": "Body",
        "link": "app://page",
        "event_params": {}
      }
    ]
  }
}
```

### Create a content card click event (End User Event API)

`POST /api/v2/chats/:id/end_user_event` records a click on the title of a content card. The response is `Status: 202 Accepted`.

Adapted (not in the official docs): removed the `## optional` comment after `end_user_name`, because comments are not valid in JSON.

```json
{
  "event": {
    "name": "content_card_clicked",
    "payload": {
      "title": "New our website"
    }
  },
  "end_user_name": "consumer 1"
}
```

## Options / Props

### Content card properties

| Property Name | Description | Required | Type |
|---|---|---|---|
| `title` | The title of the card. | Yes | String |
| `subtitle` | The subtitle of the card. | No | String |
| `body` | The description of the content card. | Yes | String |
| `link` | A web page link or a deep link. The SDK will use the OS capabilities to open it. | No | String |
| `event_params` | A dictionary containing extra information about the click event. The SDK will use this. | No | Dictionary |

### End User Event API parameters

| Field | Type | Description |
|---|---|---|
| `event` | object |   |
| `event.name` | string | For content card click events use `content_card_clicked`. |
| `event.payload` | object |   |
| `event.payload.title` | string | Enter the title of the clicked card. |
| (Optional) `end_user_name` | string | Enter the end-user's name. If left blank, the name will be retrieved from the CRM. |

## Notes

- Corrected from the official docs: the SIP REFER example omitted the commas after `"deflection_type" : "sip"`, `"sip_uri": "sip:1-999-123-4567@voip-provider.example.net"` and `"sip_refer": true`.
- Corrected from the official docs: the SIP REFER example repeats the `x-header` key twice inside `sip_parameters` (`"x-header": "value", "x-header": "value"`); most JSON parsers keep only one of duplicate keys, so the keys were renamed to the dummy names `x-header-1` and `x-header-2`. Replace them with the SIP header names you pass; the source does not name them.
- Corrected from the official docs: the content card example had `"event_params": {} # for deep-link click event` (the source's comment says `event_params` is for the deep-link click event).
- Corrected from the official docs: the End User Event example had `"end_user_name": "consumer 1"   ## optional` (the parameter table also marks `end_user_name` as optional).
- The SIP endpoint transfer example is tagged `text` because `SIP_RINGING_TIMEOUT` is an unquoted placeholder in the source.
- Ringing timeout: add the `sip_ring_timeout` field to give calls to internal extensions or Unified Communications (UC) destinations enough time to be answered. This works only for Twilio users, and Twilio adds approximately five seconds to the ringing timeout that you configure. If the call path includes the Public Switched Telephone Network (PSTN), the call might be disconnected before the ringing timeout that you configure.
- SIP REFER is only available when using Bring-Your-Own-Carrier (BYOC). Virtual agent transfers work for both internal and external calls and are recorded as `Planned Transfers` in reporting.
- The `escalation_reason` value is reported in the dashboards. The same payload shape with `"menu_id": 100, "language": "ko"` is shown in the source for the end-user case (`"by_consumer"`).
- Session variables are gathered per chat session and posted to the CRM as a comment when the virtual agent leaves the chat. In the source's example scenario the final payload uses `"type": "escalation"` while the other escalation examples use `"type": "action"` with `"action": "escalation"`; the source does not explain the difference.
- Left out of this page: the complete JSON schema block with `|`-separated placeholder values, sticky button, image, video, document and complex view examples, the example scenario (one of its payloads is not valid JSON), and the CRM comment text examples.
- Corrected from the official docs: the phone transfer example writes `"phone_number": "+16509424879"`, a dialable number in E.164 form that is not one of the numbers reserved for fiction or documentation; the page uses the placeholder `+1XXXXXXXXXX`.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/va-custom-payload (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [virtual-agent-to-human-agent-transfers.md](./virtual-agent-to-human-agent-transfers.md)
- [va-pass-data-parameters.md](./va-pass-data-parameters.md)
- [create-a-dialogflow-agent.md](./create-a-dialogflow-agent.md)
