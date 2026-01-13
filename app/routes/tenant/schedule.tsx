import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Users,
  Clock
} from "lucide-react";
import { TenantLayout } from "~/components/layouts";
import { Card, Badge, Button } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Schedule - Tenant Portal | TRM Ops" }];
}

// Mock scheduled visits
const scheduledVisits = [
  { id: "1", date: "2026-01-14", time: "09:00", company: "CoolAir Systems", purpose: "Freezer Repair", teamSize: 3 },
  { id: "2", date: "2026-01-15", time: "14:00", company: "ElectroPro Ltd", purpose: "Electrical Maintenance", teamSize: 2 },
  { id: "3", date: "2026-01-16", time: "11:00", company: "SecureGuard Ltd", purpose: "Security System Check", teamSize: 1 },
  { id: "4", date: "2026-01-20", time: "10:00", company: "CleanTech Services", purpose: "Monthly Deep Clean", teamSize: 5 },
  { id: "5", date: "2026-01-22", time: "09:30", company: "HVAC Masters", purpose: "Quarterly AC Service", teamSize: 2 },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function TenantSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 13)); // Jan 13, 2026
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getVisitsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return scheduledVisits.filter(v => v.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date(2026, 0, 13); // Mock "today"
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  // Generate calendar grid
  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Selected date for detail view
  const [selectedDate, setSelectedDate] = useState<number | null>(14);
  const selectedVisits = selectedDate ? getVisitsForDate(selectedDate) : [];

  return (
    <TenantLayout tenantName="Carrefour">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">
          Visit Schedule
        </h1>
        <p className="text-gray-500 mt-1">View your scheduled contractor visits</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card variant="bordered">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 font-display">
                {months[month]} {year}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={prevMonth}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={nextMonth}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const visits = getVisitsForDate(day);
                const hasVisits = visits.length > 0;
                const isSelected = selectedDate === day;
                const today = isToday(day);

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      aspect-square rounded-xl flex flex-col items-center justify-center p-1 transition-all
                      ${isSelected ? "bg-trm-red text-white shadow-lg shadow-trm-red/25" : "hover:bg-gray-100"}
                      ${today && !isSelected ? "ring-2 ring-trm-red" : ""}
                    `}
                  >
                    <span className={`text-sm font-medium ${isSelected ? "text-white" : today ? "text-trm-red" : "text-gray-900"}`}>
                      {day}
                    </span>
                    {hasVisits && (
                      <div className="flex gap-0.5 mt-1">
                        {visits.slice(0, 3).map((_, i) => (
                          <span
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-trm-red"}`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-3 h-3 rounded-full bg-trm-red" />
                <span>Scheduled Visit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-3 h-3 rounded ring-2 ring-trm-red" />
                <span>Today</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Selected Day Details */}
        <div>
          <Card variant="bordered" className="sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-trm-red flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 font-display">
                  {selectedDate ? `${months[month]} ${selectedDate}` : "Select a Date"}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedVisits.length} scheduled visit{selectedVisits.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {selectedVisits.length > 0 ? (
              <div className="space-y-4">
                {selectedVisits.map((visit) => (
                  <div key={visit.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{visit.company}</h4>
                      <Badge variant="info">{visit.time}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{visit.purpose}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {visit.teamSize} staff
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {visit.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No visits scheduled for this date</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </TenantLayout>
  );
}
