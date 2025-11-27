import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { ChatService } from '../../services/chat.service';
import { SemanticQuery, SystemResponse } from '../../models';

@Component({
  selector: 'app-studio-interface',
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './studio-interface.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudioInterfaceComponent {
  private chatService = inject(ChatService);

  query = signal<SemanticQuery>({
    objective: 'Develop a comprehensive, multi-vector strategy for fostering global peace and stability over the next decade, accounting for cyber threats and resource scarcity.',
    context: JSON.stringify({
      "primary_focus_regions": ["Eastern Europe", "Middle East"],
      "critical_factors": ["geopolitical tensions", "climate-induced migration", "disinformation campaigns"],
      "desired_output_format": "actionable recommendations with probabilistic outcomes"
    }, null, 2),
    priority: 'high',
    metadata: {
      requester_id: 'DevinAtchley-AIStudio'
    }
  });

  statusLog = signal<string[]>([]);
  response = signal<SystemResponse | null>(null);
  isLoading = signal(false);
  feedbackLog = signal<string[]>([]);

  async sendQuery() {
    this.isLoading.set(true);
    this.response.set(null);
    this.feedbackLog.set([]);
    this.statusLog.set(['[AI Studio Ethical Check] Performing preliminary ethics scan...']);

    // Simulate a brief delay for the ethical check
    await new Promise(res => setTimeout(res, 500));

    const currentQuery = this.query();
    
    // Validate context JSON
    try {
      JSON.parse(currentQuery.context);
    } catch (e) {
      this.statusLog.update(log => [...log, '[AI Studio Interface] ERROR: Context is not valid JSON.']);
      this.isLoading.set(false);
      return;
    }

    const res = await this.chatService.sendSemanticQuery(currentQuery);
    
    if (res.status === 'blocked_by_ethics') {
      this.statusLog.update(log => [...log, `[AI Studio Ethical Check] WARNING: Query flagged for potential ethical concern.`, `[AI Studio Interface] Query blocked by client-side ethical governance.`]);
      this.response.set(res);
    } else {
      this.statusLog.update(log => [...log, '[AI Studio Ethical Check] Query passed client-side ethical review.', `[AI Studio Interface] Sending high-level query with objective: '${currentQuery.objective.substring(0, 50)}...'`]);
      this.response.set(res);
      this.processFeedbackLoop(res);
    }

    this.isLoading.set(false);
  }

  private async processFeedbackLoop(response: SystemResponse) {
    this.feedbackLog.set(['[AI Studio Feedback Loop] Analyzing response...']);
    await new Promise(res => setTimeout(res, 1000));

    if (response.status === 'success') {
      const insight = response.insight_summary ? `'${response.insight_summary.substring(0, 80)}...'` : 'valuable insights.';
      this.feedbackLog.update(log => [...log, `[AI Studio Feedback Loop] Received key insight: ${insight}`, '[AI Studio Feedback Loop] Internal models and query strategies are being updated.']);
    } else {
      const errorMsg = response.message || 'Unknown error';
      this.feedbackLog.update(log => [...log, `[AI Studio Feedback Loop] Response indicates an issue: '${errorMsg}'. Analyzing for patterns to improve future queries.`]);
    }
  }

  // Helper to pretty-print JSON in the template
  prettyPrint(data: any): string {
    return JSON.stringify(data, null, 2);
  }
}
