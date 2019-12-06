# Crecto::Model

Application data models should inherit from `Crecto::Model`

```ruby
class User < Crecto::Model
```

The `Crecto::Model` class imposes the `inherited`  which imports the correct schema modules and sets up class wide variables and constants used for keeping track of associations and field names.

## Schema

Inside the data model is where the database schema is defined.

```ruby
class User < Crecto::Model
    schema "users" do
        field :first_name, String
        field :last_name, String
    end
end
```

The shema macro takes one argument and an options tuple.  The argument is the database table name.  If your database table doesn't have a primary key, you can pass an option to disable it: `schema "users", primary_key: false do`

### Default fields

By default Crecto assumes your table has the following column names defined `id`, `created_at`, and `updated_at`.

These can be easily overridden.

```ruby
class User < Crecto::Model
    set_created_at_field :other_field_name
    set_updated_at_field nil # This table does not use an updated at field
    
    # This table does not have a primary key field
    schema "users", primary_key: false do
        # fields...
    end
end
```

## Fields

Database table fields are defined using the `field` macro.  The field macro takes 2 arguments, the column name as a Symbol and the column type, and an optional options tuple.

### Field types

#### Int

```ruby
field :first_field, Int32
field :second_field, Int64
field :third_field, Int16
```

#### Float

```ruby
field :first_field, Float32
field :second_field, Float64
```

#### Bool

```ruby
field :bool_field, Bool
```

#### String

```ruby
field :string_field, String
```

#### Time

```ruby
field :time_field, Time
```

#### Array, postgres only

```ruby
field :first_field, Array(Int32)
field :second_field, Array(Float64)
field :third_field, Array(Bool)
field :fourth_field, Array(String)
```

Arrays can be queries using build-in postgres methods

```ruby
Repo.all(User, Query.where("? = ANY(fourth_field)", "some_string"))
```

#### Json, postgres only

```ruby
field :json_field, Json
```

`Json` fields can be both postgres `json` or `jsonb` types.  If `jsonb` is used, those fields can be queried using build-in postgres methods.

```ruby
Repo.all(User, Query.where("json_field @> '{\"test\": \"123\"}'")
```

### Field options

```ruby
class User < Crecto::Model    
    # primary_key : Specify a new primary key field
    field :uuid, String, primary_key: true
    
    # virtual : This field does not exist in the database and wont be persisted.
    # but can be set and accessed on the model instance
    field :password_confirm, String, virtual: true
    
    # default : Specify a default value for the attribute
    field :is_admin, Bool, default: false
end
```

### Enum fields

```ruby
class Vehicle < Crecto::Model
    enum State
        OFF
        STARTING
        RUNNING
    end
    
    enum Make
        COUPE
        SEDAN
        HATCH
        TRUCK
    end
    
    schema "vehicles" do
        enum_field :state, State
        enum_field :make, Make, column_name: "vehicle_type", column_type: Int32
    end
end
```

## Non-nillable attributes

If you with to access attributes of a model without having to check for `nil`, in the case that you are using a `NOT NULL` database constraint you can use the non-nillable attribute accessors.

> CAUTION: Mis-use of this could lead to Nil reference runtime exceptions

```ruby
user.age!
user.name!
```

