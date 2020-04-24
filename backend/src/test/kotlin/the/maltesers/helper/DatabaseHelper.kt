package the.maltesers.helper

import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.deleteAll
import org.jetbrains.exposed.sql.insertAndGetId
import org.jetbrains.exposed.sql.transactions.transaction
import the.maltesers.planner.CreateSlot
import the.maltesers.planner.CreatedSlot
import the.maltesers.planner.PlannerTable

object DatabaseHelper {

  fun <T> runAndRollback(database: Database, block: (Transaction) -> T): T =
    transaction(database) {
      val result = block(this)
      rollback()
      result
    }

  fun emptyDatabase() {
    PlannerTable.deleteAll()
  }

  private fun createSlot(create: CreateSlot): CreatedSlot =
    PlannerTable.insertAndGetId {
      it[PlannerTable.year] = create.year
      it[PlannerTable.week] = create.week
      it[PlannerTable.slot] = create.slot
    }.let {
      CreatedSlot(slotId = it.value)
    }

  fun createRandomSlot(year: Int = 2020, week: Int = 20): Pair<CreatedSlot, CreateSlot> {
    val create = SlotHelper.random(year, week)
    val created = createSlot(create)
    return created to create
  }
}
