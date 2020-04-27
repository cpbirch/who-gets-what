import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
  application
  kotlin("jvm").version("1.3.72")
  kotlin("kapt").version("1.3.72")
  kotlin("plugin.allopen").version("1.3.72")

  id("com.github.johnrengelman.shadow").version("5.2.0")
  id("org.jlleitschuh.gradle.ktlint").version("9.2.1")
  id("com.github.ben-manes.versions").version("0.28.0")
}

val developmentOnly: Configuration by configurations.creating

configurations {
  all {
    resolutionStrategy {
      val ktlint = "0.36.0"
      force(
        "com.pinterest:ktlint:$ktlint",
        "com.pinterest.ktlint:ktlint-reporter-checkstyle:$ktlint"
      )
    }
  }
}

tasks {
  withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
    kotlinOptions.javaParameters = true
  }

  test {
    useJUnitPlatform()
    testLogging {
      events("passed", "skipped", "failed")
    }
  }

  named<ShadowJar>("shadowJar") {
    mergeServiceFiles()
  }
}

sourceSets.getByName("main") {
  resources.srcDirs("src/main/resources", "generated/main/resources")
}

application {
  mainClassName = "the.maltesers.Application"
}

allOpen {
  annotation("io.micronaut.aop.Around")
}

dependencies {
  val kotlin = "1.3.72"
  val micronaut = "2.0.0.M2"
  val jna = "5.5.0"
  val directoryWatcher = "0.9.9"
  val jacksonModuleKotlin = "2.11.0.rc1"
  val logbackClassic = "1.3.0-alpha5"
  val jansi = "1.18"
  val hikari = "3.4.2"
  val exposed = "0.23.1"
  val h2 = "1.4.200"
  val mockk = "1.9.3"
  val kotlintest = "1.1.5"
  val kotlintestRunner = "3.4.0"

  implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:$kotlin")

  implementation(platform("io.micronaut:micronaut-bom:$micronaut"))
  implementation("io.micronaut:micronaut-http-server-netty")
  implementation("io.micronaut:micronaut-http-client")
  implementation("io.micronaut:micronaut-management")
  runtimeOnly("com.fasterxml.jackson.module:jackson-module-kotlin:$jacksonModuleKotlin")

  kapt(platform("io.micronaut:micronaut-bom:$micronaut"))
  kapt("io.micronaut:micronaut-inject-java")
  kapt("io.micronaut:micronaut-validation")
  kaptTest(platform("io.micronaut:micronaut-bom:$micronaut"))

  /* Data */
  implementation("com.zaxxer:HikariCP:$hikari")
  implementation("org.jetbrains.exposed:exposed-core:$exposed")
  implementation("org.jetbrains.exposed:exposed-jdbc:$exposed")
  implementation("org.jetbrains.exposed:exposed-java-time:$exposed")
  implementation("com.h2database:h2:$h2")

  /* Logging */
  runtimeOnly("ch.qos.logback:logback-classic:$logbackClassic")
  runtimeOnly("org.fusesource.jansi:jansi:$jansi")

  testImplementation(platform("io.micronaut:micronaut-bom:$micronaut"))
  testImplementation("io.micronaut.test:micronaut-test-kotlintest:$kotlintest")
  testImplementation("io.mockk:mockk:$mockk")
  testImplementation("io.kotlintest:kotlintest-runner-junit5:$kotlintestRunner")

  /* Configuring Native File Watch on Mac OS X */
  developmentOnly("io.micronaut:micronaut-runtime-osx")
  developmentOnly("net.java.dev.jna:jna:$jna")
  developmentOnly("io.methvin:directory-watcher:$directoryWatcher")
}
