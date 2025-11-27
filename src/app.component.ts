import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameworkDataService } from './services/framework-data.service';
import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { IconComponent } from './components/icon/icon.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ChatComponent } from './components/chat/chat.component';
import { StudioInterfaceComponent } from './components/studio-interface/studio-interface.component';
import { ReportModalComponent } from './components/report-modal/report-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MetricCardComponent, IconComponent, TooltipComponent, ChatComponent, StudioInterfaceComponent, ReportModalComponent],
})
export class AppComponent {
  private frameworkDataService = inject(FrameworkDataService);

  architectureLayers = this.frameworkDataService.getArchitectureLayers();
  capabilities = this.frameworkDataService.getCapabilities();
  integrationFlow = this.frameworkDataService.getIntegrationFlow();

  layerKeys = Object.keys(this.architectureLayers);
  activeLayer = signal('overview');

  activeLayerData = computed(() => this.architectureLayers[this.activeLayer()]);
  
  isChatOpen = signal(false);
  isReportModalOpen = signal(false);

  setActiveLayer(layerKey: string) {
    this.activeLayer.set(layerKey);
  }

  toggleChat() {
    this.isChatOpen.update(open => !open);
  }

  openReportModal() {
    this.isReportModalOpen.set(true);
  }

  closeReportModal() {
    this.isReportModalOpen.set(false);
  }
}