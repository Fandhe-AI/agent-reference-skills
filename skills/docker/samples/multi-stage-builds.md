---
source: https://docs.docker.com/get-started/docker-concepts/building-images/multi-stage-builds/
---

# Multi-stage builds

Split a Spring Boot (Maven) build into a JDK build stage and a JRE runtime stage to shrink the final image.

```dockerfile
FROM eclipse-temurin:21.0.8_9-jdk-jammy AS builder
WORKDIR /opt/app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY ./src ./src
RUN ./mvnw clean install

FROM eclipse-temurin:21.0.8_9-jre-jammy AS final
WORKDIR /opt/app
EXPOSE 8080
COPY --from=builder /opt/app/target/*.jar /opt/app/*.jar
ENTRYPOINT ["java", "-jar", "/opt/app/*.jar"]
```

Build and compare sizes (the last stage is the default target):

```console
$ docker build -t spring-helloworld-builder .
$ docker images
```

## Notes

- Without `--target`, the last stage is built. `docker build -t spring-helloworld-builder --target builder .` builds only the `builder` stage.
- In the source guide the image shrinks from 880MB (single stage) to 428MB.
- The guide recommends producing a custom JRE-like runtime with `jlink` for production use.
