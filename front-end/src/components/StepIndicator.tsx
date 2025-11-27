import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        
        return (
          <React.Fragment key={stepNumber}>
            <div
              className={`
                flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold
                transition-all duration-300 ease-in-out
                ${isActive
                  ? 'bg-purple-500 text-white shadow-lg scale-110'
                  : isCompleted
                  ? 'bg-purple-200 text-purple-600'
                  : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div
                className={`
                  w-16 h-0.5 mx-2 transition-colors duration-300
                  ${stepNumber < currentStep ? 'bg-purple-300' : 'bg-gray-200'}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}; 