const API_BASE_URL = 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include', // Include cookies for CORS
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    displayName: string;
    role?: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User endpoints
  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(profileData: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Course endpoints
  async getCourses() {
    return this.request('/courses');
  }

  async getCourse(courseId: string) {
    return this.request(`/courses/${courseId}`);
  }

  async enrollCourse(courseId: string) {
    return this.request(`/courses/${courseId}/enroll`, {
      method: 'POST',
    });
  }

  // Mentor endpoints
  async getMentors() {
    return this.request('/mentors');
  }

  async getMentor(mentorId: string) {
    return this.request(`/mentors/${mentorId}`);
  }

  async bookMentorSession(mentorId: string, sessionData: any) {
    return this.request(`/mentors/${mentorId}/book`, {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  // Internship endpoints
  async getInternships() {
    return this.request('/internships');
  }

  async getInternship(internshipId: string) {
    return this.request(`/internships/${internshipId}`);
  }

  async applyInternship(internshipId: string, applicationData: any) {
    return this.request(`/internships/${internshipId}/apply`, {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  // AI endpoints
  async generateContent(prompt: string, type: 'video' | 'text' | 'quiz') {
    return this.request('/ai/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, type }),
    });
  }

  // Analytics endpoints
  async getAnalytics() {
    return this.request('/analytics');
  }

  async getLearningProgress() {
    return this.request('/analytics/progress');
  }

  // Notification endpoints
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationRead(notificationId: string) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Test connection without auth
  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

export const apiService = new ApiService();
export default apiService; 