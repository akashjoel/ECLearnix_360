interface TranscriptMessage {
  id: string;
  text: string;
  timestamp: Date;
  type: 'user' | 'ai';
  isProcessing?: boolean;
}

interface LiveTranscriptOptions {
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  language?: string;
}

class LiveTranscriptService {
  private recognition: SpeechRecognition | null = null;
  private isSupported: boolean = false;
  private isListening: boolean = false;
  private transcriptMessages: TranscriptMessage[] = [];
  private onTranscriptUpdate?: (messages: TranscriptMessage[]) => void;
  private onStatusChange?: (status: string) => void;

  constructor() {
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition(): void {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.isSupported = true;
      this.setupRecognition();
    } else {
      this.isSupported = false;
      console.warn('Speech recognition not supported in this browser');
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      this.onStatusChange?.('Listening...');
      this.addSystemMessage('Recording started. Speak now...');
    };

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        this.addUserMessage(finalTranscript);
        this.processUserInput(finalTranscript);
      }

      // Update interim results
      if (interimTranscript && !finalTranscript) {
        this.updateInterimTranscript(interimTranscript);
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.onStatusChange?.(`Error: ${event.error}`);
      this.addSystemMessage(`Recognition error: ${event.error}`);
      this.stopListening();
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.onStatusChange?.('Stopped');
      this.addSystemMessage('Recording stopped.');
    };
  }

  // Check if speech recognition is supported
  isSpeechRecognitionSupported(): boolean {
    return this.isSupported;
  }

  // Start listening for speech
  startListening(options: LiveTranscriptOptions = {}): void {
    if (!this.isSupported || !this.recognition || this.isListening) {
      return;
    }

    if (options.language) {
      this.recognition.lang = options.language;
    }

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      this.onStatusChange?.('Error starting recognition');
    }
  }

  // Stop listening for speech
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  // Toggle listening state
  toggleListening(): void {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  // Get current listening state
  getListeningState(): boolean {
    return this.isListening;
  }

  // Add user message to transcript
  private addUserMessage(text: string): void {
    const message: TranscriptMessage = {
      id: this.generateId(),
      text: text.trim(),
      timestamp: new Date(),
      type: 'user'
    };

    this.transcriptMessages.push(message);
    this.onTranscriptUpdate?.(this.transcriptMessages);
  }

  // Add AI response to transcript
  private addAIMessage(text: string, isProcessing: boolean = false): void {
    const message: TranscriptMessage = {
      id: this.generateId(),
      text: text,
      timestamp: new Date(),
      type: 'ai',
      isProcessing
    };

    this.transcriptMessages.push(message);
    this.onTranscriptUpdate?.(this.transcriptMessages);
  }

  // Add system message
  private addSystemMessage(text: string): void {
    const message: TranscriptMessage = {
      id: this.generateId(),
      text: text,
      timestamp: new Date(),
      type: 'ai'
    };

    this.transcriptMessages.push(message);
    this.onTranscriptUpdate?.(this.transcriptMessages);
  }

  // Update interim transcript
  private updateInterimTranscript(text: string): void {
    // Find or create interim message
    let interimMessage = this.transcriptMessages.find(msg => 
      msg.type === 'user' && msg.isProcessing
    );

    if (!interimMessage) {
      interimMessage = {
        id: this.generateId(),
        text: '',
        timestamp: new Date(),
        type: 'user',
        isProcessing: true
      };
      this.transcriptMessages.push(interimMessage);
    }

    interimMessage.text = text;
    this.onTranscriptUpdate?.(this.transcriptMessages);
  }

  // Process user input and generate AI response
  private async processUserInput(text: string): Promise<void> {
    // Add processing indicator
    this.addAIMessage('Processing your request...', true);

    try {
      // Analyze the user's input and generate appropriate response
      const response = await this.generateAIResponse(text);
      
      // Remove processing message and add actual response
      this.transcriptMessages = this.transcriptMessages.filter(msg => !msg.isProcessing);
      this.addAIMessage(response);

      // Speak the response
      await this.speakResponse(response);

    } catch (error) {
      console.error('Error processing user input:', error);
      this.transcriptMessages = this.transcriptMessages.filter(msg => !msg.isProcessing);
      this.addAIMessage('Sorry, I encountered an error processing your request.');
    }
  }

  // Generate AI response based on user input
  private async generateAIResponse(userInput: string): Promise<string> {
    const input = userInput.toLowerCase();

    // Career-related queries
    if (input.includes('career') || input.includes('job') || input.includes('work')) {
      return "Based on your profile analysis, I recommend focusing on web development. Your wavelength analysis shows strong aptitude for frontend and backend development. Would you like me to explain your career recommendations in detail?";
    }

    // Learning-related queries
    if (input.includes('learn') || input.includes('study') || input.includes('course')) {
      return "I can help you with your learning path! Based on your specialization, I recommend starting with HTML and CSS fundamentals, then moving to JavaScript and React. Would you like me to outline your complete learning journey?";
    }

    // Wavelength-related queries
    if (input.includes('wavelength') || input.includes('analysis') || input.includes('score')) {
      return "Your wavelength analysis shows your strengths in different web development areas. Your highest scores are in frontend development, backend development, and full-stack development. Would you like me to break down each area for you?";
    }

    // Skill-related queries
    if (input.includes('skill') || input.includes('technology') || input.includes('programming')) {
      return "Based on your profile, I recommend focusing on JavaScript, React, Node.js, and database management. These skills align with your predicted specialization and will give you the best career prospects.";
    }

    // Salary-related queries
    if (input.includes('salary') || input.includes('money') || input.includes('pay')) {
      return "Based on your predicted specialization, the salary range is quite competitive. Web developers typically earn between $65,000 to $140,000 annually, with full-stack developers having the highest earning potential.";
    }

    // General help
    if (input.includes('help') || input.includes('what') || input.includes('how')) {
      return "I'm here to help with your web development career journey! You can ask me about your career predictions, learning recommendations, skill development, or salary information. What would you like to know more about?";
    }

    // Default response
    return "That's interesting! I'm here to help with your web development career guidance. You can ask me about your career predictions, learning path, skills, or any other career-related questions. What would you like to explore?";
  }

  // Speak AI response
  private async speakResponse(text: string): Promise<void> {
    try {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;
        
        // Use preferred voice
        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')
        ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error speaking response:', error);
    }
  }

  // Set up event listeners
  onTranscriptChange(callback: (messages: TranscriptMessage[]) => void): void {
    this.onTranscriptUpdate = callback;
  }

  onStatusUpdate(callback: (status: string) => void): void {
    this.onStatusChange = callback;
  }

  // Get current transcript messages
  getTranscriptMessages(): TranscriptMessage[] {
    return this.transcriptMessages;
  }

  // Clear transcript
  clearTranscript(): void {
    this.transcriptMessages = [];
    this.onTranscriptUpdate?.(this.transcriptMessages);
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Format timestamp
  formatTimestamp(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

export const liveTranscriptService = new LiveTranscriptService();
export type { TranscriptMessage, LiveTranscriptOptions };




