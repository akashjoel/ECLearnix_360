export interface Course {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration: string;
  students: string;
  rating: number;
  completionRate: number;
  estimatedSalary: string;
  timeToComplete: string;
  progress: { completed: number; total: number };
  skills: string[];
  technologies: string[];
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  instructors: Instructor[];
  modules: Module[];
  reviews: Review[];
}

export interface Instructor {
  name: string;
  role: string;
  experience: string;
  company: string;
  avatar: string;
  rating: number;
  students: number;
}

export interface Module {
  id: number;
  title: string;
  duration: string;
  lessons: number;
  completed: number;
  description: string;
  topics: string[];
}

export interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development",
    description: "Master HTML, CSS, JavaScript, React, and backend development with hands-on projects and real-world applications.",
    tags: ["Beginner to Advanced", "Hot", "Trending"],
    duration: "120 hours",
    students: "15,234",
    rating: 4.8,
    completionRate: 78,
    estimatedSalary: "$85,000",
    timeToComplete: "6 months",
    progress: { completed: 4, total: 12 },
    skills: ["Frontend", "Backend", "Database"],
    technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    price: "$299",
    originalPrice: "$599",
    discount: "50% OFF",
    image: "/api/placeholder/400/300",
    instructors: [
      {
        name: "Sarah Johnson",
        role: "Senior Full Stack Developer",
        experience: "8+ years",
        company: "Google",
        avatar: "",
        rating: 4.9,
        students: 5000
      },
      {
        name: "Mike Chen",
        role: "React Specialist",
        experience: "6+ years",
        company: "Meta",
        avatar: "",
        rating: 4.8,
        students: 3200
      }
    ],
    modules: [
      {
        id: 1,
        title: "HTML Fundamentals",
        duration: "8 hours",
        lessons: 12,
        completed: 12,
        description: "Learn the basics of HTML structure, semantic elements, and best practices.",
        topics: ["HTML Structure", "Semantic Elements", "Forms", "Accessibility"]
      },
      {
        id: 2,
        title: "CSS Styling & Layout",
        duration: "12 hours",
        lessons: 18,
        completed: 18,
        description: "Master CSS styling, Flexbox, Grid, and responsive design principles.",
        topics: ["CSS Selectors", "Flexbox", "CSS Grid", "Responsive Design"]
      },
      {
        id: 3,
        title: "JavaScript Essentials",
        duration: "15 hours",
        lessons: 22,
        completed: 22,
        description: "Learn JavaScript fundamentals, ES6+ features, and DOM manipulation.",
        topics: ["Variables & Functions", "ES6+ Features", "DOM Manipulation", "Async Programming"]
      },
      {
        id: 4,
        title: "React Development",
        duration: "20 hours",
        lessons: 25,
        completed: 15,
        description: "Build modern web applications with React hooks, state management, and routing.",
        topics: ["React Hooks", "State Management", "React Router", "Context API"]
      },
      {
        id: 5,
        title: "Backend Development",
        duration: "25 hours",
        lessons: 30,
        completed: 0,
        description: "Create server-side applications with Node.js, Express, and databases.",
        topics: ["Node.js", "Express.js", "REST APIs", "Database Design"]
      },
      {
        id: 6,
        title: "Database & Deployment",
        duration: "10 hours",
        lessons: 15,
        completed: 0,
        description: "Learn database management, cloud deployment, and DevOps practices.",
        topics: ["MongoDB", "PostgreSQL", "AWS Deployment", "CI/CD"]
      }
    ],
    reviews: [
      {
        name: "Alex Thompson",
        rating: 5,
        date: "2 days ago",
        comment: "Amazing course! The projects are practical and the instructors are excellent. I got a job within 3 months of completing this course."
      },
      {
        name: "Maria Garcia",
        rating: 5,
        date: "1 week ago",
        comment: "Best investment I've made in my career. The course covers everything from basics to advanced concepts. Highly recommended!"
      },
      {
        name: "David Kim",
        rating: 4,
        date: "2 weeks ago",
        comment: "Great content and structure. The hands-on projects really help solidify the concepts. Would love more advanced topics."
      }
    ]
  },
  {
    id: "2",
    title: "Data Science Fundamentals",
    description: "Learn Python, statistics, machine learning, and data visualization for a career in data science.",
    tags: ["Intermediate", "High Demand", "Future-Proof"],
    duration: "80 hours",
    students: "8,567",
    rating: 4.9,
    completionRate: 65,
    estimatedSalary: "$95,000",
    timeToComplete: "4 months",
    progress: { completed: 0, total: 10 },
    skills: ["Python", "ML", "Analytics"],
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    price: "$399",
    originalPrice: "$699",
    discount: "43% OFF",
    image: "/api/placeholder/400/300",
    instructors: [
      {
        name: "Dr. Emily Chen",
        role: "Senior Data Scientist",
        experience: "10+ years",
        company: "Netflix",
        avatar: "",
        rating: 4.9,
        students: 4200
      },
      {
        name: "James Wilson",
        role: "ML Engineer",
        experience: "7+ years",
        company: "Amazon",
        avatar: "",
        rating: 4.8,
        students: 2800
      }
    ],
    modules: [
      {
        id: 1,
        title: "Python Basics",
        duration: "10 hours",
        lessons: 15,
        completed: 0,
        description: "Learn Python fundamentals, data structures, and object-oriented programming.",
        topics: ["Python Syntax", "Data Structures", "OOP", "File Handling"]
      },
      {
        id: 2,
        title: "Data Analysis with Pandas",
        duration: "12 hours",
        lessons: 18,
        completed: 0,
        description: "Master data manipulation and analysis using Pandas library.",
        topics: ["DataFrames", "Data Cleaning", "Aggregations", "Visualization"]
      },
      {
        id: 3,
        title: "Statistical Analysis",
        duration: "15 hours",
        lessons: 20,
        completed: 0,
        description: "Learn statistical concepts and hypothesis testing.",
        topics: ["Descriptive Stats", "Inferential Stats", "Hypothesis Testing", "A/B Testing"]
      },
      {
        id: 4,
        title: "Machine Learning Basics",
        duration: "20 hours",
        lessons: 25,
        completed: 0,
        description: "Introduction to machine learning algorithms and techniques.",
        topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"]
      },
      {
        id: 5,
        title: "Data Visualization",
        duration: "8 hours",
        lessons: 12,
        completed: 0,
        description: "Create compelling visualizations with Matplotlib and Seaborn.",
        topics: ["Matplotlib", "Seaborn", "Plotly", "Dashboard Design"]
      }
    ],
    reviews: [
      {
        name: "Sophie Rodriguez",
        rating: 5,
        date: "3 days ago",
        comment: "Excellent course! The instructors explain complex concepts clearly. I landed a data analyst role after completing this."
      },
      {
        name: "Kevin Park",
        rating: 5,
        date: "1 week ago",
        comment: "Comprehensive coverage of data science fundamentals. The projects are industry-relevant and practical."
      }
    ]
  },
  {
    id: "3",
    title: "Mobile App Development",
    description: "Build iOS and Android apps using React Native and Flutter with real-world projects.",
    tags: ["Advanced", "Mobile-First", "Cross-Platform"],
    duration: "100 hours",
    students: "12,890",
    rating: 4.7,
    completionRate: 72,
    estimatedSalary: "$90,000",
    timeToComplete: "5 months",
    progress: { completed: 2, total: 8 },
    skills: ["Mobile", "Cross-Platform", "UI/UX"],
    technologies: ["React Native", "Flutter", "Firebase", "Redux"],
    price: "$349",
    originalPrice: "$599",
    discount: "42% OFF",
    image: "/api/placeholder/400/300",
    instructors: [
      {
        name: "Amit Patel",
        role: "Mobile Development Expert",
        experience: "9+ years",
        company: "Uber",
        avatar: "",
        rating: 4.8,
        students: 3800
      }
    ],
    modules: [
      {
        id: 1,
        title: "React Native Fundamentals",
        duration: "15 hours",
        lessons: 20,
        completed: 20,
        description: "Learn React Native basics and component architecture.",
        topics: ["Components", "Navigation", "State Management", "APIs"]
      },
      {
        id: 2,
        title: "Flutter Development",
        duration: "18 hours",
        lessons: 22,
        completed: 22,
        description: "Build beautiful apps with Flutter and Dart.",
        topics: ["Dart Language", "Widgets", "State Management", "Animations"]
      },
      {
        id: 3,
        title: "Backend Integration",
        duration: "12 hours",
        lessons: 16,
        completed: 0,
        description: "Connect your apps to cloud services and databases.",
        topics: ["Firebase", "REST APIs", "Authentication", "Push Notifications"]
      }
    ],
    reviews: [
      {
        name: "Lisa Chen",
        rating: 5,
        date: "5 days ago",
        comment: "Great course for mobile development! The instructors are industry experts and the projects are practical."
      }
    ]
  },
  {
    id: "4",
    title: "Cybersecurity & Ethical Hacking",
    description: "Learn cybersecurity fundamentals, penetration testing, and ethical hacking techniques.",
    tags: ["Expert", "Security", "Certification"],
    duration: "150 hours",
    students: "6,234",
    rating: 4.9,
    completionRate: 58,
    estimatedSalary: "$110,000",
    timeToComplete: "8 months",
    progress: { completed: 1, total: 15 },
    skills: ["Security", "Networking", "Penetration Testing"],
    technologies: ["Kali Linux", "Wireshark", "Metasploit", "Python"],
    price: "$499",
    originalPrice: "$899",
    discount: "44% OFF",
    image: "/api/placeholder/400/300",
    instructors: [
      {
        name: "Dr. Michael Chen",
        role: "Cybersecurity Expert",
        experience: "12+ years",
        company: "Cisco",
        avatar: "",
        rating: 4.9,
        students: 2100
      }
    ],
    modules: [
      {
        id: 1,
        title: "Network Security",
        duration: "20 hours",
        lessons: 25,
        completed: 25,
        description: "Understand network protocols and security vulnerabilities.",
        topics: ["TCP/IP", "Network Protocols", "Firewalls", "VPNs"]
      },
      {
        id: 2,
        title: "Penetration Testing",
        duration: "25 hours",
        lessons: 30,
        completed: 0,
        description: "Learn ethical hacking and penetration testing methodologies.",
        topics: ["Reconnaissance", "Scanning", "Exploitation", "Post-Exploitation"]
      }
    ],
    reviews: [
      {
        name: "Robert Smith",
        rating: 5,
        date: "1 week ago",
        comment: "Comprehensive cybersecurity course with hands-on labs. Perfect for career transition into security."
      }
    ]
  },
  {
    id: "5",
    title: "AI & Machine Learning",
    description: "Master artificial intelligence, deep learning, and neural networks for advanced applications.",
    tags: ["Advanced", "AI-Powered", "Cutting-Edge"],
    duration: "200 hours",
    students: "9,876",
    rating: 4.8,
    completionRate: 45,
    estimatedSalary: "$120,000",
    timeToComplete: "10 months",
    progress: { completed: 0, total: 20 },
    skills: ["AI", "Deep Learning", "Neural Networks"],
    technologies: ["TensorFlow", "PyTorch", "Keras", "OpenCV"],
    price: "$599",
    originalPrice: "$999",
    discount: "40% OFF",
    image: "/api/placeholder/400/300",
    instructors: [
      {
        name: "Prof. Sushmita Mitra",
        role: "AI Research Professor",
        experience: "15+ years",
        company: "ISI Kolkata",
        avatar: "",
        rating: 4.9,
        students: 1800
      }
    ],
    modules: [
      {
        id: 1,
        title: "Neural Networks",
        duration: "25 hours",
        lessons: 30,
        completed: 0,
        description: "Understand neural network architecture and training.",
        topics: ["Perceptrons", "Backpropagation", "Activation Functions", "Optimization"]
      },
      {
        id: 2,
        title: "Deep Learning",
        duration: "30 hours",
        lessons: 35,
        completed: 0,
        description: "Master deep learning architectures and applications.",
        topics: ["CNNs", "RNNs", "LSTMs", "Transformers"]
      }
    ],
    reviews: [
      {
        name: "Dr. Sarah Johnson",
        rating: 5,
        date: "2 weeks ago",
        comment: "Outstanding course on AI and ML. The professor is a world-renowned expert in the field."
      }
    ]
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getAllCourses = (): Course[] => {
  return courses;
}; 