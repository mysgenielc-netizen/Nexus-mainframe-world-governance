export interface ArchitectureLayer {
  title: string;
  icon: string;
  color: string;
  description?: string;
  components?: LayerComponent[];
}

export interface ArchitectureLayers {
  [key: string]: ArchitectureLayer;
}

export interface LayerComponent {
  name: string;
  formula: string;
  description: string;
  implementation: string;
  explanation?: string;
}

export interface CapabilityCategory {
  category: string;
  items: string[];
}

export interface IntegrationStep {
  step: number;
  name: string;
  process: string;
  validation: string;
}

export interface ChatMessage {
  sender: 'user' | 'system' | 'log';
  text: string;
  timestamp: Date;
}

export interface SemanticQuery {
  objective: string;
  context: string; // Expecting stringified JSON from textarea
  priority: 'low' | 'normal' | 'high' | 'critical';
  metadata: {
    requester_id: string;
  };
}

export interface SystemResponse {
  status: 'success' | 'blocked_by_ethics' | 'error';
  message?: string;
  insight_summary?: string;
  actionable_recommendations?: {
    recommendation: string;
    confidence: number;
    priority: string;
  }[];
  raw_data?: any;
}

export interface SystemReport {
  title: string;
  generatedAt: string;
  overallStatus: string;
  sections: {
    heading: string;
    content: string;
  }[];
}