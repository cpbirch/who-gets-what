package the.maltesers.planner

import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller("/planner")
class PlannerController internal constructor(
  private var service: PlannerService
) {

  @Get("/count/{year}/{week}", produces = [MediaType.APPLICATION_JSON])
  fun count(year: Int, week: Int): HttpResponse<PlannerCount> =
    HttpResponse.ok(service.count(year, week))
}
