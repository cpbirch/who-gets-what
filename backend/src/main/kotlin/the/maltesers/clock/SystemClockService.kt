package the.maltesers.clock

import java.time.LocalDate
import java.time.temporal.WeekFields
import java.util.Locale
import javax.inject.Singleton

@Singleton
class SystemClockService : ClockService {
  override fun currentWeek(): YearWeek =
    LocalDate.now().let {
      val currentWeek = it.get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear())
      YearWeek(year = it.year, week = currentWeek)
    }
}
