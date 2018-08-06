# Multi / Transactions

Crecto provides the `Multi` class, for utilizing database transactions.

With `Multi`, if any step of the transaction fails then all changes are rolled back.

As with `Query`, its easiest to create a shortcut variable.

```ruby
Multi = Crecto::Multi
```

### `Multi` example and methods

First create the multi intance

```ruby
multi = Multi.new
```

Build the multi with the needed database operations

```ruby
# Create the multi instance
multi = Multi.new

# Insert a new record
multi.insert(new_user)

# Delete an record
multi.delete(image)

# Delete all
multi.delete_all(Comment)

# Update a record
multi.update(post)

# Update all
multi.update_all(User, Query.where(name: "Shaquille"), {name: "RuPaul"})
```

Insert the multi using your Repo

```ruby
MyRepo.transaction(multi)
```

Check the multi for errors.  If there were errors on any of the operations, then none of the operations will be persisted.

```ruby
if multi.errors.any?
    puts "good to go"
else
    puts "woops"
end
```



