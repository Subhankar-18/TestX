        # ---- Build Stage ----

#official maven image to build the spring boot app
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Set working directory inside the container
WORKDIR /backend

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the Spring Boot app
COPY src ./src
RUN mvn clean package -DskipTests

        # ---- Runtime Stage ----

#official openjdk image to run the application
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /backend

# Copy the jar file from the build stage
COPY --from=build /backend/target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Command to run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
