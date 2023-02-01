#!/usr/bin/env bash
set -e

function invalidationInProgress() {
  aws cloudfront list-invalidations --distribution-id=E16RV8HYJJQVLB | grep -q 'InProgress'
}

cd terraform

echo 'Deploying updates...'
terraform apply -auto-approve

echo 'Invaliding CDN...'
aws cloudfront create-invalidation --distribution-id=E16RV8HYJJQVLB --paths '/' '/*'

sleep 10
while invalidationInProgress; do
  echo -n '.'
  sleep 10
done

echo ' Done.'
