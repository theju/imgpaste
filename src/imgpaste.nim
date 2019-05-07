import os
import times
import system
import jester
import random
import strutils
import parseopt
import db_sqlite


proc main(db: DbConn) =
  router customRouter:
    get "/":
      resp readFile(joinPath(getCurrentDir(), "html/home.html"))

    post "/":
      randomize()
      let dt = format(now(), "YYYYMMdd")
      let path = joinPath(getCurrentDir(), "pastes", dt)
      createDir(path)

      var randomHash = ""
      var randNum = 97
      for ii in 0..4:
        randNum = 97 + rand(25)
        add(randomHash, $char(randNum))

      let fd = request.formData
      writeFile(joinPath(path, randomHash), fd["image"].body)

      db.exec(sql"CREATE TABLE IF NOT EXISTS hash_dt_table (id INTEGER PRIMARY KEY AUTOINCREMENT, dt varchar(8), hash varchar(5))")
      db.exec(sql"CREATE INDEX IF NOT EXISTS hash_idx ON hash_dt_table(hash)")
      db.exec(sql"INSERT INTO hash_dt_table(dt, hash) VALUES (?, ?)", dt, randomHash)

      redirect "/" & randomHash & "/"

    get "/@hash/":
        let row = db.getRow(sql"SELECT dt FROM hash_dt_table WHERE hash=?", @"hash")
        let dt = row[0]
        if (row[0] == ""):
          resp Http404

        var contents = readFile(joinPath(getCurrentDir(), "html/display.html"))
        let imgPath = "/pastes/" & @"hash"
        contents = replace(contents, "${hash}", imgPath)
        resp contents

    get "/pastes/@hash":
        let row = db.getRow(sql"SELECT dt FROM hash_dt_table WHERE hash=?", @"hash")
        let dt = row[0]
        let path = joinPath(getCurrentDir(), "pastes", dt, @"hash")
        try:
          let contents = readFile(path)
          resp contents, "image/*"
        except IOError:
          resp Http404

  var port = Port(5000)
  for kind, key, value in getopt(commandLineParams()):
    if kind == cmdLongOption and key == "port":
      port = Port(value.parseInt())
    elif kind == cmdShortOption and key == "p":
      port = Port(value.parseInt())
  let ns = newSettings(port=port)
  var jester = initJester(customRouter, settings=ns)
  jester.serve()


proc closeDbConn(db: DbConn) {.noconv.} =
  db.close()
  quit 0


when isMainModule:
  let db = open("db.sqlite3", "", "", "")
  setControlCHook(proc () {.noconv.} = closeDbConn(db))
  main(db)
