---
source: https://docs.cloud.google.com/pubsub/docs/create-amazon-msk-import-topic
---

# Create and Manage Amazon MSK Import Topics

An Amazon Managed Streaming for Apache Kafka (Amazon MSK) import topic continuously ingests data from an Amazon MSK Kafka topic into Pub/Sub. Pub/Sub authenticates to AWS with workload identity federation: a Google Cloud service account whose unique ID is trusted by an AWS IAM role. Only Amazon MSK provisioned clusters can be imported, and the clusters must be public; clusters behind private VPCs are not supported.

## Signature / Usage

### Trust policy for the AWS role

Create an AWS policy (actions in the table below), then create an AWS role with this custom trust policy. Replace `<SERVICE_ACCOUNT_UNIQUE_ID>` with the unique ID of the Google Cloud service account (copied from the service account details page).

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
     "Effect": "Allow",
     "Principal": {
        "Federated": "accounts.google.com"
     },
     "Action": "sts:AssumeRoleWithWebIdentity",
     "Condition": {
         "StringEquals": {
           "accounts.google.com:sub": "<SERVICE_ACCOUNT_UNIQUE_ID>"
         }
      }
    }
  ]
}
```

### Enable publishing from a single topic

Use this only if the Amazon MSK import topic already exists.

```bash
gcloud pubsub topics add-iam-policy-binding TOPIC_ID \
   --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com" \
   --role="roles/pubsub.publisher"
```

### Create an Amazon MSK import topic

```bash
gcloud pubsub topics create TOPIC_ID \
      --aws-msk-ingestion-cluster-arn MSK_CLUSTER_ARN \
      --aws-msk-ingestion-topic MSK_TOPIC \
      --aws-msk-ingestion-aws-role-arn MSK_ROLE_ARN \
      --aws-msk-ingestion-service-account PUBSUB_SERVICE_ACCOUNT
```

### Create with the Python client library

```python
from google.cloud import pubsub_v1
from google.pubsub_v1.types import Topic
from google.pubsub_v1.types import IngestionDataSourceSettings

# TODO(developer)
# project_id = "your-project-id"
# topic_id = "your-topic-id"
# cluster_arn = "your-cluster-arn"
# msk_topic = "your-msk-topic"
# aws_role_arn = "your-aws-role-arn"
# gcp_service_account = "your-gcp-service-account"

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_id)

request = Topic(
    name=topic_path,
    ingestion_data_source_settings=IngestionDataSourceSettings(
        aws_msk=IngestionDataSourceSettings.AwsMsk(
            cluster_arn=cluster_arn,
            topic=msk_topic,
            aws_role_arn=aws_role_arn,
            gcp_service_account=gcp_service_account,
        )
    ),
)

topic = publisher.create_topic(request=request)

print(f"Created topic: {topic.name} with AWS MSK Ingestion Settings")
```

### Create with the Node.js client library

```javascript
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const clusterArn = 'arn:aws:kafka:...';
// const mskTopic = 'YOUR_MSK_TOPIC';
// const roleArn = 'arn:aws:iam:...';
// const gcpServiceAccount = 'ingestion-account@...';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function createTopicWithAwsMskIngestion(
  topicNameOrId,
  clusterArn,
  mskTopic,
  awsRoleArn,
  gcpServiceAccount,
) {
  // Creates a new topic with AWS MSK ingestion.
  await pubSubClient.createTopic({
    name: topicNameOrId,
    ingestionDataSourceSettings: {
      awsMsk: {
        clusterArn,
        topic: mskTopic,
        awsRoleArn,
        gcpServiceAccount,
      },
    },
  });
  console.log(`Topic ${topicNameOrId} created with AWS MSK ingestion.`);
}
```

### Edit an Amazon MSK import topic

Run `update` with all of the flags shown.

```bash
gcloud pubsub topics update TOPIC_ID \
    --aws-msk-ingestion-cluster-arn MSK_CLUSTER_ARN \
    --aws-msk-ingestion-topic MSK_TOPIC \
    --aws-msk-ingestion-aws-role-arn MSK_ROLE_ARN \
    --aws-msk-ingestion-service-account PUBSUB_SERVICE_ACCOUNT
