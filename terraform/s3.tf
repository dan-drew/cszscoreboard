locals {
  dist_dir   = "${path.root}/../dist/cszscoreboard"
  dist_files = {
    for f in fileset(local.dist_dir, "**") :
    f => "${local.dist_dir}/${f}"
  }

  content_types = {
    html = "text/html"
    js   = "text/javascript"
    css  = "text/css"
    png  = "image/png"
  }
}

resource "aws_s3_bucket" "csz" {
  bucket = local.full_domain
}

resource "aws_s3_bucket_acl" "csz" {
  bucket = aws_s3_bucket.csz.bucket
  acl    = "private"
}

resource "aws_s3_bucket_cors_configuration" "csz" {
  bucket = aws_s3_bucket.csz.bucket
  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    allowed_headers = ["Authorization"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_public_access_block" "csz" {
  bucket                  = aws_s3_bucket.csz.bucket
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_object" "dist_file" {
  for_each     = local.dist_files
  bucket       = aws_s3_bucket.csz.bucket
  key          = "app/${each.key}"
  acl          = "private"
  source       = each.value
  source_hash  = filemd5(each.value)
  content_type = try(local.content_types[regex("[^\\.]+$", each.key)], "binary/octet-stream")
}

data "aws_iam_policy_document" "s3" {
  statement {
    sid = "cloudfront"
    principals {
      identifiers = ["cloudfront.amazonaws.com"]
      type        = "Service"
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.csz.arn}/*"]
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.csz.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "csz" {
  bucket = aws_s3_bucket.csz.bucket
  policy = data.aws_iam_policy_document.s3.json
}
