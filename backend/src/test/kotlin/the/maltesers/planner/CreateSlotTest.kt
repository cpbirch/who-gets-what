package the.maltesers.planner

import io.kotlintest.shouldBe
import io.kotlintest.specs.StringSpec
import java.time.LocalDate
import java.time.Month

class CreateSlotTest : StringSpec({

  "should return week 1 when date is 1st of January" {
    for (year in 2000..2021) {
      val date = LocalDate.of(year, Month.JANUARY, 1)
      val slot = CreateSlot(date, "Tests", SlotState.FREE)

      slot.year shouldBe year
      slot.week shouldBe 1
    }
  }
})
