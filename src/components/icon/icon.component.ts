import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      [class]="class()"
    >
      @switch (name()) {
        @case ('network') {
          <rect x="16" y="16" width="6" height="6" rx="1" />
          <rect x="2" y="16" width="6" height="6" rx="1" />
          <rect x="9" y="2" width="6" height="6" rx="1" />
          <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
          <path d="M12 12V8" />
        }
        @case ('brain') {
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 .96.995c.53.04 1.04.12 1.54.24.46.11.88.28 1.28.5.4.22.75.52 1.03.9.28.38.49.83.62 1.32.13.49.18.99.18 1.5v.01c0 .51-.05 1.01-.18 1.5a4.02 4.02 0 0 1-.62 1.32c-.28.38-.63.68-1.03.9a4.56 4.56 0 0 1-1.28.5c-.5.12-1.01.2-1.54.24A1 1 0 0 0 12 18.29V19.5A2.5 2.5 0 0 1 9.5 22h-5A2.5 2.5 0 0 1 2 19.5v-15A2.5 2.5 0 0 1 4.5 2z" />
          <path d="M12 4.5a2.5 2.5 0 0 0-2.5-2.5m0 17.5a2.5 2.5 0 0 1 2.5 2.5" />
          <path d="M4.5 2A2.5 2.5 0 0 0 2 4.5m0 15A2.5 2.5 0 0 0 4.5 22m5-17.5a2.5 2.5 0 0 1-2.5-2.5m0 17.5a2.5 2.5 0 0 0 2.5 2.5" />
        }
        @case ('shield') {
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        }
        @case ('zap') {
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        }
        @case ('layers') {
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.84l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84Z" />
          <path d="m22 17.65-8.58 3.91a2 2 0 0 1-1.66 0L3.18 17.65" />
          <path d="m22 12.65-8.58 3.91a2 2 0 0 1-1.66 0L3.18 12.65" />
        }
        @case ('git-branch') {
          <line x1="6" x2="6" y1="3" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        }
        @case ('lock') {
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        }
        @case ('database') {
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path d="M3 12A9 3 0 0 0 21 12" />
        }
        @case ('activity') {
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        }
        @case ('trending-up') {
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        }
        @case ('target') {
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        }
        @case ('cpu') {
          <rect width="16" height="16" x="4" y="4" rx="2" />
          <rect width="6" height="6" x="9" y="9" rx="1" />
          <path d="M15 2v2M15 20v2M9 2v2M9 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
        }
        @case ('eye') {
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        }
        @case ('workflow') {
          <rect width="8" height="8" x="3" y="3" rx="2" />
          <path d="M7 11v4a2 2 0 0 0 2 2h4" />
          <rect width="8" height="8" x="13" y="13" rx="2" />
        }
        @case ('swords') {
          <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
          <path d="m13 19 6-6" />
          <path d="M9.5 6.5 21 18v3h-3L6.5 9.5" />
          <path d="m5 11 6-6" />
        }
        @case ('info') {
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        }
        @case('message-circle') {
          <path d="M7.9 20A9 9 0 0 0 12 21a9 9 0 0 0 4.1-1.1L21 21l-1.1-4.1A9 9 0 0 0 21 12a9 9 0 0 0-1-4.1" />
          <path d="M12 21a9 9 0 0 0-9-9 9 9 0 0 0 9-9 9 9 0 0 1 0 18Z" />
        }
        @case('send') {
          <path d="m22 2-7 20-4-9-9-4Z"/>
          <path d="m22 2-11 11"/>
        }
        @case('x') {
          <path d="M18 6 6 18"/>
          <path d="M6 6l12 12"/>
        }
        @case('loader-2') {
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        }
        @case('terminal') {
          <polyline points="4 17 10 11 4 5"/>
          <line x1="12" x2="20" y1="19" y2="19"/>
        }
        @case('file-text') {
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
            <line x1="16" x2="8" y1="13" y2="13"/>
            <line x1="16" x2="8" y1="17" y2="17"/>
            <line x1="10" x2="8" y1="9" y2="9"/>
        }
      }
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  name = input.required<string>();
  class = input<string>('');
}