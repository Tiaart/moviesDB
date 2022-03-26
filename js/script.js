/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const advBlock = document.querySelectorAll('.promo__adv img');
    const ganreNew = document.querySelector('.promo__genre');
    const promoBg = document.querySelector('.promo__bg');
    const interactiveList = document.querySelector('.promo__interactive-list');
    const addForm = document.querySelector('form.add');
    const addInput = document.querySelector('.adding__input');
    const checkbox = document.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, interactiveList); 
        }

        event.target.reset()
    });

    const deleteAdv = (arr) => {
        for (let item of arr) {
            item.remove();
        };
    }
    

    const makeChanges = () => {
        ganreNew.innerHTML = 'ДРАМА';
        promoBg.style.backgroundImage = "url('img/bg.jpg')";
    }
    
    
    const sortArr = (arr) => {
        arr.sort();
    }
    
    
    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);

        films.forEach((item, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item" data-index="${i}"> ${i + 1}.${item}
                    <div class="delete" data-index="${i}"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }
    

    deleteAdv(advBlock);
    makeChanges();
    createMovieList(movieDB.movies, interactiveList);
    
})

