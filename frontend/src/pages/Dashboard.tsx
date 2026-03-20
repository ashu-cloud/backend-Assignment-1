import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Trash, LogOut } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err: any) {
      setError('Failed to fetch tasks');
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description });
      setTitle('');
      setDescription('');
      setSuccess('Task created successfully!');
      fetchTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      setSuccess('Task deleted!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete task');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">Task Dashboard</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="font-medium text-gray-600">
              Welcome, <span className="text-gray-900">{user?.email}</span> ({user?.role})
            </span>
            <button onClick={handleLogout} className="flex items-center gap-2 rounded-md bg-white border border-gray-300 px-4 py-2 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600 shadow-sm">{error}</div>}
        {success && <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-600 shadow-sm">{success}</div>}

        <form onSubmit={handleCreateTask} className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Add New Task</h2>
          <div className="flex flex-col gap-4 md:flex-row">
            <input 
              type="text" 
              placeholder="Task Title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              className="flex-1 rounded-md border border-gray-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
            />
            <input 
              type="text" 
              placeholder="Description" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              required 
              className="flex-1 rounded-md border border-gray-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
            />
            <button type="submit" className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700">
              <PlusCircle size={18} /> Add Task
            </button>
          </div>
        </form>

        <div className="grid gap-4">
          {tasks.map(task => (
             <div key={task.id} className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
               <div>
                 <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                 <p className="mt-1 text-gray-600">{task.description}</p>
                 <span className="mt-3 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 shadow-sm">
                   {task.status.replace('_', ' ')}
                 </span>
               </div>
               <button onClick={() => handleDelete(task.id)} title="Delete Task" className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500">
                 <Trash size={20} />
               </button>
             </div>
          ))}
          {tasks.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
              No tasks found. Create one above to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
