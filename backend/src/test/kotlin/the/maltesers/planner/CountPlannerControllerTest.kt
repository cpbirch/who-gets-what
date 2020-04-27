package the.maltesers.planner

import io.kotlintest.shouldBe
import io.kotlintest.specs.StringSpec
import io.micronaut.http.HttpRequest
import io.micronaut.http.client.RxHttpClient
import io.micronaut.http.client.annotation.Client
import io.micronaut.test.annotation.MicronautTest
import io.micronaut.test.annotation.MockBean
import io.micronaut.test.extensions.kotlintest.MicronautKotlinTestExtension.getMock
import io.mockk.confirmVerified
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify

@MicronautTest
class CountPlannerControllerTest(
  private val service: PlannerService,
  @Client("/planner/count") private val client: RxHttpClient
) : StringSpec({
  "should return the number of slots for a given week within a year" {
    val mock = getMock(service)

    val year = 2020
    val week = 20
    val count = PlannerCount(total = 42)
    every { mock.count(year = year, week = week) } returns count

    val response = client.toBlocking().retrieve(HttpRequest.GET<Any>("/$year/$week"), PlannerCount::class.java)
    response shouldBe count

    verify(exactly = 1) { mock.count(year = year, week = week) }

    /* The hashCode() method is invoked by Micronaut */
    verify(exactly = 2) { mock.hashCode() }
    verify(exactly = 1) { mock.toString() }
    confirmVerified(mock)
  }
}) {
  @MockBean(PlannerService::class)
  fun plannerService(): PlannerService =
    mockk()
}
