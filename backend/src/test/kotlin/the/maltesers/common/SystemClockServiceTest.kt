package the.maltesers.common

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

    val service = SystemClockService()
    service.currentWeek() shouldBe currentWeek
  }
})
