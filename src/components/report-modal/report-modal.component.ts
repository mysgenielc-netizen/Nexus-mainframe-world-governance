import { Component, ChangeDetectionStrategy, output, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ChatService } from '../../services/chat.service';
import { FrameworkDataService } from '../../services/framework-data.service';
import { SystemReport } from '../../models';

@Component({
  selector: 'app-report-modal',
  imports: [CommonModule, IconComponent],
  templateUrl: './report-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportModalComponent implements OnInit {
  close = output<void>();

  private chatService = inject(ChatService);
  private frameworkDataService = inject(FrameworkDataService);

  report = signal<SystemReport | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.generateReport();
  }

  async generateReport() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const layers = this.frameworkDataService.getArchitectureLayers();
      const capabilities = this.frameworkDataService.getCapabilities();
      const generatedReport = await this.chatService.generateSystemReport(layers, capabilities);
      this.report.set(generatedReport);
    } catch (e) {
      this.error.set('Failed to generate system report. The autonomous core may be under heavy load. Please try again later.');
      console.error(e);
    } finally {
      this.isLoading.set(false);
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}
