package the.maltesers

import io.micronaut.runtime.Micronaut

object Application {

    @JvmStatic
    fun main(args: Array<String>) {
        Micronaut.build()
                .packages("the.maltesers")
                .mainClass(Application.javaClass)
                .start()
    }
}
