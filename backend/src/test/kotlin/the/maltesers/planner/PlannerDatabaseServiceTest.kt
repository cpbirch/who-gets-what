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
      val result = service.count()
      result.pending shouldBe 0
    }
  }

  "should return the number of plans present in the database" {
    runAndRollback(database) {
      val size = 42

      emptyDatabase()
      repeat(size) {
        createRandomSlot()
      }

      val service = PlannerDatabaseService(database)
      val result = service.count()
      result.pending shouldBe size
    }
  }
})
