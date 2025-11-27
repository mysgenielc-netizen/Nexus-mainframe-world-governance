import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-tooltip',
  imports: [IconComponent],
  template: `
    <div class="relative flex items-center group">
      <app-icon name="info" class="w-4 h-4 text-gray-400 cursor-pointer"></app-icon>
      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 border border-gray-600 rounded-lg text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        <p>{{ text() }}</p>
        <div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  text = input.required<string>();
}
