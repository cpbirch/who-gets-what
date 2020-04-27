package the.maltesers.common

import java.time.LocalDate
import java.time.temporal.WeekFields
import java.util.Locale
import javax.inject.Singleton

@Singleton
class SystemClockService : ClockService {
  override fun currentWeek(): Int =
    LocalDate.now().let {
      it.get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear())
    }
}
