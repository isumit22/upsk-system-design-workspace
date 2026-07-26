# Technical Explanation: REST-to-GraphQL Migration

## Decision Summary

We have decided to migrate ShopStream's public API from REST to GraphQL over an 8-week period while running both systems in parallel. GraphQL is a query language for APIs that allows clients to request exactly the data they need, reducing unnecessary network requests and simplifying frontend development.

This migration is expected to reduce frontend API calls by approximately 40%, eliminate 15 single-purpose aggregation endpoints, and improve development speed for both the web and mobile applications.

## Why We Chose This

REST (Representational State Transfer) exposes fixed API endpoints, where an endpoint is a specific URL that provides predefined data. Our current REST API contains 47 endpoints, including 15 endpoints created solely because the mobile application requires different data than the web application.

Frontend developers currently spend around 30% of every sprint building aggregation endpoints, which combine data from multiple backend services into a format required by a single user interface. This slows feature delivery and increases maintenance effort.

GraphQL solves this problem by allowing each client to request only the information it needs in a single query. Instead of creating new REST endpoints for every screen, both the web and mobile applications can retrieve different data from the same GraphQL endpoint.

The team evaluated two alternatives before making this decision. Building a Backend-for-Frontend (BFF), a dedicated service between the frontend and backend, was rejected because it would introduce additional deployment and operational complexity. Standardizing REST endpoint responses was also rejected because it would not solve the different data requirements of the web and mobile applications.

## Risks and Mitigations

The migration introduces several technical risks.

- GraphQL has a learning curve, especially because two of the three engineers assigned to the migration are new to GraphQL.
- Query performance can become inefficient if clients request deeply nested data.
- Caching is more complex than REST because GraphQL commonly uses POST requests with query bodies instead of fixed URLs.

To reduce these risks, the team will run REST and GraphQL simultaneously during the migration, allowing gradual adoption without disrupting existing applications. Engineers new to GraphQL will receive guidance from experienced teammates, and performance will be monitored while queries are optimized as new features are developed.

## What This Means for Priya

As a new backend engineer, you will work with both REST and GraphQL during the migration period. You should become familiar with GraphQL concepts, existing API schemas, and the migration roadmap before implementing new features.

You will collaborate closely with the backend team to migrate existing endpoints, review GraphQL queries, monitor performance, and ensure that both web and mobile applications continue to function correctly throughout the transition.

## Next Steps

- Read the GraphQL schema and API documentation.
- Review the current REST endpoints and understand their purpose.
- Pair with an experienced backend engineer during your first migration tasks.
- Follow the migration plan while supporting both REST and GraphQL implementations.
- Participate in code reviews to maintain consistency and performance throughout the migration.