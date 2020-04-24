package the.maltesers.planner

import org.jetbrains.exposed.dao.LongIdTable

object PlannerTable : LongIdTable(name = "planner", columnName = "slot_id") {
  val year = integer("year").index()
  val week = integer("week").index()
  val slot = varchar("slot", 255)
}
