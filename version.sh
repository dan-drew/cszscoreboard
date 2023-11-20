#!/usr/bin/bash

readonly root_dir=`dirname $0`
readonly version_path="${root_dir}/src/app/build-info.ts"
readonly timestamp=`date -Iseconds`
readonly sed_rule=$"s/BUILD_TIME\\s*=\\s*\".*\"/BUILD_TIME = \"${timestamp}\"/"

sed -i "$sed_rule" "$version_path"