```

## Options / Props

### gcloud placeholders

| Name | Description |
|------|-------------|
| `TOPIC_ID` | Name or ID of the Pub/Sub topic. |
| `MSK_CLUSTER_ARN` | ARN of the Amazon MSK cluster, format `arn:aws:kafka:${Region}:${Account}:cluster/${ClusterName}/${ClusterId}`. |
| `MSK_TOPIC` | Name of the Amazon MSK Kafka topic to ingest. |
| `MSK_ROLE_ARN` | ARN of the AWS role, format `arn:aws:iam::${Account}:role/${RoleName}`. |
| `PUBSUB_SERVICE_ACCOUNT` | The Google Cloud service account used for federated identity. |

### AWS policy actions

| Service | Action | Purpose |
|---------|--------|---------|
| MSK | Read > `GetBootstrapBrokers` | Get the bootstrap brokers Pub/Sub uses to connect. |
| Apache Kafka APIs for MSK | List > `DescribeTopic` | Get details about the Amazon MSK Kafka topic. |
| Apache Kafka APIs for MSK | Read > `ReadData` | Read data from the Kafka topic. |
| Apache Kafka APIs for MSK | Write > `Connect` | Connect and authenticate to the cluster. |
| STS | Write > `AssumeRoleWithWebIdentity` | Obtain temporary credentials by identity federation. |

### Google Cloud roles

| Principal | Role | Why |
|-----------|------|-----|
| Pub/Sub service agent `service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com` | `roles/pubsub.publisher` | Publish to the import topic. |
| Pub/Sub service agent | `roles/pubsub.serviceAgent` | Gives `serviceusage.services.use` on the topic's project to use its publish quota. Granted by default for projects created after April 9, 2021 unless removed. |
| Pub/Sub service agent | `roles/iam.serviceAccountTokenCreator` | Create short-lived credentials for the service account. Do this only if the service agent lacks `roles/pubsub.serviceAgent`. |
| Principal creating or updating the topic | `roles/iam.serviceAccountUser` | Includes `iam.serviceAccounts.actAs`, to attach the service account to the ingestion settings. |
| User managing import topics | `roles/pubsub.editor` on the topic or project | Permissions `pubsub.topics.create`, `delete`, `get`, `list`, `update`, and `pubsub.topics.publish` plus `pubsub.serviceAgent` to publish. Managing the topic's IAM policy (`pubsub.topics.getIamPolicy`, `setIamPolicy`) needs `roles/pubsub.admin` (see Notes). |

## Notes

- Source inconsistency: the source lists `pubsub.topics.getIamPolicy` and `pubsub.topics.setIamPolicy` among the permissions of the Pub/Sub Editor role (`roles/pubsub.editor`), but the IAM roles reference (`references/iam/pubsub.md`, retrieved 2026-11-14) does not include them in that role; they are in Pub/Sub Admin (`roles/pubsub.admin`). The row lists the Editor permissions without them; grant `roles/pubsub.admin`, or a custom role, to a principal that also manages the topic's IAM policy.
- AWS policy actions: Resources: specify the cluster ARN to restrict the policy to specific clusters (recommended).
- A newly created service account can take 60 seconds or more to become usable (eventually consistent reads).
- If Amazon MSK already holds data, first create a standard topic and a default subscription without ingestion settings, then convert the topic to an import topic (change topic type). Creating the topic and subscription separately can lose messages sent in between.
- Data from an Amazon MSK Kafka topic is always read from the earliest offset.
- To re-create the Kafka topic of an existing import topic with the same name, do not just delete and re-create it, because that can invalidate Pub/Sub's offset management and cause data loss. Delete the Pub/Sub import topic, delete the Kafka topic, create the Kafka topic, then create the Pub/Sub import topic. This is irreversible; try it on a disposable project first.
- Publisher throughput of import topics is bound by the publish quota of the topic (see Pub/Sub quotas and limits).
- The trust policy keeps the source's `<SERVICE_ACCOUNT_UNIQUE_ID>` placeholder inside the JSON string; replace it before creating the AWS role.
- The source also shows Console and AWS console click-paths, C++, Go, Java and Node.js TypeScript tabs, and a Troubleshooting page.
- Source: https://docs.cloud.google.com/pubsub/docs/create-amazon-msk-import-topic (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-cloud-storage-import-topic.md](./create-cloud-storage-import-topic.md)
- [smts-overview.md](./smts-overview.md)
