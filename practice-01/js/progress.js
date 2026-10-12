"use strict";

const totalTasks = 7;
const completedTasks = 2;
const progress = (completedTasks / totalTasks * 100).toFixed(1);
const leftTasks = totalTasks - completedTasks;

let status;
let errorMsg;

if (typeof totalTasks !== 'number' || typeof completedTasks !== 'number' || Number.isNaN(totalTasks) || Number.isNaN(completedTasks)) {
    errorMsg = "Ошибка: недопустимое числовое значение или передана строка"
} else if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
    errorMsg = "Ошибка: дробное количество"
} else if (totalTasks < 0 || completedTasks < 0) {
    errorMsg = "Ошибка: отрицательное число"
} else if (totalTasks >= 1001 || completedTasks >= 1001 ) {
    errorMsg = "Ошибка: превышена верхняя граница"
} else if (totalTasks < completedTasks) {
    errorMsg = "Ошибка: выполнено больше, чем существует."
}
if (errorMsg) {
    console.log(errorMsg)
} else {
    if (totalTasks == 0 && completedTasks == 0) {
        status = 'Задач пока нет'
        progress == 0
        console.log("«Задач пока нет», без расчёта процента.")
    }
    else if(totalTasks > 1 && completedTasks == 0) {
        status = 'Не начато'
    }
    else if(totalTasks >= 1 && completedTasks >= 1) {
        status = 'В работе'
    }
    else if(totalTasks >= 1 && completedTasks >= 1 && totalTasks == completedTasks) {
        status = 'Завершено'
    }
    

    console.log("Всего задач: ", totalTasks)
    console.log("Выполнено: ", completedTasks)
    console.log("Осталось: ", leftTasks)
    console.log("Прогресс: ", progress, "%")
    console.log("Статус: ", status)
}