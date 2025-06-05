npm install --legacy-peer-deps
npm run db:push && npm run db:prod && npm run db:seed


# test openai
npx tsx scripts/test-openai.ts   