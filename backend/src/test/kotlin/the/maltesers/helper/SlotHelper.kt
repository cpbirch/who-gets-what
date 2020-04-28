package the.maltesers.helper

import java.time.DayOfWeek
import java.time.LocalDate
import java.time.Month
import java.time.temporal.ChronoField
import java.time.temporal.WeekFields
import java.util.Locale
import java.util.UUID
import kotlin.random.Random
import the.maltesers.planner.CreateSlot
import the.maltesers.planner.SlotState

object SlotHelper {

  fun random(year: Int, week: Int): CreateSlot {
    val date = LocalDate.of(year, Month.JANUARY, 1)
      /* Move to the desired week */
      .with(ChronoField.ALIGNED_WEEK_OF_YEAR, week.toLong())
      /* Go to the first day of the week (Sunday) */
      .with(WeekFields.of(Locale.getDefault()).firstDayOfWeek)
      /* Go to a random day in the week */
      .with(DayOfWeek.values().let {
        it[Random.nextInt(it.size)]
      })

    /* Make sure that the above did not mess up something */
    require(year == date.year) { "Expected the date $date to have the year $year" }
    with(date.get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear())) {
      require(week == this) {
        "Expected the date $date within the week $week but is in week $this"
      }
    }

    val title = "Random slot [${UUID.randomUUID()}]"

    val state = SlotState.values().let {
      it[Random.nextInt(it.size)]
    }

    return CreateSlot(date = date, title = title, state = state)
  }
}
