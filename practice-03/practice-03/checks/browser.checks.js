const results = [];

function check(name, callback) {
  try {
    callback();
    results.push({ name, passed: true });
  } catch (error) {
    results.push({
      name,
      passed: false,
      error: error.message,
    });
  }
}

function runChecks() {
  check("На странице есть список задач", () => {
    if (!document.querySelector("#task-list")) {
      throw new Error("Не найден #task-list");
    }
  });

  check("На странице есть статистика", () => {
    if (!document.querySelector("#task-summary")) {
      throw new Error("Не найден #task-summary");
    }
  });

  check("Есть три фильтра", () => {
    if (document.querySelectorAll("#task-filters [data-filter]").length !== 3) {
      throw new Error("Количество фильтров не равно 3");
    }
  });

  check("Карточки задач отображаются", () => {
    if (document.querySelectorAll("#task-list li").length === 0) {
      throw new Error("Карточки задач не найдены");
    }
  });

  check("Есть сообщение для пустого списка", () => {
    if (!document.querySelector("#empty-message")) {
      throw new Error("Не найден #empty-message");
    }
  });

  console.table(results);
  console.log(
    `Пройдено: ${results.filter((item) => item.passed).length}; ` +
    `ошибок: ${results.filter((item) => !item.passed).length}`
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runChecks);
} else {
  runChecks();
}