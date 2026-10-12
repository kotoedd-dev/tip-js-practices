// Заготовка модуля. throw ниже отмечает отсутствие реализации,
// а не способ обработки некорректных данных в готовом решении.
// Для предусмотренных ошибок необходимо возвращать { ok: false, error: "..." }.
// console.log(), prompt(), document и чтение внешнего состояния здесь не нужны.

export function createTask(id, title, priority = "medium") {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return { ok: false, error: "ID должен быть положительным безопасным целым числом" };
  }

  if (typeof title !== "string") {
    return { ok: false, error: "Название должно быть строкой" };
  }

  const cleanTitle = title.trim();

  if (cleanTitle.length < 1 || cleanTitle.length > 100) {
    return { ok: false, error: "Название должно содержать от 1 до 100 символов" };
  }

  if (!["low", "medium", "high"].includes(priority)) {
    return { ok: false, error: "Недопустимый приоритет" };
  }

  return {
    ok: true,
    task: {
      id,
      title: cleanTitle,
      completed: false,
      priority,
    },
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => !task.completed);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : (completed / total) * 100;

  return {
    total,
    completed,
    pending,
    progress,
  };
}

export function addTask(tasks, id, title, priority = "medium") {
  if (tasks.some((task) => task.id === id)) {
    return {
      ok: false,
      error: "Задача с таким id уже существует",
    };
  }

  const result = createTask(id, title, priority);

  if (!result.ok) {
    return result;
  }

  return {
    ok: true,
    tasks: [...tasks, result.task],
  };
}

export function setTaskCompleted(tasks, id, completed) {
  if (typeof completed !== "boolean") {
    return {
      ok: false,
      error: "Статус completed должен быть boolean",
    };
  }

  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return {
      ok: false,
      error: "Задача с таким id не найдена",
    };
  }

  const next = tasks.map((task) =>
    task.id === id ? { ...task, completed } : task
  );

  return {
    ok: true,
    tasks: next,
  };
}

export function renameTask(tasks, id, title) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return {
      ok: false,
      error: "Задача с таким id не найдена",
    };
  }

  if (typeof title !== "string") {
    return {
      ok: false,
      error: "Название должно быть строкой",
    };
  }

  const cleanTitle = title.trim();

  if (cleanTitle.length < 1 || cleanTitle.length > 100) {
    return {
      ok: false,
      error: "Название должно содержать от 1 до 100 символов",
    };
  }

  const next = tasks.map((task) =>
    task.id === id ? { ...task, title: cleanTitle } : task
  );

  return {
    ok: true,
    tasks: next,
  };
}


export function removeTask(tasks, id) {
  const exists = tasks.some((task) => task.id === id);

  if (!exists) {
    return {
      ok: false,
      error: "Задача с таким id не найдена",
    };
  }

  return {
    ok: true,
    tasks: tasks.filter((task) => task.id !== id),
  };
}