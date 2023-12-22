---
title: Repos
---

`Crecto::Repo` maps the database to the database adapter, and is used to run queries on models.  If connections to multiple databases is required, just create a separate Repo for each.  The `config` block defines how the repo connects to the database.

```ruby
module MyRepo
    extend Crecto::Repo

    config do |conf|
        conf.adapter = Crecto::Adapters::Postgres
        # or Crecto::Adapters::Mysql, Crecto::Adapters::SQLite3
        conf.hostname = "localhost"
        conf.database = "my_database"
    end
end

module AnotherRepo
    extend Crecto::Repo

    config do |conf|
        conf.adapter = Crecto::Adapters::SQLite3
        conf.database = "./my_db.db"
    end
end
```

`config` options, all of the options from [crystal-db database](http://crystal-lang.github.io/crystal-db/api/latest/DB/Database.html) are implemented:

* `adapter` - Specify the Crecto adapter to use: `Crecto::Adapters::Postgres`, `Crecto::Adapters::Mysql`, `Crecto::Adapters::SQLite3`
* `checkout_timeout`
* `database` - database name
* `password` - database password
* `username` - database username
* `uri` - full uri to database, can include all config options \(i.e. `postgres://username:password@localhost:5432/my_db?initial_pool_size=10&retry_attemps=5`\)
* `hostname` - database host name
* `initial_pool_size`
* `max_pool_size`
* `retry_attempts`
* `retry_delay`
