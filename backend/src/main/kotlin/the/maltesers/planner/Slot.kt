package the.maltesers.planner

import io.micronaut.core.annotation.Introspected

@Introspected
data class Slot(val ppeType: String, val state: SlotState)
