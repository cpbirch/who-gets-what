package the.maltesers.planner

import io.micronaut.context.annotation.Bean
import io.micronaut.context.annotation.Factory

@Factory
class TablesFactory {

  @Bean
  fun plannerTable(): PlannerTable =
    PlannerTable
}
