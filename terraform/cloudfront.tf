resource "aws_cloudfront_origin_access_control" "csz" {
  name                              = "csz"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "csz" {
  enabled             = true
  comment             = "CSZ Scoreboard"
  wait_for_deployment = true
  aliases             = [local.full_domain]
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  default_cache_behavior {
    allowed_methods        = ["HEAD", "GET"]
    cached_methods         = ["HEAD", "GET"]
    compress               = true
    target_origin_id       = "default"
    viewer_protocol_policy = "redirect-to-https"
    default_ttl            = 900

    forwarded_values {
      cookies {
        forward = "none"
      }
      query_string = true
    }

    lambda_function_association {
      event_type = "origin-request"
      lambda_arn = "${aws_lambda_function.single_page_handler.arn}:${aws_lambda_function.single_page_handler.version}"
    }

    lambda_function_association {
      event_type = "origin-response"
      lambda_arn = "${aws_lambda_function.single_page_handler.arn}:${aws_lambda_function.single_page_handler.version}"
    }
  }

  origin {
    origin_id                = "default"
    domain_name              = aws_s3_bucket.csz.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.csz.id
    origin_path              = "/app"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.csz.arn
    ssl_support_method  = "sni-only"
  }
}
