provider "aws" {
  region = "us-west-2"
  #  profile = "csz"
  default_tags {
    tags = {
      app = "cszscoreboard"
    }
  }
}

provider "aws" {
  alias  = "east"
  region = "us-east-1"

  default_tags {
    tags = {
      app = "cszscoreboard"
    }
  }
}

terraform {
  required_version = "1.3.7"
}
