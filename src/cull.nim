import os
import times

proc main() =
  # Delete pastes older than X number of days
  let pastesPath = joinPath(getCurrentDir(), "pastes")
  let num_days = 30
  let today = now()
  let cullDate = today - initTimeInterval(days=num_days)
  let thirtyDaysStr = format(cullDate, "YYYYMMdd")
  let thirtyDaysPath = joinPath(pastesPath, thirtyDaysStr)
  for kind, path in walkDir(pastesPath):
    if path <= thirtyDaysPath:
      removeDir(path)


when isMainModule:
  main()
