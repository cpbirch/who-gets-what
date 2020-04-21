# who-gets-what

Fair resource allocation

For this small project started during the Covid 19 pandemic, we wanted to imagine we were a business who produced PPE equipment and that we had a method to fairly allocate the PPE equipment to those who requested it.

So we made up axioms about our business.

1. As a business, we can make 3 boxes of PPE a day.
2. We can make three different types of PPE; circle, triangle and square.
3. Any type of PPE can be made in any slot.
4. We want to accept orders for PPE equipment.
5. We want to eventually and consistently confirm who is getting which box on which day.

There are some interesting scenarios to solve.
* Given more than 21 requests for PPE, what happens to allocations?
* Adding a constraints: 21 Circle PPE can made each week, but only 12 Triangle PPE and 5 Square PPE. How are requests allocated fairly?
* Pandemics spread around a globe causing the first affected to order all the PPE equipment.  Now that more requestors are are asking for PPE, how can we allocate it fairly? Do we redistribute allocations automatically?



## Setup

1. Run all tests, covering frontend and backend

    ```bash
    $ ./gradlew
    ```

    This will also install the NPM dependencies

1. Package all as one JAR

    ```bash
    $ ./gradlew assembleAll
    ```

1. Run the assembled application

    ```bash
    $ java -jar backend/build/libs/backend-1.0-all.jar
    ```

    Application will be available at: [http://localhost:8080](http://localhost:8080).
