# Constraints

Crecto provides validations and constraints which are turned into `changeset` errors.

Constraints errors are only applied after interacting with the database.

```ruby
class User < Crecto::Model
    schema "users" do
        field :uuid, String
    end
    
    # If the database row has a UNIQUE constraint, the exception will be caught
    # and returned as a `changeset` error.
    unique_constraint :email
end
```

