# Java SDK

OpenAI API helper for Java, currently in beta. Distributed as the `com.openai:openai-java` Maven artifact.

## Signature / Usage

```xml
<dependency>
  <groupId>com.openai</groupId>
  <artifactId>openai-java</artifactId>
  <version>4.50.0</version>
</dependency>
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;

public class Main {
  public static void main(String[] args) {
    OpenAIClient client = OpenAIOkHttpClient.fromEnv();

    ResponseCreateParams params =
        ResponseCreateParams.builder().input("Say this is a test").model("gpt-5.6").build();

    Response response = client.responses().create(params);
    response.output().stream()
        .flatMap(item -> item.message().stream())
        .flatMap(message -> message.content().stream())
        .flatMap(content -> content.outputText().stream())
        .forEach(outputText -> System.out.println(outputText.text()));
  }
}
```

## Notes

- `OpenAIOkHttpClient.fromEnv()` reads `OPENAI_API_KEY` from the environment; the underlying HTTP client is OkHttp.
- Output text requires unwrapping message content items via streams (no direct `output_text` shortcut as in Python/JS).
- Source: [github.com/openai/openai-java](https://github.com/openai/openai-java).

## Related

- [.NET SDK](./dotnet-sdk.md)
- [Go SDK](./go-sdk.md)
