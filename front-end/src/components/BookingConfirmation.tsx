import React from 'react';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { BookingData } from '../types/booking';

interface BookingConfirmationProps {
  bookingData: BookingData;
  onConfirm: () => void;
  onEdit: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingData,
  onConfirm,
  onEdit
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <CheckCircle size={20} className="text-green-500" />
          <h3 className="text-lg font-semibold text-gray-800">Booking Summary</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <User size={20} className="text-purple-500" />
            <div>
              <p className="font-medium text-gray-800">{bookingData.expert.name}</p>
              <p className="text-sm text-gray-600">{bookingData.expert.title}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Calendar size={20} className="text-purple-500" />
            <div>
              <p className="font-medium text-gray-800">
                {bookingData.selectedDate && formatDate(bookingData.selectedDate)}
              </p>
              <p className="text-sm text-gray-600">Session Date</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Clock size={20} className="text-purple-500" />
            <div>
              <p className="font-medium text-gray-800">{bookingData.selectedTime}</p>
              <p className="text-sm text-gray-600">Session Time</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={onEdit}
          className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Edit Details
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}; 