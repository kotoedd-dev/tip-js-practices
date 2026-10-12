"use strict";

const totalTasks = 7;
const completedTasks = 2;
const dailyLimit = 3;
let errorMsg;

if (
    typeof totalTasks !== 'number' || typeof completedTasks !== 'number' || typeof dailyLimit !== 'number' ||
    Number.isNaN(totalTasks) || Number.isNaN(completedTasks) || Number.isNaN(dailyLimit)
) {
    errorMsg = "Ошибка: недопустимое числовое значение или передана строка.";
} else if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks) || !Number.isInteger(dailyLimit)) {
    errorMsg = "Ошибка: дробное количество или дробная дневная норма.";
} else if (totalTasks < 0 || completedTasks < 0) {
    errorMsg = "Ошибка: отрицательное количество.";
} else if (totalTasks > 1001 || dailyLimit < 1 || dailyLimit > 1000) { 
    errorMsg = "Ошибка: превышена верхняя/нижняя граница нормы.";
} else if (totalTasks < completedTasks) {
    errorMsg = "Ошибка: некорректное число выполненных задач.";
}

if (errorMsg) {
    console.log(errorMsg);
} else {
    let remainingTasks = totalTasks - completedTasks;
    console.log("Осталось задач:", remainingTasks);

    if (remainingTasks === 0) {
        console.log("Потребуется дней: 0");
    } else {
        let day = 0;

        while (remainingTasks > 0) {
            day++; 
            let tasksDoneToday = Math.min(dailyLimit, remainingTasks);
            remainingTasks -= tasksDoneToday;
            
            console.log(`День ${day}: выполнено ${tasksDoneToday}, осталось ${remainingTasks}`);
        }

        console.log("Потребуется дней:", day);
    }
}