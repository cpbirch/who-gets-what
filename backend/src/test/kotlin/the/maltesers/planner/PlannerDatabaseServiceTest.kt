package the.maltesers.planner

import io.kotlintest.shouldBe
import io.kotlintest.shouldNotBe
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

  "should return the slots for the current week" {
    runAndRollback(database) {

      val year = 2020
      val week = 20
      val size = 10

      emptyDatabase()

      val expected = (1..size)
        .map {
          /*
           * Add slots for the previous, next and current weeks respectively to make sure that the filtering works.
           * If simply add slots belonging to this week, then a select all will get the right number of slots.
           */
          createRandomSlot(year = year, week = week - 1)
          createRandomSlot(year = year, week = week + 1)
          createRandomSlot(year = year, week = week)
        }
        .map { it.second }
        .sortedBy { it.date }

      /* Verify that all data was added */
      countSlots() shouldBe size * 3
      expected.size shouldBe size

      val mock = getMock(clock)
      every { mock.currentWeek() } returns YearWeek(year = year, week = week)

      val service = PlannerDatabaseService(database, mock)
      val result = service.currentWeek()

      /* Count the actual number of slots */
      result.map { it.slots.size }.sum() shouldBe size

      /* TODO: Consider moving this into a custom matcher */
      expected.forEach { e ->
        val expectedDayOfWeek = e.date.dayOfWeek.name
        val expectedPPEType = e.ppeType
        val expectedState = e.state

        val slotsInDay = result.firstOrNull { it.title == expectedDayOfWeek }
        slotsInDay shouldNotBe null

        val slot = slotsInDay?.slots?.firstOrNull { it.ppeType == expectedPPEType }
        slot shouldNotBe null
        slot?.state shouldBe expectedState
      }

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
