import { getTaskStats } from "./task-service.js";

const priorityLabels = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
};

export function createTaskElement(task) {
  const card = document.createElement("li");
  card.classList.add("task-card");
  card.dataset.taskId = String(task.id);

  if (task.completed) {
    card.classList.add("is-completed");
  }

  const title = document.createElement("h3");
  title.classList.add("task-title");
  title.textContent = task.title;

  const status = document.createElement("p");
  status.classList.add("task-status");
  status.textContent = task.completed ? "Выполнена" : "В работе";

  const priority = document.createElement("p");
  priority.classList.add("task-priority");
  priority.textContent = priorityLabels[task.priority] ?? "Не указан";

  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.dataset.action = "toggle";
  toggleButton.setAttribute("aria-pressed", String(task.completed));

  const toggleLabel = document.createElement("span");
  toggleLabel.classList.add("action-label");
  toggleLabel.textContent = "Выполнена";
  toggleButton.append(toggleLabel);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";

  const deleteLabel = document.createElement("span");
  deleteLabel.classList.add("action-label");
  deleteLabel.textContent = "Удалить";
  deleteButton.append(deleteLabel);

  actions.append(toggleButton, deleteButton);
  card.append(title, status, priority, actions);

  return card;
}

export function renderTaskList(listElement, tasks) {
  const cards = tasks.map(createTaskElement);
  listElement.replaceChildren(...cards);
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  const stats = getTaskStats(tasks);

  const values = {
    total: stats.total,
    completed: stats.completed,
    pending: stats.pending,
    progress: `${Number(stats.progress).toFixed(1)}%`,
    visible: visibleCount,
  };

  for (const [name, value] of Object.entries(values)) {
    const element = summaryElement.querySelector(
      `[data-stat="${name}"]`
    );

    if (element) {
      element.textContent = String(value);
    }
  }
}

export function renderEmptyState(messageElement, total, visibleCount) {
  if (visibleCount > 0) {
    messageElement.textContent = "";
    messageElement.hidden = true;
    return;
  }

  messageElement.textContent =
    total === 0
      ? "Список задач пуст."
      : "Нет задач по выбранному фильтру.";

  messageElement.hidden = false;
}