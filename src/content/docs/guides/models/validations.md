---
title: Validations
---

Crecto provides validations and constraints which are turned into `changeset` errors.

Validations are performed without the need to interact with the database.

```ruby
class User < Crecto::Model
    schema "users" do
        field :uuid, String
        field :age, Int32
        field :name, String
        field :role, String
        field :password, String, virtual: true
        field :password_confirmation, String, virtual: true
    end
    
    # Validate that fields arent blank before inserting or updating
    validate_required :age # or an array [:age, :name]
    
    # Validate the format of fields using a regex
    validate_format :name, /^[a-zA-Z]*&/
    
    # Validate the length of a field
    validate_length :uuid, is: 36, # min: 36, max: 60
    
    # Validate the existence of the value of the field in an array
    validate_inclusion :role, in: ["admin", "user"]
    
    # Opposite of inclusion
    validate_exclusion :age, in: Range(0, 20)
    
    # Generic or custom validation using a proc
    validate "Passwords must match", ->(user: User) do
        user.password == user.password_confirmation
    end
    
    # Multiple validations
    validates :name,
        presence: true,
        format: {pattern: /^[a-zA-Z]*&/},
        exclusion: {in: ["foo", "bar"]},
        length: {min: 2, max: 50}
end
```
