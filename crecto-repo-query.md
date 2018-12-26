# Crecto::Repo::Query

The Query class provides building robust composable query builder for retrieving and manipulate data.  

Generally \(but not necessary\), its easiest to define a shortcut variable at the top level of your application.

```ruby
Query = Crecto::Repo::Query
```

The query object can be composed and manipulated before being used.

```ruby
query = Query.new
query = query.where(is_admin: true) if role === "admin"
query = query.where(is_user: true) if role === "user"
Repo.all(User, query)
```

## Query methods

### `where`

```ruby
Query.where(name: "Aaliyah").where(is_admin: false)
```

### `or_where`

```ruby
Query.where(role: "admin").or_where(role: "user")
```

### `select`

```ruby
Query.select(["id", "name"])
```

### `limit`

```ruby
Query.where(name: "Usher").limit(10)
```

### `offset`

```ruby
Query.where(name: "Aretha").limit(10).offset(10)
```

### `order_by`

```ruby
Query.order_by("created_at DESC")
```

### `join`

```ruby
# SELECT * FROM users INNER JOIN images ON images.user_id = users.id
# WHERE images.file_name = ?
class User
  # schema ...
  has_many :images
end

class Image
  schema "images" do
    field :file_name
  end

  belogns_to :user
end
query = Query.join(:images).where("images.file_name = ?", "crystal.jpg")
Repo.all(User, query)
```

### `distinct`

```ruby
Query.distinct("users.name")
```

### `group_by`

```ruby
Query.where(name: "Charlize").join(:posts).group_by("users.id")
```

### `preload`

```ruby
Query.preload(:images)
```

## Nested grouped queries

### `and`

With a block:

```ruby
query = Query.where(foo: "bar").and do |q|
  q.where(name: "GZA").or_where(name: "RZA")
end
```

With multiple query objects:

```ruby
query = Query.where(foo: "bar").and(
  Query.where(name: "GZA").or_where(name: "RZA")
)
```

Would both produce the same query from `Repo.all(User, query)`:

```sql
SELECT users.* FROM users WHERE ((users.foo='bar') AND ((users.name='GZA') OR (users.name='RZA')))
```

### `or`

With a block:

```ruby
query = Query.where(foo: "bar").or do |q|
  q.where(foo: "baz").where(name: "ODB")
end
```

With multiple query objects:

```ruby
query = Query.where(foo: "bar").or(
  Query.where(foo: "baz").where(name: "ODB")
)
```

Would both produce the same query from `Repo.all(User, query)`:

```sql
SELECT users.* FROM users WHERE ((users.foo='bar') OR ((users.foo='baz') AND (users.name='ODB')))
```
