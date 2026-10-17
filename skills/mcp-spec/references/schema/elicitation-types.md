---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#elicitrequest
---

# elicitation/create types

Schema types for `elicitation/create`: form-mode and URL-mode params, the restricted primitive schema definitions (string / number / boolean / enum), and `ElicitResult`.

## Signature / Usage

```ts
/** The parameters for a request to elicit non-sensitive information from the user via a form in the client. */
export interface ElicitRequestFormParams {
  /** The elicitation mode. */
  mode?: "form";

  /** The message to present to the user describing what information is being requested. */
  message: string;

  /**
   * A restricted subset of JSON Schema.
   * Only top-level properties are allowed, without nesting.
   */
  requestedSchema: {
    $schema?: string;
    type: "object";
    properties: {
      [key: string]: PrimitiveSchemaDefinition;
    };
    required?: string[];
  };
}

/** The parameters for a request to elicit information from the user via a URL in the client. */
export interface ElicitRequestURLParams {
  /** The elicitation mode. */
  mode: "url";

  /** The message to present to the user explaining why the interaction is needed. */
  message: string;

  /**
   * The URL that the user should navigate to.
   *
   * @format uri
   */
  url: string;
}

export type ElicitRequestParams =
  ElicitRequestFormParams | ElicitRequestURLParams;

/** A request from the server to elicit additional information from the user via the client. */
export interface ElicitRequest {
  method: "elicitation/create";
  params: ElicitRequestParams;
}

/**
 * Restricted schema definitions that only allow primitive types
 * without nested objects or arrays.
 */
export type PrimitiveSchemaDefinition =
  StringSchema | NumberSchema | BooleanSchema | EnumSchema;

export interface StringSchema {
  type: "string";
  title?: string;
  description?: string;
  minLength?: number;
  maxLength?: number;
  format?: "email" | "uri" | "date" | "date-time";
  default?: string;
}

export interface NumberSchema {
  type: "number" | "integer";
  title?: string;
  description?: string;
  minimum?: number;
  maximum?: number;
  default?: number;
}

export interface BooleanSchema {
  type: "boolean";
  title?: string;
  description?: string;
  default?: boolean;
}

/** Schema for single-selection enumeration without display titles for options. */
export interface UntitledSingleSelectEnumSchema {
  type: "string";
  title?: string;
  description?: string;
  /** Array of enum values to choose from. */
  enum: string[];
  default?: string;
}

/** Schema for single-selection enumeration with display titles for each option. */
export interface TitledSingleSelectEnumSchema {
  type: "string";
  title?: string;
  description?: string;
  /** Array of enum options with values and display labels. */
  oneOf: Array<{
    /** The enum value. */
    const: string;
    /** Display label for this option. */
    title: string;
  }>;
  default?: string;
}

export type SingleSelectEnumSchema =
  UntitledSingleSelectEnumSchema | TitledSingleSelectEnumSchema;

/** Schema for multiple-selection enumeration without display titles for options. */
export interface UntitledMultiSelectEnumSchema {
  type: "array";
  title?: string;
  description?: string;
  /** Minimum number of items to select. */
  minItems?: number;
  /** Maximum number of items to select. */
  maxItems?: number;
  /** Schema for the array items. */
  items: {
    type: "string";
    /** Array of enum values to choose from. */
    enum: string[];
  };
  default?: string[];
}

/** Schema for multiple-selection enumeration with display titles for each option. */
export interface TitledMultiSelectEnumSchema {
  type: "array";
  title?: string;
  description?: string;
  minItems?: number;
  maxItems?: number;
  /** Schema for array items with enum options and display labels. */
  items: {
    /** Array of enum options with values and display labels. */
    anyOf: Array<{
      /** The constant enum value. */
      const: string;
      /** Display title for this option. */
      title: string;
    }>;
  };
  default?: string[];
}

export type MultiSelectEnumSchema =
  UntitledMultiSelectEnumSchema | TitledMultiSelectEnumSchema;

/**
 * Use {@link TitledSingleSelectEnumSchema} instead.
 * This interface will be removed in a future version.
 */
export interface LegacyTitledEnumSchema {
  type: "string";
  title?: string;
  description?: string;
  enum: string[];
  /**
   * (Legacy) Display names for enum values.
   * Non-standard according to JSON schema 2020-12.
   */
  enumNames?: string[];
  default?: string;
}

export type EnumSchema =
  SingleSelectEnumSchema | MultiSelectEnumSchema | LegacyTitledEnumSchema;

/** The result returned by the client for an {@link ElicitRequest| elicitation/create} request. */
export interface ElicitResult {
  /**
   * The user action in response to the elicitation.
   * - `"accept"`: User submitted the form/confirmed the action
   * - `"decline"`: User explicitly declined the action
   * - `"cancel"`: User dismissed without making an explicit choice
   */
  action: "accept" | "decline" | "cancel";

  /**
   * The submitted form data, only present when action is `"accept"` and mode was `"form"`.
   * Contains values matching the requested schema.
   * Omitted for out-of-band mode responses.
   */
  content?: { [key: string]: string | number | boolean | string[] };
}
```

Request (`examples/ElicitRequest/elicitation-request.json`):

```json
{
  "method": "elicitation/create",
  "params": {
    "mode": "form",
    "message": "Please provide your GitHub username",
    "requestedSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "title": "GitHub Username",
          "description": "Your GitHub username"
        }
      },
      "required": ["name"]
    }
  }
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mode` | `"form" \| "url"` | form: optional; url: yes | Elicitation mode |
| `message` | `string` | yes | Prompt shown to the user |
| `requestedSchema` | restricted JSON Schema object | yes (form) | Top-level primitive properties only |
| `url` | `string` (uri) | yes (url) | URL the user should navigate to |
| `action` | `"accept" \| "decline" \| "cancel"` | yes (result) | User response |
| `content` | `{ [key: string]: string \| number \| boolean \| string[] }` | no | Present only for `accept` in form mode |

## Notes

- Replaced in 2026-07-28: server-initiated `elicitation/create` is carried by MRTR `inputRequests`; `ElicitRequest` does not extend `JSONRPCRequest` here.
- Removed in 2026-07-28: `notifications/elicitation/complete` and `elicitationId`. `-32042` (URL elicitation required) is a 2025-11-25-only code that remains reserved.
- Clients declare support through `ClientCapabilities.elicitation` (`form`, `url`).
- `LegacyTitledEnumSchema` is marked "will be removed in a future version" in the source JSDoc.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. Short JSDoc comments are collapsed; `@example` / `{@includeCode}` directives and `@TJS-type` tags omitted.

## Related

- [Multi Round-Trip types](./mrtr-types.md)
- [Error types](./errors.md)
- [server/discover types](./discover-types.md)
