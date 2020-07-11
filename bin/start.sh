#!/bin/sh -e

(
  PROJECT_ROOT="$(cd $(dirname $0)/..; pwd)"

  node main.js
)