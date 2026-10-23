#!/bin/sh
set -eu
if [ -z "${NEXTAUTH_SECRET:-}" ] || [ "${#NEXTAUTH_SECRET}" -lt 32 ]; then echo "NEXTAUTH_SECRET must be set to at least 32 characters" >&2; exit 1; fi
cd "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
exec npm start
