// Javascript
// Реализовывать сортировку. При клике на поле сортировки “Цене” или “Возраст” карточки должны сортироваться по выбранному полю;
// Реализовать работу кнопки “наверх”. При клике должна произойти плавная прокрутка вверх страницы. Если прокрутка не возможна, то кнопка скрывается;
// Валидация формы: если email неподходящего вида, то выдавать ошибку;
// При клике на сердечко показывать уведомление о добавлении в избранное;
// Выполнение заданий по Javascript не влияет на решение о трудоустройстве, но от этого зависит предлагаемая стартовая зарплата.

// Получаем выбранное сердечко сердечко
let selectedHeart = document.querySelectorAll('.vector4');
console.log(selectedHeart);

// Получаем сердечко по умолчанию
let heart = document.querySelectorAll('.vector3');
console.log(heart);

// Получаем кнопку - цена
let price = document.querySelector('.price');
console.log(price);

// Получаем копку - возраст
let age = document.querySelector('.age');
console.log(age);

// Получаем кнопку - показать еще
let showCat = document.querySelector('.show-cat');

// Получаем кнопку - вверх
let btnVector = document.querySelector('.btn-vector');
console.log(btnVector);


// Скролл страницы
window.onscroll = function () {
    let scrolled = window.pageYOffset;
    if (scrolled > 1800) {
        btnVector.style.display = 'block'
    } else {
        btnVector.style.display = 'none'
        // console.log( 'Позиция скрола: '+scrolled  );

    }
};


// Фун-ция которая запускает плавный скролл наверх
window.onload = function () {
    let scrolled;
    let timer;

    btnVector.onclick = function () {
        scrolled = window.pageYOffset
        scrollTop();
        console.log(window.pageYOffset)
    }

    function scrollTop() {
        if (scrolled > 200) {
            window.scrollTo(0, scrolled);
            scrolled = scrolled - 50;
            timer = setTimeout(scrollTop, 50);
        } else {
            clearTimeout(timer);
            window.scrollTo(0, 200)
        }
    }
}


// Получаем все карточки товаров
let wrapCats = document.querySelector('.wrap-cats');
// console.log(typeof wrapCats);
// console.log(wrapCats)
// console.log(wrapCats.children.length);
// console.log(wrapCats.children[1].getAttribute('data-sort'));
// console.log(+wrapCats.children[0].getAttribute('data-sort'), +wrapCats.children[0].getAttribute('data-sort'));


// Запускаем ф-цию сортировки по возрасту
age.onclick = mySortAge;

// Запускаем ф-цию сортировки по цене
price.onclick = mySortPrice;

// Запускаем ф-цию показать 20 товаров
showCat.onclick = addCats;



// Добавляем 20 элементов в категорию товаров
function addCats() {
    for (let i = 0; i < 20; i++) {
        let d = document.createElement('div');
        d.innerHTML = `<div data-sort="60000" data-age="11" class="cat-seven cat">
<img class="vector4" src="image/Vector (4).png" alt="">
<img src="image/jason-briscoe-UV81E0oXXWQ-unsplash 1 (1).png" alt="">
<div class="title-cat title-six">Кот полосатый</div>
<div class="description">
    <div class="vertical"></div>
    <div class="color-cat">Коричневый окрас</div>
    <div class="block-cat-age">
        <div class="how-age-cat">11 мес.</div>
        <div class="age-cat">Возраст</div>
    </div>
    <div class="block-number">
        <div class="how-number-of-paws">4</div>
        <div class="number-of-paws">Кол-во лап</div>
    </div>
</div>
<div class="price-cat">60 000 руб.</div>
<button disabled class="btn-sold-out sold-out-a-cat-six">Продан</button>
</div>
</div>`
        wrapCats.append(d)
    }
}



// Сортируем товар  по цене
function mySortPrice() {
    for (let i = 0; i < wrapCats.children.length; i++) {
        for (let j = i + 1; j < wrapCats.children.length; j++) {
            if (+wrapCats.children[i].getAttribute('data-sort') > +wrapCats.children[j].getAttribute('data-sort')) {
                replacedNode = wrapCats.replaceChild(wrapCats.children[j], wrapCats.children[i]);
                insertAfter(replacedNode, wrapCats.children[i]);
            }
        }
    }
}


// Сортируем товар по возрасту
function mySortAge() {
    for (let i = 0; i < wrapCats.children.length; i++) {
        for (let j = i + 1; j < wrapCats.children.length; j++) {
            if (+wrapCats.children[i].getAttribute('data-age') > +wrapCats.children[j].getAttribute('data-age')) {
                replacedNode = wrapCats.replaceChild(wrapCats.children[j], wrapCats.children[i]);
                insertAfter(replacedNode, wrapCats.children[i]);
            }
        }
    }
}


function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}


// let cat = document.querySelectorAll('.cat');
// console.log(cat)



// Создаем елемент(Добавлено в избранное), который будем добавлять при клике на сердечко
let addToFavourites = document.createElement('span');
addToFavourites.className = 'add-to-favourites';
addToFavourites.innerHTML = 'Добавлено в избранное'
console.log(addToFavourites)


// Создаем елемент(Удалено из избранного), который будем добавлять при клике на сердечко
let removeFromFavorites = document.createElement('span');
removeFromFavorites.className = 'remove-from-favorites';
removeFromFavorites.innerHTML = 'Удалено из избранного'
console.log(removeFromFavorites)



// Запускаем ф-цию смена сердечек, добавление в избранное и удаление из избранного
wrapCats.onclick = function (e) {
    if (e.target.className == 'vector3') {
        e.target.src = 'image/Vector (4).png';
        e.target.className = 'vector4';
        e.target.before(addToFavourites);
        removeFromFavorites.remove();
        setTimeout(function () {
            addToFavourites.remove()
        }, 2000)
    } else if (e.target.className == 'vector4') {
        e.target.src = 'image/Vector (3).png'
        e.target.className = 'vector3'
        e.target.before(removeFromFavorites);
        addToFavourites.remove();
        setTimeout(function () {
            removeFromFavorites.remove()
        }, 2000)
    }

}

// Получаем кнопку подписаться
let btnSubscribe = document.querySelector('.btn-subscribe');
console.log(btnSubscribe);

// Получаем форму
let form = document.getElementById('form');

// Получаем инпут email
let email = document.querySelector('.email');

// Получаем span куда будем выводить ошибку
let spanForm = document.querySelector('.span-form');



// Запускаем ф-цию валидатор email , при событии инпут
email.addEventListener('input', () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email.value)) {
        console.log('no')
        spanForm.innerHTML = 'Введите корректный email'
    } else {
        spanForm.innerHTML = '';
    }
});

// Запускаем ф-цию валидатор email , при нажатии на кнопку подписаться
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (email.value == '') {
        spanForm.innerHTML = 'Поле email должно быть заполнено'
    } else {
        email.value = '';
    }
});












