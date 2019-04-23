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
  secrets = ["GITHUB_TOKEN"]
}
