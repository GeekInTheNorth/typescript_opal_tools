import express from 'express';
import { ToolsService, tool, ParameterType } from '@optimizely-opal/opal-tools-sdk';

// Create Express app
const app = express();
app.use(express.json());

// Create Tools Service
const toolsService = new ToolsService(app);

// Interfaces for tool parameters
interface GreetingParameters {
  name: string;
  language?: string;
}

interface DateParameters {
  format?: string;
}

interface WritingPromptParameters {
  genre?: string;
  theme?: string;
  difficulty?: string;
  length?: string;
}



/**
 * Greeting Tool: Greets a person in a random language
 */
// Apply tool decorator after function definition
async function greeting(parameters: GreetingParameters) {
  const { name, language } = parameters;
  
  // If language not specified, choose randomly
  const languages = ['english', 'spanish', 'french'];
  const selectedLanguage: string = language || 
    languages[Math.floor(Math.random() * languages.length)] || 'english';
  
  // Generate greeting based on language
  let greeting: string;
  if (selectedLanguage.toLowerCase() === 'spanish') {
    greeting = `¡Hola, ${name}! ¿Cómo estás?`;
  } else if (selectedLanguage.toLowerCase() === 'french') {
    greeting = `Bonjour, ${name}! Comment ça va?`;
  } else { // Default to English
    greeting = `Hello, ${name}! How are you?`;
  }
  
  return {
    greeting,
    language: selectedLanguage
  };
}

/**
 * Today's Date Tool: Returns today's date in the specified format
 */
// Apply tool decorator after function definition
async function todaysDate(parameters: DateParameters) {
  const format = parameters.format || '%Y-%m-%d';
  
  // Get today's date
  const today = new Date();
  
  // Format the date (simplified implementation)
  let formattedDate: string;
  if (format === '%Y-%m-%d') {
    formattedDate = today.toISOString().split('T')[0] || today.toISOString();
  } else if (format === '%B %d, %Y') {
    formattedDate = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } else if (format === '%d/%m/%Y') {
    formattedDate = today.toLocaleDateString('en-GB');
  } else {
    // Default to ISO format
    formattedDate = today.toISOString().split('T')[0] || today.toISOString();
  }
  
  return {
    date: formattedDate,
    format: format,
    timestamp: today.getTime() / 1000
  };
}

/**
 * Creative Writing Prompt Generator: Generates unique writing prompts for creative inspiration
 */
async function writingPrompt(parameters: WritingPromptParameters) {
  const { genre, theme, difficulty, length } = parameters;
  
  // Define arrays of creative elements
  const genres = ['fantasy', 'sci-fi', 'mystery', 'romance', 'horror', 'adventure', 'drama', 'comedy', 'thriller', 'historical'];
  const themes = ['redemption', 'betrayal', 'discovery', 'love', 'loss', 'revenge', 'friendship', 'family', 'identity', 'transformation', 'survival', 'power', 'sacrifice', 'freedom'];
  const characters = ['a time traveler', 'a detective', 'a wizard', 'an alien', 'a robot', 'a ghost', 'a thief', 'a scientist', 'a warrior', 'a merchant', 'a student', 'a librarian'];
  const settings = ['a floating city', 'an abandoned space station', 'a magical forest', 'a underground bunker', 'a parallel dimension', 'a small village', 'a corporate office', 'a lighthouse', 'a space ship', 'a museum after hours'];
  const conflicts = ['must solve an ancient mystery', 'discovers they have hidden powers', 'receives a cryptic message', 'finds a portal to another world', 'inherits something unexpected', 'witnesses something they shouldn\'t have', 'loses their memory', 'makes a deal with consequences'];
  
  // Select elements based on parameters or randomly
  const selectedGenre = genre || genres[Math.floor(Math.random() * genres.length)] || 'mystery';
  const selectedTheme = theme || themes[Math.floor(Math.random() * themes.length)] || 'discovery';
  const selectedDifficulty = difficulty || ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] || 'intermediate';
  const selectedLength = length || ['short', 'medium', 'long'][Math.floor(Math.random() * 3)] || 'medium';
  
  // Generate random elements for the prompt
  const character = characters[Math.floor(Math.random() * characters.length)];
  const setting = settings[Math.floor(Math.random() * settings.length)];
  const conflict = conflicts[Math.floor(Math.random() * conflicts.length)];
  
  // Create the writing prompt
  const prompt = `Write a ${selectedGenre} story about ${character} in ${setting} who ${conflict}. The central theme should explore ${selectedTheme}.`;
  
  // Add difficulty-specific guidance
  let guidance = '';
  if (selectedDifficulty === 'beginner') {
    guidance = 'Focus on clear, simple storytelling with straightforward character motivations.';
  } else if (selectedDifficulty === 'intermediate') {
    guidance = 'Include subplot elements and develop character relationships with some complexity.';
  } else {
    guidance = 'Weave multiple narrative layers, complex character arcs, and sophisticated thematic elements.';
  }
  
  // Add length guidance
  let lengthGuidance = '';
  if (selectedLength === 'short') {
    lengthGuidance = 'Aim for 500-1000 words. Focus on a single scene or moment.';
  } else if (selectedLength === 'medium') {
    lengthGuidance = 'Aim for 1000-3000 words. Develop the story with a clear beginning, middle, and end.';
  } else {
    lengthGuidance = 'Aim for 3000+ words. Create a rich, detailed narrative with multiple scenes.';
  }
  
  return {
    prompt,
    genre: selectedGenre,
    theme: selectedTheme,
    difficulty: selectedDifficulty,
    length: selectedLength,
    guidance,
    lengthGuidance,
    elements: {
      character,
      setting,
      conflict
    }
  };
}

// Register the tools using decorators with explicit parameter definitions
tool({
  name: 'greeting',
  description: 'Greets a person in a random language (English, Spanish, or French)',
  parameters: [
    {
      name: 'name',
      type: ParameterType.String,
      description: 'Name of the person to greet',
      required: true
    },
    {
      name: 'language',
      type: ParameterType.String,
      description: 'Language for greeting (defaults to random)',
      required: false
    }
  ]
})(greeting);

tool({
  name: 'todays-date',
  description: 'Returns today\'s date in the specified format',
  parameters: [
    {
      name: 'format',
      type: ParameterType.String,
      description: 'Date format (defaults to ISO format)',
      required: false
    }
  ]
})(todaysDate);

tool({
  name: 'writing-prompt',
  description: 'Generates creative writing prompts with customizable genre, theme, difficulty, and length',
  parameters: [
    {
      name: 'genre',
      type: ParameterType.String,
      description: 'Story genre (fantasy, sci-fi, mystery, romance, horror, etc. - defaults to random)',
      required: false
    },
    {
      name: 'theme',
      type: ParameterType.String,
      description: 'Central theme (redemption, betrayal, discovery, love, etc. - defaults to random)',
      required: false
    },
    {
      name: 'difficulty',
      type: ParameterType.String,
      description: 'Writing difficulty level (beginner, intermediate, advanced - defaults to random)',
      required: false
    },
    {
      name: 'length',
      type: ParameterType.String,
      description: 'Story length (short, medium, long - defaults to random)',
      required: false
    }
  ]
})(writingPrompt);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Discovery endpoint: http://localhost:${PORT}/discovery`);
});