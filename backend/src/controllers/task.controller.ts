import { Request, Response } from 'express';
import Task from '../models/Task';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get query parameters for filtering
    const { status, priority, assignedTo } = req.query;

    // Build filter object
    const filter: any = {
      createdBy: req.user?.id  // Only get tasks created by this user
    };

    // Add optional filters
    if (status) {
      filter.status = status;
    }
    if (priority) {
      filter.priority = priority;
    }
    if (assignedTo) {
      filter.assignedTo = assignedTo;
    }

    // Get tasks from database
    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email')  // Get user details
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });  // Newest first

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: {
        tasks
      }
    });

  } catch (error: any) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting tasks',
      error: error.message
    });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status, priority, assignedTo, dueDate } = req.body;

    // Validate required fields
    if (!title || !description) {
      res.status(400).json({
        success: false,
        message: 'Please provide title and description'
      });
      return;
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      status: status || 'todo',
      priority: priority || 'medium',
      assignedTo,
      createdBy: req.user?.id,  // Set creator to logged-in user
      dueDate
    });

    // Populate user details
    await task.populate('assignedTo', 'name email');
    await task.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: {
        task
      }
    });

  } catch (error: any) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating task',
      error: error.message
    });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
      return;
    }

    // Check if user has access to this task
    if (task.createdBy._id.toString() !== req.user?.id) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to access this task'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        task
      }
    });

  } catch (error: any) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting task',
      error: error.message
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
      return;
    }

    // Check if user created this task
    if (task.createdBy.toString() !== req.user?.id) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
      return;
    }

    // Update task
    task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,  // Return updated document
        runValidators: true  // Run schema validators
      }
    )
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: {
        task
      }
    });

  } catch (error: any) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating task',
      error: error.message
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
      return;
    }

    // Check if user created this task
    if (task.createdBy.toString() !== req.user?.id) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
      return;
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });

  } catch (error: any) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting task',
      error: error.message
    });
  }
};