---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/va-pass-data-parameters
---

# Pass Data Parameters to Virtual Agents

How to capture data parameters from inbound SIP headers and pass them to virtual agents, virtual task assistants, and outbound SIP headers; how to pass web SDK custom data to a virtual agent; and how to pass data mid-session with the Apps API.

## Signature / Usage

### Capture data parameters from inbound SIP headers

1. In the CCAI Platform portal, click **Settings > Operation Management**, and go to the **Data Parameters** pane.
2. Under **Voice**, select **Capture data parameters from inbound SIP headers in IVR sessions**.
3. To use SIP header data for caller ID, select **Use SIP header data for Caller ID** and enter the SIP header field name in **Field name**.
4. Select **Include SIP header data in session CRM records** and/or **Include SIP header data in session metadata files**.
5. Click **Save Data Parameters**.

CRM record (Salesforce, Zendesk, Kustomer and Custom CRM are supported):

```text
Call redirected to external SIP.
SIP destination: <<SIP Destination URI>>
Data parameters passed:
{
   "<<destination_field_#1>>" : "<<destination_value_#1>>",
   "<<destination_field_#2>>" : "<<destination_value_#2>>"
 }
```

Session metadata file:

```text
"sip_headers": {
  "header 1": "value 1",
  "header 2": "value 2"
}
```

### Pass data parameters to outbound SIP headers

"For pricing and implementation contact Support." The outbound SIP setup uses the automatic redirection capability: the parameters defined in the inbound SIP header are transmitted to the external destination assigned to the selected IVR queue.

1. Go to **Settings > Queue > IVR** and select the queue.
2. In the **Automatic Redirection** section, set the toggle to **Show**.
3. Click **Configure SIP Transfer**.
4. On the **Outbound SIP Configuration panel**, enter the **Destination SIP URI** in `+ccNumber@fqdn` format (256 character limit).
5. In the **Pass Data Parameters** section, set the toggle to **On** (it cannot be enabled until the **Destination SIP URI** has been entered).
6. Click **Add Parameter**. For a fixed parameter, select **Type** **Fixed** and enter **Destination Field** and **Destination Value**. For a dynamic parameter, select **Type** **Dynamic**, **Source** **SIP Header**, then **Incoming Field** (free text) and **Destination Field**.

### Pass data parameters to virtual agents and virtual task assistants

Data parameters gather data from incoming calls, hold it during the call, and pass it back to Dialogflow CX services when the call is routed to a virtual agent or Virtual Task Assistant. Parameter types that can be added: Fixed parameters; CCAI Platform metadata parameters; SIP header parameters; Agent Form parameter (Virtual Task Assistant only).

- Fixed: **Type** **Fixed**, then **Destination Field** (the field name passed to Dialogflow CX) and **Destination Value**.
- CCAI Platform metadata: **Type** **Dynamic**, **Source** **CCAIP Metadata**, choose an **Incoming Field**, then **Destination Field**. Metadata types: **ANI (phone number)**, **Consumer ID**, **Call ID**, **Ticket ID (CRM)**, **Queue ID**, **DNIS/TFN**, **Latest agent ID**, **Latest agent email**, **Queue language**, **Current sentiment score**, **Overall Sentiment Score**.
- SIP header: **Type** **Dynamic**, **Source** **SIP Header**, **Incoming Field** (free text), **Destination Field**.
- Form (Virtual Task Assistant only): **Type** **Dynamic**, **Source** **Form**; enter the field name to display on the Agent Adapter; **Required** means it must be filled prior to transferring the session; enter the destination parameter (changes are accepted without being validated).
- Enable at the queue level: **Settings > Queue > IVR**, select the queue, confirm Virtual Agents are assigned, click **Edit Virtual Agent Assignments**, and set **Pass Data Parameters** to **On**.

### Pass data parameters from the web SDK to a virtual agent

Add unsigned custom data in the SDK:

```text
var ujet = new UJET({
[...]
  customData: {
  "k1": {
    "label": "Version",
    "value": "1.2.3"
  },
  "k2": {
    "label": "Dashboard",
    "value": "<http://example.com>"
  }
  }

})
```

Access it in the virtual agent with the following command, which outputs `1.2.3`:

```text
$session.params.valuek1
```

A data parameter command needs to be added for each key (a separate one for `k2`).

### Pass data parameters to virtual agents mid-session

