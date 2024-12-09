// подключаем массивы с данными из отдельных файлов
import { diseas } from "./massives/disease.js";
import profession from "./massives/profession.js";
import nameMass from "./massives/name.js";

// Создаем объект для нашего персонажа, в него будем записывать храктеристики
let person = {
    name: null,
    age: null,
    profession: null,
    hobby: null,
    work_experience: null,
    fears: null,
    fertility: null,
    healthy: null,

}

// обращаемся к нужным элементам
// к кнопке
let createCharacter = document.getElementById('create-character')
// к заголовку
let title = document.querySelector('.main-title')
// к секции с персонажем
let personEl = document.querySelector('.person')

// Пишем отдельную функция для вычисления случайного числа
function Random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
// тут получаем все характеристики персонажа в одном массиве
let personItems = document.querySelectorAll('.person-item')

// Создаем отдельную функцию для генерации, нужна, чтобы не засорять код
function Generate() {
    // выбираем из массива случайным образом имя
    person.name = nameMass[Random(0, nameMass.length)]
    // также случайно вычисляем возраст
    person.age = Random(10, 85)
    // здесь записана логика вычисления опыта работы и профессии
    // если возраст больше 18, то у него может быть профессия
    if (person.age > 18) {
        person.profession = profession[Random(0, profession.length)]
        person.work_experience = Random(0, person.age / 1.2)
    }
    else {
        person.profession = "Безработный"
        person.work_experience = "нет"
    }
    // вычисляем вероятность остаться здоровым
    // шанс 50 на 50, если выпадает 1,то здоров, если 2, то выбираем случайное заболевание и записываем
    let hel = Random(1, 3);
    console.log(hel);
    if (hel === 1) {
        person.healthy = "Здоров"
    }
    else {
        person.healthy = diseas[Random(0, diseas.length)]
    }
    // каждому элементу person-item записываем текст с полем нашего объекта с самого начала

    personItems[0].innerHTML = `Имя: ${person.name}`
    personItems[1].innerHTML = `Возраст: ${person.age}`
    personItems[2].innerHTML = `Профессия: ${person.profession}`
    personItems[3].innerHTML = `Стаж работы: ${person.work_experience}`
    personItems[4].innerHTML = `Здоровье: ${person.healthy}`
}


// отслеживаем нажатие на кнопку 
createCharacter.onclick = () => {
    // делаем заголовок прозрачным
    title.style.opacity = 0
    setTimeout(() => {
        // скрываем заголовок
        title.style.display = 'none'
        // задаем секции тип отображения flex
        personEl.style.display = 'flex'
        // Ждем 100 милисекунд и делаем секцию непрозрачным, и запускаем функцию генерации
        setTimeout(() => {
            personEl.style.opacity = 100
            person.name = nameMass[0]
            Generate()
        }, 100);
    }, 500);
}


// получаем элементы управления музыкой
let radio = document.querySelector('.music')
let music = document.querySelector('audio')
let control_range = document.querySelector('.range')
// создаем переменную, которая хранит состояние, запущена ли музыка
let isPlay = false
// делаем начальную громкость 20%

// ВНИМАНИЕ! input range имеет диапазон от 0 до 100 по умолчанию, а звук принимаем значение
// от 0 до 1. Для их стыковки умножаем музыку на 100 или значение инпута делим на 100
music.volume = 0.2
control_range.value = music.volume * 100

// навешиваем слушатель событий 'input' и указываем стрелочную функцию
// т.е дергаем ползунок => запускаем код
control_range.addEventListener('input', () => {

    music.volume = control_range.value / 100
    console.log(control_range.value);
})

// отслеживаем нажатие на кнопку звука, если звук включен => выключаем, иначе => включаем 
radio.onclick = () => {
    if (isPlay) {
        music.pause()
        console.log('Остановили');
        isPlay = false
    } else {
        music.play()
        console.log('Запустили');
        isPlay = true
    }
}

// Зацикливаем музыку, чтобы через 5000 секунд она запускалась снова.
// Для этого каждую секунду отслеживаем равно ли текущее время, общей длительности музыки
setInterval(() => {
    if (music.duration == music.currentTime) {
        music.currentTime = 0
        setTimeout(() => {
            music.play()
            console.log("Запустили снова");
        }, 5000)
    }
}, 1000);


/*
Имя
Возраст
Профессия
Хобби
Стаж работы
Страхи
Плодовитость
Что по здоровью
*/



let massOkon = ["а", "и", "я", "ия", "ь"]
let manOkon = ["ас", "ик", "иг", "ан", "ай", "ис", "аз", "ьб", "ад", "ар", "ий"]
function checkGender(name) {
    let isWoman = false
    for (const okon of massOkon) {
        if (name.includes(okon, name.length - 2)) {
            isWoman = true
            break
        }
    }
    for (const okon of manOkon) {
        if (name.includes(okon, name.length - 2)) {
            isWoman = false
            break
        }
    }
    return isWoman ? "женское" : "мужское"
}
