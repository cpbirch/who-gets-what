package the.maltesers.clock

import io.kotlintest.shouldBe
import io.kotlintest.specs.StringSpec
import java.time.LocalDate
import java.time.temporal.WeekFields
import java.util.Locale

class SystemClockServiceTest : StringSpec({
  "should return the current week number" {
    /* This can be verified manually from http://week-number.net/ */
    val today = LocalDate.now()
    val currentWeek = today.get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear())
    val currentYear = today.year
    val expected = YearWeek(year = currentYear, week = currentWeek)

    val service = SystemClockService()
    service.currentWeek() shouldBe expected
  }
})
