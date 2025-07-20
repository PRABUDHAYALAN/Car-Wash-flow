import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface DateTimeScreenProps {
  onNext: (selectedDateTime: { date: string; time: string }) => void;
  onBack: () => void;
}

const timeSlots = [
  { id: '10:00', label: '10:00 AM', available: true },
  { id: '12:00', label: '12:00 PM', available: true },
  { id: '14:00', label: '2:00 PM', available: false },
  { id: '16:00', label: '4:00 PM', available: true },
  { id: '18:00', label: '6:00 PM', available: true },
  { id: '20:00', label: '8:00 PM', available: false }
];

const DateTimeScreen = ({ onNext, onBack }: DateTimeScreenProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar days
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const dateString = date.toISOString().split('T')[0];
      
      days.push({
        date: date.getDate(),
        dateString,
        isCurrentMonth,
        isPast,
        isToday,
        isSelected: selectedDate === dateString
      });
    }
    
    return days;
  };

  const handleDateSelect = (dateString: string, isPast: boolean) => {
    if (!isPast) {
      setSelectedDate(dateString);
    }
  };

  const handleTimeSelect = (timeId: string, available: boolean) => {
    if (available) {
      setSelectedTime(timeId);
    }
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onNext({ date: selectedDate, time: selectedTime });
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="mobile-container min-h-screen">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          ←
        </button>
        <h1 className="page-header text-left flex-1 mb-0">Choose Date & Time</h1>
      </div>

      <div className="space-y-6">
        {/* Calendar Section */}
        <div className="animate-fade-in">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-lg font-semibold text-foreground">Select Date</h3>
          </div>
          
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              
              <h3 className="text-lg font-semibold text-foreground">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {generateCalendar().map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day.dateString, day.isPast)}
                  disabled={day.isPast || !day.isCurrentMonth}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200
                    ${!day.isCurrentMonth ? 'text-muted-foreground/30' : ''}
                    ${day.isPast ? 'text-muted-foreground/50 cursor-not-allowed' : ''}
                    ${day.isToday ? 'bg-primary/10 text-primary font-semibold' : ''}
                    ${day.isSelected ? 'bg-primary text-primary-foreground font-semibold' : ''}
                    ${!day.isPast && !day.isSelected && day.isCurrentMonth ? 'hover:bg-muted' : ''}
                  `}
                >
                  {day.date}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Time Slots Section */}
        <div className="animate-fade-in">
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-lg font-semibold text-foreground">Select Time</h3>
          </div>
          
          {!selectedDate ? (
            <div className="bg-muted/30 border border-dashed rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Please select a date first</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleTimeSelect(slot.id, slot.available)}
                  disabled={!slot.available}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-300 text-center
                    ${selectedTime === slot.id 
                      ? 'border-secondary bg-secondary/10 text-secondary' 
                      : slot.available 
                        ? 'border-border bg-card hover:border-secondary/50 text-foreground' 
                        : 'border-border bg-muted/50 text-muted-foreground cursor-not-allowed'
                    }
                  `}
                >
                  <div className="flex items-center justify-center">
                    <Clock className={`w-4 h-4 mr-2 ${
                      selectedTime === slot.id 
                        ? 'text-secondary' 
                        : slot.available 
                          ? 'text-muted-foreground' 
                          : 'text-muted-foreground/50'
                    }`} />
                    <span className="font-medium">{slot.label}</span>
                  </div>
                  {!slot.available && (
                    <p className="text-xs text-muted-foreground/70 mt-1">Booked</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Summary */}
        {selectedDate && selectedTime && (
          <div className="animate-slide-up bg-success/10 border border-success/20 rounded-xl p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center mr-3">
                <Calendar className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-semibold text-success">Scheduled for</p>
                <p className="text-sm text-success/80">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {timeSlots.find(slot => slot.id === selectedTime)?.label}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pb-8 mt-8">
        <button 
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className={`btn-primary ${(!selectedDate || !selectedTime) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Continue to Summary
        </button>
      </div>
    </div>
  );
};

export default DateTimeScreen;