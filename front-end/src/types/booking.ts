export interface Expert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  isOnline: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingData {
  expert: Expert;
  selectedDate: Date | null;
  selectedTime: string | null;
  currentStep: number;
} 