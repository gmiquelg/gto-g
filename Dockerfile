# Stage 1: Build Backend
FROM maven:3.9.6-eclipse-temurin-17 AS build-back
WORKDIR /app/backend
COPY src/backend/pom.xml .
RUN mvn dependency:go-offline -B || true
COPY src/backend/src ./src
RUN mvn package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build-back /app/backend/target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
