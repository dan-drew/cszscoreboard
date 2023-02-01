data "archive_file" "lambda_source" {
  source_file = "${path.module}/files/index.js"
  output_path = "tmp/lambda_source.zip"
  type        = "zip"
}

data "aws_iam_policy_document" "single_page_handler_assume" {
  statement {
    principals {
      identifiers = ["lambda.amazonaws.com", "edgelambda.amazonaws.com"]
      type        = "Service"
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "single_page_handler" {
  name               = "cszscoreboard-single-page-handler"
  assume_role_policy = data.aws_iam_policy_document.single_page_handler_assume.json
}

data "aws_iam_policy_document" "single_page_handler" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = ["arn:aws:logs:*:*:*"]
  }
}

resource "aws_iam_role_policy" "single_page_handler" {
  role   = aws_iam_role.single_page_handler.id
  policy = data.aws_iam_policy_document.single_page_handler.json
}

resource "aws_lambda_function" "single_page_handler" {
  provider         = aws.east
  function_name    = "app_single_page_handler"
  handler          = "index.handler"
  runtime          = "nodejs14.x"
  publish          = true
  role             = aws_iam_role.single_page_handler.arn
  filename         = "tmp/lambda_source.zip"
  source_code_hash = data.archive_file.lambda_source.output_base64sha256
  depends_on = [aws_iam_role_policy.single_page_handler]

  lifecycle {
    ignore_changes = [filename]
  }
}
