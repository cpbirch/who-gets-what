package the.maltesers.helper

import java.time.DayOfWeek
import java.time.LocalDate
import java.time.Month
import java.time.temporal.ChronoField
import java.time.temporal.WeekFields
import java.util.Locale
import java.util.UUID
import kotlin.random.Random
import the.maltesers.helper.SlotHelper.random
import the.maltesers.planner.CreateSlot
import the.maltesers.planner.SlotState

object SlotHelper {

  fun random(year: Int, week: Int): CreateSlot {
    val firstDayOfWeek = WeekFields.of(Locale.getDefault()).firstDayOfWeek

    val date = LocalDate.of(year, Month.JANUARY, 1)
      /* Move to the desired week */
      .with(ChronoField.ALIGNED_WEEK_OF_YEAR, week.toLong())
      /* Go to the first day of the week (Sunday or Monday) */
      .with(firstDayOfWeek)
      /* Go to a random day in the week */
      .let {
        val random = DayOfWeek.values().let { dow ->
          dow[Random.nextInt(dow.size)]
        }

        /* When we move to the first day of week, we go to the next week, and thus need to go back by a week. */
        if (firstDayOfWeek == random) {
          it.minusWeeks(1)
        } else {
          it.with(random)
        }
      }

    val title = "Random slot [${UUID.randomUUID()}]"

    val state = SlotState.values().let {
      it[Random.nextInt(it.size)]
    }

    return CreateSlot(date = date, title = title, state = state).apply {
      /* Make sure that the above did not mess up something */
      require(year == this.year) { "Expected the date $date to have the year $year" }
      require(week == this.week) {
        "Expected the date $date to be within the week $week but it is in week ${this.week}"
      }
    }
  }
}
