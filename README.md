# Шаблон для старта

Исходники - в директории `frontend`, результат сборки - в `public`.

- В корне проекта `npm i`, чтобы установить зависимости.
- `npm run dev` - режим разработки (`http://localhost:3000`).
- `npm run prod` - сборка для продакшена.

## CSS

Используется Sass, normalize.css, autoprefixer, fontello. Собирается из директории `/frontend/styles`. Все sass и scss файлы внутри являются входными точками, кроме тех, что расположены в `frontend/styles/includes`.

### Fontello
С помощью этого сервиса можно генерировать iconic-шрифты (а том числе и из любого SVG).

#### Создать свой сет

1. Идем на http://fontello.com ;
2. Выбираем нужные иконки;
3. В выпадашечке справа от кнопки «Download webfont» надо выбрать «Get config only»;
4. Скачанный json-файл надо поместить (заменить существующий) в `/frontend/styles/includes/fontello` ;
5. Запустить команду `npm run icogen` для генерации иконок;
6. В стилях подключить `/frontend/styles/includes/fontello/css/fontello.css` ;
7. Использовать иконку можно так: `<i class="icon-emo-beer"><i>` ;

#### Отредактировать сет

1. `npm run icoopen` - выбранный ранее сет иконок откроется в браузере;
2. Добавить/удалить необходимые иконки;
3. Далее продолжаем с 3-го шага создания сета.

## JS

Собирается Webpack-ом, jQuery и Underscore уже подключены. Можно использовать ES6 синтаксис. Собирается из директории `/frontend/scripts`. Все файлы являются входной точкой, кроме тех, что находятся в `frontend/scripts/includes`.

### Как подключать файлы

Желательно не использовать дополнительны `<script>` теги. А делать так:

#### Импорт функции

```javascript
// Подключаемый файл includes/hello.js
export default function (value) {
  console.log(`Привет из подключаемомго файла, мне передали значение: ${value}`);
}

// Подключающий файл (вариат 1)
import sayHello from 'includes/hello.js';
sayHello(10); // Привет из подключаемомго файла, мне передали значение: 10

// Подключающий файл (вариат 2)
const sayHello = require('includes/hello.js');
sayHello(15); // Привет из подключаемомго файла, мне передали значение: 15
```

#### Импорт класса

```javascript
// Подключаемый файл includes/feature.js
export default class Feature {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    alert(this.name);
  }
}

// Подключающий файл
import Feature from 'includes/feature.js';
const feature = new Feature('Коля');
feature.sayName(); // Коля
```

#### Подключение функционала

```javascript
// Подключаемый файл includes/action.js
console.log('Я делаю очень полезное действие!');

// Подключающий файл
import 'includes/action.js'; // Я делаю очень полезное действие!
```

### Как быть со сторонними библиотеками

- Установить: `npm i slick-carousel`;
- Подключить в файле где используется фича: `import 'slick-carousel';`;
- Один и тот же функционал можно подключать в разных файлах сколько угодно раз, Webpack каждую фичу подключит только один раз.

## HTML

В качестве шаблонизатора используется Nunjucks. Все njk и html файлы в `/frontend/templates` директории - входные точки, кроме директории `frontend/templates/includes` (подключаемые файлы).

Шаблонам можно передавать данные из одноименных json-файлов.

### Helper

В шаблонах можно использовать немного динамики (чтобы показать поведение блоков при различном наполнении).

- `helper.getLorem(10)` - сгенерирует рыбу из 10-ти слов (просто слова без знаков препинания);
- `helper.getLoremHead(10)` - Фраза с большой буквы;
- `helper.getLoremPhrase(10)` - Фраза с большой буквы и с точкой в конце;
- `helper.getLoremSent(50)` - Предложения.
- `helper.getRnd(5, 10)` - Случайное значение от 5 до 10.
- `helper.formatInt( helper.getRnd(100000, 100100) )` - от 100 000 до 100 100 (с пробелом разделителем).

## TODO

- Спрайтогенератор;
- Ресолвер для путей в стилях; 