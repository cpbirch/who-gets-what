package the.maltesers.planner

import io.micronaut.core.annotation.Introspected

@Introspected
data class Slot(val title: String, val state: SlotState)
