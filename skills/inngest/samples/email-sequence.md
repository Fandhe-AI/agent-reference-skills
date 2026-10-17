# Email Sequence

Build a behavior-based drip campaign: welcome email, wait for a click, then send tips or a trial offer.

Adapted (not in the official docs): the `waitForEvent` `if` expression quotes `emailId` as a CEL string, and the destructured `first_name` is unified to `firstName` so the JSX references resolve.

```javascript
const signupDripCampaign = inngest.createFunction(
  { id: "signup-drip-campaign", triggers: { event: "app/signup.completed" } },
  async ({ event, step }) => {
    const { user } = event.data;
    const { email, firstName } = user
    const welcome = "Welcome to ACME";

    const { id: emailId } = await step.run("welcome-email", async () => {
      return await sendEmail(
        email,
        welcome,
        <div>
          <h1>Welcome to ACME, {firstName}</h1>
        </div>
      );
    });

    // Wait up to 3 days for the user open the email and click any link in it
    const clickEvent = await step.waitForEvent("wait-for-engagement", {
      event: "resend/email.clicked",
      if: `async.data.email_id == '${emailId}'`,
      timeout: "3 days",
    });

    // if the user clicked the email, send them power user tips
    if (clickEvent) {
      await step.sleep("delay-power-tips-email", "1 day");
      await step.run("send-power-user-tips", async () => {
        await sendEmail(
          email,
          "Supercharge your ACME experience",
          <h1>
            Hello {firstName}, here are tips to get the most out of ACME
          </h1>
        );
      });

      // wait one more day before sending the trial offer
      await step.sleep("delay-trial-email", "1 day");
    }

    // check that the user is not already on the pro plan
    const dbUser = db.users.byEmail(email);

    if (dbUser.plan !== "pro") {
      // send them a free trial offer
      await step.run("trial-offer-email", async () => {
        await sendEmail(
          email,
          "Free ACME Pro trial",
          <h1>
            Hello {firstName}, try our Pro features for 30 days for free
          </h1>
        );
      });
    }
  }
);
```

## Notes

- `step.waitForEvent()` returns `null` when the timeout elapses without a matching event, so the `if (clickEvent)` branch handles the non-engaged path
- The `if` expression correlates the incoming `resend/email.clicked` event (`async`) with the email sent in the earlier step
- The official Email Sequence example leaves `emailId` unquoted in the CEL expression and destructures `first_name` while referencing `firstName`; other official examples quote interpolated values (`== '${...}'`), so the quoted form is used here
- Helpers such as `sendEmail` and `db` are not defined in the official snippet
- Source: https://www.inngest.com/docs-markdown/examples/email-sequence (retrieved 2026-10-16)
