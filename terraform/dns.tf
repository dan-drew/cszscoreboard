locals {
  root_domain = "ddrew.com"
  subdomain   = "cszscoreboard"
  full_domain = "${local.subdomain}.${local.root_domain}"
}

data "aws_route53_zone" "root" {
  name = local.root_domain
}

resource "aws_acm_certificate" "csz" {
  provider          = aws.east
  domain_name       = local.full_domain
  validation_method = "DNS"
}

resource "aws_route53_record" "validation" {
  for_each = {
    for dvo in aws_acm_certificate.csz.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.root.zone_id
}

resource "aws_route53_record" "csz" {
  zone_id = data.aws_route53_zone.root.zone_id
  name    = local.subdomain
  type    = "A"

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.csz.domain_name
    zone_id                = aws_cloudfront_distribution.csz.hosted_zone_id
  }
}
