# S.O.L.I.D. in TypeScript

Let's take a look at what is SOLID and how we can implement it in TypeScript.

SOLID is an acronym. Each letter stands for a principle which makes software design/code more readable, testable and maintable. These principles have long been promoted by Robert C. Martin (Uncle Bob).

## S - Single responsibility

A class, function or module should have only one reason to change. It should only have one responsibility. For instance, a Login class should only process user logins, it not have user registration logic.
