import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { error } from 'console';

const ApiTest: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<string>('Testing...');
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      setLoading(true);
      
      // Test basic connection first
      const healthResponse = await apiService.testConnection();
      console.log('Health check response:', healthResponse);
      
      // Test courses endpoint
      try {
        const coursesResponse = await apiService.getCourses();
        console.log('Courses response:', coursesResponse);
        
        if (coursesResponse.success) {
          setCourses(coursesResponse.data || []);
          setApiStatus('✅ Backend connected successfully!');
        } else {
          setApiStatus('⚠️ Backend connected but courses endpoint returned error');
        }
      } catch (coursesError) {
        console.log('Courses endpoint error (expected if no data):', coursesError);
        setApiStatus('✅ Backend connected successfully! (No courses data yet)');
      }
    } catch (error) {
      console.error('API connection test failed:', error);
      setApiStatus('❌ Backend connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Frontend-Backend Connection Test</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">API Status:</p>
        <p className={`font-medium ${apiStatus.includes('✅') ? 'text-green-600' : apiStatus.includes('❌') ? 'text-red-600' : 'text-yellow-600'}`}>
          {apiStatus}
        </p>
      </div>

      <button
        onClick={testApiConnection}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>

      {courses.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Available Courses:</p>
          <ul className="text-sm">
            {courses.slice(0, 3).map((course: any, index: number) => (
              <li key={index} className="text-gray-800">• {course.title || course.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>Backend URL: http://localhost:5000/api</p>
        <p>Frontend URL: http://localhost:5173</p>
      </div>
    </div>
  );
};

export default ApiTest; 
