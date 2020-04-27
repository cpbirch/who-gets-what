package the.maltesers.planner

import io.kotlintest.shouldBe
import io.kotlintest.specs.StringSpec
import io.micronaut.core.type.Argument
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
class FetchWeekPlannerControllerTest(
  private val service: PlannerService,
  @Client("/planner/week") private val client: RxHttpClient
) : StringSpec({
  "should return the slots for the current week" {
    val mock = getMock(service)

    val slots = listOf(
      Slots(
        title = "Monday", slots = listOf(
          Slot(title = "AA", state = SlotState.TAKEN),
          Slot(title = "Free", state = SlotState.FREE),
          Slot(title = "Free", state = SlotState.FREE)
        )
      ),
      Slots(
        title = "Tuesday", slots = listOf(
          Slot(title = "BB", state = SlotState.TAKEN),
          Slot(title = "CC", state = SlotState.TAKEN),
          Slot(title = "AA", state = SlotState.TAKEN)
        )
      )
    )
    every { mock.currentWeek() } returns slots

    val response = client.toBlocking()
      .retrieve(HttpRequest.GET<Any>("/current"), Argument.of(List::class.java, Slots::class.java))
    response shouldBe slots

    verify(exactly = 1) { mock.currentWeek() }

    /* The hashCode() method is invoked by Micronaut */
    verify(exactly = 2) { mock.hashCode() }
    verify(exactly = 1) { mock.toString() }
    confirmVerified(mock)
  }
}) {
  @MockBean(PlannerService::class)
  fun pollService(): PlannerService =
    mockk()
}
