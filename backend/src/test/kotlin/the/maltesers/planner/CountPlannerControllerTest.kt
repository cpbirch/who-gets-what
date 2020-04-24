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
  "should return the number of polls" {
    val mock = getMock(service)

    val count = PlannerCount(pending = 42)
    every { mock.count() } returns count

    val response = client.toBlocking().retrieve(HttpRequest.GET<Any>("/"), PlannerCount::class.java)
    response shouldBe count

    verify(exactly = 1) { mock.count() }

    /* The hashCode() method is invoked by Micronaut */
    verify(exactly = 2) { mock.hashCode() }
    verify(atMost = 1) { mock.toString() }
    confirmVerified(mock)
  }
}) {
  @MockBean(PlannerService::class)
  fun pollService(): PlannerService {
    return mockk()
  }
}
