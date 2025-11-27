interface UserSetupData {
  role: string;
  preferences: any;
  careerInterests: string[];
  email: string;
  completedAt: string;
}

interface UserProfile {
  email: string;
  displayName: string;
  role: string;
  preferences: any;
  careerInterests: string[];
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

class UserPreferencesService {
  private readonly STORAGE_KEY = 'learno_ai_user_profile';
  private readonly SETUP_KEY = 'learno_ai_user_setup';

  // Save user setup data (temporary storage during onboarding)
  saveUserSetupData(userData: UserSetupData): void {
    try {
      localStorage.setItem(this.SETUP_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user setup data:', error);
    }
  }

  // Get user setup data
  getUserSetupData(): UserSetupData | null {
    try {
      const data = localStorage.getItem(this.SETUP_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving user setup data:', error);
      return null;
    }
  }

  // Save complete user profile
  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }

  // Get user profile
  getUserProfile(): UserProfile | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      return null;
    }
  }

  // Update user preferences
  updateUserPreferences(updates: Partial<UserProfile>): void {
    try {
      const currentProfile = this.getUserProfile();
      if (currentProfile) {
        const updatedProfile = {
          ...currentProfile,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        this.saveUserProfile(updatedProfile);
      }
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  }

  // Check if user has completed onboarding
  hasCompletedOnboarding(): boolean {
    const profile = this.getUserProfile();
    return profile?.onboardingCompleted || false;
  }

  // Mark onboarding as completed
  completeOnboarding(): void {
    this.updateUserPreferences({ onboardingCompleted: true });
  }

  // Clear all user data (for logout)
  clearUserData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.SETUP_KEY);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  }

  // Get user's career interests
  getCareerInterests(): string[] {
    const profile = this.getUserProfile();
    return profile?.careerInterests || [];
  }

  // Get user's role
  getUserRole(): string {
    const profile = this.getUserProfile();
    return profile?.role || '';
  }

  // Get user's preferences based on role
  getRolePreferences(): any {
    const profile = this.getUserProfile();
    return profile?.preferences || {};
  }

  // API integration methods (for future backend integration)
  async saveToBackend(userData: UserSetupData): Promise<boolean> {
    try {
      // This would be replaced with actual API calls
      // const response = await fetch('/api/user/setup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(userData)
      // });
      
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Error saving to backend:', error);
      return false;
    }
  }

  async loadFromBackend(email: string): Promise<UserProfile | null> {
    try {
      // This would be replaced with actual API calls
      // const response = await fetch(`/api/user/profile/${email}`);
      // return await response.json();
      
      // For now, return null to use local storage
      return null;
    } catch (error) {
      console.error('Error loading from backend:', error);
      return null;
    }
  }
}

// Export singleton instance
export const userPreferencesService = new UserPreferencesService();
export type { UserSetupData, UserProfile };
