workflow "Issue closed" {
  on = "issues"
  resolves = ["Notify author"]
}

action "Issue closed filter" {
  uses = "actions/bin/filter@master"
  args = ["action closed"]
}

action "Notify author" {
  needs = ["Issue closed filter"]
  uses = "lucascosti/superpublictest/notify-issue-author.action@master"
  secrets = ["46879dc50b75d6557770df19cea0e214d339e281"]
}
