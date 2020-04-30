package the.maltesers.planner

import java.time.LocalDate
import java.time.temporal.WeekFields
import java.util.Locale

data class CreateSlot(val date: LocalDate, val ppeType: String, val state: SlotState) {

  val year = date.get(WeekFields.of(Locale.getDefault()).weekBasedYear())
  val week = date.get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear())
}
