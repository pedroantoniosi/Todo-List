"use client";

import { useEffect, useState } from "react";

import { getTasks } from "@/components/dashboard/api";
import CreateTaskModal from "@/components/dashboard/CreateTaskModal";
import EditTaskModal from "@/components/dashboard/EditTaskModal";
import Filters from "@/components/dashboard/Filters";
import Header from "@/components/dashboard/Header";
import MessageModal from "@/components/dashboard/ui/MenssageModal";
import Navbar from "@/components/dashboard/Navbar";
import Searchbar from "@/components/dashboard/ui/Searchbar";
import Status from "@/components/dashboard/Status";
import Task from "@/components/dashboard/Task";
import SettingsModal from "@/components/dashboard/SettingsModal";
import Container from "@/components/ui/Container";

interface TaskData {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

type MessageType = "success" | "error" | "warning" | "info";

export default function Dashboard() {
  const [tasks, setTasks] = useState<TaskData[]>([]);

  const [activeStatus, setActiveStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("info");

  function showMessage(message: string, type: MessageType = "info") {
    setMessage(message);
    setMessageType(type);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    getTasks(token)
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar tarefas:", error);

        showMessage("Não foi possível carregar suas tarefas.", "error");
      });
  }, []);

  function handleEditTask(task: TaskData) {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  }

  async function handleToggleComplete(task: TaskData) {
    const token = localStorage.getItem("token");

    if (!token) {
      showMessage("Usuário não autenticado.", "warning");

      return;
    }

    const previousCompleted = task.completed;
    const newCompleted = !previousCompleted;

    // Atualização otimista da interface
    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === task.id
          ? {
              ...currentTask,
              completed: newCompleted,
            }
          : currentTask,
      ),
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: newCompleted,
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(data.message || "Erro ao atualizar status da tarefa.");
      }
    } catch (error) {
      // Rollback caso a API falhe
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === task.id
            ? {
                ...currentTask,
                completed: previousCompleted,
              }
            : currentTask,
        ),
      );

      console.error("Erro ao alterar status da tarefa:", error);

      showMessage("Não foi possível atualizar o status da tarefa.", "error");
    }
  }

  const filteredTasks = tasks
    .filter((task) => {
      const matchesStatus =
        activeStatus === "all" ||
        (activeStatus === "completed" && task.completed) ||
        (activeStatus === "pending" && !task.completed);

      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const taskDate = new Date(task.createdAt);

      const matchesStartDate =
        !startDate || taskDate >= new Date(`${startDate}T00:00:00`);

      const matchesEndDate =
        !endDate || taskDate <= new Date(`${endDate}T23:59:59`);

      return (
        matchesStatus && matchesSearch && matchesStartDate && matchesEndDate
      );
    })
    .sort((a, b) => {
      if (sortOrder === "az") {
        return a.title.localeCompare(b.title);
      }

      if (sortOrder === "za") {
        return b.title.localeCompare(a.title);
      }

      if (sortOrder === "recent") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      return 0;
    });

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <Navbar
        onOpenFilters={() => setIsFiltersModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      <div className="w-full py-24">
        <Container>
          <Header
            totalTasks={tasks.length}
            onCreateTask={() => setIsCreateModalOpen(true)}
            onOpenFilters={() => setIsFiltersModalOpen(true)}
            hasActiveFilters={
              Boolean(sortOrder) || Boolean(startDate) || Boolean(endDate)
            }
          />

          <Searchbar value={searchTerm} onChange={setSearchTerm} />

          <Status onStatusChange={setActiveStatus} />

          <div
            id="dashboardField"
            className="flex flex-col gap-4 bg-[#F9FAFE] p-8"
          >
            {filteredTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                completed={task.completed}
                onEdit={() => handleEditTask(task)}
                onToggleComplete={() => handleToggleComplete(task)}
              />
            ))}
          </div>
        </Container>
      </div>

      {isCreateModalOpen && (
        <CreateTaskModal
          onClose={() => setIsCreateModalOpen(false)}
          onTaskCreated={(createdTask) => {
            setTasks((currentTasks) => [createdTask, ...currentTasks]);

            showMessage("Tarefa criada com sucesso.", "success");
          }}
        />
      )}

      {isEditModalOpen && selectedTask && (
        <EditTaskModal
          taskId={selectedTask.id}
          title={selectedTask.title}
          description={selectedTask.description}
          onClose={handleCloseEditModal}
          onTaskUpdated={(updatedTask) => {
            setTasks((currentTasks) =>
              currentTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task,
              ),
            );

            showMessage("Tarefa atualizada com sucesso.", "success");
          }}
          onTaskDeleted={(deletedTaskId) => {
            setTasks((currentTasks) =>
              currentTasks.filter((task) => task.id !== deletedTaskId),
            );

            showMessage("Tarefa removida com sucesso.", "success");
          }}
        />
      )}

      {isFiltersModalOpen && (
        <Filters
          sortOrder={sortOrder}
          startDate={startDate}
          endDate={endDate}
          onApply={(newSortOrder, newStartDate, newEndDate) => {
            setSortOrder(newSortOrder);
            setStartDate(newStartDate);
            setEndDate(newEndDate);
          }}
          onClose={() => setIsFiltersModalOpen(false)}
        />
      )}

      <SettingsModal
        open={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      {message && (
        <MessageModal
          message={message}
          type={messageType}
          onClose={() => setMessage("")}
        />
      )}
    </div>
  );
}
