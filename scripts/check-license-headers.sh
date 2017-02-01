#!/bin/bash

lic_hdr_txt=`cat license-header.txt`
lic_hdr_line_count=`echo ${lic_hdr_txt} | wc -l`
lic_hdr_target_txt="Copyright 2016 Capital One Services, LLC"

read -d '' spdx_lines <<EOF
SPDX-Copyright: Copyright (c) Capital One Services, LLC
SPDX-License-Identifier: Apache-2.0
EOF

echo "Beginning license header check ..."

for src_file in `find ../src ../example/src -type f -not -name *.snap` ; do
  if grep -q "${lic_hdr_target_txt}" "${src_file}" ; then
    if ! grep -q "${spdx_lines}" "${src_file}" ; then
      echo "Adding SPDX lines in license header for ${src_file}..."
      perl -0 -i -pe 's/(See the License(.*))(\n\*\/)/$1\n\n'"${spdx_lines}"'$3/gim' ${src_file}
    fi
  else
    echo "Adding license header for ${src_file}..."
    cat license-header.txt ${src_file} >${src_file}.new && mv ${src_file}.new ${src_file}
  fi
done

echo "Done!"
