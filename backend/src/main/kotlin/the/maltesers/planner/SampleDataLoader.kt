package the.maltesers.planner

import io.micronaut.context.event.StartupEvent
import io.micronaut.runtime.event.annotation.EventListener
import io.micronaut.scheduling.annotation.Async
import java.time.DayOfWeek
import java.time.LocalDate
import javax.inject.Singleton
import kotlin.random.Random
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.slf4j.LoggerFactory

@Singleton
open class SampleDataLoader(private val database: Database) {

  companion object {
    @JvmStatic
    private val LOGGER = LoggerFactory.getLogger(SampleDataLoader::class.java)
  }

  @Async
  @EventListener
  open fun loadConferenceData(event: StartupEvent) {
    LOGGER.debug("Loading two weeks of sample data")
    transaction(database) {
      val firstDayOfWeek = LocalDate.now()
        .with(DayOfWeek.SUNDAY)
        .minusWeeks(1)

      for (offset in 0..13) {
        val date = firstDayOfWeek.plusDays(offset.toLong())
        repeat(3) {
          val state = SlotState.values().let {
            it[Random.nextInt(it.size)]
          }

          val title = when (state) {
            SlotState.FREE -> "Free"
            else -> listOf("AA", "BB", "CC").random()
          }

          val slot = CreateSlot(date, title, state)
          SlotsTable.insert {
            it[SlotsTable.year] = slot.year
            it[SlotsTable.week] = slot.week
            it[SlotsTable.date] = slot.date
            it[SlotsTable.title] = slot.title
            it[SlotsTable.state] = slot.state
          }
        }
      }
    }
  }
}
