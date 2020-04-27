package the.maltesers.planner

import javax.inject.Singleton
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

@Singleton
class PlannerDatabaseService(
  private var database: Database
) : PlannerService {

  override fun count(year: Int, week: Int): PlannerCount =
    transaction(database) {
      val total = SlotsTable.selectAll()
        .andWhere { SlotsTable.year eq year }
        .andWhere { SlotsTable.week eq week }
        .count()
      PlannerCount(total = total)
    }

  override fun currentWeek(): List<Slots> {
    TODO("Remember to write a test first!!")
  }
}
