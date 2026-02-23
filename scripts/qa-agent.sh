#!/usr/bin/env bash
set -euo pipefail

FAST_MODE=0
STAGED_MODE=0

for arg in "$@"; do
  if [[ "${arg}" == "--fast" ]]; then
    FAST_MODE=1
  elif [[ "${arg}" == "--staged" ]]; then
    STAGED_MODE=1
  fi
done

if [[ "${STAGED_MODE}" -eq 1 ]]; then
  STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.(ts|tsx|js|jsx)$' || true)
  if [[ -n "${STAGED_FILES}" ]]; then
    echo "[QA] staged lint 시작"
    # shellcheck disable=SC2086
    npx eslint ${STAGED_FILES}
  else
    echo "[QA] staged JS/TS 파일 없음 - lint 건너뜀"
  fi
else
  echo "[QA] lint 시작"
  npm run lint
fi

echo "[QA] typecheck 시작"
npm run typecheck

if [[ "${FAST_MODE}" -eq 0 && "${STAGED_MODE}" -eq 0 ]]; then
  if npm run | grep -qE '^  test$|^  test '; then
    echo "[QA] test 시작"
    npm run test
  else
    echo "[QA] test 스크립트 없음 - 건너뜀"
  fi

  echo "[QA] build 시작"
  npm run build
fi

echo "[QA] 완료"
