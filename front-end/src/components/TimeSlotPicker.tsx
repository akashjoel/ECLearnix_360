import React from 'react';
import { Clock } from 'lucide-react';
import { TimeSlot } from '../types/booking';

interface TimeSlotPickerProps {
  timeSlots: TimeSlot[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  timeSlots,
  selectedTime,
  onTimeSelect
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <Clock size={20} className="text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-800">Available Times</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {timeSlots.map(slot => (
          <button
            key={slot.id}
            onClick={() => slot.available && onTimeSelect(slot.time)}
            disabled={!slot.available}
            className={`
              py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedTime === slot.time
                ? 'bg-purple-500 text-white shadow-md scale-105'
                : slot.available
                ? 'bg-gray-50 text-gray-700 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
}; 