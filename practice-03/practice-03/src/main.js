import { demoTasks, variantTasks } from "./data.js";
import {
  findTaskById,
  getTaskStats,
  setTaskCompleted,
  removeTask,
} from "./task-service.js";
import { getVisibleTasks } from "./task-selectors.js";
import {
  renderTaskList,
  renderSummary,
  renderEmptyState,
} from "./task-view.js";

const initialTasks = new URLSearchParams(window.location.search).get("dataset") === "variant"
  ? variantTasks
  : demoTasks;

let currentTasks = initialTasks.map((task) => ({ ...task }));
let currentFilter = "all";

const listElement = document.querySelector("#task-list");
const summaryElement = document.querySelector("#task-summary");
const emptyMessage = document.querySelector("#empty-message");
const operationMessage = document.querySelector("#operation-message");
const filtersElement = document.querySelector("#task-filters");

function restoreTaskFocus(id, action) {
  const card = listElement.querySelector(`[data-task-id="${id}"]`);
  const button = card?.querySelector(`[data-action="${action}"]`);

  if (button) {
    button.focus();
  } else {
    filtersElement.querySelector(".is-active")?.focus();
  }
}

function renderApp() {
  const visibleTasks = getVisibleTasks(currentTasks, currentFilter);

  renderTaskList(listElement, visibleTasks);
  renderSummary(summaryElement, currentTasks, visibleTasks.length);
  renderEmptyState(emptyMessage, currentTasks.length, visibleTasks.length);

  for (const button of filtersElement.querySelectorAll("[data-filter]")) {
    const active = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

function handleTaskListClick(event) {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("button[data-action]");
  if (!button || !listElement.contains(button)) return;

  const action = button.dataset.action;
  if (action !== "toggle" && action !== "delete") return;

  const card = button.closest("li[data-task-id]");
  if (!card) return;

  const id = Number(card.dataset.taskId);

  if (!Number.isSafeInteger(id) || id <= 0) {
    operationMessage.textContent = "Ошибка: некорректный идентификатор задачи.";
    return;
  }

  let result;

  if (action === "toggle") {
    const task = findTaskById(currentTasks, id);

    if (!task) {
      operationMessage.textContent = "Ошибка: задача не найдена.";
      return;
    }

    result = setTaskCompleted(currentTasks, id, !task.completed);
  } else {
    result = removeTask(currentTasks, id);
  }

  if (!result.ok) {
    operationMessage.textContent = result.error || "Не удалось выполнить действие.";
    return;
  }

  currentTasks = result.tasks;
  operationMessage.textContent = "";
  renderApp();
  restoreTaskFocus(id, action);
}

function handleFilterClick(event) {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("button[data-filter]");
  if (!button || !filtersElement.contains(button)) return;

  const filter = button.dataset.filter;

  if (!["all", "pending", "completed"].includes(filter)) return;

  currentFilter = filter;
  operationMessage.textContent = "";
  renderApp();
}

listElement.addEventListener("click", handleTaskListClick);
filtersElement.addEventListener("click", handleFilterClick);

renderApp();