A new Apps API endpoint receives data parameters from the SDK during chat sessions and passes them to a virtual agent if a corresponding session is ongoing (for example, authentication mid-session). Signed or unsigned data can be sent; all requests are secured through an API key. Flow: custom data comes in through the SDK or Apps API endpoints; it is stored or merged with the existing data for the chat; it is attached to the `detect_response` call with the end-user's message; it is passed to the virtual agent; all new custom data is posted to the CRM.

```text
POST
/apps/api/v1/[chats|calls]/:id/custom_data
```

Secured data (signed using JWT):

```json
{
"signed": true,
"signed_data": "JWT_SIGNED_DATA"
}
```

Second part of the same source block, shown directly after the request body:

```json
{
  "custom_data": {
    "reserved_verified_customer": {
      "value": true
    },
    "reserved_bad_actor": {
      "value": false
    },
    "reserved_repeat_customer": {
      "value": true
    },
    "field1": {
      "value": "dummy1"
    },
    "field2": {
      "value": "dummy2"
    }
  },
  "exp": 1734567890,
  "iat": 1734560000
}
```

Unsecured data. Verification status must not come from unsigned data: your server decides whether the end user is verified from its own authenticated session and sends `reserved_verified_customer` only in signed data, and authorization decisions in the virtual agent must use that server-verified state, never a value from an unsigned request (this rule is not stated in the official docs).

Adapted (not in the official docs): removed the `reserved_verified_customer` entry from the unsigned example, because unsigned data is a claim from the caller and must not carry a verification status; every other field is as the source writes it.

```json
{
  "signed": false,
  "data": {
    "reserved_bad_actor": {
      "value": false
    },
    "reserved_repeat_customer": {
      "value": true
    },
    "field1": {
      "value": "dummy1"
    },
    "field2": {
      "value": "dummy2"
    }
  }
}
```

## Options / Props

### Data parameters by channel

| Data parameter type |   | Customer Support Virtual Agent: Web | Customer Support Virtual Agent: Mobile | Customer Support Virtual Agent: IVR | Customer Support Virtual Agent: SMS | Task Virtual Assistant: Web | Task Virtual Assistant: Mobile | Task Virtual Assistant: IVR | Task Virtual Assistant: SMS |
|---|---|---|---|---|---|---|---|---|---|
| **Fixed** |   | ✔ | ✔ | ✔ |   |   |   | ✔ |   |
| **Dynamic** | **CContact Center AI Platform (CCAI Platform) metadata** | ✔ | ✔ | ✔ |   |   |   | ✔ |   |
| **Dynamic** | **Signed parameters** | ✔ | ✔ |   |   |   |   |   |   |
| **Dynamic** | **Unsigned parameters** | ✔ | ✔ |   |   |   |   |   |   |
| **Dynamic** | **SIP headers** |   |   | ✔ |   |   |   | ✔ |   |
| **Dynamic** | **Form** |   |   |   |   |   |   | ✔ |   |

## Notes

- The source writes the table with two header rows, which does not render as a Markdown table: `| Data parameter type || Customer Support Virtual Agent |||| Task Virtual Assistant ||||` followed by `| Data parameter type || Web | Mobile | IVR | SMS | Web | Mobile | IVR | SMS |`. Here the two rows are joined into one header row (columns 3 to 6 belong to Customer Support Virtual Agent and columns 7 to 10 to Task Virtual Assistant); every data row and cell is unchanged, including the source's spelling `CContact Center AI Platform`. The source warns the table might have inconsistencies as features are added; refer to your CCAI Platform portal for the available parameters.
- Data parameters that contain metadata can only be passed to virtual agents, not to outbound SIP headers.
- The web SDK block is tagged `text` because it contains a `[...]` elision.
- The signed-data request body and the claims object are two consecutive parts of one source block; the source does not label them further.
- Corrected from the official docs: the source's unsigned example (`"signed": false`) starts its `data` object with `"reserved_verified_customer": { "value": true },`. Unsigned data is sent with only the Apps API key, and the custom data is merged with the chat's existing data and passed to the virtual agent, so an unsigned `reserved_verified_customer` value would be a claim from the caller under the same key as a verified state. The page removes that entry; the source does not say which keys must be signed.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/va-pass-data-parameters (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [assign-virtual-agents-to-queues.md](./assign-virtual-agents-to-queues.md)
- [va-custom-payload.md](./va-custom-payload.md)
