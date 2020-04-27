package the.maltesers.planner

import javax.inject.Singleton
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import the.maltesers.clock.ClockService

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
    TODO("coming soon...")
    // transaction {
    //   val currentWeek = clock.currentWeek()
    //   SlotsTable.selectAll()
    //     .andWhere { SlotsTable.year eq currentWeek.year }
    //     .andWhere { SlotsTable.week eq currentWeek.week }
    //     .map {
    //       Slot(title = it[title], state = it[state])
    //     }
    // }
}
