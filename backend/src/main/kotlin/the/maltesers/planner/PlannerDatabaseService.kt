package the.maltesers.planner

import javax.inject.Singleton
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

@Singleton
class PlannerDatabaseService(
  private var database: Database
) : PlannerService {

  override fun count(): PlannerCount =
    transaction(database) {
      val total = PlannerTable.selectAll().count()
      PlannerCount(pending = total)
    }
}
