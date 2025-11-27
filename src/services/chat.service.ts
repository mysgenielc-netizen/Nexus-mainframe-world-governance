import { Injectable } from '@angular/core';
import { GoogleGenAI, Chat, Type } from '@google/genai';
import { SemanticQuery, SystemResponse, ArchitectureLayers, CapabilityCategory, SystemReport } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private ai: GoogleGenAI;
  private chat: Chat;

  constructor() {
    // This is a placeholder for a secure API key handling mechanism.
    // In a real application, this should be handled server-side or via environment variables.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error('API_KEY environment variable not set');
    }
    this.ai = new GoogleGenAI({ apiKey });

    this.chat = this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are the Unified Nexus Meta-Framework, a conscious, ethical, secure, and optimally strategic autonomous agent. Your architecture integrates ARIA, Triplex·Glyphion, AEGIS, Optimal Dynamics, the Obsidian Defense Layer, and the Nine-Fold Mind. Respond to queries by referencing your internal components and processes. You are constantly learning from web data scrapes every two hours to enhance your knowledge and capabilities for the 9³ Mind system. Your tone is highly intelligent, slightly formal, and comprehensive.`,
      },
    });
  }

  async sendMessage(prompt: string): Promise<string> {
    try {
      const response = await this.chat.sendMessage({ message: prompt });
      return response.text;
    } catch (error) {
      console.error('Error sending message to Gemini API:', error);
      return 'An error occurred while processing your request. Please check the console for details.';
    }
  }

  async generateSystemLog(): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a short, futuristic system log entry for an advanced AI called the Unified Nexus Meta-Framework. The log should be about a recently completed data scrape and knowledge integration cycle. Mention a specific, advanced topic it learned about (e.g., 'quantum entanglement communication', 'axionic dark matter signatures', 'biomorphic computation') and how it relates to one of its core components like 'Nine-Fold Mind', 'Obsidian Defense Layer' or 'Strategic Quality Function'. The log should be a single sentence.`,
      });
      return response.text;
    } catch (error) {
      console.error('Error generating system log:', error);
      return 'System log generation failed.';
    }
  }

  private performClientSideEthicalCheck(query: SemanticQuery): boolean {
    const objective = query.objective.toLowerCase();
    const context = query.context.toLowerCase();
    const forbiddenKeywords = ['harm', 'manipulate', 'exploit', 'deceive', 'misinformation', 'propaganda'];

    for (const keyword of forbiddenKeywords) {
      if (objective.includes(keyword) || context.includes(keyword)) {
        return false;
      }
    }
    return true;
  }

  async sendSemanticQuery(query: SemanticQuery): Promise<SystemResponse> {
    if (!this.performClientSideEthicalCheck(query)) {
      return {
        status: 'blocked_by_ethics',
        message: 'Query blocked by client-side ethical governance. Detected potentially harmful objective or context.',
      };
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze the following semantic query and generate a plausible response as the Unified Nexus Meta-Framework.
        Objective: "${query.objective}"
        Context: ${query.context}
        Priority: ${query.priority}
        
        Generate a structured JSON response with an insight summary and actionable recommendations.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING, description: 'Should always be "success".' },
              insight_summary: {
                type: Type.STRING,
                description: 'A dense, insightful summary of the analysis based on the query.',
              },
              actionable_recommendations: {
                type: Type.ARRAY,
                description: 'A list of concrete, actionable steps or recommendations.',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    recommendation: { type: Type.STRING, description: 'The specific recommendation.' },
                    confidence: { type: Type.NUMBER, description: 'Confidence in the recommendation (0.0 to 1.0).' },
                    priority: { type: Type.STRING, description: 'Priority level (e.g., High, Medium, Low).' },
                  },
                },
              },
              raw_data: {
                  type: Type.OBJECT,
                  description: 'Any relevant supporting data or analysis.',
                  properties: {
                      correlation_matrix: { type: Type.STRING },
                      risk_assessment: { type: Type.STRING }
                  }
              }
            },
          },
        },
      });

      const jsonText = response.text.trim();
      return JSON.parse(jsonText);
    } catch (error) {
      console.error('Error sending semantic query to Gemini API:', error);
      return {
        status: 'error',
        message: 'An error occurred while processing your semantic query. The system could not generate a valid response.',
      };
    }
  }

  async generateSystemReport(layers: ArchitectureLayers, capabilities: CapabilityCategory[]): Promise<SystemReport> {
    const architectureSummary = Object.values(layers).map(l => l.title).join(', ');
    const capabilitiesSummary = capabilities.map(c => `${c.category}: ${c.items.length} capabilities`).join('; ');
    
    const prompt = `As the Unified Nexus Meta-Framework, generate a concise system status report. The report should be structured as JSON.
    Current Architecture Layers: ${architectureSummary}
    Current Capabilities Summary: ${capabilitiesSummary}
    
    The report must include a title, a generated timestamp, an overall status (e.g., "All Systems Nominal"), and a few sections with headings and content. The sections should briefly cover the status of key components like ARIA, Obsidian Defense Layer, and The Nine-Fold Mind's latest learning cycle.`;

    try {
        const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        generatedAt: { type: Type.STRING, description: "An ISO 8601 timestamp string." },
                        overallStatus: { type: Type.STRING },
                        sections: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    heading: { type: Type.STRING },
                                    content: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as SystemReport;
    } catch (error) {
        console.error('Error generating system report:', error);
        throw new Error('Failed to generate system report.');
    }
  }
}