---
description: 'Database wrapper for Crystal, inspired by Ecto'
---

# Crecto

Crecto is an ORM written in Crystal which uses a Repository architectural pattern, where storage related concerns \(the Repo\) are separated from business concerns \(the model\).

Crecto was inspired by [Ecto ](https://hexdocs.pm/ecto/Ecto.html)for the [Elixir ](https://elixir-lang.org/)language.  And while Elixir is a functional language, Crystal and Crecto are not.  Models have mutable properties and are instances of Classes which inherit from `Crecto::Model`.

Crecto features multiple database connectors via `Crecto::Repo`, query building with `Crecto::Query`, transactions using `Crecto::Multi`, validations, database constraints, and more.



