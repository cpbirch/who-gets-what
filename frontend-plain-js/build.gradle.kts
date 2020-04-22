import com.moowork.gradle.node.npm.NpmTask

plugins {
  id("com.github.node-gradle.node").version("1.3.0")
}

node {
  version = "12.12.0"
  distBaseUrl = "https://nodejs.org/dist"
  download = true
}

task("clean", NpmTask::class) {
  group = "clean"
  description = "Clean the frontend application"
  setNpmCommand("run-script", "clean")
  dependsOn("install-dependencies")
}

task("build", NpmTask::class) {
  group = "build"
  description = "Build the frontend application"
  setNpmCommand("run-script", "build")
  dependsOn("install-dependencies")
}


task("install-dependencies", NpmTask::class) {
  group = "build"
  description = "Install the NPM dependencies"
  setNpmCommand("run-script", "install-dependencies")
}
