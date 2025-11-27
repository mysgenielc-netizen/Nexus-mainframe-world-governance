
import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  template: `
    <div class="bg-gray-900 bg-opacity-50 rounded-lg p-4 border border-gray-700 h-full">
      <h4 class="text-sm font-semibold text-gray-400 mb-1">{{ metric() }}</h4>
      <div class="text-2xl font-bold text-cyan-400 mb-1">{{ value() }}</div>
      <div class="text-xs text-gray-500">Target: {{ target() }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricCardComponent {
  metric = input.required<string>();
  value = input.required<string>();
  target = input.required<string>();
}
