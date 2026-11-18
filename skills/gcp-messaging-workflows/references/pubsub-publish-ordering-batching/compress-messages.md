---
source: https://docs.cloud.google.com/pubsub/docs/compress-messages
---

# Compress published messages (gRPC)

For publishers sending large amounts of data, gRPC client-side compression (Gzip) reduces network traffic before the publish request is sent. It is supported only in the Java and C++ client libraries.

## Signature / Usage

### Java

```java
import com.google.api.core.ApiFuture;
import com.google.cloud.pubsub.v1.Publisher;
import com.google.protobuf.ByteString;
import com.google.pubsub.v1.PubsubMessage;
import com.google.pubsub.v1.TopicName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

public class PublishWithGrpcCompressionExample {
  public static void main(String... args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "your-project-id";
    // Choose an existing topic.
    String topicId = "your-topic-id";

    publishWithGrpcCompressionExample(projectId, topicId);
  }

  public static void publishWithGrpcCompressionExample(String projectId, String topicId)
      throws IOException, ExecutionException, InterruptedException {
    TopicName topicName = TopicName.of(projectId, topicId);

    // Create a publisher and set enable compression to true.
    Publisher publisher = null;
    try {
      // Enable compression and configure the compression threshold to 10 bytes (default to 240 B).
      // Publish requests of sizes > 10 B (excluding the request headers) will get compressed.
      // The number of messages in a publish request is determined by publisher batch settings.
      // Batching is turned off by default, i.e. each publish request contains only one message.
      publisher =
          Publisher.newBuilder(topicName)
              .setEnableCompression(true)
              .setCompressionBytesThreshold(10L)
              .build();

      byte[] bytes = new byte[1024];
      ByteString data = ByteString.copyFrom(bytes);
      PubsubMessage pubsubMessage = PubsubMessage.newBuilder().setData(data).build();

      // Once published, returns a server-assigned message id (unique within the topic).
      // You can look up the actual size of the outbound data using the Java Logging API.
      // Configure logging properties as shown in
      // https://github.com/googleapis/java-pubsub/tree/main/samples/snippets/src/main/resources/logging.properties
      // and look for "OUTBOUND DATA" with "length=" in the output log.
      ApiFuture<String> messageIdFuture = publisher.publish(pubsubMessage);
      String messageId = messageIdFuture.get();
      System.out.println("Published a compressed message of message ID: " + messageId);
    } finally {
      if (publisher != null) {
        // When finished with the publisher, shutdown to free up resources.
        publisher.shutdown();
        publisher.awaitTermination(1, TimeUnit.MINUTES);
      }
    }
  }
}
```

### C++

```c++
namespace g = ::google::cloud;
namespace pubsub = ::google::cloud::pubsub;
[](std::string project_id, std::string topic_id) {
  auto topic = pubsub::Topic(std::move(project_id), std::move(topic_id));
  auto publisher = pubsub::Publisher(pubsub::MakePublisherConnection(
      std::move(topic),
      g::Options{}
          // Compress any batch of messages over 10 bytes. By default, no
          // messages are compressed, set this to 0 to compress all batches,
          // regardless of their size.
          .set<pubsub::CompressionThresholdOption>(10)
          // Compress using the GZIP algorithm. By default, the library uses
          // GRPC_COMPRESS_DEFLATE.
          .set<pubsub::CompressionAlgorithmOption>(GRPC_COMPRESS_GZIP)));
  auto message_id = publisher.Publish(
      pubsub::MessageBuilder{}.SetData("Hello World!").Build());
  auto done = message_id.then([](g::future<g::StatusOr<std::string>> f) {
    auto id = f.get();
    if (!id) throw std::move(id).status();
    std::cout << "Hello World! published with id=" << *id << "\n";
  });
  // Block until the message is published
  done.get();
}
```

## Options / Props

| Library | Setting | Default stated in the source |
|---|---|---|
| Java | `setEnableCompression(true)`, `setCompressionBytesThreshold(bytes)` | threshold 240 B; requests larger than the threshold (excluding headers) are compressed |
| C++ | `CompressionThresholdOption`, `CompressionAlgorithmOption` | no messages compressed by default; threshold 0 compresses all batches; default algorithm `GRPC_COMPRESS_DEFLATE` (the sample sets `GRPC_COMPRESS_GZIP`) |

| Role | Where |
|---|---|
| Pub/Sub Publisher (`roles/pubsub.publisher`) | on the topic |

## Notes

- gRPC client-side compression is supported in Java and C++ only. Pub/Sub compression for gRPC uses the Gzip algorithm.
- gRPC compression does not contribute to Pub/Sub cost savings; it saves networking costs.
- The compression ratio improves as the payload grows from a few hundred bytes to many kilobytes, and text such as JSON or XML compresses better than binary data such as images. Turn on batch settings together with compression for the best results.
- Source inconsistency: the Java sample's comment says "Batching is turned off by default, i.e. each publish request contains only one message.", while the publishing best practices page (https://docs.cloud.google.com/pubsub/docs/publish-best-practices) says batching is enabled by default when you use the client libraries. The sample is copied as written.
- Measure publishing throughput on Google Cloud with the `instance/network/sent_bytes_count` metric (Sent bytes); elsewhere use client-specific tools.
- Source: https://docs.cloud.google.com/pubsub/docs/compress-messages (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [batch-messaging.md](./batch-messaging.md)
- [flow-control-messages.md](./flow-control-messages.md)
