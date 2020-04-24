package the.maltesers.common

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.micronaut.context.annotation.Bean
import io.micronaut.context.annotation.Factory
import javax.sql.DataSource
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.transactions.transaction

@Factory
class DatabaseFactory {

  @Bean
  fun database(dataSource: DataSource, tables: Array<Table>) =
    Database.connect(dataSource).apply {
      transaction(this) {
        SchemaUtils.createMissingTablesAndColumns(*tables)
      }
    }

  @Bean
  fun dataSource(): DataSource =
    HikariConfig().apply {
      jdbcUrl = "jdbc:h2:mem:wgw;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=TRUE"
      driverClassName = "org.h2.Driver"
      username = "who"
      password = "gets what"
    }.let {
      HikariDataSource(it)
    }
}
