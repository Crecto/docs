---
title: Changeset
---

The changeset performs validations on data objects.  If any changeset is not valid, then the database operation will not happen.

```ruby
user = User.new
changeset = User.changeset(user)
changeset.valid?
```

Repo operations on single instances will also return a changeset, where you can check is validity and also check for error messages and constraint error messages.

```ruby
user = User.new
changeset = Repo.insert(user)
changeset.errors.any?
```

## Changeset methods

### `errors`

An array of validation and constraint errors

### `valid?`

Returns whether the changeset is valid not

### `instance`

The new object instance after the database operation

```ruby
user = User.new
changeset = Repo.insert(user)
changeset.instance.id # new database id
```

### `action`

Action performed on the changeset afer the database operation `:insert`, `:update`, etc

### `changes`

An array of field changes on the data object

### `source`

A hash of the original data set
