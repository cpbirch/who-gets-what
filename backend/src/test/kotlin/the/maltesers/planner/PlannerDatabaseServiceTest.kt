package the.maltesers.planner

import io.kotlintest.shouldBe
import io.kotlintest.specs.StringSpec
import io.micronaut.test.annotation.MicronautTest
import io.micronaut.test.annotation.MockBean
import io.micronaut.test.extensions.kotlintest.MicronautKotlinTestExtension.getMock
import io.mockk.confirmVerified
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.jetbrains.exposed.sql.Database
import the.maltesers.clock.ClockService
import the.maltesers.clock.YearWeek
import the.maltesers.helper.DatabaseHelper.countSlots
import the.maltesers.helper.DatabaseHelper.createRandomSlot
import the.maltesers.helper.DatabaseHelper.emptyDatabase
import the.maltesers.helper.DatabaseHelper.runAndRollback

@MicronautTest
class PlannerDatabaseServiceTest(
  private val database: Database,
  private val clock: ClockService
) : StringSpec({

  "should return 0 when no plans are in the database" {
    runAndRollback(database) {
      val mock = getMock(clock)

      emptyDatabase()

      val service = PlannerDatabaseService(database, mock)
      val result = service.count(year = 2020, week = 20)
      result.total shouldBe 0

      /* The hashCode() method is invoked by Micronaut */
      verify(exactly = 1) { mock.hashCode() }
      verify(exactly = 1) { mock.toString() }
      confirmVerified(mock)
    }
  }

  "should return the number of plans present in the database" {
    runAndRollback(database) {
      val mock = getMock(clock)

      val year = 2020
      val week = 20
      val size = 42

      emptyDatabase()
      repeat(size) {
        createRandomSlot(year = year, week = week)
      }

      val service = PlannerDatabaseService(database, mock)
      val result = service.count(year = year, week = week)
      result.total shouldBe size

      /* The hashCode() method is invoked by Micronaut */
      verify(exactly = 1) { mock.hashCode() }
      verify(exactly = 1) { mock.toString() }
      confirmVerified(mock)
    }
  }

  "!should return the slots for the current week" {
    runAndRollback(database) {

      val year = 2020
      val week = 20
      val size = 10

      emptyDatabase()

      /* Add slots for the previous, current and next weeks respectively */
      for (offset in -1..1) {
        repeat(size) {
          createRandomSlot(year = year, week = week + offset)
        }
      }

      /* Verify that all data was added */
      countSlots() shouldBe size * 3

      val mock = getMock(clock)
      every { mock.currentWeek() } returns YearWeek(year = year, week = week)

      val service = PlannerDatabaseService(database, mock)
      val result = service.currentWeek()
      result.size shouldBe size

      verify(exactly = 1) { mock.currentWeek() }

      /* The hashCode() method is invoked by Micronaut */
      verify(exactly = 1) { mock.hashCode() }
      verify(exactly = 1) { mock.toString() }
      confirmVerified(mock)
    }
  }
}) {
  @MockBean(ClockService::class)
  fun clockService(): ClockService =
    mockk()
}
