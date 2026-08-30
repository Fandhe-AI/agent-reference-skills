---
source: https://orm.drizzle.team/docs/relations-schema-declaration
---

# Relations Fundamentals

Conceptual background for database relations: normalization (1NF/2NF/3NF), the three relationship shapes (one-to-one, one-to-many, many-to-many), why foreign keys exist (and when to avoid them), and polymorphic relations.

## Signature / Usage

```sql
-- Many-to-many needs an explicit junction table
CREATE TABLE "enrollments" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "student_id" INTEGER,
  "course_id" INTEGER,
  FOREIGN KEY ("student_id") REFERENCES "students"("id"),
  FOREIGN KEY ("course_id") REFERENCES "courses"("id"),
  UNIQUE ("student_id", "course_id")
);
```

## Notes

- Normalization goals: 1NF (atomic column values), 2NF (no partial dependency on part of a composite key), 3NF (no transitive dependency on non-key attributes).
- One-to-one: FK on either side, unique pairing. One-to-many: FK lives on the "many" side. Many-to-many: requires a junction/associative table linking both sides.
- Foreign keys enforce referential integrity at the database level (preventing orphaned rows) and self-document relationships, but add overhead in very-high-write or distributed/sharded systems, and can conflict with legacy/non-relational data sources.
- Polymorphic relations (e.g. a `Comments` table with `commentable_type` + `commentable_id`) let one relationship point at different target tables; standard SQL has no built-in FK support for this and it is usually handled at the application level (Drizzle's `where`-based predefined filters approximate this).
- This page is conceptual/database-theory content; for the Drizzle `relations` builder API itself see relations.
- Migration (v0 → v1): this page's database-theory content is unaffected by the Relational Queries v1 → v2 API changes; see relations-v1-v2 for the `defineRelations` / `from`-`to` / `through` API diff.

## Related

- [Drizzle Relations](./relations.md)
- [Drizzle Queries (RQB)](./rqb.md)
