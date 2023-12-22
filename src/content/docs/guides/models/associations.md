---
title: Associations
---

Crecto provides helper macros for defining associations between data models.

### Has Many and Belongs To

```ruby
class User < Crecto::Model
    # schema...
    
    has_many :images, Image
end

class Image < Crecto::Model
    # schema...
    
    belongs_to :user, User
end
```

#### Has Many options

* `through` - Specifying a join table
* `dependent: :destroy`  - On deletion, will delete all associated records first
* `dependent: :nullify` - On deletion, will nullify all associated records foreign keys
* `foreign_key` - Specify the foreign key field of of the associated table `foreign_key: :user_id`

### Has One

```ruby
class User < Crecto::Model
    # schema...
    
    has_one :address, Address
end
```

#### Has One options

* `dependent: :destroy`  - On deletion, will delete all associated records first
* `dependent: :nullify` - On deletion, will nullify all associated records foreign keys
* `foreign_key` - Specify the foreign key field of of the associated table `foreign_key: :user_id`

### Has Many Through / Join tables

```ruby
class User < Crecto::Model
    # schema...
    
    has_many :memberships, Membership
    has_many :groups, through: :memberships
end

class Group < Crecto::Model
    # schema...
    
    has_many :memberships, Membership
    has_many :users, through: :memberships
end

class Membership < Crecto::Model
    belongs_to :user, User
    belongs_to :group, Group
end
```

### Setting associations

```ruby
user = Repo.get!(User, 1)
image = Image.new
image.user = user
Repo.insert(image)
```

### Nil-check associations

If an association is not loaded, the normal accessor will raise an exception

```ruby
user = Repo.get!(User, 1)
user.posts? # nil
user.posts # raises Crecto::AssociationNotLoaded
```

For \`has\_many\` preloads, the result will always be an array

```ruby
user = Repo.get!(User, 1, Query.preload(:posts))
user.posts? # Array(Post)
user.posts  # Array(Post)
```

For `belongs_to` and `has_one` preloads, the result may still be nil if no record exists.  If the association is nullable, always use the `association_name?` syntax.

```ruby
post = Repo.get!(Post, 1, Query.preload(:user))
post.user? # nil
post.user  # raises Crecto::AssociationNotLoaded
```

