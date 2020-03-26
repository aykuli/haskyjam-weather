# haskyjam-weather

## Task text:

Создайте SPA-приложение с прогнозом погоды. Используйте API OpenWeatherMap.org либо любое другое, которое кажется вам подходящим. Любые недосказанности в задании трактуйте по своему усмотрению и из соображений юзабилити.

Драфты пользовательского интерфейса: 
https://drive.google.com/open?id=1GAa1KQh98or7Ur51AMGw_wMKGi9VHj0_

1) Дефолтный экран автоматически определяет местоположение юзера и показывает текущую погоду и дату. 
2) Выбор города возможен в текстовом инпуте с автозаполнением.
3) Ссылки в шапке (today, tomorrow, week) - показывают подробную погоду для выбранного дня или на всю неделю. 
4) Кнопка «+» в правом верхнем углу добавляет город в список сохраненных городов.
5) Клик по блоку сохраненного города открывает новый путь (например /Moscow), содержащий подробную информацию о погоде в этом городе.
6) На страницах today и tomorrow показывать гугл-карту с маркером выбранного города. По клику на маркер выводить окно с информацией о погоде в данный момент. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!