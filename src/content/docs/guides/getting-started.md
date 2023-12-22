---
title: Getting Started
---

#### Installation

Add the shard to your applications `shard.yml`

```text
dependencies:
  crecto:    
    github: Crecto/crecto
```

Include a database adapter:

* Postgres

Include [crystal-pg](https://github.com/will/crystal-pg) in your project **before** Crecto.

```ruby
require "pg"
require "crecto"
```

* Mysql

Include [crystal-mysql](https://github.com/crystal-lang/crystal-mysql) in your project **before** Crecto.

```ruby
require "mysql"
require "crecto"
```

* SQLite

Include [crystal-sqlite3](https://github.com/crystal-lang/crystal-sqlite3) in your project **before** Crecto.

```ruby
require "sqlite3"
require "crecto"
```

#### Example Usage

```ruby
module MyRepo
    extend Crecto::Repo
    
    config do |conf|
        conf.adapter = Crecto::Adapters::Postgres
        conf.hostname = "localhost"
        conf.database = "my_database"
    end
end

class User < Crecto::Model
    schema "users" do # table name
        field :first_name, String
        field :last_name, String
    end
    
    validate_required [:first_name, :last_name]
end

user = User.new
user.first_name = "fred"
user.last_name = "flinstone"
changeset = MyRepo.insert(user)
changeset.errors.any?
changeset.valid?
```



