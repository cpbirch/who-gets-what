package the.maltesers.planner

import org.jetbrains.exposed.dao.LongIdTable

object SlotsTable : LongIdTable(name = "slots", columnName = "slot_id") {
  val year = integer("year").index()
  val week = integer("week").index()
  val title = varchar("title", 255)
  val state = enumerationByName("state", 64, SlotState::class)
}
