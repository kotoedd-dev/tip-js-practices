import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  createTask,
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

console.log(`ПР2 | Вариант: ${variantNumber}`);

let currentTasks = demoTasks;

// Вспомогательный чейнер для лаконичности
const Сheck = (result) => {
  if (result.ok) currentTasks = result.tasks;
  else console.log(`[ОТКАЗ]: ${result.error}`);
  const s = getTaskStats(currentTasks);
  console.log(`Всего: ${s.total} | Вып: ${s.completed} | Ост: ${s.pending} | Прогресс: ${s.progress.toFixed(1)}%`);
};

console.log("1. Исходный набор:");
Сheck({ ok: true, tasks: currentTasks });
console.log("2. Добавление id = 20:");
Сheck(addTask(currentTasks, 20, "Добавить проверку", "high"));
console.log("3. Выполнение id = 4:");
Сheck(setTaskCompleted(currentTasks, 4, true));
console.log("4. Переименование id = 10:");
Сheck(renameTask(currentTasks, 10, "Подготовить инструкцию запуска"));
console.log("5. Удаление id = 7:");
Сheck(removeTask(currentTasks, 7));
console.log("6. Тест ошибки (дубликат ID):");
Сheck(addTask(currentTasks, 20, "Повтор", "low"));
console.log(`Исходный demoTasks без изменений: ${demoTasks.length} задач.`);