interface StudentData {
  // Academic Performance
  age: number;
  studyTime: number;
  absences: number;
  failures: number;
  
  // Family Background
  motherEdu: number;
  fatherEdu: number;
  familySize: string;
  familyStatus: string;
  
  // Personal Characteristics
  health: number;
  freeTime: number;
  goOut: number;
  familyRelationship: number;
  
  // Support Systems
  schoolSupport: string;
  familySupport: string;
  paidClasses: string;
  activities: string;
  internet: string;
  
  // Behavioral
  romantic: string;
  alcoholWeekday: number;
  alcoholWeekend: number;
  
  // Academic Goals
  wantsHigherEdu: string;
}

interface CareerPrediction {
  careerPath: string;
  confidence: number;
  recommendations: string[];
  skillGaps: string[];
  learningPath: string[];
  wavelengthAnalysis: WavelengthAnalysis;
  webDevSpecialization: string;
}

interface WavelengthAnalysis {
  frontendWavelength: number;    // 0-100 (creativity, design focus)
  backendWavelength: number;     // 0-100 (logic, data processing)
  fullstackWavelength: number;   // 0-100 (balanced approach)
  devopsWavelength: number;      // 0-100 (infrastructure, deployment)
  uiuxWavelength: number;        // 0-100 (user experience, design)
  mobileWavelength: number;      // 0-100 (mobile development)
  totalWavelength: number;       // 0-100 (overall web dev aptitude)
}

class MLPredictionService {
  private readonly API_BASE_URL = 'http://localhost:5000/api/ml';

