package the.maltesers.planner

import org.jetbrains.exposed.dao.id.LongIdTable
import org.jetbrains.exposed.sql.`java-time`.date

object SlotsTable : LongIdTable(name = "slots", columnName = "slot_id") {
  val year = integer("year").index()
  val week = integer("week").index()
  val date = date("date")
  val ppeType = varchar("ppeType", 255)
  val state = enumerationByName("state", 64, SlotState::class)
}
