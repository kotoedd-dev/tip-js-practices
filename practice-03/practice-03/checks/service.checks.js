import assert from "node:assert/strict";
import {
  demoTasks,
  variantTasks,
} from "../src/data.js";
import {
  findTaskById,
  getTaskStats,
  setTaskCompleted,
  removeTask,
} from "../src/task-service.js";

let passed = 0;

function test(name, callback) {
  try {
    callback();
    passed++;
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(error);
    process.exitCode = 1;
  }
}

test("Демонстрационный набор содержит задачи", () => {
  assert.ok(demoTasks.length > 0);
});

test("Набор своего варианта содержит задачи", () => {
  assert.ok(variantTasks.length > 0);
});

test("ID задач уникальны в демонстрационном наборе", () => {
  const ids = demoTasks.map((task) => task.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("Можно найти существующую задачу", () => {
  assert.ok(findTaskById(demoTasks, demoTasks[0].id));
});

test("Несуществующая задача не находится", () => {
  assert.equal(findTaskById(demoTasks, -999), undefined);
});

test("Статистика содержит общее количество задач", () => {
  const stats = getTaskStats(demoTasks);
  assert.equal(stats.total, demoTasks.length);
});

test("Статистика правильно считает выполненные задачи", () => {
  const stats = getTaskStats(demoTasks);
  assert.equal(
    stats.completed,
    demoTasks.filter((task) => task.completed).length
  );
});

test("Статистика правильно считает невыполненные задачи", () => {
  const stats = getTaskStats(demoTasks);
  assert.equal(
    stats.pending,
    demoTasks.filter((task) => !task.completed).length
  );
});

test("Можно изменить статус задачи", () => {
  const task = demoTasks[0];
  const result = setTaskCompleted(
    demoTasks,
    task.id,
    !task.completed
  );
  assert.equal(result.ok, true);
});

test("Изменение статуса не меняет исходный массив", () => {
  const original = demoTasks.map((task) => ({ ...task }));
  setTaskCompleted(
    demoTasks,
    demoTasks[0].id,
    !demoTasks[0].completed
  );
  assert.deepEqual(demoTasks, original);
});

test("Можно удалить существующую задачу", () => {
  const result = removeTask(demoTasks, demoTasks[0].id);
  assert.equal(result.ok, true);
  assert.equal(result.tasks.length, demoTasks.length - 1);
});

test("Удаление не меняет исходный массив", () => {
  const original = demoTasks.map((task) => ({ ...task }));
  removeTask(demoTasks, demoTasks[0].id);
  assert.deepEqual(demoTasks, original);
});

console.log(`\nПройдено тестов: ${passed}`);