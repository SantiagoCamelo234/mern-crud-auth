import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
      user: req.user.id, // Obtenemos todas las tareas que estan relacionadas con el usuario logueado
    }).populate('user'); // Trae toda la informacion del usuario 
    res.json(tasks)
};
export const createTask = async (req, res) => {
    const {title, description, date} = req.body
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id // Mandamos el de la  referencia desde el authRequired (token)
    })

    const savedTask = await newTask.save()
    res.json(savedTask)
};
export const getTask = async (req, res) => {
    const {id} = req.params
    const task = await Task.findById(id)
    if(!task) return res.status(404).json({message: 'Task not found'})
    res.json(task)
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.sendStatus(200)
};
export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(id, req.body, {
        new: true // Devuelve el dato con los cambios ya aplicados
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
};

