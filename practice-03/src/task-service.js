
function isValidId(id) {
  return Number.isSafeInteger(id) && id > 0;
}

function validateTitle(title) {
  if (typeof title !== "string") {
    return { ok: false, error: "Название должно быть строкой" };
  }

  const cleanTitle = title.trim();

  if (cleanTitle.length < 1 || cleanTitle.length > 100) {
    return {
      ok: false,
      error: "Название должно содержать от 1 до 100 символов",
    };
  }

  return { ok: true, title: cleanTitle };
}

function validatePriority(priority) {
  return ["low", "medium", "high"].includes(priority);
}

export function createTask(id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "ID должен быть положительным безопасным целым числом" };
  }

  const titleResult = validateTitle(title);
  if (!titleResult.ok) {
    return titleResult;
  }

  if (!validatePriority(priority)) {
    return { ok: false, error: "Недопустимый приоритет" };
  }

  return {
    ok: true,
    task: {
      id,
      title: titleResult.title,
      completed: false,
      priority,
    },
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  const pending = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return { total, completed, pending, progress };
}

export function addTask(tasks, id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "Некорректный ID" };
  }

  if (tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача с таким ID уже существует" };
  }

  const result = createTask(id, title, priority);
  if (!result.ok) {
    return result;
  }

  return { ok: true, tasks: [...tasks, result.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!isValidId(id)) {
    return { ok: false, error: "Некорректный ID" };
  }

  if (typeof completed !== "boolean") {
    return { ok: false, error: "Статус должен быть true или false" };
  }

  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача не найдена" };
  }

  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed } : task
  );

  return { ok: true, tasks: updatedTasks };
}

export function renameTask(tasks, id, title) {
  if (!isValidId(id)) {
    return { ok: false, error: "Некорректный ID" };
  }

  const titleResult = validateTitle(title);
  if (!titleResult.ok) {
    return titleResult;
  }

  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача не найдена" };
  }

  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, title: titleResult.title } : task
  );

  return { ok: true, tasks: updatedTasks };
}

export function removeTask(tasks, id) {
  if (!isValidId(id)) {
    return { ok: false, error: "Некорректный ID" };
  }

  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача не найдена" };
  }

  return {
    ok: true,
    tasks: tasks.filter((task) => task.id !== id),
  };
}
export function searchTasksByTitle(tasks, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === "") {
    return [...tasks];
  }

  return tasks.filter((task) =>
    task.title.toLowerCase().includes(normalizedQuery)
  );
}