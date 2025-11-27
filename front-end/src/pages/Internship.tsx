import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Building2,
  Globe,
  Star,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  Target,
  Users,
  Award,
  Clock,
  Briefcase,
  GraduationCap,
  Rocket,
  TrendingUp,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Internship {
  id: string;
  companyName: string;
  companyLogo: string;
  internshipPeriod: string;
  salary: string;
  location: string;
  field: string;
  role: string;
  type: 'Indian' | 'Foreign';
  isRemote: boolean;
  experience: string;
  skills: string[];
  description: string;
  rating: number;
  applications: number;
  deadline: string;
  isHot: boolean;
  isNew: boolean;
}

const Internship = () => {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedField, setSelectedField] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploadStatus, setResumeUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setResumeFile(file);
        setResumeUploadStatus('success');
        setUploadMessage(`${file.name} uploaded successfully!`);
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setResumeUploadStatus('idle');
          setUploadMessage('');
        }, 3000);
      } else {
        setResumeUploadStatus('error');
        setUploadMessage('Please upload a PDF file only.');
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setResumeUploadStatus('idle');
          setUploadMessage('');
        }, 3000);
      }
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const internships: Internship[] = [
    // Indian Companies
    {
      id: '1',
      companyName: 'TCS',
      companyLogo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIgFfvxO5Kq82defy6iRhzwjKRApKnJmpInwDrfKWwwS_Eicjx3R-XMpZwXIR3o8k-nys&usqp=CAU',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '₹25,000/month',
      location: 'Mumbai, India',
      field: 'Web Development',
      role: 'Full Stack Developer Intern',
      type: 'Indian',
      isRemote: false,
      experience: '0-1 years',
      skills: ['React', 'Node.js', 'MongoDB'],
      description: 'Work on cutting-edge web applications using modern technologies.',
      rating: 4.2,
      applications: 156,
      deadline: 'May 15, 2024',
      isHot: true,
      isNew: false
    },
    {
      id: '2',
      companyName: 'Infosys',
      companyLogo: 'https://images.seeklogo.com/logo-png/28/2/infosys-limited-logo-png_seeklogo-289643.png',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '₹20,000/month',
      location: 'Bangalore, India',
      field: 'AI/ML',
      role: 'Machine Learning Intern',
      type: 'Indian',
      isRemote: true,
      experience: '0-2 years',
      skills: ['Python', 'TensorFlow', 'Scikit-learn'],
      description: 'Develop AI models for enterprise solutions.',
      rating: 4.0,
      applications: 203,
      deadline: 'June 1, 2024',
      isHot: false,
      isNew: true
    },
    {
      id: '3',
      companyName: 'Wipro',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'May 2024 – July 2024',
      salary: '₹22,000/month',
      location: 'Pune, India',
      field: 'Data Science',
      role: 'Data Analyst Intern',
      type: 'Indian',
      isRemote: false,
      experience: '0-1 years',
      skills: ['Python', 'SQL', 'Tableau'],
      description: 'Analyze large datasets and create insights.',
      rating: 3.8,
      applications: 89,
      deadline: 'April 30, 2024',
      isHot: false,
      isNew: false
    },
    {
      id: '4',
      companyName: 'HCL',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/HCL_Technologies_logo.svg',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '₹18,000/month',
      location: 'Noida, India',
      field: 'Cybersecurity',
      role: 'Security Analyst Intern',
      type: 'Indian',
      isRemote: true,
      experience: '0-1 years',
      skills: ['Network Security', 'Ethical Hacking', 'SIEM'],
      description: 'Learn cybersecurity practices and tools.',
      rating: 4.1,
      applications: 67,
      deadline: 'May 20, 2024',
      isHot: true,
      isNew: false
    },
    {
      id: '5',
      companyName: 'Tech Mahindra',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Tech_Mahindra_Logo.svg/2560px-Tech_Mahindra_Logo.svg.png',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '₹21,000/month',
      location: 'Hyderabad, India',
      field: 'Cloud Computing',
      role: 'Cloud Engineer Intern',
      type: 'Indian',
      isRemote: false,
      experience: '0-2 years',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      description: 'Work with cloud infrastructure and DevOps.',
      rating: 3.9,
      applications: 134,
      deadline: 'June 10, 2024',
      isHot: false,
      isNew: true
    },
    // Foreign Companies
    {
      id: '6',
      companyName: 'Google',
      companyLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABUFBMVEX////qQzU0qFNChfT7vAUvfPPc5/07gvSDq/c1f/SxyPr7uQD7uAD/vQDqQTP61NLpOirpLxsspk7pNiX8wgDpLRjpMyHqPS4ZokMjpEjpKhJDg/vi8eX74d/pNzdsvH/rUkbxkIqe0ar85eT+9PP2tbHsXFH+89rO3fzE1vslp1VhuHbm7v3u9/Cs17YzqkBLsGX3xMHzop3ymZP5zMntaF7wiIHucWnrSz70rKfwgXn/+On92Yr95K78yEv8zmX803X+6b793Zj4+//914L94KVwn/bE4sqfvflVkPVOqk16wouOypz2vLnucGftYVf4uHTsUjHvbyn0kB34qRHtXy7ygiL7wy/2nhf+78/tWC/weD+4zvqQsviLt1rguRi6tCuBrj+VsDlfq0nXuB6vszBflfXOynU9kMg6mqA3onU/jNg8lbQ4nolAiePN5dI+bmGzAAAK3ElEQVR4nO2c63vaRhbGZRnHcTBCl4AEi8udNsUQDPEFJ22cpi3xYprtbnfb7Dbb7V6y9/X//20lIUACZnRmpJkRPLwf+zxF+uWcOe+ZMyNL0k477bTTTjvttFM8ajROsmeTYX8wGFSrg0F/2Dx7dtJoiH6tWFQ/61+cV1RNy+cNQ53JMPJ5LWdctS4HzezmgmabF5WiljdUU1H21klRFFM1tJx5OTjbOMxs/9zUDHM92Qqpqea1q4tJXfRbQ1VvXhqaCqTzYRrFyiAr+uXDVe9XwLFbpVQ19fqZaAScGsNWTqWkm4cyr14kNZLPLnNGNLx5JK+Gyas8jf6eZsaA50Ea+esT0UgB1a+LEbNzhdHMtZKzIk8uYwzfQqZWORON5urkPMeCz5GSBMY6m/gtGN+KLayNapElnyMzdymw1xnmVcZ8LqM2EMSXreTjrZ8oKcaViLLauM7x4XMZc9fcW4BnJo8EXUg1OYeRZwCnUooXHPmye3wDOJVR4dbIDYq8AziVUmxy4Wuc54XwOYjaNQfArMna43EyWsxralMTk6EzmSrjLq7KvYYuS8kxbca/EbYE/Yh9ZnyNlgiTWJVWZQW4J7LG+KQU2azFurLlgCexzNFikKJtO2Bu2wEZRbAe86yQWqwAG3tJAWSUolJibIJRBKW3SQFkZBPSZTI6GXYRHCSgF3XELIKTnGi0qZhF8ETwfnAmZlVUuooL0Ll3oRpTqc71DKIfZhbBeKqMYhpafq91We0Pm81JczjsV69bV4ZmqNAizQ5wqEWmU/PFysW6a0GNk8ngXNMglOxS9KQYFU+7usBfBsr2W5oRAskuglIlyiJUTM0cQGa4jWYLe0bOzCYkqWpE4DO0a/iL1QcK8hyLYQSz9DmqGEafcLA5uVrPyDCC9EahGHs04/ezdeeRDCMoDWhzVDWGlI+cKMvPZFdF7aVB2a2ZuWqEwfsgeK+DZQSlc6otk5J/G+0IrN7yNfpMASdUXm8WaRN0of787I5likoSWdvoyajEcTEk640UmEZQ6lOUGSUX07S9ce48naVN2M+g2DMp+Ulsz69qjCMoVcm3FKYZ5yn7sMg0glKdPIRqzIezE7aXS35FHEL1LdMXilvP08fffkQEaHwj+p3JdJNOPf41CaJxKfqVyfQ8nUqlHv8Gjqiei35lQr1wCFOPv4MCmi3Rb0wqF9BGTP8WFEZlL3lfDuD1lUdoM/4OgKgYG/O50kzfp+Z6/EO4L+aS880AUO+OUz7E49+HhDHP7nILK71Mp/wKsQ1z08qoreNUUFjbUPKbVmUk6bN0ahkRYxua+A8+iPX5MqAjlG2YPK57xqzny0mKsw3F2Lwc9ZlhEHGtbeT5XEqOV2uTFGEbysZ1axIqSRG2wXQSxkqrldSHuGQb5obtCad6iSG0bSOwL2Y7KWIlDJ8rn21sZgjfoZehF8aFbWxmCL/AJekU8YdZCDexkKK9wo/o2UaM41+eCgdMebahGKLflUofhy3DWaZ+tKeK+nA1mnBuGED87lstWX/xAKobIKGtP4h+Vzp9H07mKf2C+iGnDxjrFPNw2DJ0dPwxNeGjA8b6Gv1sYKFxRQ0oPTraZ6tb9LNfgQnTNwkmPHiNfHZ4RzMn/CzJhA+Qz4aX0uPnCSY8eoJ8NqBnm4kekAPhI+SzwWaRfplkwsP3yGeDI5j+ItGESLvAzGiWdPwu0YRIu4DbYQS/50C4v496dOgGf0EYAZAD4SHKEF/B++5kEx6hOlPo3imV+jzZhAcoQsRAf1WRzIIHIaqpeQEm/DLhhJ8gHv0lmJB+c8iFENm2wQmjGD4Pwh8jE361oYTgrUWUvRMXQlTrvT0xjE6Y9HUYnTDptRRFCPfDmw0l3JqeBllLt6YvRRJuz94C1dNszf4QSbg1e3xk500wp3mVbELkSBgKmPBZG3oHvC3zUvQUY1tm3uhJ1LacW6Cnidty9oQ5QNyS80P0VH9bzoAxJzOczvEFnq7xuYsh8oQUXkwzqT/SEx4cUglMiDnlBu+fMj/90irREj55SCc4IfqmArTUZP70qVyo0RJS6vUBGBH3MyC+zM+fyrKs80Lz9AS6fDFmIYH6NjtDHUC5MOLFNtV76EI8eoP7mfCuxslQV3qbF9tUt9AcRc4wXIVt8zOZP3uAskxfa2h0Cl6G6L2TqxDA1F/mgLJe5gTnCu6iR/gfwn5vkfmrvADkHMQP0GV4+AH/QzhHzPzNz8c3iPAkxRca3Kwmk/o5CGgH8Z4Pnq034CRFjqFmQvnFzCQCQeRXTqF8dgwxHY0rxGh/bhLBIHa54EnSj+AkDVuGiDT1m0QwijzwbN2C++6wZSitTdOASQQJxxzw7I4N3pOGLsN11XTJJAQUG3gI9w8AP7ecpssmwT9P4aswpO32FDR9byeBJmRviq8JhgL4ptRToDddZxJLecq8nj4kIQzzCle+ac16k+C7FD+B5ygsSX2WiDSJpUTtsAR8DecDJqk0/xtDaJNYIuyxJPwaXkfxIxq/ppcyMj+hTWIJkWH39oYgR/cPHwJ/1f1bX3iTCKrArKASeP0+yO493aTDTGIZkVFv84AIED9lC+j5cahJcEE8JVmDoJ50rr/rRHwym0Q9JRh0O4LWGUcli5RQLsRebkgBwXXG1Zg4iLIux+uLpGsQe16xqg55EGVdj7O7IWi3vRCG7n2DuiuQI8pWfIcZ70kBCazCE3mays5ijCdTTz8QHzKiv+dCqUuRp3amxnKc8eSArMa4IcSciyLUo4qibJWjhrHTtv7xC/YhpHKMaRgjrsZaQZef/pMUkXgVOqIqNo4KMn2qjmT3qU//tU+UqMCN4bIoAW1ZPTrGUW+WOLr8b5IwknnhXPeUeeq8oCUTTzc6Xdnyrf2n/4EjkrUzPo1p89RRQb8jOZy6vyssPe3pf8FtG2w8s04yXT31pFu9LgyyVAuEb/Zv1PsfLIwHmDtCYU+mz9MpY8Hq1UJ6uc5ovA5v+r+DbIPGKeaqRUR0Ia12bbQ2lqVRzaYrYBIFZBsh59ohakfK0xmljan32ne1bnc0ur8fjbq12rhtZ3EBRzdFDLcNko3vOsUAuOBcSNeB/3ShthEpRx1FXYrRFWIb0XLUEV0LHisizjYi1NG5qLu32ISxjSNarw8olmoTSUjbOIQPELGi3EjFKYRtoD+tIFS03iYWFdbZBsW2F6EOtLYzlK6v2MZBRCf0qyS82sirthFPlZkjCvcM2bENf6aSjg9DEZMQRb9tRO5lVhGTEMWFbRzeUu8J0YgJKDeObbgNzuF+/IDJqKiObdweMgK0ERNg/dNMZZCintpJqDe2bTADtNvwBNSb+I8qAxK/mbJYX4i8F1xvYjzCQ6kjcjHqFpdvdcQtxkKP0ycQ94K2U8yXoE9lAWHUud2cdzXiXnCsmI7Q4RojZvFsxDmAU933+BVV/gGcqsYpjAWd8/ecC3XuODDq1p0oPkelMmNG3RqLSVAfY5sho26VuX6rihCzOCaEz1FpbMVfVwvWOCl8jjprj+LppVtyTfT6W9GojD2xJsErWGVh/oBVp9uLDulcb+gmLnwLlWqRIJOON1WnWy7QUDr3GcajxON5uq+1dZsSiunc1pDLwPtFyVGpO+5Zzo0SDKdzQcOy9HJtY2K3IudWULunWw6qe8nEkXvhxP5Putwe10aljYXzq1OaXhS6c1WrOVeHtoNsp5122mmnnXZKhP4P3gm05bSa50gAAAAASUVORK5CYII=',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '$8,000/month',
      location: 'Mountain View, USA',
      field: 'AI/ML',
      role: 'AI Research Intern',
      type: 'Foreign',
      isRemote: false,
      experience: '1-2 years',
      skills: ['Python', 'TensorFlow', 'PyTorch'],
      description: 'Research in cutting-edge AI technologies.',
      rating: 4.8,
      applications: 1205,
      deadline: 'March 15, 2024',
      isHot: true,
      isNew: false
    },
    {
      id: '7',
      companyName: 'Microsoft',
      companyLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEXz8/PzUyWBvAYFpvD/ugjz9fb19Pbz+fr39fr69vPy9foAofD/tgDzRQB9ugAAo/Df6dCv0Xj16dDz2dPzTBfzl4PznImz04CAx/H60oHS5vJ5xPH60HkAnvDz7u3z4t7n7dzzNADzkXurz3BwtQDzvrLM36zf6/Os2PL33qz07d/7z3VsY4ENAAABg0lEQVR4nO3cyVLCYBCFURwCkTAHHCBMgqL4/u/nRoJV/FWuOrg43wt0ner9bbUkSdKvsvDqU+3wUsBVGd36RGxvRtGlPlhu+7FtXzs/t/LdfhDbfnT5xazs38Q2ndXC8eA2tgEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISFho8LtNLb+WbgLni9N75euZ4/BvZ02aPP3p+DGm8TObtaJ7rwjnIeXHBKWJOnvHsKrT3XDyxLAw+I5uI8TsftZvcRWHRPE+XIYW7GohV+96CYpYXEX2/AsrHr3sRESEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhI2K1wWsS2vvV+azaM71KeOk+hWl8BGy8K7MlCSpH/WN1yrX/IDTwlFAAAAAElFTkSuQmCC',
      internshipPeriod: 'May 2024 – July 2024',
      salary: '$7,500/month',
      location: 'Seattle, USA',
      field: 'Software Development',
      role: 'Software Engineer Intern',
      type: 'Foreign',
      isRemote: true,
      experience: '0-2 years',
      skills: ['C#', '.NET', 'Azure'],
      description: 'Develop software solutions for Microsoft products.',
      rating: 4.6,
      applications: 892,
      deadline: 'April 1, 2024',
      isHot: true,
      isNew: false
    },
    {
      id: '8',
      companyName: 'Meta',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '$8,500/month',
      location: 'Menlo Park, USA',
      field: 'Frontend Development',
      role: 'Frontend Developer Intern',
      type: 'Foreign',
      isRemote: false,
      experience: '0-1 years',
      skills: ['React', 'JavaScript', 'CSS'],
      description: 'Build user interfaces for Meta platforms.',
      rating: 4.4,
      applications: 756,
      deadline: 'May 1, 2024',
      isHot: false,
      isNew: true
    },
    {
      id: '9',
      companyName: 'Amazon',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '$7,800/month',
      location: 'Seattle, USA',
      field: 'Backend Development',
      role: 'Backend Engineer Intern',
      type: 'Foreign',
      isRemote: true,
      experience: '0-2 years',
      skills: ['Java', 'Spring Boot', 'AWS'],
      description: 'Develop scalable backend services.',
      rating: 4.3,
      applications: 634,
      deadline: 'June 15, 2024',
      isHot: false,
      isNew: false
    },
    {
      id: '10',
      companyName: 'Apple',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '$8,200/month',
      location: 'Cupertino, USA',
      field: 'Mobile Development',
      role: 'iOS Developer Intern',
      type: 'Foreign',
      isRemote: false,
      experience: '0-1 years',
      skills: ['Swift', 'iOS', 'Xcode'],
      description: 'Develop iOS applications for Apple ecosystem.',
      rating: 4.7,
      applications: 445,
      deadline: 'May 10, 2024',
      isHot: true,
      isNew: false
    },
    {
      id: '11',
      companyName: 'Netflix',
      companyLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAAB0CAMAAADTnpcOAAAAkFBMVEX////YHybVAAD++vrXFR7YHCPWAAnWAA/wvr/ZJizdSU7trK7cREnXFB388vPsqKrgXGDhZWjXCRXok5X0zc7keXzibXDXBhP21tfqmpzbOj/yw8TvtbbnjY/xwMHlgIP54uProKLaMjf10NHfWV3niozeUFT54+TaLTP77Oz32tvjcnXiaWzbPkPeVFffW14Ky5DnAAALlElEQVR4nO2d60LqOhCFS2kpilUpN7m4AREVRX3/tzu0tJBkVtpJ9eBt1k87aZv5bEgyk8RrGBpdeViRadlqE5uz0DSqUNJTSg9ix9LgPS5c36DhXx5Ld8xKBtcWb1h0Hph3b+oGlz55AavHN9R29z7mn8KJpbgAY6gSmLcllQyfLDfrJfRl+wRYw1/g4gKMoWpgffrZ+Df4ZgmpSxh6FFhyi4sLMIaqgXkN8obxAN5r1iLvOloCYClFJAHGEAPYeERfgRhlVTHvtX9XUIM+fBcBxhADGOhKRB1wq2dqF794CJjlCxVgDDGAeffky4EdPeCN7McOeQC+iwBjiAPsH+h2PBOrJrUKX9MLVR44SIAxxAEGen/JnBgt6U9da5ZeAFWI4VsKMIZYwNZgfEWMaGcyjPYXKupwkABjiAVsQVu7/cejaEpt8vEWqgPstQgwhljAqFUjuDBMaM+k4W+yK6gOpHgqAcYQDxgYEhvzS4+gT5+/Cq7EI32KAGOIBwz0AJO1ZoF+5vLhMazEaEyfIsAY4gHzBoRH3qMoBPr0xRQxrER4Rh8iwBhiArsB3Q61FqDNjIogjKUWdAJZgDHEBObdkdcM3kovH2+EawFGcvWAtfxyqaGBIb1M+0ojaqR2iSmwihfw885XppMBuyLebCjvAT7A5DBfSC5lMprUVLWAtabNy1Kp9aGmza7pgNESWCn3IMBam/IXuFTHnCcDhrodx8ZmCKYRF8VFyGtnMDWfUQuYv3KrsKmu+eqRLZ6eiwCzeAzrZMAAkzAuroE0guD8UBLzasRD8xH1gOFQDVu/FhgKPBffCIqYHX0NcaEnCTCG2MBQ4Ll4VkynEWOloEVkdkuAMcQHhj6jfbcDhF/UcTGklb7qg/EEAcYQHxgIPOdYHnBqQCFIKzPa6E8QYAzxgXnXNPCcTVeAufx4q5TDtBr7DB1VAowhB2Ao8Jx6aw6mEdW+NoSVKrzTHyDAGHIA5kW02zHEqQEaCUwre5aeaCDAGHIBdgs+pUs0B9LSwpOQVSYjo1SAMeQCDMS8oiWcRtSKQVaZ1M6/J8BYcgEGAs/hBE0j6qEyDAt4W4Ax5AQMBFEC9IHp0WSIai89o1SAMeQEDIQp6fyHHnfxSoHpjacAY8gNGOjBAwjGNHyZrYZEgDHkBgykzxORtSllxlpGqQBjyA2YN6mOj5vzF6XAtDksAcaQIzAw6CIIzBuUWqvuEWAMOQID0xqGshVGmkrN1YxSAcaQIzCUDGCUJ+taKuyPYwABxpArMBB41p//SoqUF1AyQwQYQ67AqhIDSRi5CpiSUfpTgbk87vTAQOBZdf+Iliizb6gZpT80ayq47l5DvYHSpwcGAs+K0I4OZfYNNaO0FrB4vhyPx73e7Xo+GLwMt9vu/cP5+cXrHV5HTfRxYI0AK0af3umBeddl3Q4z6p+qxDzVMaO0XuZvPBqNkr3iTKmzwjAhWXRYnwDM6gxQ+guAgZV7R+d1QYHKehVTWZ+aW0/THrF+PzCQ1HYsjHoAVfU6JIAIMIZqAAOB51x4E6rqiuWPFGAM1QAGAs+lda2sWDEUEGAM1QCG8hDLylZWrMgoFWAM1QEGAs+ZwJKvVNSQjKX2fUsBxlAdYJ4FmGUfRGIXmg/NIzICjKFawHDgmeTK5yKGyfhJr3SexyjAGKoFDAeefereTMQwWZpbl+6n+AUYQ7WAwcBzGFiMiWUyNtPx94lxAoyhesDIYxt4541MxDLpmX7fZ5QKMIbqAUMzwHC/r1TEcgeMtInpFIkAY6geMBBjsW3ki4GZv4JZYoEAY6geMLqBIk1HPIhYpkFmM2E4rZwAY6gWMDhyhjP1qYhlCsz8RtPpqZ8KrIXlfx9gODvR9iNGDFNg5oRkcF8/HhZFUeYfXbb/H0MfBxZN+1ioyfkSYJZEHJJBmgsCI9B3uOtFnAfLq86s3U69ttrpptCC54Bfn9PhWWPO5grYQhiYuUXwzk/1cjosp1Rw9euzpkrCK2Cr7VQYmDkyCCc/NmvquwOzLmHhztbvUxHNcyT8DflwBRiVO7CSbG18fgAx2wMz0/STJb2fACNyBwb2py9xsGcFRtvEM8b9BJgzsMA+EjLXXu5FzPLsbDNwTe8rwKicgbXLEklRWqIVGJpB1iXAqJyBvdoSOlLBGXtilQMDuywaEmBUrsDALg+K0F7ZVmDeexn7VAKMyhUYqZ9RGixNIEYFMFsyz0ECjMoRWPlSCLT+sgRY5XJOAUblCAwcAFFZnNgc1vBVfK4CDMgNWPUSZ3BsEbE5AGtXtIkCjMoN2LKyJw6OLSI2x1WyFfwFGJUbsLA6fEizSYnJEVjFEncBRuUErHTQXNAgazCpyQFY2VqzhgBDcgIGDmomChOzFDFRNg4QYP8nsPJB8+EGZmScWCjAyo8bEmBULsC2wLv0TyQZh1gowMq3/RBgVA7A0KA5QadtG8k4tJBypBfd+FmRAKNyAAYGzcE9+BUya0wMVGClOzAKMCoHYCg9ewraSTMZh5RSga3K2kQBRsUHBnbeSyfn0alHejIOua6dcliyJ4EAA+IDAzm3Wd1opNhIxiHFNGBls5N/AVh4Pu33VzeLzYZ3GzYwNMbNbNGpR1pJclkDVjZW+Biw5uVmcbPq49y7g74aWCNUcpbju/P74Xw9vppNV8+bS3RjNjC6Z32+DA90HnVH03I97bK9TXTbHKx5+XjTn3XG60H37eIMHloK9OXAVIVhEMRJMoqKzPPozIxXcYGhVbJ5BgcNHOvJOKScDsxcKqaIAyy5Xd7Ot2+TeF/DVjRKkjg4TnrqD6P6VsCo4nvjBlxgL2CEnP9cgsZSS8YhV3UfluzUzVoMkRiESh9G9c2BBe/GDZjAUMLM4deDrhbTknGqfPhkbRM//eBtoF8KDLRbx+EW3XxKS8ap8qF9y0wBVhsYmEE6njkFVkeoyThVPrTvXSXA6gLrgFi+kkhPN59Sk3EqfWg9vUCA1QUGfmbUQCXIV1NuU+lDa7a+AKsJDA6a1Y4gGIodd9cm10wfWnPnBFhNYG900KydIwvm3MuOtic+tEWyBVg9YODcXyPFF4yljic+kEvEh7YTXQRYPWAgSBlOdBPabzj+xlX70NYmCrBawNCg2TwAAsxpHg4kZfjQssepAKsFrAf2KTIPgAApwYdkHIYPLdX4lsAmfqTr2wED+xSNiBdos3noljB8aFkqdhJgUZIko732/q8ANusYqrDXdeXH2TkIjJTcTDWAoUVBdNMbENYqjDg+xEvFTgGsN5jf9sbj5U5XmZYf3PijXNNu9/rhYnJ3FiZFHKzVitKzLeJ0BpvUrgYwcO4vWlREx9ZF28LxIV4qVh9YGAZxGlaqjod9oZrNzePiuT9tz67GvflL92FypgWJUoKxMzCUOYh2UKHTFUVPkgMML4txApYxSjJGftSYvL+sx532aoFWXX9nNTc7hu3ZsrfeEbxr+OZGypXA7mljBVaowJ+hnCsHGF4qVgksYzTah2eDu7fhfHzV7j8zsyN+hsy67Po8egDQAIam0vFuzDTfLU/GYQGDS8UgsDAuGjs/eXrYDnrL2fT50bYd6q9Tv91Z7trP69ezJGs8RwawAQiE4b1HaduZHzTFAgaXRQBgceOiO7gdz/7dLGCOyl9Sc7NrPJcDzQ2XPujT27bZozs/Zg7nAaNLxcLAtrG6yKp+dzLKPry01cwdaRso0shxkGWQ8IAdIwLpD1Pa5CVv84oUNRFUc7FqL9fbi7TLGSVxYjurEMwIZjEYHjDP3/00pb9M0dP7oNeZLv56g/cJam5Ws942Xtiu0w5l1noygc2v18v2zaNwOp3+0W5HmozDBCY6vSLyiaVhM+NPQfyNJx/+mK7u0v6Juh4lHhyAhbuuRPoTdbFdf3D9gugT9ThdvkwUbL7n5aSeuredvnQlvqce/41fXrNOpT/zXoe92eqnTen9SaWdyuHwP8SHEYavdooNAAAAAElFTkSuQmCC',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '$8,800/month',
      location: 'Los Gatos, USA',
      field: 'Data Engineering',
      role: 'Data Engineer Intern',
      type: 'Foreign',
      isRemote: true,
      experience: '0-2 years',
      skills: ['Python', 'Spark', 'Kafka'],
      description: 'Build data pipelines for streaming analytics.',
      rating: 4.5,
      applications: 567,
      deadline: 'June 5, 2024',
      isHot: false,
      isNew: true
    },
    {
      id: '12',
      companyName: 'SAP',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '€3,500/month',
      location: 'Berlin, Germany',
      field: 'Enterprise Software',
      role: 'Software Developer Intern',
      type: 'Foreign',
      isRemote: false,
      experience: '0-1 years',
      skills: ['Java', 'ABAP', 'SAP HANA'],
      description: 'Develop enterprise software solutions.',
      rating: 4.2,
      applications: 234,
      deadline: 'May 20, 2024',
      isHot: false,
      isNew: false
    },
    // Additional Indian Companies
    {
      id: '13',
      companyName: 'Cognizant',
      companyLogo: 'data:image/jpeg;base64,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',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '₹23,000/month',
      location: 'Chennai, India',
      field: 'DevOps',
      role: 'DevOps Engineer Intern',
      type: 'Indian',
      isRemote: true,
      experience: '0-1 years',
      skills: ['Docker', 'Jenkins', 'Git'],
      description: 'Learn CI/CD pipelines and automation.',
      rating: 4.0,
      applications: 178,
      deadline: 'May 25, 2024',
      isHot: true,
      isNew: false
    },
    {
      id: '14',
      companyName: 'L&T Technology',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '₹19,000/month',
      location: 'Mumbai, India',
      field: 'IoT',
      role: 'IoT Developer Intern',
      type: 'Indian',
      isRemote: false,
      experience: '0-2 years',
      skills: ['Arduino', 'Raspberry Pi', 'Python'],
      description: 'Develop IoT solutions for smart cities.',
      rating: 3.9,
      applications: 95,
      deadline: 'June 5, 2024',
      isHot: false,
      isNew: true
    },
    {
      id: '15',
      companyName: 'Mindtree',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'May 2024 – July 2024',
      salary: '₹20,000/month',
      location: 'Bangalore, India',
      field: 'Blockchain',
      role: 'Blockchain Developer Intern',
      type: 'Indian',
      isRemote: true,
      experience: '0-1 years',
      skills: ['Solidity', 'Ethereum', 'Web3.js'],
      description: 'Build decentralized applications.',
      rating: 4.1,
      applications: 112,
      deadline: 'April 25, 2024',
      isHot: true,
      isNew: false
    },
    {
      id: '16',
      companyName: 'Zoho',
      companyLogo: 'data:image/jpeg;base64,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',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '₹24,000/month',
      location: 'Chennai, India',
      field: 'Product Management',
      role: 'Product Manager Intern',
      type: 'Indian',
      isRemote: false,
      experience: '0-2 years',
      skills: ['Product Strategy', 'User Research', 'Analytics'],
      description: 'Learn product development lifecycle.',
      rating: 4.3,
      applications: 145,
      deadline: 'May 30, 2024',
      isHot: false,
      isNew: true
    },
    {
      id: '17',
      companyName: 'Freshworks',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '₹26,000/month',
      location: 'Chennai, India',
      field: 'Customer Success',
      role: 'Customer Success Intern',
      type: 'Indian',
      isRemote: true,
      experience: '0-1 years',
      skills: ['Customer Support', 'CRM', 'Analytics'],
      description: 'Help customers succeed with our products.',
      rating: 4.0,
      applications: 88,
      deadline: 'June 10, 2024',
      isHot: false,
      isNew: false
    },
    {
      id: '18',
      companyName: 'Razorpay',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '₹28,000/month',
      location: 'Bangalore, India',
      field: 'Fintech',
      role: 'Fintech Developer Intern',
      type: 'Indian',
      isRemote: false,
      experience: '0-2 years',
      skills: ['Java', 'Spring Boot', 'Payment APIs'],
      description: 'Build payment solutions for businesses.',
      rating: 4.4,
      applications: 203,
      deadline: 'May 15, 2024',
      isHot: true,
      isNew: false
    },
    // Additional Foreign Companies
    {
      id: '19',
      companyName: 'Adobe',
      companyLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbUAAABzCAMAAAAosmzyAAAAkFBMVEX////6DAD6AAD/9vX9rqz+zsz7WVX+3dz/+fn6GRD7Z2T8m5n9pqT7UEz8enf7Ojb/8O/9ubf+5OP+19b8fnv9tLL+1tX7TEj9oqD8lJL7Y1/8iYb8dHH7RUH+4uH9qqj9w8L7amf6JR/+6un6Mi38jYv7Xlr8hYL7ODP+wsD7QT3+ysn8mJb6KyX6HRf7VlJFrgTRAAAPK0lEQVR4nO2dfVvqOgzAz4rIQFBUUFAUFEV8w+//7S4MWJM2adLCnnuPd/nrPB7abfmtbZIm3Z8sSszqjyi3Jq7LhtxlLY5EUvuSe3yvqVUukdT6mi6jsNXUEiQO2pOmy7OaWtUSR+1G02Wjpla1RCn4Q9fnUwy2mlqCRFEb6vq8qalVLFHUtJ2+RGCrqSVIDLR7bafDmlq1EkNtru61platRKj3VN/rvR5bTS1BIqh96nu9qqlVKnrttmO6/VFjq6kliJ7aKKbbWU2tStFTy6P6XWmx1dQSRA1tEtfvqKZWoaipteL6VQcja2oJotWtMgRpZaLEVlNLEC21y9iOr2tq1YlSteoQpJUHHbaaWoIoqY3je778i6g1Rt29jB6P0F/T9ndyhO48UVLThyBLydsqbP8Jak1jZXqE/nqgvyN054kO2l1K169/EzV7P8cYHKegvzg/Vyc6as2Uruc1tX+TmnlJ6/tOg62mliAqaolTfbNyan0k6f1USa2Kt1Kj1+QLazIRDnmqsUGiyiAj5TdSG6R23q2YGo6/pN/nr6QWGYK0oglGHvJUp5haO3kJqZLaARM3Kwq19tJ7H8jYDqF2gbs3s9SOfiG19/TeHyul5g7lNLdyI7+Omnk+pPueiO0Aat6GebKGqqSWEFYSRaamKH7iRQ5GHkCt41FL1fjvo3bYCBfLotKp+baOeUjs6rdRi808cOWrOmpEhrO5Suvq11FLd10L6VdHrVwzn8trmLO0rn4ZtfjMA1eksqhkamVw2ryWSjLfaX1VSS1x+AdFoqYsfuJFKotKpjYtUc2mdrBdJ/X1u6gdY09PCEYmU/soqTVsgrp5S+qrSmrH2Bt3RaCmLn7i5aQaaiUpcwFyZhNfs19G7RhLaTXUypr9jUNpt81jakjW0uj35/1+FLVGfz7vCzftUysuFP2o3LXCGl3EXoaStyC2VGql4bhZyuziqTumYS156+T89iUrtnhWLzpq88vB7XPRIrtYnDX5YDWi1h++9V62e0nfvbdLrf/b/DpdFreXLRdnznIdpia/uA15sQ2XRSVSa5XQilofY7GpAv+zp/ZW+9s24A5ZavnJrW2y/dc5Z/tAakt0obX0hvItPg7auNXzGNIOKlQRgpyey78JBiMTqZV1jVv7w24uKKze/nhlDHdPHLWvzGuyIUC7s3ALyY/gmExwK6863v2t/wCyGwP6zExXVMCfpeLdDpZFJVIrn2o7H3xaardCy/yVR5Zx1GZtuo0xE+r5T4W13KxmgTv8Yq71XW50BjuXgTSNxuYKZUamUSvNh73RqN4aeRcio+TzDHjOpk1sGgvUNrfNbrw32OPjTJm3H+pZMfndGU0CV+iMpjRq5yW1nfVhkxHC5ZHnoXFWNPep5cFj+AyxGStS4+eEefAV32EL9StnHmyiSopkyVAwMo2aZbTbs7WzcCiqlX+I6vSp5VLSkr9vrKDG5CvOw2/VTtmBHyhCkBs/SeMeBMqikqgBRrvmOZgi2betoahg9akpSLu2pIYaOdryZ2lFLJ438AO5+Ckv1giFKx4IRiZRK0PSNunARqnNK3e7vkoMMMt3f3GpueFvr0Xm5x761KghRITf0CkE+4xB1KZ4YFqVmS42tN3hYrUEhH9fU6jZgWVfLXuYKHvnzvJUuEGnk0lnGfLXcEBu3eTiaXKaubp05htk+W8d+RVF211cuqhd9nbZvG5eYlOoaMMpU1X8tNy5nPIv+UyEFGpDb4JEO9vMSvvq6D+7L383BY0xNbwkm4fdWzLv4snWWdqQlz1u7qzam7MXB7ZzIHEfQbOO5wg0K+ZVTpmaeW9vfisc25y1t1Oo2f008I7bLBJ6/x3P0qYNb5qPQ06QIuH/oZfAMYHY6PHsG98F9ojBxcwH1MsjxHbNU9Nkqe31ZJbyb9myqARq9pWE7wsYzuTgR8mT5hz5oiy1FoKGjQ40f+A3F1JzbKNz1AodvQNCf66BCe5j4+mx1GR73lY6KdIU2LKoBGpgExR41HCKJAwplGXiRn1YamiouSqBS95mv8hKgJozRuGdgpxfb6b7Qu8kp0uF7wy2RxSBdq4sKoFaWfGND2SzV6CcEeh0eY44Rw0tNL7RBc1LNBBD1FBCILpT0MgPVKIeOWqKOBWca2XVfx6NGhjjaFqCU6QX1YKX99c9jhoYTdQ5YggqNOOD1BpwjQePD+/fjyWC+PiUoWYUIUg45WhSXZkIQzw1O1lgOHCK9OLe4AU3mXdJjhrYrSADZXBOg7NTkBo69wiEw0BQjghSgsDCG0dNkX4BV3eTyb9nyqLiqS0pC3IjC/tgbjorzHgltjIYag16UFhBxgpYisLUULd23gVtiH1NWzJhehw1OdnBMaTlEg6mLCqamtWU63GA0e8+AJog/XmEoQaekTnTFG6CAxWEqaGBX7550Ewkti1Aocs3TU1T/IQDPeKu1h/H5k2nZs95dR8OLDNujGAM/ovw5hhqYCpj8mPP6UsK1OByWXpN0JH4uMDy8vICvPo2Q20mqc4L4ys2CFrHoWYTRjyXEliRTuAfLlCEW8BQg8sW7QnB4d2xfxaoIU3sRz48ddgQApqQ1DSZB27+vqa8ltymiqVmFWx6g3MkA8gGu5AgJEHN/gw1cMNMqAg2BGupQA3Znvvn1x4Xl3HUFNny3iUU2ieDkbHU4JwUeB/xW4TWf6JThhrYI2BirSB4AI1IgRo89qh8fnlDaC/0DKkofvIBaE7YpbZpI6nxAU2n2wzaHPM0am2RGtzWA5OyRO2ZoKY+vTZ7pqhpip/8F0NTGDE+nJr6QGVk1cIhQX34j6GWRVFb2fckhZoamrkgqckVDpRhoUiepDIRIqmpv1yEbBUYl6Vcy6OMtWc1NRAdsXOCnlqHoKbJPKBWTs1XGrya3FhqEV8Jg/N84gy5iqKmX9egi1JGnVGcKygjipoiDZS24eU0ZCITIY6a8tBJV/2IGnFBhtoLMZFhAb4vfNv1lr/1smF6xBkpo+50+D5rzomYvyY4RWfKacJgfjAyjpoqjWbXMbDEG/DvxLYSQ21hgq3+oJgLnGsivOyyaqknDmwr/sMqskDolD3NeVt+WVQUNd3hhfuewdj/prHshaEGHF9mBgLBVfjSCtTA4mx9fujSSAFF/1nlzANumlJt73iNYqhNxbkf9gw2IuCL3PH7ZajBMUEb1h26YUT0uFT3F4WSEU+JiswDLhVXk4nglUVFUYMnYLdJgT0DXwRuIBNXZKihkD55QxmNJ0wNvgx2MQQ+jbjL7Glett/peGLRWE5b8MqiYqhBA/4xJwWeAQXWIvgRb/1ODYIyI24IahqevRamBr01Ox9IFhMUV4cKX5mO3RetFQPVLYuKoWatIJymAQUMR7DSoMhf5m3VcNRA2gS5DwKSTtHEG6Q2JidI7GcIhp2rd7n4KZi0Ly+K7qfrY6hZC5QPlUL7AJjDcFb3y044anAFJ2YheNgsWotC1FAj+JqjWTwc6XDVLmceBAtkFAaoE0iMoAbdHPb1QKNqVv4ZGa/eu8lRy2FuTNu90xxapmgAB6i1UIy7hf4H/Ec4FuxoXVH8FKofICYfT86SqYGksIDdQ5uLOKjiDlU2sw4ecOnt/MK0M3xaBE9thqBhcxZmuJosZP07Wpf3Nt0ZzulALunoJ1OzbmJoLwllIdnO8adOzQK9yyw1ZDyZW3SvKFcQjw2OWo6POXUGFE7ZJDdRGl+FhYU1qDjzLXzioyaI6eQuqKlB1QbWzxxSs75xw0mxNwOgTj5jHKcKg/+coTnHOZiFzhifj4XyHad2YHWGqV6dLHbloljn8kjhzf5dF3Ia8k0iNZARGMyxhYYfmNSmzp2vNTj5Gs5ml6MBMlXc6gyMzQzer69an2NcZ+GuDJDa+ezm8ap1837/4ZTU+F6ZM4+tr7YcdGfNtcy6b4siiEBRk1XHm/3crfiyRA+spgY0EdyBRYYfGJTeLEFHVJyPFww9TfpFZZ596VdCEWVQhPPiJWh7YR+fmiIXVd4pUWyED5OoQY827GBAlQG+DdU2uLdkKvI5PNNZU5dNzRfyF5kIarLC5c+FKpJOcmRHaamBYlAhcgYLimDi0pVUSV+08NKWgrX0RRMvsilTY0yIR+kWPWpUWNUVoWw4y1Q7PfcJ1HLtBOmkrEITToPNj+9IJfhELYhEzbAu1o1wiz41OYqoydpQpCFfJVCDtQvS9ivrR/WX8ltH5OMGIVAAxFNieLOvFZ4kXWqa4if5oHed+wC3G5XUbMiPj0HuBWafOhbWvfQuk7HUMdvKkBtvYcxmEnrmxiJ49JBLTd4dU3xUIVO56p/R1Br6CdIJ9TnmXes0QGCtUHrCablm+75FhzSMflhFrS/RkfRzueJucd26aAz+IgejFB8wyXRhMRu8UVLrAhNYzk+BFrPnitw8+Wb49ki/u0v+Zt4fPHN/PS4Z7/QTHG+HW6zuNSfqnizp1i87v9v+Tc760CZIKfiPYqkNH3o7uVWkp9hf926JTej+sLNy9sCfT0PnPRbSer1ATR7OAg5IY/bac69hHl7VH41s3V+4rW/H5TtiVS0XP43cfijncdOVvN3TiKV2bMnn79P7p8XPz+LpbTRs9nWfk+rPum+d095P5376KbtJ+bw5HL2tL9L7uTs/G15HPmm/eTKerBuf3k1ep5dXsHWpvB+5m0mHkCciDZlK73XEHl/2X/hC5d8mpaZnqT0QJkpMGkNNLUH2ujvgy0/+R+g1acj7iENNLUH2ek78VMhGiKPfI9LzamoJslfzAV9+yglqiu8A7GIANbUE2Wn5oC8/EW6cwvgf19SSZafktM+77ITYKVUEWuY1tWTZau7ALz9d+PaIIg15m21dU0uQrY4P/PITZY/IUYBmTS1VCsUptsTCQlBTbNYVSak1tQQpNKzIPQ0LkU2iMP6nNbVEUSpYkGuCmvwq5DW1RMmoPfd4+fbtkbZu56emliA6w0EUN9lQZ+I81tTSRJd5IAoVH1FkItyamlqKqHbDFEJkDSpc9/eaWpKogk8Koc6kUITJjKYEvxZXVIfNacS3RzQh6a+aWooc7RuzxAG5iu2ffk0tRTSHqKqESAXSZCI81dQSRFH8pBTiXDJFGvJNTS1BjvDx+Z00CWqKgewf016LKAeHIK18E1l3chpy94Bd9P+tHOPj8zu5XHhpd3eKgzDqsRYt/wAnOL1jn8Q+GAAAAABJRU5ErkJggg==',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '$8,500/month',
      location: 'San Jose, USA',
      field: 'UI/UX Design',
      role: 'UX Designer Intern',
      type: 'Foreign',
      isRemote: true,
      experience: '0-1 years',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      description: 'Design user experiences for creative tools.',
      rating: 4.5,
      applications: 456,
      deadline: 'May 1, 2024',
      isHot: false,
      isNew: true
    },
    {
      id: '20',
      companyName: 'Intel',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '$8,200/month',
      location: 'Santa Clara, USA',
      field: 'Hardware Engineering',
      role: 'Hardware Engineer Intern',
      type: 'Foreign',
      isRemote: false,
      experience: '0-2 years',
      skills: ['VLSI', 'Verilog', 'PCB Design'],
      description: 'Design next-generation processors.',
      rating: 4.3,
      applications: 234,
      deadline: 'June 1, 2024',
      isHot: false,
      isNew: false
    },
    {
      id: '21',
      companyName: 'Oracle',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '$7,800/month',
      location: 'Austin, USA',
      field: 'Database Engineering',
      role: 'Database Engineer Intern',
      type: 'Foreign',
      isRemote: true,
      experience: '0-1 years',
      skills: ['SQL', 'Oracle DB', 'PL/SQL'],
      description: 'Optimize database performance and queries.',
      rating: 4.1,
      applications: 189,
      deadline: 'May 10, 2024',
      isHot: false,
      isNew: false
    },
    {
      id: '22',
      companyName: 'IBM',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '$7,500/month',
      location: 'New York, USA',
      field: 'Quantum Computing',
      role: 'Quantum Computing Intern',
      type: 'Foreign',
      isRemote: false,
      experience: '1-2 years',
      skills: ['Qiskit', 'Python', 'Quantum Algorithms'],
      description: 'Research quantum computing applications.',
      rating: 4.6,
      applications: 156,
      deadline: 'June 15, 2024',
      isHot: true,
      isNew: false
    },
    {
      id: '23',
      companyName: 'Salesforce',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '$8,000/month',
      location: 'San Francisco, USA',
      field: 'Salesforce Development',
      role: 'Salesforce Developer Intern',
      type: 'Foreign',
      isRemote: true,
      experience: '0-1 years',
      skills: ['Apex', 'Lightning', 'SOQL'],
      description: 'Build custom Salesforce solutions.',
      rating: 4.2,
      applications: 267,
      deadline: 'May 20, 2024',
      isHot: false,
      isNew: true
    },
    {
      id: '24',
      companyName: 'Spotify',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '$8,300/month',
      location: 'Stockholm, Sweden',
      field: 'Music Technology',
      role: 'Music Tech Intern',
      type: 'Foreign',
      isRemote: false,
      experience: '0-2 years',
      skills: ['Audio Processing', 'Machine Learning', 'Python'],
      description: 'Develop music recommendation algorithms.',
      rating: 4.4,
      applications: 334,
      deadline: 'June 5, 2024',
      isHot: true,
      isNew: false
    },
    {
      id: '25',
      companyName: 'Uber',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '$8,600/month',
      location: 'San Francisco, USA',
      field: 'Maps & Location',
      role: 'Maps Engineer Intern',
      type: 'Foreign',
      isRemote: true,
      experience: '0-1 years',
      skills: ['Geospatial Data', 'Python', 'PostGIS'],
      description: 'Improve location accuracy and routing.',
      rating: 4.3,
      applications: 445,
      deadline: 'May 15, 2024',
      isHot: false,
      isNew: false
    },
    {
      id: '26',
      companyName: 'Airbnb',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '$8,400/month',
      location: 'San Francisco, USA',
      field: 'Product Analytics',
      role: 'Product Analyst Intern',
      type: 'Foreign',
      isRemote: false,
      experience: '0-2 years',
      skills: ['SQL', 'Python', 'Tableau'],
      description: 'Analyze user behavior and product metrics.',
      rating: 4.5,
      applications: 289,
      deadline: 'June 10, 2024',
      isHot: true,
      isNew: false
    },
    {
      id: '27',
      companyName: 'LinkedIn',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '$8,200/month',
      location: 'Sunnyvale, USA',
      field: 'Social Media',
      role: 'Social Media Intern',
      type: 'Foreign',
      isRemote: true,
      experience: '0-1 years',
      skills: ['Content Strategy', 'Analytics', 'Social Media'],
      description: 'Manage LinkedIn\'s social media presence.',
      rating: 4.1,
      applications: 178,
      deadline: 'May 25, 2024',
      isHot: false,
      isNew: true
    },
    {
      id: '28',
      companyName: 'Twitter',
      companyLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAaVBMVEUdm/D///8Ak+8Alu8Al+8Aku8UmfDn8/2Oxvau1fj0+v7x+P7Z6/zS6PszovH6/f+YyvdEp/K22fnH4vq+3fpOq/KBwPVcsPNut/Sgzvfj8f16vfVUrfKJw/bD4PotoPGezfdntPMAiu4/7K8nAAALOklEQVR4nOWda4OiLBTHFZAyb5mZtxqn5/t/yEedqRSViwLi7P/F7mzbmL/Aw+GcA1j2vylr6xvg0akMrq5bFO7lKzhEUi5pOnfp3mIMAGyE2j8ggPXznHhrr2syt3d5YgARxtZAGDf04TFYdW1juSP3DiCJ3BME+LYC3VDusoJwnvm33REIXcHrXsvfH4zkDu4OYkC/Wh2eBexceYevHw3k9lPAauqeEDxzXterwOe9xnGfchHqrs3xheO63g0gCxxe/zSN24WcPbwnDNID47KHG4DNG7P3CxPcchyDRfJSIEz9Q041cH4Oum8TfAaAMfc1G72kS19MGz4rkM021zX9obZw/HlxzF2DoxIoto7OUupGyCqnrlke0fvLBMnn9RH3BVrOVR0bRRlcgd1ijW7bc2Pw6UL95h5z1807nHU+4CJF8Urs5raL/gW91uEbfC9+739J7mtrWDBk2UfpOtXidnwk8B6eg3O/pTuhvP95JHf6++aTFtq3TtZiizYAb02TXzwRGHceOEAiuMvfcQSHWkezqJaC3cDlKQRo6mLESEdwH1/fE4ptjQoldPIfzc3g0H34iQT359cg8UaVWmvJOb4OSDy4Q+6g5y4hbf7LUTm25STEZw65H/3+BjWBfy3zTUUEvskPHXLXg3frAfeWO6e8gvnoUwfcB+Kb1wJ+V489YaoG3BfyQSOtoAK5ynv55NA04L6NhhMYKx7HT8ptGgpHH3o4D7njid+q1XpuubSRew571NpJ9l855J767rGl0lf310w9eUSaqPJowXb+0ucmzdrrVxXOzlLFRg08+p92KMJmttIZrT53Mv2sYcATt1ukQLFR69+5fw67uAvGJ4J7ZM7fv64qAqN2DIP1KwRzuOTWa4r2E1zoc59nbYyigdxX2txO18ejoGiZ33O0X9etz/2Yt62wVmHdKpXGPE4O13NeOxD256XwaY+4abeB4Zd07Ejt2A2ncqmvwbzPTR9L5T/krvp5GCGMXonzPveTbmVgvDrbPpTqQWysT2hRgLv5tqT2dU/9/JMQ+Nz/oJ8zM86gksitvZs7vRAbr137Far90f0vVaa5m4N+eJ1zHPvIkWbeNDc3GOTJ+fyWvqCkJlfrtIxEDEd9bt4HDtxkcOt9vMlRmGNeMhayJBh2pc4aKUAWg/S5S+6eh8F9td8aquQkNMwYktwilgavtm/6ujmeSGyz4kzzQki0eGygmSCHCk0FThhxRZowrFc85oGu9kaTgTJ6HJklEC+OQV01ccN0MiJMzRuw1Ri4heSahrG5MXeYJ1qQfccgXURe6BjG5kODQ26xB/x98XhBIdBZR3uHs6PtkJvbcyEELVc0r6KDG8x/PJH3X3ozGMLbZP3YttzzgRKCe1FH/xECqUh318I971QS3KsmSRiiB/dcTYddA/NdkKzjWuc1t0sAvvk8dx3jmAD3+ttBIC440HX4LQLcS4bwkZpWP7M6vOrUWCsR7kJOO0AA8yst7qxjXiLCLaXBOyEI6ts8u2H9XK7BadlzN5hyajTEHfjHMQU3hBt2EObfX8RNaIgziXEHKmovUEefPdyr7ynoV9MC87U5U+uJKmV31LR9g+/g8P6smNmZ9eL3zztF0kzbrDCeLJaWLDgBR+FW09P1C1MWx03/l4YKYQ3CtSi3fdcZ1FcmytqBGW4Nj7h6YUo10twjcFBfHa1ciJKtn330fdFlueYJUlI6PW7CmQx2D45GWbFJ7tIaLsII9t7VISXu1eM+OERA2NfhWygUraC4x93WF0Hruzdx9GQsXtxOlGnJ4PnuloYikF3e7nykfmWXQlHc84E9/2XE0EnPry5y3q/LSnPXBtyfRZrtnDmsiq9mzljGe33IaW7LgJsg7KbMO+7n6DFLLVy3tydBWj1Gn/v7j3HT8tN97q8dd+oJUbKCXOuJdiqMKdjDeclfmHy+RTXnQ24NoT59ou9XNeDWv/BBoWizktX1TAaL5p2TcQedNaOKRTdrBLeWIiM9wk8Bbv6KZONFC7aMuMUqc40WoBceENx/x6JTckQT3LoXuygTZuxMQXIf/8jcBI12bKFzn/6IZWM83uO8weNv9HRExx5zq99YRIfQeIceBresQq5tBVlbUkzkx2r2ZY0XNeYww62jklCxMHPXvMm6nt2PZQwndYbb3vq2V4tSqEjjVr57kGqNt6Li4tawOZhSIfaW6DP1DupK93SI3c1n6zzSPds2djefr28J9xtbZVtzCvdJ1ha2+uVw7DMzX8ooZafmLcSaejO47Sjcp3GjB87Z3LZ93yU4awrK5rZvOxzHEdduI4xzPC77K97jGLzZ3PZhbw85TnmwOc5tOTu7anIuq8Z1Xk258DCVTURbYyDIbdvXejelqpDDV+PmbiZo1k4ec8i57wD3uUyXGOzAf+MbxES4bdu/DbfkNFH0ZP8y7kZJhcnjUIwSM2y+kLtReam2ppuXw723BpX7MFpf6QVFbm58nb+56dyJY92rY+Fer9eLWxyrtL/RsIHib25GP+8qsn/OaW3+Gu26a5gEmpvBva86H0dgD0A6964K2mjL5AS5te/tukbMXKAA945yhEhow0fW+K1/z+qFwkhoRzAWd7KXBqeuqhDn1nB8kBxx5EiEuHdSugkENztk++e3PYzhIi4LJ7dtuJfWiTxGTwZ3Yn4VgKBR4+M2v96FXcaziNs2PTUqMA8T4jbcpnOfdC/KbX+Z/IhjwaFbgNsuDG5xvoTYMm77YSw4ZFSar+M2tsKJMw+4mNuuzGxxuOzQJIE4spFdfXy4vXRuuzDPqgvFlpZy24lpuZJFQ5g4t+0ZVv2w8OEW5m4ecpP6urP8PA3h/FhQG9PktH3GpHPb9tGQRPjraEhd3PbhaUJ1F3UbIiXczQQtc7Zu88/RkBq5mzavNi4AYC2EVMRt25Ebg+2SwhNHTGnitttzpe8Qwi3ijmDVWVhruRtFyTmzAIQI6cyOrz+7di13Jy+4FI+q0rY0A64/xlQK949cXSYeiiYJJiSNO8p0TVOlHEYuizuwtLW2lDPYJXE/tHlwko6el8Lt65urrHLKe5LBrTEAJcOkdVrPnWgs0ZZ3Dvdabi/TODdb7668tY47OupcfDI+7Xa5VnG7SONsFAMJhzG/tYLbtXTORDGSd9K8vYJbL7UFw1VhhpGWcUffeqmlDdtvLeEuK80BB+wsyOxL5o70LyzCMGHfl1rupILaw+cwlvtoC3MnN0t/6Bw7tG3MlXN7lxxtsbYEIfl9nJfbuz5CADcJmINMtBBRDreXFHm9EXProq0Nm1K4g3KiYD06+NfidkcN8nYxcnBXYNDe3FH1H6jj7Fndbo/H41blz7SGAGxK3AqJF50KcTd+SAwwxuglbEQBMsgVPdkf7sbZxlun+QjBUI0ZJ7jt6GFIUrsT4l21v5rblKR2K+xUSrv4kNu2/dQEcgyyJfWmK7gbRzTemhyDVHCBjAzurcm1UU/4a8l9KwuHwF0X9aSf6udbnEIFwVNqAE2cu7HtD6SZHMKHwOJtVdyNXI1RFQRClS7ppObnY34FdcQOMYSVzg7+K+o89JIpLtbCENxZO3arEWv+3fR3VegNdFyom2nSxY63HNxUfuChPbgxLfSasoG44munS44khsxxc7H8ulVL/4g7nup/pxI2rWmm+QBkxQaGjJBQ/Dz4zuBieNxYboCfhT6fjKYF+1I9UtgFofjxG2IIrOz8tW3f7mtZXvCQFO1mTV19Jp6OSzUv4naHIwBQ+Dy6gfoptZDW5P2jMnHPt2dcW20csg1Fdvr50arjrDoWV9+cNu5LTv1aFHmH0veDTr5feiehzVQ2kMT61F3pX+X+HyzNnEnJNCN6AAAAAElFTkSuQmCC',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '$8,500/month',
      location: 'San Francisco, USA',
      field: 'Content Moderation',
      role: 'Content Moderation Intern',
      type: 'Foreign',
      isRemote: false,
      experience: '0-2 years',
      skills: ['AI/ML', 'Natural Language Processing', 'Python'],
      description: 'Develop AI tools for content moderation.',
      rating: 4.2,
      applications: 156,
      deadline: 'June 15, 2024',
      isHot: false,
      isNew: false
    },
    {
      id: '29',
      companyName: 'Tesla',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'June 2024 – August 2024',
      salary: '$8,800/month',
      location: 'Palo Alto, USA',
      field: 'Electric Vehicles',
      role: 'EV Engineer Intern',
      type: 'Foreign',
      isRemote: false,
      experience: '0-2 years',
      skills: ['Battery Technology', 'Electric Motors', 'CAD'],
      description: 'Design next-generation electric vehicles.',
      rating: 4.7,
      applications: 567,
      deadline: 'May 1, 2024',
      isHot: true,
      isNew: false
    },
    {
      id: '30',
      companyName: 'SpaceX',
      companyLogo: 'data:image/png;base64,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',
      internshipPeriod: 'July 2024 – September 2024',
      salary: '$9,000/month',
      location: 'Hawthorne, USA',
      field: 'Aerospace',
      role: 'Aerospace Engineer Intern',
      type: 'Foreign',
      isRemote: false,
      experience: '1-2 years',
      skills: ['Rocket Propulsion', 'Aerodynamics', 'MATLAB'],
      description: 'Design rockets for space exploration.',
      rating: 4.8,
      applications: 789,
      deadline: 'June 1, 2024',
      isHot: true,
      isNew: false
    }
  ];

  const locations = ['All', ...Array.from(new Set(internships.map(i => i.location.split(',')[0])))];
  const fields = ['All', ...Array.from(new Set(internships.map(i => i.field)))];

  const filteredInternships = internships.filter(internship => {
    const matchesLocation = selectedLocation === 'All' || internship.location.includes(selectedLocation);
    const matchesField = selectedField === 'All' || internship.field === selectedField;
    const matchesSearch = internship.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.field.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesLocation && matchesField && matchesSearch;
  });

  const renderInternshipCard = (internship: Internship) => (
    <div 
      key={internship.id}
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
    >
      {/* Header with Logo and Badges */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
            <img 
              src={internship.companyLogo} 
              alt={internship.companyName}
              className="w-12 h-12 object-contain object-center"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/48x48/6366f1/ffffff?text=' + internship.companyName.charAt(0);
                e.currentTarget.className = 'w-8 h-8 object-contain object-center';
              }}
              onLoad={(e) => {
                // Ensure proper sizing for loaded images
                const img = e.currentTarget;
                if (img.naturalWidth > img.naturalHeight) {
                  img.className = 'w-12 h-8 object-contain object-center';
                } else if (img.naturalHeight > img.naturalWidth) {
                  img.className = 'w-8 h-12 object-contain object-center';
                } else {
                  img.className = 'w-10 h-10 object-contain object-center';
                }
              }}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
              {internship.companyName}
            </h3>
            <p className="text-sm text-gray-600">{internship.role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {internship.isHot && (
            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Hot
            </span>
          )}
          {internship.isNew && (
            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              New
            </span>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-purple-500" />
          <span>{internship.internshipPeriod}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4 text-green-500" />
          <span className="font-medium">{internship.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span>{internship.location}</span>
          {internship.isRemote && (
            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">Remote</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building2 className="w-4 h-4 text-orange-500" />
          <span>{internship.field}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {internship.skills.slice(0, 3).map((skill, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full"
          >
            {skill}
          </span>
        ))}
        {internship.skills.length > 3 && (
          <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">
            +{internship.skills.length - 3} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{internship.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{internship.applications} applied</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Deadline: {internship.deadline}</span>
        </div>
      </div>

      {/* Apply Button */}
      <button className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
        <span>Apply Now</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Removed animated SVG blob backgrounds as per user request */}
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Internship Opportunities
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing internship opportunities from top companies worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>



            {/* Location Filter */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'All' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Field Filter */}
            <div className="relative">
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                {fields.map(field => (
                  <option key={field} value={field}>
                    {field === 'All' ? 'All Fields' : field}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Resume Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Upload Your Resume</h3>
                <p className="text-sm text-gray-600">Upload your resume to apply for internships</p>
              </div>
            </div>
            
            {/* Hidden File Input */}
            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="hidden"
            />
            
            {/* Upload Icon Button */}
            <div className="relative group">
              <button
                onClick={triggerFileInput}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg cursor-pointer"
                title="Upload your resume (PDF only)"
              >
                <Upload className="w-5 h-5" />
              </button>
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                Upload your resume (PDF only)
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
          
          {/* Upload Status */}
          {resumeUploadStatus !== 'idle' && (
            <div className={`mt-4 p-3 rounded-lg flex items-center gap-3 ${
              resumeUploadStatus === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : resumeUploadStatus === 'error'
                ? 'bg-red-50 border border-red-200'
                : 'bg-blue-50 border border-blue-200'
            }`}>
              {resumeUploadStatus === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : resumeUploadStatus === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : (
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              )}
              <span className={`text-sm font-medium ${
                resumeUploadStatus === 'success' 
                  ? 'text-green-800' 
                  : resumeUploadStatus === 'error'
                  ? 'text-red-800'
                  : 'text-blue-800'
              }`}>
                {uploadMessage}
              </span>
            </div>
          )}
          
          {/* Uploaded File Info */}
          {resumeFile && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{resumeFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => {
                  setResumeFile(null);
                  setResumeUploadStatus('idle');
                  setUploadMessage('');
                }}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Remove file"
              >
                <AlertCircle className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{filteredInternships.length}</div>
            <div className="text-sm text-gray-600">Total Internships</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{filteredInternships.filter(i => i.isRemote).length}</div>
            <div className="text-sm text-gray-600">Remote Positions</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{filteredInternships.filter(i => i.isHot).length}</div>
            <div className="text-sm text-gray-600">Hot Opportunities</div>
          </div>
        </div>

        {/* All Internships Section */}
        {filteredInternships.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">All Internships</h2>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 text-sm font-medium rounded-full">
                {filteredInternships.length} opportunities
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInternships.map(renderInternshipCard)}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all opportunities</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Internship;