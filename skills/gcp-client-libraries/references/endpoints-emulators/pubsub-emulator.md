---
source: https://docs.cloud.google.com/pubsub/docs/emulator
---

# Pub/Sub emulator (client side)

Run the Pub/Sub emulator with the gcloud CLI and point a client library at it with `PUBSUB_EMULATOR_HOST`. Most client libraries pick the variable up automatically; Rust (and Java, C#) need code changes.

## Signature / Usage

### Start the emulator

Adapted (not in the official docs): the usage-synopsis placeholder `[options]` was removed, because gcloud rejects it as an unrecognized argument.

```sh
gcloud beta emulators pubsub start --project=PUBSUB_PROJECT_ID
```

Optional flags: `--data-dir`, `--host-port`. The source points to https://docs.cloud.google.com/sdk/gcloud/reference/beta/emulators/pubsub/start for the complete list of flags.

The project ID does not need to be a real project. The emulator reports `Server started, listening on 8085`.

### Set the environment variables

Same machine as the emulator (Linux / macOS):

```sh
$(gcloud beta emulators pubsub env-init)
```

Windows:

```sh
gcloud beta emulators pubsub env-init > set_vars.cmd && set_vars.cmd
```

Different machine: run `gcloud beta emulators pubsub env-init`, then set the variable as printed.

```sh
export PUBSUB_EMULATOR_HOST=[::1]:8432
export PUBSUB_PROJECT_ID=my-project-id
```

### Rust: override endpoint and credentials in code

```rust
use google_cloud_auth::credentials::anonymous::Builder as Anonymous;
use google_cloud_pubsub::client::{Publisher, TopicAdmin};
use google_cloud_pubsub::model::Message;

pub async fn sample(project_id: &str, topic_id: &str) -> anyhow::Result<()> {
    let emulator_host = std::env::var("PUBSUB_EMULATOR_HOST")?;
    let endpoint = format!("http://{emulator_host}");

    let topic_admin = TopicAdmin::builder()
        .with_endpoint(&endpoint)
        .with_credentials(Anonymous::new().build())
        .build()
        .await?;
    let topic = topic_admin
        .create_topic()
        .set_name(format!("projects/{project_id}/topics/{topic_id}"))
        .send()
        .await?;
    println!("created topic: {}", topic.name);

    let publisher = Publisher::builder(topic.name)
        .with_endpoint(&endpoint)
        .with_credentials(Anonymous::new().build())
        .build()
        .await?;
    let message_id = publisher
        .publish(Message::new().set_data("Hello, Emulator!"))
        .await?;
    println!("published message with ID: {message_id}");
    Ok(())
}
```

### Stop and unset

To stop the emulator, press Control+C.

After you stop the emulator, run the following command to remove the `PUBSUB_EMULATOR_HOST` environment variable so your application will connect to Pub/Sub:

Linux / macOS:

```sh
unset PUBSUB_EMULATOR_HOST
```

Windows:

```bat
set PUBSUB_EMULATOR_HOST=
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `PUBSUB_EMULATOR_HOST` | env var | `host:port` of the emulator. Set after every emulator start (ports can change). |
| `PUBSUB_PROJECT_ID` | env var | Optional project ID to use with the emulator. |
| `--host-port` | gcloud flag | Default is port 8085 on IPv6 localhost (`::1`). `--host-port=127.0.0.1:8085` for IPv4. |

## Notes

- Node.js and Python: if `PUBSUB_EMULATOR_HOST` is set, the client libraries call the local instance automatically (all languages except Java, C# and Rust). Node.js and Python code is not shown in the source. Java / C# tabs are omitted.
- Rust: the source builds `http://{emulator_host}`; plain `http` is acceptable only for a local emulator, so keep `PUBSUB_EMULATOR_HOST` on `localhost` / `127.0.0.1` / `::1`. `Anonymous` credentials avoid any real authentication.
- The source mentions `--host-port=0.0.0.0:8085` to listen on all addresses; do not use it unless needed, and never expose that port publicly.
- Corrected from the official docs: the original reads `gcloud beta emulators pubsub start --project=PUBSUB_PROJECT_ID [options]`, where `[options]` is a synopsis placeholder, not an argument.
- The emulator supports neither the console nor `gcloud pubsub` commands. The `env-init` output is not shown in the source beyond the example values.
- The Rust block uses `println!` of a topic name and message ID only; no secrets. It is a complete function, not a fragment.
- Out of scope: the Pub/Sub API itself (topics, subscriptions, features and limitations) belongs to a product skill, not `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/pubsub/docs/emulator (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [firestore-emulator.md](./firestore-emulator.md)
- [spanner-emulator.md](./spanner-emulator.md)
