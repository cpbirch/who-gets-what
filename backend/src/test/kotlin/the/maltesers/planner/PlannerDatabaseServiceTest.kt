package the.maltesers.planner

import io.kotlintest.shouldBe
import io.kotlintest.specs.StringSpec
import io.micronaut.test.annotation.MicronautTest
import org.jetbrains.exposed.sql.Database
import the.maltesers.helper.DatabaseHelper.createRandomSlot
import the.maltesers.helper.DatabaseHelper.emptyDatabase
import the.maltesers.helper.DatabaseHelper.runAndRollback

@MicronautTest
class PlannerDatabaseServiceTest(
  private val database: Database
) : StringSpec({

  "should return 0 when no plans are in the database" {
    runAndRollback(database) {
      emptyDatabase()

      val service = PlannerDatabaseService(database)
      val result = service.count(year = 2020, week = 20)
      result.total shouldBe 0
    }
  }

  "should return the number of plans present in the database" {
    runAndRollback(database) {
      val year = 2020
      val week = 20
      val size = 42

      emptyDatabase()
      repeat(size) {
        createRandomSlot(year = year, week = week)
      }

      val service = PlannerDatabaseService(database)
      val result = service.count(year = year, week = week)
      result.total shouldBe size
    }
  }
})
