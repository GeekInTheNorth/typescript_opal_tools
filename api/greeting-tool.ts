import 'reflect-metadata';
import { tool, ParameterType } from '@optimizely-opal/opal-tools-sdk';

/**
 * Parameters for the greeting tool
 */
interface GreetingParameters {
  name: string;
  style?: string;
}

/**
 * A sample greeting tool that demonstrates the Optimizely Opal Tools SDK.
 * This tool generates personalized greetings based on name and style.
 */
export class GreetingTools {
  @tool({
    name: 'greet_user',
    description: 'Generates a personalized greeting for a user in a specified style (friendly, formal, or casual)',
    parameters: [
      {
        name: 'name',
        type: ParameterType.String,
        description: 'The name of the person to greet',
        required: true
      },
      {
        name: 'style',
        type: ParameterType.String,
        description: 'The greeting style: friendly, formal, or casual',
        required: false
      }
    ]
  })
  async greetUser(params: GreetingParameters) {
    const { name, style = 'friendly' } = params;

    // Define different greeting styles
    const greetings: Record<string, string> = {
      friendly: `Hey ${name}! Great to see you! 👋`,
      formal: `Good day, ${name}. It is a pleasure to meet you.`,
      casual: `Yo ${name}, what's up?`
    };

    // Get the greeting or default to friendly
    const greeting = greetings[style.toLowerCase()] || greetings['friendly'];

    return {
      greeting,
      style: style.toLowerCase(),
      timestamp: new Date().toISOString()
    };
  }
}

// Instantiate the class to register the tools
new GreetingTools();
