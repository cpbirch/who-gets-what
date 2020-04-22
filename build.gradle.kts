allprojects {
    repositories {
        mavenLocal()
        jcenter()
    }
}

subprojects {
    version = "1.0"
}

task("copyFrontendResources") {
    group = "build"
    description = "Copy frontend resources into backend"
    dependsOn(":frontend-open-wc:build")

    doFirst {
        copy {
            from("./frontend-open-wc/dist")
            into("./backend/generated/main/resources/web")
        }
    }
}

task("assembleAll") {
    group = "build"
    description = "Build combined backend & frontend into one JAR"
    dependsOn("copyFrontendResources", ":backend:shadowJar")
}

defaultTasks("clean", "ktlintFormat", "dependencyUpdates", "test")
