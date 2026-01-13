import { 
  ClipboardList, 
  CheckCircle2,
  Clock,
  Camera,
  Package
} from "lucide-react";
import { OpsLayout } from "~/components/layouts";
import { Card, Badge, Button } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "My Tasks - Operations | TRM Ops" }];
}

interface Task {
  id: string;
  title: string;
  location: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in_progress" | "completed";
  assignedAt: string;
  inventoryNeeded?: string[];
}

// Mock tasks for operative
const tasks: Task[] = [
  {
    id: "1",
    title: "Broken Door Handle - 2nd Floor WC",
    location: "Level 2 - Men's Washroom",
    priority: "medium",
    status: "in_progress",
    assignedAt: "2026-01-13T08:00:00",
    inventoryNeeded: ["Chrome Door Handle"],
  },
  {
    id: "2",
    title: "Leaking Faucet - Food Court",
    location: "Level 3 - Food Court Washroom",
    priority: "high",
    status: "pending",
    assignedAt: "2026-01-13T10:30:00",
    inventoryNeeded: ["Faucet Washer Kit", "Plumber's Tape"],
  },
  {
    id: "3",
    title: "Replace Light Bulbs - Corridor",
    location: "Level 1 - East Corridor",
    priority: "low",
    status: "pending",
    assignedAt: "2026-01-13T11:00:00",
    inventoryNeeded: ["LED Bulb 60W x3"],
  },
];

const priorityColors = {
  low: "default",
  medium: "info",
  high: "warning",
  critical: "danger",
} as const;

const statusColors = {
  pending: "default",
  in_progress: "warning",
  completed: "success",
} as const;

export default function OpsTasks() {
  const [taskList, setTaskList] = useState(tasks);

  const handleStartTask = (taskId: string) => {
    setTaskList(taskList.map(t => 
      t.id === taskId ? { ...t, status: "in_progress" as const } : t
    ));
  };

  const handleCompleteTask = (taskId: string) => {
    // In real app, would open camera for photo
    alert("Opening camera for completion photo...");
    setTaskList(taskList.map(t => 
      t.id === taskId ? { ...t, status: "completed" as const } : t
    ));
  };

  const pendingTasks = taskList.filter(t => t.status === "pending");
  const inProgressTasks = taskList.filter(t => t.status === "in_progress");
  const completedTasks = taskList.filter(t => t.status === "completed");

  return (
    <OpsLayout userName="John Kamau" userRole="maintenance_operative">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">
          My Tasks
        </h1>
        <p className="text-gray-500 mt-1">
          {taskList.filter(t => t.status !== "completed").length} tasks remaining today
        </p>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card variant="bordered" className="text-center">
          <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 font-display">{pendingTasks.length}</p>
          <p className="text-sm text-gray-500">Pending</p>
        </Card>
        <Card variant="bordered" className="text-center border-amber-200 bg-amber-50/50">
          <ClipboardList className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-amber-600 font-display">{inProgressTasks.length}</p>
          <p className="text-sm text-gray-500">In Progress</p>
        </Card>
        <Card variant="bordered" className="text-center border-emerald-200 bg-emerald-50/50">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-emerald-600 font-display">{completedTasks.length}</p>
          <p className="text-sm text-gray-500">Completed</p>
        </Card>
      </div>

      {/* In Progress */}
      {inProgressTasks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            In Progress
          </h2>
          <div className="space-y-4">
            {inProgressTasks.map((task) => (
              <Card 
                key={task.id} 
                variant="bordered" 
                className="border-amber-200 bg-amber-50/30"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <p className="text-gray-500">{task.location}</p>
                    </div>
                    <Badge variant={priorityColors[task.priority]}>
                      {task.priority}
                    </Badge>
                  </div>

                  {task.inventoryNeeded && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-3 rounded-lg">
                      <Package className="w-4 h-4" />
                      <span>Required: {task.inventoryNeeded.join(", ")}</span>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="success"
                      className="flex-1"
                      onClick={() => handleCompleteTask(task.id)}
                      icon={<Camera className="w-5 h-5" />}
                    >
                      Complete & Take Photo
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Pending Tasks
          </h2>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <Card key={task.id} variant="bordered">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <Badge variant={priorityColors[task.priority]} size="sm">
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{task.location}</p>
                    {task.inventoryNeeded && (
                      <p className="text-sm text-gray-400">
                        Needs: {task.inventoryNeeded.join(", ")}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => handleStartTask(task.id)}
                  >
                    Start Task
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-400 mb-4">
            Completed Today
          </h2>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <Card key={task.id} variant="bordered" className="opacity-60">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 line-through">{task.title}</p>
                    <p className="text-sm text-gray-500">{task.location}</p>
                  </div>
                  <Badge variant="success">Done</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {taskList.length === 0 && (
        <Card variant="bordered" className="text-center py-16">
          <CheckCircle2 className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">All done!</h3>
          <p className="text-gray-500">No tasks assigned. Check back later.</p>
        </Card>
      )}
    </OpsLayout>
  );
}
