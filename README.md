This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## QA 자동화 에이전트

커밋 전 품질 검증은 아래 흐름을 사용합니다.

```bash
# 1) 전체 검증(릴리즈 전 권장)
npm run qa

# 2) 스테이징 후, 변경분 기준 QA 통과 시 자동 커밋
git add <파일들>
npm run commit:qa -- feat 푸시 알림 API 연동
```

- 커밋 메시지는 자동으로 `feat : "푸시 알림 API 연동"` 형태로 생성됩니다.
- `pre-commit` 훅이 설정되면 수동 `git commit` 시에도 스테이징 파일 기준 QA가 자동 실행됩니다.
- 훅 설치: `npm run prepare`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
