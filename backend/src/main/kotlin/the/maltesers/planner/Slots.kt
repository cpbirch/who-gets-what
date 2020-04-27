package the.maltesers.planner

import io.micronaut.core.annotation.Introspected

@Introspected
data class Slots(val title: String, val slots: List<Slot>)
