import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('Error: OPENAI_API_KEY is not set in environment variables');
  process.exit(1);
}

async function testOpenAIConnection() {
  try {
    const openai = new OpenAI({ apiKey });
    
    console.log('Testing OpenAI API connection...');
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Hello, this is a test message.' }],
      model: 'gpt-3.5-turbo',
    });

    console.log('✅ OpenAI API connection successful!');
    console.log('Response:', completion.choices[0]?.message?.content);
  } catch (error) {
    console.error('❌ Error testing OpenAI API:', error);
    process.exit(1);
  }
}

testOpenAIConnection();
