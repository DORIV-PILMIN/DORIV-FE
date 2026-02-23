#!/usr/bin/env bash
set -euo pipefail

TYPE="${1:-}"
MESSAGE="${2:-}"

if [[ -z "${TYPE}" || -z "${MESSAGE}" ]]; then
  echo "사용법: npm run commit:qa -- <타입> <메시지>"
  echo "예시: npm run commit:qa -- feat 푸시 알림 API 연동"
  exit 1
fi

if ! [[ "${TYPE}" =~ ^(feat|fix|docs|refactor|chore|test|style|perf|ci|build|revert)$ ]]; then
  echo "지원하지 않는 커밋 타입입니다: ${TYPE}"
  exit 1
fi

if ! [[ "${MESSAGE}" =~ [가-힣] ]]; then
  echo "커밋 메시지에는 한국어를 포함해주세요."
  exit 1
fi

if git diff --cached --quiet; then
  echo "스테이징된 변경사항이 없습니다."
  echo "먼저 커밋할 파일을 스테이징하세요: git add <파일>"
  exit 1
fi

echo "[COMMIT] 커밋 전 QA 실행"
npm run qa -- --staged

echo "[COMMIT] QA 통과, 커밋 진행"
SKIP_PRECOMMIT_QA=1 git commit -m "${TYPE} : \"${MESSAGE}\""

echo "[COMMIT] 완료"
