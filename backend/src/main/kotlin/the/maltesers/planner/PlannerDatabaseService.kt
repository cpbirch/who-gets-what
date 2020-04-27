package the.maltesers.planner

import javax.inject.Singleton
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import the.maltesers.clock.ClockService
import the.maltesers.planner.SlotsTable.date
import the.maltesers.planner.SlotsTable.state
import the.maltesers.planner.SlotsTable.title
import the.maltesers.planner.SlotsTable.week
import the.maltesers.planner.SlotsTable.year

@Singleton
class PlannerDatabaseService(
  private val database: Database,
  private val clock: ClockService
) : PlannerService {

  override fun count(year: Int, week: Int): PlannerCount =
    transaction(database) {
      val total = SlotsTable.selectAll()
        .andWhere { SlotsTable.year eq year }
        .andWhere { SlotsTable.week eq week }
        .count()
      PlannerCount(total = total)
    }

  override fun currentWeek(): List<Slots> =
    transaction {
      val currentWeek = clock.currentWeek()
      SlotsTable.selectAll()
        .andWhere { year eq currentWeek.year }
        .andWhere { week eq currentWeek.week }
        .orderBy(date)
        .map {
          it[date].dayOfWeek to Slot(title = it[title], state = it[state])
        }
        .groupBy({ it.first.name }, { it.second })
        .map { Slots(it.key, it.value) }
    }
}
