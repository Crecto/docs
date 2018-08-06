# Database Operations

### `all`

Returns all records of the passed type, or matching a query

```ruby
MyRepo.all(User)

# with a query
query = Crecto::Repo::Query.where(name: "Keanu")
MyRepo.all(User, query)

# preload associations
users = MyRepo.all(User, preload: [:image])
users.first.images # already loaded, no need to query
```

### `get`

Returns a single matching record, or nil if the record doesn't exist

```ruby
user = MyRepo.get(User, 1)
user.class # User | Nil
```

### `get!`

Returns a single record by primary key, or raises an exception if there is no matching record

```ruby
user = MyRepo.get!(User, 1) # raises Crecto::NoResults if no record exists
user.class # User
```

### `get_by`

Returns a single record matching the values passed, or nil if the record doesn't exist

```ruby
user = MyRepo.get_by(User, first_name: "Dekimbe")
user.class # User | Nil
```

### `get_by!`

Returns a single record matching the values passed, or raises an exception if there is no matching record

```ruby
user = MyRepo.get_by!(User, first_name: "") # raises Crecto::NoResults if no record exists
user.class # User
```

### `insert`

Inserts the new data model into the database, returns a changeset

```ruby
user = User.new
user.name = "Tupac"
changeset = MyRepo.insert(user)
```

### `update`

Updates an existing data model in the database, returns a changeset

```ruby
user = MyRepo.get!(User, 1)
user.name = "Madonna"
changeset = MyRepo.update(user)
```

### `update_all`

Updates all records of type, or matching a query if one is passed as an argument

```ruby
MyRepo.update_all(User, {name: "Cher"})

# with query
query = Crecto::Repo::Query.where(name: "Adele")
MyRepo.update_all(User, query, {name: "Shakira"})
```

### `delete`

Deletes a single record from the database, returns a changeset

```ruby
user = MyRepo.get!(User, 1)
changeset = MyRepo.delete(user)
```

### `delete_all`

Deletes all records of type, or matching a query if one is passed as an argument

```ruby
MyRepo.delete_all(User)

# with a query
query = Crecto::Repo::Query.where(name: "Rihanna")
MyRepo.delete_all(User, query)
```

### `aggregate`

Returns the result of the passed aggregation function: `:avg`, `:count`, `:max`, `:min`, or `:sum`

```ruby
MyRepo.aggregate(User, :count, :id)
MyRepo.aggregate(User, :avg, :age)
MyRepo.aggregate(User, :max, :age)
MyRepo.aggregate(User, :min, :age)
MyRepo.aggregate(User, :sum, :age)

# with a query
query = Crecto::Repo::Query.where(name: "Barak")
MyRepo.aggregate(User, :count, :id, query)
```

### `get_association`



* get\_association
* get\_association!
* query



