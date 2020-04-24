package the.maltesers.helper

import java.util.UUID
import the.maltesers.planner.CreateSlot

object SlotHelper {

  fun random(year: Int, week: Int): CreateSlot =
    CreateSlot(year, week, "Random slot [${UUID.randomUUID()}]")
}
