// openaiHelper.js
import { Configuration, OpenAIApi } from "openai";
import axios from 'axios';
import xml2js from 'xml2js';

const LLM_MODEL = "gpt-3.5-turbo-1106";
const MAX_RETRIES = 5;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const categories = {
  "Questions": ["who", "what", "where", "when", "why", "how", "are"],
  "Prepositions": ["can", "with", "for"],
};

async function suggestionsAiAnalysis(keywordData, apiKey) {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const prompt = getAnalysisPrompt(keywordData);
      return await generateResponse(prompt, LLM_MODEL, apiKey);
    } catch (error) {
      console.error(`Failed to generate analysis. Retry ${attempt + 1}/${MAX_RETRIES}. Error: ${error}`);
    }
  }

  return "";
}

async function getSuggestionsForQueryAsync(query, country) {
  try {
    const response = await axios.get(`http://google.com/complete/search?output=toolbar&gl=${country}&q=${query}`);
    const suggestions = [];

    if (response.status === 200) {
      const xmlData = response.data;
      const root = await xml2js.parseStringPromise(xmlData, { explicitArray: false });

      const completeSuggestions = root?.toplevel?.CompleteSuggestion;

      if (completeSuggestions) {
        for (const suggestion of completeSuggestions) {
          const suggestionElement = suggestion?.suggestion?.[0]?.$.data;

          if (suggestionElement) {
            const data = suggestionElement.toLowerCase();
            suggestions.push(data);
          }
        }
      }
    }

    return suggestions;
  } catch (error) {
    console.error(`Error in getSuggestionsForQueryAsync: ${error}`);
    return [];
  }
}

async function getKeywordData(inputKeyword, inputCountry, apiKey) {
  try {
    const keywordData = await getSuggestionsForQueryAsync(inputKeyword, inputCountry);
    const aiReport = await suggestionsAiAnalysis(keywordData, apiKey);

    return {
      success: true,
      message: 'Success! Keywords Generated',
      result: {
        aiReport,
        keywordData,
      },
    };
  } catch (error) {
    console.error(`Error in getKeywordData: ${error.message}`);
    return {
      success: false,
      message: 'Error generating keywords',
      error: error.message,
    };
  }
}

async function generateResponse(userPrompt, model, apiKey) {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const completion = await openai.createCompletion({
        model,
        messages: [{ role: "user", content: userPrompt }],
      });

      return completion.data.choices[0].message.content;
    } catch (error) {
      if (attempt < MAX_RETRIES - 1) {
        console.error(`Response generation failed. Retry ${attempt + 1}/${MAX_RETRIES}. Error: ${error}`);
        await sleep(1 * Math.pow(2, attempt) * 1000);
      } else {
        console.error(`Response generation exception after max retries: ${error}`);
        return null;
      }
    }
  }
}

function getAnalysisPrompt(keywordData) {
  // Your logic to format the analysis prompt using the provided Python template
  return `
    You are an expert in SEO and data-driven marketing strategies. 
    You are familiar with analyzing keyword data, including metrics like search volume, 
    paid competitors, SEO difficulty, and cost per click.
    Using the provided [Keyword_data] categorized into various themes as follows:
    
    ${keywordData}
    
    Please analyze these keyword suggestions and provide SEO strategy advice for each category. 
    Focus on:
    
    Content Strategy: Suggest types of content and approaches that could be effective for targeting keywords in each category.
    Audience Engagement: Offer insights into how to engage different audience segments based on the keyword categories.
    Competitor Analysis: Briefly discuss potential competitive landscapes for these keyword categories.
    Long-Term SEO Planning: Provide ideas on incorporating these keywords into a broader SEO strategy, considering their categorical themes.
    
    Provide a list of 7-10 bullet-point suggestions on how to use these keywords, highlighting unique opportunities and challenges they present.
    
    [Keyword_data]: ${keywordData}
  `;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { getKeywordData };
