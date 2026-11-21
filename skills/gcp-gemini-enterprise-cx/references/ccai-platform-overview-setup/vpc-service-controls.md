---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/vpc-service-controls
---

# VPC Service Controls and Private Service Connect for CCAI Platform

VPC Service Controls mitigates the risk of data exfiltration from a CCAI Platform instance: an instance inside a perimeter cannot exchange data with Google Cloud services (such as Cloud Storage or Dialogflow CX) outside the perimeter. It does not restrict exchange with third-party (non-Google Cloud) services; for that, Google recommends Private Service Connect for private ingress and private egress.

## Signature / Usage

### Create a perimeter and restrict access to an instance

Follow Create a service perimeter in the VPC Service Controls documentation with these requirements:

- In **Resources to protect**, select the project that contains the CCAI Platform instance.
- In **Restricted Services**, select **CCAI Platform API**.

After this, no user can create or edit a CCAI Platform instance within the perimeter unless an access level explicitly grants it.

The gcloud equivalent of creating a perimeter (the `--restricted-services` value in this example is `storage.googleapis.com`; the service name of the CCAI Platform API is `contactcenteraiplatform.googleapis.com`, see the audit logging page):

Adapted (not in the official docs): added the `PERIMETER` positional argument, which the help example omits although the SYNOPSIS requires it.

```bash
gcloud access-context-manager perimeters create PERIMETER \
    --title=my_perimeter_title --resources=projects/12345 \
    --restricted-services="storage.googleapis.com" --policy=9876543
```

### Allow access to your protected resources

- Configure an access level with a condition that allows your administrators to access the restricted CCAI Platform API service, so they can manage instances in the console. The condition must include an access level attribute of your administrators.
- Optional, if you restricted Identity Platform, Cloud Storage or Firestore: add a condition that allows the users of the agent adapter to access those services, with an access level attribute of those users.
- If your use case requires it, Private Google Access can allow access to restricted resources within a perimeter instead of an access level.

### Private Service Connect (Preview)

With Private Service Connect you can set up private ingress into your instance, private egress out of it, or both, using your own internal IP address, keeping traffic private and within Google Cloud. The source points to separate pages, Set up private ingress and Set up private egress, which are not part of this page.

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/create (gcloud 593.0.0 help); the source uses the console.
- Corrected from the official docs: the gcloud 593.0.0 help example `gcloud access-context-manager perimeters create --title=my_perimeter_title --resources=projects/12345 ...` has no perimeter ID, and the command fails with "argument --policy: PERIMETER must be specified." (SYNOPSIS: `gcloud access-context-manager perimeters create (PERIMETER : --policy=POLICY) --title=TITLE`; the PERIMETER positional "must be specified if any of the other arguments in this group are specified").
- The agent adapter depends on Identity Platform, Cloud Storage and Firestore. If you restrict those services in the perimeter, these APIs cannot be called from outside the perimeter, so you must allow access to them for your agent adapter users: `identitytoolkit.googleapis.com` and `securetoken.googleapis.com` (Identity Platform), `storage.googleapis.com` (Cloud Storage), `firestore.googleapis.com` (Firestore).
- Private Service Connect is a Preview feature subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms; Pre-GA features are available "as is" and might have limited support. Private access (Preview) also requires Private Service Connect for agents, managers and administrators to reach the instance (see https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started).
- The source shows the Console only; screenshots are omitted.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/vpc-service-controls (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/set-up-psc (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [ccaip-custom-constraints.md](./ccaip-custom-constraints.md)
- [get-started.md](./get-started.md)
