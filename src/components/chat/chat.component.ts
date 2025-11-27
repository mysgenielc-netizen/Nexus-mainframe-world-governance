import { Component, ChangeDetectionStrategy, output, inject, signal, OnInit, OnDestroy, ViewChild, ElementRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  imports: [CommonModule, FormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  
  closeChat = output<void>();

  private chatService = inject(ChatService);

  messages = signal<ChatMessage[]>([]);
  userInput = signal('');
  isLoading = signal(false);

  private logInterval: any;

  constructor() {
    afterNextRender(() => {
        this.scrollToBottom();
    });
  }

  ngOnInit() {
    this.messages.set([
      {
        sender: 'system',
        text: 'Unified Nexus Meta-Framework online. I am ready to assist. How can I help you analyze, optimize, or understand the system?',
        timestamp: new Date()
      }
    ]);

    this.logInterval = setInterval(async () => {
      const logText = await this.chatService.generateSystemLog();
      this.messages.update(currentMessages => [
        ...currentMessages,
        { sender: 'log', text: logText, timestamp: new Date() }
      ]);
      this.scrollToBottom();
    }, 30000); // Generate a log every 30 seconds
  }

  ngOnDestroy() {
    if (this.logInterval) {
      clearInterval(this.logInterval);
    }
  }

  async sendMessage() {
    const userMessage = this.userInput().trim();
    if (!userMessage || this.isLoading()) {
      return;
    }

    // Add user message to chat
    this.messages.update(currentMessages => [
      ...currentMessages,
      { sender: 'user', text: userMessage, timestamp: new Date() }
    ]);
    this.userInput.set('');
    this.isLoading.set(true);
    this.scrollToBottom();

    // Get response from AI
    const responseText = await this.chatService.sendMessage(userMessage);
    
    this.messages.update(currentMessages => [
      ...currentMessages,
      { sender: 'system', text: responseText, timestamp: new Date() }
    ]);
    this.isLoading.set(false);
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
        if (this.messageContainer) {
            this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
        }
    } catch(err) { }
  }
}
