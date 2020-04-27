package the.maltesers.planner

import io.micronaut.core.annotation.Introspected

@Introspected
enum class SlotState {
  FREE, TAKEN
}
