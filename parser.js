
// Принимаем теги из html
const inputFile = document.getElementById('file-selector')
const clearForm = document.getElementById('clear-form')
const divForm = document.getElementById('form')

// Задача переменных
let empty;
let label;
let checkbox;
let div;
let checkdiv;
let file;
let refer;

// Принимаем файл из input[type="file"]
inputFile.addEventListener("change", async (e) => {
    e.preventDefault();
    // Получаем file из инпута
    file = inputFile.files[0]
    // Получаем полный путь до файла
    let nameUrl = file.name;

    // Принимаем его и преобразуем в json формат
    let response = fetch(nameUrl)
        .then((response) => {
            return fetch(response.url).then((response) => {
                return response.json();
            })
        })

    // Принимаем данные из JSON
    let data = await response;

    // При выборе файла в инпут показываем форму
    divForm.setAttribute("style", 'display: block')
    // Создаем её
    createForm(formCreate, data);
    // Скрываем input file
    inputFile.setAttribute("style", 'display: none')
    // Добавляем кнопку очистки формы
    clearForm.setAttribute("style", 'display: inherit')
})

// Действия при нажатии кнопки "Очистить форму"
clearForm.addEventListener("click", (e) => {
    e.preventDefault();
    // Скрываем форму
    divForm.setAttribute("style", 'display: none')
    // Очищаем её
    createForm(formCreate, empty);
    formCreate.innerHTML = "";
    // Возвращаем input file
    inputFile.setAttribute("style", 'display: inherit')
    // Убираем кнопку очистки формы
    clearForm.setAttribute("style", 'display: none')
})

// Создание формы
const createForm = (form, data) => {
    // Отображение имени формы
    nameForm.innerHTML = data.name;
    createFormContent(data);
}
// Создание контента формы
const createFormContent = (data) => {

    // Перебор массива "fields"
    data.fields.map((field) => {
        // Создаём блок для инпута
        div = document.createElement('div');
        div.setAttribute('class', 'form__input');

        //  Проверка на label
        (field.label)
            ? label = document.createElement('label')
            : label = null;

        // Создание label при его наличии
        if (label !== null) {
            label.innerHTML = field.label;
            div.appendChild(label);
        }

        // Создание input поля
        let input = document.createElement('input');

        // Тип поля
        input.setAttribute('type', field.input.type);

        // Если это input file добавим стилей
        if (field.input.type === 'file') {
            input.setAttribute('class', "form-control")
        }

        // Проверка на checked
        if (field.input.type === 'checkbox' && field.input.checked === "true") {
            input.setAttribute('checked', '');
        }

        // Проверка на required
        if (field.input.required) {
            input.setAttribute('required', field.input.required);
        }
        // Проверка на placeholder
        if (field.input.placeholder) {
            input.setAttribute('placeholder', field.input.placeholder);
        }
        // Проверка на mask
        if (field.input.mask) {
            input.setAttribute('mask', field.input.mask);
            input.setAttribute('placeholder', field.input.mask)
        }

        // Если тип инпута color, то преобразуем его в список чекбоксов
        // и показываем цвета из массива colors
        if (field.input.type === 'color') {
            input.setAttribute('hidden', 'true');

            // Перебираем массив colors
            field.input.colors.map((value) => {

                // Создаём блок для чекбокса
                checkdiv = document.createElement('div')
                checkdiv.setAttribute('class', 'form__checkbox')

                // Создаём чекбокс
                checkbox = document.createElement('input');

                // Задаём ему атрибуты
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('name', value);
                checkbox.setAttribute('value', value);
                checkbox.setAttribute('id', value);

                // Создаём label
                label = document.createElement('label');
                label.setAttribute('for', value)
                label.innerHTML = `<div style="background: ${value}" class="form__color">⠀</div>`;

                // Добавляем всё в блок
                checkdiv.appendChild(checkbox);
                checkdiv.appendChild(label);

                div.appendChild(checkdiv);

            })
        }

        // Проверка на список technology (interview.js)
        if (field.input.type === 'technology') {

            // Убираем поле ввода
            input.setAttribute('hidden', 'true');
            // Перебираем массив данных для списка чекбоксов
            field.input.technologies.map((value) => {

                    checkdiv = document.createElement('div')
                    checkdiv.setAttribute('class', 'form__checkbox')

                    // Создаем чекбокс
                    checkbox = document.createElement('input');
                    // Устанавливаем атрибуты
                    checkbox.setAttribute('type', 'checkbox');
                    checkbox.setAttribute('name', value);
                    checkbox.setAttribute('value', value);
                    checkbox.setAttribute('id', value);
                    // Добавляем label to checkbox
                    label = document.createElement('label');
                    label.setAttribute('for', value)
                    label.innerHTML = value;
                    // помещаем элементы в форму
                    checkdiv.appendChild(checkbox);
                    checkdiv.appendChild(label);

                    div.appendChild(checkdiv);

                })
        }

        // Проверка на multiple
        if (field.input.multiple) {
            input.setAttribute('multiple', field.input.multiple);
        }

        // Проверка на filetype
        if (field.input.filetype) {
            input.setAttribute('accept', "." + field.input.filetype.join(",."));
        }

        // Добавляем input в блок
        div.appendChild(input);
        formCreate.appendChild(div)
    });

    // Создаём references
    let input;
    if (data.references) {
        // Блок под каждый ref
        div = document.createElement('div');
        div.setAttribute('class', 'form__ref');

        // Перебираем массив references
        data.references.map((ref) => {

            // Проверка на input
            if (ref.input) {
                // Создаём чекбокс
                input = document.createElement('input');
                input.setAttribute('type', ref.input.type);
                input.setAttribute("required", ref.input.required);

                // Проверка на checked
                if (ref.input.checked === "true") {
                    input.setAttribute("checked", '');
                }
                div.appendChild(input);
            }
            // Проверка на input
            if (!ref.input) {

                // Проверяем есть ли текст без ссылки
                if (ref["text without ref"]) {

                    // Создаём его
                    let span = document.createElement('span')
                    span.innerHTML = ref["text without ref"]
                    div.appendChild(span);
                }

                // Создаём ссылку
                refer = document.createElement('a')
                refer.innerHTML = " " + ref.text;
                refer.setAttribute('href', "/" + ref.ref);


                div.appendChild(refer);
            }
            // Создаём этот блок в форме
            formCreate.appendChild(div);
        });

        // Проверяем есть ли кнопки в форме
        if (data.buttons) {

            // Создаём блок кнопок
            div = document.createElement('div');
            div.setAttribute('class', 'form__btns');

            // Перебираем массив кнопок
            data.buttons.map((btn) => {

                // Создаём кнопку
                let button = document.createElement('button');
                button.setAttribute('class', 'btn btn-primary');
                button.innerHTML = btn.text;

                div.appendChild(button);
            })
            // Создаём этот блок в форме
            formCreate.appendChild(div);
        }


    }

    // Возвращаем созданную форму
    return formCreate;
}

