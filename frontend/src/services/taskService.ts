import api from './api';
import type {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TaskFilters,
  ApiResponse,
  TasksResponse
} from '../types';

// Get all tasks (with optional filters)
export const getTasks = async (filters?: TaskFilters): Promise<Task[]> => {
  const params = new URLSearchParams();
  
  if (filters?.status) params.append('status', filters.status);
  if (filters?.priority) params.append('priority', filters.priority);
  if (filters?.assignedTo) params.append('assignedTo', filters.assignedTo);
  
  const response = await api.get<ApiResponse<TasksResponse>>(
    `/tasks?${params.toString()}`
  );
  
  return response.data.data!.tasks;
};

// Get single task
export const getTask = async (id: string): Promise<Task> => {
  const response = await api.get<ApiResponse<{ task: Task }>>(
    `/tasks/${id}`
  );
  return response.data.data!.task;
};

// Create new task
export const createTask = async (data: CreateTaskData): Promise<Task> => {
  const response = await api.post<ApiResponse<{ task: Task }>>(
    '/tasks',
    data
  );
  return response.data.data!.task;
};

// Update task
export const updateTask = async (
  id: string,
  data: UpdateTaskData
): Promise<Task> => {
  const response = await api.put<ApiResponse<{ task: Task }>>(
    `/tasks/${id}`,
    data
  );
  return response.data.data!.task;
};

// Delete task
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};