#!/bin/bash

set -e # exit with nonzero exit code if anything fails

# wt-bundle \
# 	--output OurContributors.js \
# 	index.js

uglifyjs index.js \
	--output OurContributors.js

wt create OurContributors.js \
	--name OurContributors \
	--secret GH_TOKEN=${GH_TOKEN}