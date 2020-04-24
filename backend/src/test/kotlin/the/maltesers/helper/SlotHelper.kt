package the.maltesers.helper

import kotlin.random.Random
import the.maltesers.planner.CreateSlot

object SlotHelper {

  fun random(): CreateSlot {
    val year = Random.nextInt(2019, 2022)
    val week = Random.nextInt(1, 53)
    return CreateSlot(year, week, "Random slot [$year=$week]")
  }
}
