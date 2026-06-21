import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createTask,
  deleteTask,
  getHealth,
  getTasks,
  updateTask,
} from "../services/api";

import api from "../services/api";
import avatar1 from "../assets/avatar/avatar1.png.jpg";

const STATUS_OPTIONS = ["pending", "in-progress", "completed"];
const priorityOptions = ["low", "medium", "high"];

function Dashboard() {
  const navigate = useNavigate();

  const [apiStatus, setApiStatus] = useState("checking");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const showSuccess = (msg) => {
    setSuccess(msg);
    setError("");
    setTimeout(() => setSuccess(""), 3000);
  };

  const showError = (msg) => {
    setError(msg);
    setSuccess("");
    setTimeout(() => setError(""), 3000);
  };

  const loadTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
      setError("");
    } catch {
      showError("Could not load tasks. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await api.get("/auth/me");

        getHealth()
          .then(() => setApiStatus("connected"))
          .catch(() => setApiStatus("disconnected"));

        loadTasks();
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/", { replace: true });
      }
    };

    verifyUser();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showError("Task title cannot be empty");
      return;
    }

    try {
      await createTask({ title: title.trim(), dueDate: dueDate || undefined });
      setTitle("");
      setDueDate("");
      await loadTasks();
      showSuccess("Task created successfully");
    } catch {
      showError("Failed to create task");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateTask(id, { status });
      await loadTasks();
      showSuccess(`Status updated to "${status}"`);
    } catch {
      showError("Failed to update status");
    }
  };

  const handlePriorityChange = async (id, priority) => {
    try {
      await updateTask(id, { priority });
      await loadTasks();
      showSuccess(`Priority updated to "${priority}"`);
    } catch {
      showError("Failed to update priority");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks();
      showSuccess("Task deleted");
    } catch {
      showError("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      showError("Task title cannot be empty");
      return;
    }

    try {
      await updateTask(editingTask._id, { title: editTitle.trim(), dueDate: editDueDate });
      setEditingTask(null);
      setEditTitle("");
      setEditDueDate("");
      await loadTasks();
      showSuccess("Task updated successfully");
    } catch (err) {
      console.error(err);
      showError("Failed to update task");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      showSuccess("Logout Successful!");
      setTimeout(() => navigate("/", { replace: true }), 1000);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      showSuccess("Logout Successful!");
      setTimeout(() => navigate("/", { replace: true }), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              CRM Task Manager
            </h1>
            <p className="text-sm text-slate-500">Basic MERN stack setup</p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                apiStatus === "connected"
                  ? "bg-emerald-100 text-emerald-700"
                  : apiStatus === "disconnected"
                  ? "bg-red-100 text-red-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              API {apiStatus}
            </span>

            <div className="relative">
              <img
                src={avatar1}
                alt="avatar"
                onClick={() => setShowMenu(!showMenu)}
                className="h-10 w-10 rounded-full border-2 border-indigo-500 object-cover cursor-pointer"
              />

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg z-50">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full px-4 py-2 text-left hover:bg-slate-100"
                  >
                     My Profile
                     </button>
                  <button className="block w-full px-4 py-2 text-left hover:bg-slate-100">
                    Change Avatar
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">

        {/* Success Alert */}
        {success && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            <span>✅</span>
            <span>{success}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="mb-8 flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task title..."
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-700"
          >
            Add Task
          </button>
        </form>

        {editingTask && (
          <div className="mb-4 rounded-lg bg-white p-4 shadow border">
            <h3 className="mb-3 font-semibold">Edit Task</h3>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="rounded bg-green-600 px-4 py-2 text-white"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingTask(null);
                  setEditTitle("");
                  setEditDueDate("");
                }}
                className="rounded bg-gray-500 px-4 py-2 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center text-slate-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500">
            No tasks yet. Add one above to get started.
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                <div>
                  <p className="font-medium text-slate-900">{task.title}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span>Priority:</span>
                    <select
                      value={task.priority}
                      onChange={(e) =>
                        handlePriorityChange(task._id, e.target.value)
                      }
                      className="rounded border border-slate-300 px-2 py-1 text-sm"
                    >
                      {priorityOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>

                    {task.dueDate && (
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value)
                    }
                    className="rounded border border-slate-300 px-2 py-1 text-sm"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => handleEdit(task)}
                    className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(task._id)}
                    className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default Dashboard;