DROP TABLE IF EXISTS recipes;
-- DROP TABLE IF EXISTS logs;

CREATE TABLE recipes (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  directions TEXT[]
);

-- CREATE TABLE logs {
--   id BIGINT   GENERATED ALWAYS AS IDENTITY,
--   date_of_event TEXT NOT NULL,
--   notes VARCHAR(20),
--   rating INT BETWEEN(0 and 10),
--   recipe_id BIGINT NOT NULL REFERENCES recipes(id)
-- };