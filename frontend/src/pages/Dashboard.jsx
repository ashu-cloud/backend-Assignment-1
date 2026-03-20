import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import { PlusCircle, Trash, LogOut, Edit } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [editingTaskId, setEditingTaskId] = useState(null);
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
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    try {
      if (editingTaskId) {
        await api.put(`/tasks/${editingTaskId}`, { title, description, status });
        setSuccess('Task updated successfully!');
        setEditingTaskId(null);
      } else {
        await api.post('/tasks', { title, description });
        setSuccess('Task created successfully!');
      }
      setTitle('');
      setDescription('');
      setStatus('pending');
      fetchTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleEditInit = (task) => {
    setEditingTaskId(task.id || task._id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setTitle('');
    setDescription('');
    setStatus('pending');
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id && task._id !== id));
      setSuccess('Task deleted!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
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

        <form onSubmit={handleSubmitTask} className={`mb-8 rounded-xl border p-6 shadow-sm transition-colors duration-300 ${editingTaskId ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200 bg-white'}`}>
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            {editingTaskId ? 'Edit Task' : 'Add New Task'}
          </h2>
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
            
            {editingTaskId && (
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="rounded-md border border-gray-300 p-2.5 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            )}

            <button type="submit" className={`flex items-center justify-center gap-2 rounded-md px-6 py-2.5 font-medium text-white shadow-sm transition ${editingTaskId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {editingTaskId ? 'Update Task' : <><PlusCircle size={18} /> Add Task</>}
            </button>
            
            {editingTaskId && (
               <button type="button" onClick={cancelEdit} className="flex items-center justify-center rounded-md bg-gray-200 px-4 py-2.5 font-medium text-gray-700 shadow-sm hover:bg-gray-300 transition">
                 Cancel
               </button>
            )}
          </div>
        </form>

        <div className="grid gap-4">
          {tasks.map(task => (
             <div key={task.id || task._id} className={`group flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md ${editingTaskId === (task.id || task._id) ? 'border-orange-300 ring-2 ring-orange-100' : 'border-gray-200 hover:border-blue-200'}`}>
               <div>
                 <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                 <p className="mt-1 text-gray-600">{task.description}</p>
                 <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-sm ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                 }`}>
                   {task.status.replace('_', ' ').toUpperCase()}
                 </span>
               </div>
               <div className="flex gap-2">
                 <button onClick={() => handleEditInit(task)} title="Edit Task" className="rounded-full p-2 text-gray-400 transition hover:bg-orange-50 hover:text-orange-500">
                   <Edit size={20} />
                 </button>
                 <button onClick={() => handleDelete(task.id || task._id)} title="Delete Task" className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500">
                   <Trash size={20} />
                 </button>
               </div>
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
