package the.maltesers.helper

import java.time.LocalDate
import java.time.Month
import java.time.temporal.WeekFields
import java.util.Locale
import java.util.UUID
import kotlin.random.Random
import the.maltesers.planner.CreateSlot
import the.maltesers.planner.SlotState

object SlotHelper {

  fun random(year: Int, week: Int): CreateSlot {
    val date = LocalDate.of(year, Month.JANUARY, 1)
      .let {
        /* Move to the desired week */
        it.plusWeeks(week.toLong() - 1)
          /* Go to the first day of the week (Sunday) */
          .minusDays(it.dayOfWeek.value.toLong())
          /* Go to a random day in the week */
          .plusDays(Random.nextLong(7))
      }

    /* Make sure that the above did not mess up something */
    require(year == date.year)
    require(week == date.get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear()))

    val title = "Random slot [${UUID.randomUUID()}]"

    val state = SlotState.values().let {
      it[Random.nextInt(it.size)]
    }

    return CreateSlot(date = date, title = title, state = state)
  }
}
