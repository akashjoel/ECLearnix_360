interface SpeechOptions {
  rate?: number;        // Speech rate (0.1 to 10)
  pitch?: number;       // Voice pitch (0 to 2)
  volume?: number;      // Voice volume (0 to 1)
  voice?: SpeechSynthesisVoice; // Specific voice to use
  lang?: string;        // Language code
}

interface CareerPredictionSpeech {
  careerPath: string;
  specialization: string;
  wavelengthAnalysis: any;
  recommendations: string[];
  learningPath: string[];
  confidence: number;
}

class SpeechService {
  private speechSynthesis: SpeechSynthesis;
  private isSupported: boolean;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.isSupported = 'speechSynthesis' in window;
  }

  // Check if speech synthesis is supported
  isSpeechSupported(): boolean {
    return this.isSupported;
  }

  // Get available voices
  getVoices(): SpeechSynthesisVoice[] {
    return this.speechSynthesis.getVoices();
  }

  // Get preferred voice (English, female preferred)
  getPreferredVoice(): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    
    // Try to find English female voice first
    let preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && 
      voice.name.toLowerCase().includes('female')
    );

    // Fallback to any English voice
    if (!preferredVoice) {
      preferredVoice = voices.find(voice => 
        voice.lang.startsWith('en')
      );
    }

    // Final fallback to first available voice
    return preferredVoice || voices[0] || null;
  }

  // Basic text-to-speech
  speak(text: string, options: SpeechOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Stop any current speech
      this.stopSpeaking();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set voice options
      utterance.rate = options.rate || 0.9;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 0.8;
      utterance.lang = options.lang || 'en-US';
      
      if (options.voice) {
        utterance.voice = options.voice;
      } else {
        utterance.voice = this.getPreferredVoice();
      }

      // Event handlers
      utterance.onstart = () => {
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = (event) => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      this.currentUtterance = utterance;
      this.speechSynthesis.speak(utterance);
    });
  }

  // Stop current speech
  stopSpeaking(): void {
    if (this.isSpeaking) {
      this.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  // Check if currently speaking
  isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  // Speak career prediction results
  async speakCareerPrediction(prediction: CareerPredictionSpeech): Promise<void> {
    const text = this.generateCareerPredictionText(prediction);
    await this.speak(text, { rate: 0.8, pitch: 1.1 });
  }

  // Generate natural language text for career prediction
  private generateCareerPredictionText(prediction: CareerPredictionSpeech): string {
    const { specialization, wavelengthAnalysis, confidence, recommendations } = prediction;
    
    let speechText = `Welcome to your personalized web development career analysis! `;
    
    speechText += `Based on your profile analysis, I recommend you pursue a career as a ${specialization}. `;
    
    speechText += `Your overall web development aptitude is ${Math.round(confidence * 100)} percent. `;
    
    // Add wavelength analysis
    speechText += `Here's your wavelength analysis: `;
    
    const wavelengths = [
      { name: 'Frontend Development', value: wavelengthAnalysis.frontendWavelength },
      { name: 'Backend Development', value: wavelengthAnalysis.backendWavelength },
      { name: 'Full-Stack Development', value: wavelengthAnalysis.fullstackWavelength },
      { name: 'DevOps Engineering', value: wavelengthAnalysis.devopsWavelength },
      { name: 'UI/UX Design', value: wavelengthAnalysis.uiuxWavelength },
      { name: 'Mobile Development', value: wavelengthAnalysis.mobileWavelength }
    ];

    // Sort by value and mention top 3
    wavelengths.sort((a, b) => b.value - a.value);
    
    speechText += `Your strongest areas are ${wavelengths[0].name} at ${wavelengths[0].value} percent, `;
    speechText += `${wavelengths[1].name} at ${wavelengths[1].value} percent, `;
    speechText += `and ${wavelengths[2].name} at ${wavelengths[2].value} percent. `;

    // Add recommendations
    if (recommendations && recommendations.length > 0) {
      speechText += `Here are my recommendations for your career development: `;
      recommendations.slice(0, 3).forEach((rec, index) => {
        speechText += `Recommendation ${index + 1}: ${rec}. `;
      });
    }

    speechText += `Good luck with your web development journey! Remember, continuous learning and practice are key to success.`;

    return speechText;
  }

  // Speak wavelength analysis
  async speakWavelengthAnalysis(wavelengthAnalysis: any): Promise<void> {
    const wavelengths = [
      { name: 'Frontend Development', value: wavelengthAnalysis.frontendWavelength },
      { name: 'Backend Development', value: wavelengthAnalysis.backendWavelength },
      { name: 'Full-Stack Development', value: wavelengthAnalysis.fullstackWavelength },
      { name: 'DevOps Engineering', value: wavelengthAnalysis.devopsWavelength },
      { name: 'UI/UX Design', value: wavelengthAnalysis.uiuxWavelength },
      { name: 'Mobile Development', value: wavelengthAnalysis.mobileWavelength }
    ];

    wavelengths.sort((a, b) => b.value - a.value);

    let text = `Your web development wavelength analysis shows: `;
    
    wavelengths.forEach((wavelength, index) => {
      text += `${wavelength.name}: ${wavelength.value} percent. `;
    });

    text += `Your highest scoring area is ${wavelengths[0].name} with ${wavelengths[0].value} percent aptitude.`;

    await this.speak(text, { rate: 0.7 });
  }

  // Speak learning recommendations
  async speakRecommendations(recommendations: string[]): Promise<void> {
    let text = `Here are your personalized learning recommendations: `;
    
    recommendations.slice(0, 4).forEach((rec, index) => {
      text += `Step ${index + 1}: ${rec}. `;
    });

    await this.speak(text, { rate: 0.8 });
  }

  // Speak learning path
  async speakLearningPath(learningPath: string[]): Promise<void> {
    let text = `Your recommended learning path is: `;
    
    learningPath.slice(0, 5).forEach((step, index) => {
      text += `Step ${index + 1}: ${step}. `;
    });

    await this.speak(text, { rate: 0.8 });
  }

  // Speak career insights
  async speakCareerInsights(insights: any, specialization: string): Promise<void> {
    let text = `Career insights for ${specialization}: `;
    
    text += `Market demand is ${insights.demand.toLowerCase()}. `;
    text += `Salary range is ${insights.salary}. `;
    text += `Market growth is ${insights.growth}. `;
    
    if (insights.specializations && insights.specializations[specialization]) {
      const specInsights = insights.specializations[specialization];
      text += `Specialization demand is ${specInsights.demand.toLowerCase()}. `;
      text += `Specialization salary range is ${specInsights.salary}. `;
    }

    await this.speak(text, { rate: 0.8 });
  }

  // Speak welcome message
  async speakWelcome(userName: string): Promise<void> {
    const text = `Welcome back, ${userName}! I've analyzed your profile and prepared your personalized web development career recommendations. Click the play button to hear your career analysis.`;
    await this.speak(text, { rate: 0.9, pitch: 1.1 });
  }

  // Speak loading message
  async speakLoading(): Promise<void> {
    const text = `Analyzing your profile data and calculating your web development wavelengths. This will take just a moment.`;
    await this.speak(text, { rate: 0.8 });
  }

  // Speak completion message
  async speakCompletion(): Promise<void> {
    const text = `Analysis complete! Your personalized web development career recommendations are ready.`;
    await this.speak(text, { rate: 0.9, pitch: 1.1 });
  }
}

export const speechService = new SpeechService();
export type { SpeechOptions, CareerPredictionSpeech };