  // Predict career path using backend API or fallback to local logic
  async predictCareerPath(studentData: StudentData): Promise<CareerPrediction> {
    try {
      // Try to use backend API first
      try {
        const response = await fetch(`${this.API_BASE_URL}/career-prediction`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ studentData })
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            return {
              careerPath: result.data.prediction,
              confidence: result.data.confidence,
              recommendations: result.data.recommendations,
              skillGaps: result.data.skillGaps,
              learningPath: result.data.learningPath
            };
          }
        }
      } catch (apiError) {
        console.log('Backend API not available, using local prediction');
      }

      // Fallback to local prediction logic with web development focus
      const wavelengthAnalysis = this.calculateWavelengthAnalysis(studentData);
      const webDevSpecialization = this.determineWebDevSpecialization(wavelengthAnalysis);
      const recommendations = this.generateWebDevRecommendations(webDevSpecialization, studentData);
      const skillGaps = this.identifyWebDevSkillGaps(webDevSpecialization, studentData);
      const learningPath = this.generateWebDevLearningPath(webDevSpecialization);
      
      return {
        careerPath: 'Web Development',
        confidence: wavelengthAnalysis.totalWavelength / 100,
        recommendations,
        skillGaps,
        learningPath,
        wavelengthAnalysis,
        webDevSpecialization
      };
    } catch (error) {
      console.error('Error in career prediction:', error);
      return this.getDefaultPrediction();
    }
  }

  // Calculate wavelength analysis for web development specializations
  private calculateWavelengthAnalysis(data: StudentData): WavelengthAnalysis {
    // Frontend Wavelength (Creativity, Visual Design)
    const frontendWavelength = Math.min(100, Math.max(0,
      (data.freeTime * 15) +                    // Creative time
      (data.familyRelationship * 10) +          // Emotional intelligence for UX
      (data.activities === 'yes' ? 20 : 0) +    // Active engagement
      (data.health * 5) +                       // Physical well-being for creativity
      (data.failures === 0 ? 15 : 0)            // Consistency
    ));

    // Backend Wavelength (Logic, Data Processing)
    const backendWavelength = Math.min(100, Math.max(0,
      (data.studyTime * 20) +                   // Analytical thinking
      (data.motherEdu + data.fatherEdu) * 8 +   // Problem-solving background
      (data.absences <= 5 ? 15 : 0) +           // Reliability
      (data.wantsHigherEdu === 'yes' ? 20 : 0) + // Academic inclination
      (data.internet === 'yes' ? 15 : 0)        // Technical access
    ));

    // Full-Stack Wavelength (Balanced Approach)
    const fullstackWavelength = Math.min(100, Math.max(0,
      (frontendWavelength + backendWavelength) / 2 + // Balance
      (data.goOut >= 3 ? 10 : 0) +              // Social skills for client interaction
      (data.age >= 18 ? 15 : 0)                 // Maturity for complex projects
    ));

    // DevOps Wavelength (Infrastructure, Deployment)
    const devopsWavelength = Math.min(100, Math.max(0,
      (data.studyTime * 15) +                   // Systematic approach
      (data.failures === 0 ? 25 : 0) +          // Reliability critical
      (data.motherEdu + data.fatherEdu) * 6 +   // Technical background
      (data.wantsHigherEdu === 'yes' ? 15 : 0) + // Continuous learning
      (data.internet === 'yes' ? 20 : 0)        // Infrastructure awareness
    ));

    // UI/UX Wavelength (User Experience, Design)
    const uiuxWavelength = Math.min(100, Math.max(0,
      (data.freeTime * 18) +                    // Creative exploration
      (data.familyRelationship * 12) +          // Empathy for users
      (data.activities === 'yes' ? 25 : 0) +    // User interaction understanding
      (data.health * 8) +                       // Aesthetic sense
      (data.romantic === 'yes' ? 10 : 0)        // Emotional intelligence
    ));

    // Mobile Wavelength (Mobile Development)
    const mobileWavelength = Math.min(100, Math.max(0,
      (frontendWavelength * 0.6) +              // UI/UX skills
      (backendWavelength * 0.4) +               // Technical skills
      (data.age <= 25 ? 15 : 0) +               // Mobile-native generation
      (data.activities === 'yes' ? 15 : 0)      // Mobile usage patterns
    ));

    // Total Wavelength (Overall Web Dev Aptitude)
    const totalWavelength = Math.min(100, Math.max(0,
      (frontendWavelength * 0.25) +
      (backendWavelength * 0.25) +
      (fullstackWavelength * 0.2) +
      (devopsWavelength * 0.1) +
      (uiuxWavelength * 0.1) +
      (mobileWavelength * 0.1)
    ));

    return {
      frontendWavelength: Math.round(frontendWavelength),
      backendWavelength: Math.round(backendWavelength),
      fullstackWavelength: Math.round(fullstackWavelength),
      devopsWavelength: Math.round(devopsWavelength),
      uiuxWavelength: Math.round(uiuxWavelength),
      mobileWavelength: Math.round(mobileWavelength),
      totalWavelength: Math.round(totalWavelength)
    };
  }

  private calculateCompositeScore(data: StudentData): number {
    // Simulate average grade based on study time and absences
    const estimatedAvgGrade = Math.max(0, Math.min(20, 
      10 + (data.studyTime * 2) - (data.absences * 0.5) - (data.failures * 3)
    ));

    return (
      estimatedAvgGrade * 0.4 +
      (5 - data.studyTime) * 0.2 +
      (30 - Math.min(data.absences, 30)) * 0.1 +
      (3 - data.failures) * 0.2 +
      (data.wantsHigherEdu === 'yes' ? 2 : 0) +
      (data.internet === 'yes' ? 1 : 0)
    );
  }

  // Determine web development specialization based on wavelength analysis
  private determineWebDevSpecialization(wavelengths: WavelengthAnalysis): string {
    const { frontendWavelength, backendWavelength, fullstackWavelength, devopsWavelength, uiuxWavelength, mobileWavelength } = wavelengths;
    
    const specializations = [
      { name: 'Frontend Developer', score: frontendWavelength },
      { name: 'Backend Developer', score: backendWavelength },
      { name: 'Full-Stack Developer', score: fullstackWavelength },
      { name: 'DevOps Engineer', score: devopsWavelength },
      { name: 'UI/UX Designer', score: uiuxWavelength },
      { name: 'Mobile Developer', score: mobileWavelength }
    ];

    // Sort by score and return the highest
    specializations.sort((a, b) => b.score - a.score);
    return specializations[0].name;
  }

  private predictBasedOnScore(score: number, data: StudentData): { careerPath: string; confidence: number } {
    let careerPath: string;
    let confidence: number;

    if (score >= 15) {
      if (data.motherEdu + data.fatherEdu >= 6) {
        careerPath = 'Data Science';
        confidence = 0.92;
      } else {
        careerPath = 'Software Developer';
        confidence = 0.89;
      }
    } else if (score >= 12) {
      if (data.goOut >= 3) {
        careerPath = 'Business';
        confidence = 0.85;
      } else {
        careerPath = 'Software Developer';
        confidence = 0.82;
      }
    } else if (score >= 9) {
      if (data.freeTime >= 3) {
        careerPath = 'Design/Creative';
        confidence = 0.78;
      } else {
        careerPath = 'Business';
        confidence = 0.75;
      }
    } else {
      careerPath = 'Vocational';
      confidence = 0.88;
    }

    return { careerPath, confidence };
  }

  // Generate web development specific recommendations
  private generateWebDevRecommendations(specialization: string, data: StudentData): string[] {
    const recommendations: { [key: string]: string[] } = {
      'Frontend Developer': [
        'Master HTML, CSS, and JavaScript fundamentals',
        'Learn modern frameworks like React, Vue, or Angular',
        'Develop responsive design skills',
        'Practice building interactive user interfaces',
        'Learn version control with Git',
        'Explore CSS preprocessors like Sass or Less'
      ],
      'Backend Developer': [
        'Learn server-side programming languages (Node.js, Python, Java)',
        'Master database design and SQL',
        'Understand RESTful API development',
        'Learn about authentication and security',
        'Practice with cloud platforms (AWS, Azure)',
        'Study system architecture and scalability'
      ],
      'Full-Stack Developer': [
        'Balance frontend and backend knowledge',
        'Learn both client-side and server-side technologies',
        'Master database management and API design',
        'Understand deployment and DevOps basics',
        'Practice building complete web applications',
        'Stay updated with both frontend and backend trends'
      ],
      'DevOps Engineer': [
        'Learn containerization with Docker',
        'Master CI/CD pipeline development',
        'Understand cloud infrastructure (AWS, Azure, GCP)',
        'Learn automation tools (Ansible, Terraform)',
        'Study monitoring and logging systems',
        'Practice with Kubernetes orchestration'
      ],
      'UI/UX Designer': [
        'Master design tools (Figma, Sketch, Adobe XD)',
        'Learn user research and usability testing',
        'Understand design systems and accessibility',
        'Practice wireframing and prototyping',
        'Study color theory and typography',
        'Learn frontend development basics'
      ],
      'Mobile Developer': [
        'Learn React Native or Flutter for cross-platform',
        'Master native development (iOS/Android)',
        'Understand mobile UI/UX principles',
        'Learn mobile app deployment',
        'Practice with mobile testing frameworks',
        'Study app store optimization'
      ]
    };

    return recommendations[specialization] || recommendations['Full-Stack Developer'];
  }

  private identifyWebDevSkillGaps(specialization: string, data: StudentData): string[] {
    const skillGaps: { [key: string]: string[] } = {
      'Frontend Developer': ['JavaScript ES6+', 'CSS Grid/Flexbox', 'React/Vue/Angular', 'Web Performance'],
      'Backend Developer': ['API Design', 'Database Optimization', 'Authentication', 'Cloud Services'],
      'Full-Stack Developer': ['System Design', 'Database Management', 'Frontend Frameworks', 'DevOps Basics'],
      'DevOps Engineer': ['Containerization', 'CI/CD Pipelines', 'Cloud Infrastructure', 'Monitoring'],
      'UI/UX Designer': ['Design Systems', 'User Research', 'Prototyping', 'Accessibility'],
      'Mobile Developer': ['Cross-platform Development', 'Native APIs', 'Mobile Testing', 'App Store Deployment']
    };

    return skillGaps[specialization] || skillGaps['Full-Stack Developer'];
  }

  private generateWebDevLearningPath(specialization: string): string[] {
    const learningPaths: { [key: string]: string[] } = {
      'Frontend Developer': [
        'HTML & CSS Fundamentals',
        'JavaScript ES6+',
        'React Development',
        'Advanced CSS (Grid, Flexbox)',
        'State Management',
        'Performance Optimization'
      ],
      'Backend Developer': [
        'Programming Fundamentals',
        'Database Design & SQL',
        'API Development',
        'Authentication & Security',
        'Cloud Services',
        'System Architecture'
      ],
      'Full-Stack Developer': [
        'Frontend Fundamentals',
        'Backend Development',
        'Database Management',
        'API Integration',
        'Deployment & DevOps',
        'Project Management'
      ],
      'DevOps Engineer': [
        'Linux & Command Line',
        'Docker & Containers',
        'CI/CD Pipelines',
        'Cloud Infrastructure',
        'Monitoring & Logging',
        'Automation Tools'
      ],
      'UI/UX Designer': [
        'Design Principles',
        'User Research Methods',
        'Wireframing & Prototyping',
        'Design Tools Mastery',
        'Frontend Development',
        'Portfolio Development'
      ],
      'Mobile Developer': [
        'Mobile Development Basics',
        'React Native/Flutter',
        'Native Development',
        'Mobile UI/UX',
        'Testing & Debugging',
        'App Store Deployment'
      ]
    };

    return learningPaths[specialization] || learningPaths['Full-Stack Developer'];
  }

  private generateRecommendations(careerPath: string, data: StudentData): string[] {
    const recommendations: { [key: string]: string[] } = {
      'Data Science': [
        'Focus on mathematics and statistics courses',
        'Learn programming languages like Python and R',
        'Take advanced courses in machine learning',
        'Participate in data analysis competitions',
        'Build a portfolio of data science projects'
      ],
      'Software Developer': [
        'Master at least one programming language deeply',
        'Learn version control with Git',
        'Practice problem-solving on coding platforms',
        'Build real-world projects for your portfolio',
        'Stay updated with latest technology trends'
      ],
      'Business': [
        'Develop strong communication and leadership skills',
        'Take courses in business management and finance',
        'Learn about digital marketing and analytics',
        'Network with professionals in your field',
        'Consider internships in business roles'
      ],
      'Design/Creative': [
        'Develop your artistic and creative skills',
        'Learn design tools like Adobe Creative Suite',
        'Build a strong portfolio showcasing your work',
        'Stay inspired by following design trends',
        'Consider freelance opportunities to gain experience'
      ],
      'Vocational': [
        'Focus on practical, hands-on learning',
        'Identify specific trade skills you want to develop',
        'Look for apprenticeship opportunities',
        'Build strong technical skills in your chosen field',
        'Consider certification programs for your trade'
      ]
    };

    return recommendations[careerPath] || recommendations['Vocational'];
  }

  private identifySkillGaps(careerPath: string, data: StudentData): string[] {
    const skillGaps: { [key: string]: string[] } = {
      'Data Science': [
        'Advanced Mathematics',
        'Statistical Analysis',
        'Programming Skills',
        'Data Visualization'
      ],
      'Software Developer': [
        'Programming Fundamentals',
        'Algorithm Design',
        'Database Management',
        'Software Testing'
      ],
      'Business': [
        'Leadership Skills',
        'Financial Literacy',
        'Marketing Knowledge',
        'Project Management'
      ],
      'Design/Creative': [
        'Design Principles',
        'Creative Software',
        'Color Theory',
        'User Experience Design'
      ],
      'Vocational': [
        'Technical Skills',
        'Safety Protocols',
        'Industry Knowledge',
        'Equipment Operation'
      ]
    };

    return skillGaps[careerPath] || skillGaps['Vocational'];
  }

  private generateLearningPath(careerPath: string): string[] {
    const learningPaths: { [key: string]: string[] } = {
      'Data Science': [
        'Python Fundamentals',
        'Statistics & Probability',
        'Data Analysis with Pandas',
        'Machine Learning Basics',
        'Data Visualization',
        'Advanced ML Algorithms'
      ],
      'Software Developer': [
        'Programming Fundamentals',
        'Data Structures & Algorithms',
        'Web Development',
        'Database Design',
        'Software Engineering Principles',
        'Advanced Frameworks'
      ],
      'Business': [
        'Business Fundamentals',
        'Marketing Principles',
        'Financial Management',
        'Leadership Skills',
        'Digital Marketing',
        'Strategic Planning'
      ],
      'Design/Creative': [
        'Design Fundamentals',
        'Adobe Creative Suite',
        'User Interface Design',
        'Branding & Identity',
        'Web Design',
        'Portfolio Development'
      ],
      'Vocational': [
        'Safety Training',
        'Technical Fundamentals',
        'Equipment Operation',
        'Industry Standards',
        'Quality Control',
        'Professional Certification'
      ]
    };

    return learningPaths[careerPath] || learningPaths['Vocational'];
  }

  private getDefaultPrediction(): CareerPrediction {
    return {
      careerPath: 'Web Development',
      confidence: 0.75,
      recommendations: [
        'Start with HTML, CSS, and JavaScript fundamentals',
        'Choose a specialization based on your interests',
        'Build projects to showcase your skills',
        'Learn version control with Git'
      ],
      skillGaps: [
        'Programming Fundamentals',
        'Web Development Basics',
        'Project Management'
      ],
      learningPath: [
        'Web Development Fundamentals',
        'Choose Specialization',
        'Build Projects',
        'Advanced Topics'
      ],
      wavelengthAnalysis: {
        frontendWavelength: 65,
        backendWavelength: 60,
        fullstackWavelength: 70,
        devopsWavelength: 45,
        uiuxWavelength: 55,
        mobileWavelength: 50,
        totalWavelength: 58
      },
      webDevSpecialization: 'Full-Stack Developer'
    };
  }

  // Convert user profile data to student data format
  convertUserProfileToStudentData(userProfile: any): StudentData {
    return {
      age: userProfile.age || 20,
      studyTime: userProfile.studyTime || 2,
      absences: userProfile.absences || 5,
      failures: userProfile.failures || 0,
      motherEdu: userProfile.motherEdu || 2,
      fatherEdu: userProfile.fatherEdu || 2,
      familySize: userProfile.familySize || 'GT3',
      familyStatus: userProfile.familyStatus || 'T',
      health: userProfile.health || 3,
      freeTime: userProfile.freeTime || 3,
      goOut: userProfile.goOut || 3,
      familyRelationship: userProfile.familyRelationship || 4,
      schoolSupport: userProfile.schoolSupport || 'no',
      familySupport: userProfile.familySupport || 'yes',
      paidClasses: userProfile.paidClasses || 'no',
      activities: userProfile.activities || 'yes',
      internet: userProfile.internet || 'yes',
      romantic: userProfile.romantic || 'no',
      alcoholWeekday: userProfile.alcoholWeekday || 1,
      alcoholWeekend: userProfile.alcoholWeekend || 1,
      wantsHigherEdu: userProfile.wantsHigherEdu || 'yes'
    };
  }

  // Get web development career insights and statistics
  async getCareerInsights(careerPath: string): Promise<any> {
    const insights = {
      'Web Development': {
        demand: 'Very High',
        salary: '$65,000 - $140,000',
        growth: '+25% annually',
        skills: ['JavaScript', 'HTML/CSS', 'React', 'Node.js', 'Git'],
        companies: ['Google', 'Microsoft', 'Facebook', 'Netflix', 'Airbnb'],
        specializations: {
          'Frontend Developer': {
            salary: '$60,000 - $120,000',
            demand: 'High',
            skills: ['React', 'Vue', 'Angular', 'CSS', 'JavaScript']
          },
          'Backend Developer': {
            salary: '$70,000 - $130,000',
            demand: 'High',
            skills: ['Node.js', 'Python', 'Java', 'SQL', 'APIs']
          },
          'Full-Stack Developer': {
            salary: '$75,000 - $140,000',
            demand: 'Very High',
            skills: ['JavaScript', 'React', 'Node.js', 'Database', 'DevOps']
          },
          'DevOps Engineer': {
            salary: '$80,000 - $150,000',
            demand: 'High',
            skills: ['Docker', 'AWS', 'CI/CD', 'Kubernetes', 'Linux']
          },
          'UI/UX Designer': {
            salary: '$55,000 - $110,000',
            demand: 'Moderate',
            skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'Research']
          },
          'Mobile Developer': {
            salary: '$65,000 - $125,000',
            demand: 'High',
            skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile UI']
          }
        }
      }
    };

    return insights[careerPath] || insights['Web Development'];
  }
}

export const mlPredictionService = new MLPredictionService();
export type { StudentData, CareerPrediction };
