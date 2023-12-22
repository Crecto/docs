---
title: Logging
---

By default, Crecto does not log anything.  To enable, pass any type of `IO` to the log handler.

For `STDOUT` use:

```ruby
Crecto::DbLogger.set_handler(STDOUT)
```

To log to a file, use:

```ruby
file = File.open("database.log", "w")
f.sync = true
Crecto::DbLogger.set_handler(file)
```
