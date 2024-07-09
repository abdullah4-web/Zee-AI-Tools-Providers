
import express from 'express'; 
import axios from 'axios';
import xml2js from 'xml2js';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openAiApiKey = new OpenAIApi(configuration);

const keywordRouter = express.Router();
const LLM_MODEL = 'gpt-3.5-turbo-1106';
const MAX_RETRIES = 5;

keywordRouter.use(express.json());

keywordRouter.get('/getKeywordData', async (req, res) => {
  const { country, keyword } = req.query;

  try {
    const result = await getKeywordData(keyword, country);
    res.json(result);
  } catch (error) {
    console.error(`Error in /getKeywordData route: ${error}`);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export async function getKeywordData(inputKeyword, inputCountry) {
  const keywordData = await getSuggestionKeywordsGoogleOptimized(inputKeyword, inputCountry);
  const aiReport = await suggestionsAiAnalysis(keywordData, openAiApiKey);

  return {
    success: true,
    message: 'Success! Keywords Generated',
    result: {
      aiReport: aiReport,
      keywordData: keywordData,
    },
  };
}

export async function suggestionsAiAnalysis(keywordData, apiKey) {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const prompt = getSuggestionKeywordsAnalysisPrompt(keywordData);
            return await generateResponse(prompt, LLM_MODEL, apiKey);
        } catch (e) {
            console.log(`Failed to generate analysis for suggestion keywords. Exception: ${e}`);
        }
    }

    return "";
}

export async function getSuggestionKeywordsGoogleOptimized(query, countryCode) {
    const categories = {
        "Questions": ["who", "what", "where", "when", "why", "how", "are"],
       
    };

    const categorizedSuggestions = {};

    for (const category in categories) {
        categorizedSuggestions[category] = {};
        for (const keyword of categories[category]) {
            try {
                let modifiedQuery;
                if (["Questions", "Prepositions", "Intent-Based", "Time-Related", "Audience-Specific", "Problem-Solving", "Opinions/Reviews", "Cost-Related", "Trend-Based"].includes(category)) {
                    modifiedQuery = `${keyword} ${query}`;
                } else if (["Alphabit", "Feature-Specific", "Industry-Specific"].includes(category)) {
                    modifiedQuery = `${query} ${keyword}`;
                } else {
                    modifiedQuery = `${keyword} ${query}`;
                }

                const categorySuggestions = await getSuggestionsForQueryAsync(modifiedQuery, countryCode);
                categorizedSuggestions[category][keyword] = categorySuggestions;
            } catch (e) {
                console.log(`Error in getSuggestionKeywordsGoogleOptimized: ${e}`);
            }
        }
    }

    return categorizedSuggestions;
}

export async function getSuggestionsForQueryAsync(query, country) {
    try {
        const response = await axios.get(`http://google.com/complete/search?output=toolbar&gl=${country}&q=${query}`);
        const suggestions = [];

        if (response.status === 200) {
            const result = await xml2js.parseStringPromise(response.data);
            const completeSuggestions = result.suggestions && result.suggestions[0].CompleteSuggestion || [];

            for (const completeSuggestion of completeSuggestions) {
                const suggestionElement = completeSuggestion.suggestion && completeSuggestion.suggestion[0];

                if (suggestionElement && suggestionElement.$ && suggestionElement.$.data) {
                    const data = suggestionElement.$.data.toLowerCase();
                    suggestions.push(data);
                }
            }
        }

        return suggestions;
    } catch (e) {
        console.error(`Error in getSuggestionsForQueryAsync: ${e}`);
        return [];
    }
}


export async function generateResponse(userPrompt, model, openAiApiKey) {
    let response = null;
    const openAiClient = new OpenAIApi({
        apiKey: openAiApiKey,
    });

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const completion = await openAiClient.createCompletion({
                model: model,
                messages: [{ role: "user", content: userPrompt }],
            });
            response = completion.choices[0].message.content;
            break; // Break out of the loop if successful
        } catch (e) {
            if (attempt < MAX_RETRIES - 1) {
                await sleep(1000 * Math.pow(2, attempt));
            } else {
                console.log(`Response generation exception after max retries: ${e}`);
            }
        }
    }

    return response;
}

function getSuggestionKeywordsAnalysisPrompt(keywordData) {
    const formattedPrompt = `
    You are an expert in SEO and data-driven marketing strategies. You am familiar with analyzing keyword data, including metrics like search volume, paid competitors, SEO difficulty, and cost per click.
    Using the provided [Keyword_data] categorized into various themes as follows:
    
    Questions: Keywords starting with 'who', 'what', 'where', 'when', 'why', 'how', 'are'.
    Prepositions: Keywords including 'can', 'with', 'for'.
    Alphabet: Keywords beginning with each letter from A to Z.
    Comparisons: Keywords containing 'vs', 'versus', 'or'.
    Intent-Based: Keywords with 'buy', 'review', 'price', 'best', 'top', 'how to', 'why to'.
    Time-Related: Keywords related to 'when', 'schedule', 'deadline', 'today', 'now', 'latest'.
    Audience-Specific: Keywords like 'for beginners', 'for small businesses', 'for students', 'for professionals'.
    Problem-Solving: Keywords around 'solution', 'issue', 'error', 'troubleshoot', 'fix'.
    Feature-Specific: Keywords with 'with video', 'with images', 'analytics', 'tools', 'with example'.
    Opinions/Reviews: Keywords including 'review', 'opinion', 'rating', 'feedback', 'testimonial'.
    Cost-Related: Keywords about 'price', 'cost', 'budget', 'cheap', 'expensive', 'value'.
    Trend-Based: Keywords like 'trends', 'new', 'upcoming'.
    
    Please analyze these keyword suggestions and provide SEO strategy advice for each category. Focus on:
    
    Content Strategy: Suggest types of content and approaches that could be effective for targeting keywords in each category.
    Audience Engagement: Offer insights into how to engage different audience segments based on the keyword categories.
    Competitor Analysis: Briefly discuss potential competitive landscapes for these keyword categories.
    Long-Term SEO Planning: Provide ideas on incorporating these keywords into a broader SEO strategy, considering their categorical themes.
    
    Provide a list of 7-10 bullet-point suggestions on how to use these keywords, highlighting unique opportunities and challenges they present.
    
    [Keyword_data]: ${JSON.stringify(keywordData)}
    `;

    return formattedPrompt;
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default keywordRouter;