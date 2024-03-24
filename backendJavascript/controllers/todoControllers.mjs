import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel.mjs";
import User from "../models/userModel.mjs";

const createTodo = asyncHandler(async (req, res) => {
  const { title, desc, isCompleted, isStarred, isDateTimePickerEnabled, deadline } = req.body;
  
  try {
    const newTodo = new Todo({
      title,
      desc,
      isCompleted: isCompleted || false,
      isStarred: isStarred || false,
      isDateTimePickerEnabled: isDateTimePickerEnabled || false,
      deadline: deadline || undefined,
      user: req.user,
    });
    await newTodo.save();
    res.status(201).json({ message: "Todo created successfully" });
    const user = await User.find({user: req.user});
    sendEmailDeadlineReminder(user.email, title, desc, deadline);
    sendEmailDeadlineExceed(user.email, title, desc, deadline);
  } catch (error) {
    res.status(400).json({ err: "Server Error" });
  }
});

const fetchTodos = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.find({user: req.user});
    res.status(200).json({ todo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "Server Error" });
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      desc,
      isCompleted,
      isStarred,
      isDateTimePickerEnabled,
      deadline,
    } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(400).json({ error: "Todo does not exist." });
    }
    todo.title = title;
    todo.desc = desc;
    todo.isCompleted = isCompleted;
    todo.isStarred = isStarred;
    todo.isDateTimePickerEnabled = isDateTimePickerEnabled;
    todo.deadline = deadline;

    const isChanged = todo.isModified();
    if (!isChanged) {
      res.status(204).send();
      return;
    }
    if(todo.deadline != deadline) {
      const user = await User.find({user: req.user});
      sendEmailDeadlineReminder(user.email, title, desc, deadline);
      sendEmailDeadlineExceed(user.email, title, desc, deadline);
    }

    todo.createdAt = Date.now();
    await todo.save();
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(400).json({ err: "Server Error" });
  }
});

const toggleCompletedStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(400).json({ error: "Todo does not exist." });
    }
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(400).json({ err: "Server Error" });
  }
});

const toggleStarredStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    console.log(todo);
    if (!todo) {
      return res.status(400).json({ error: "Todo does not exist." });
    }
    todo.isStarred = !todo.isStarred;
    await todo.save();
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(400).json({ err: "Server Error" });
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id });
    if (!todo) {
      return res.status(400).json({ error: "Todo does not exist." });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ err: "Server Error" });
  }
});

export default {
  createTodo,
  fetchTodos,
  updateTodo,
  toggleCompletedStatus,
  toggleStarredStatus,
  deleteTodo,
};
