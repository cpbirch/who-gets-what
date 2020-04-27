package the.maltesers.planner

interface PlannerService {

  fun count(year: Int, week: Int): PlannerCount

  fun currentWeek(): List<Slots>
}
