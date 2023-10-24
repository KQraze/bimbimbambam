
let response = await fetch('./interview.js')
let data = await response.json();

// Задача переменных
let label;
let select;
let option;

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

        console.log(field.input);

        //  Проверка на label
        (field.label)
            ? label = document.createElement('label')
            : label = null;

        // Создание label при его наличии
        if (label !== null) {
            label.innerHTML = field.label;
            formCreate.appendChild(label);
        }

        // Создание input поля
        let input = document.createElement('input');

        // Тип поля
        input.setAttribute('type', field.input.type);

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
        }

        // Проверка на список technology (interview.js)
        if (field.input.type === 'technology') {

            // Убираем поле ввода
            input.setAttribute('hidden', 'true');

            // Создаём выпадающий список
            select = document.createElement('select');

            // Добавляем атрибуты
            select.setAttribute('multiple', field.input.multiple);

            // Перебираем массив данных для списка
            field.input.technologies.map((value) => {
                    console.log(value);
                    option = document.createElement('option');
                    option.innerHTML = value;

                    // Добавляем элемент списка
                    select.appendChild(option)
                })

            // Добавляем выпадающий список в форму
            formCreate.appendChild(select);
        }

        // Проверка на multiple
        if (field.input.multiple) {
            input.setAttribute('multiple', field.input.multiple);
        }

        if (field.input.filetype) {
            input.setAttribute('filetype', field.input.multiple);
        }

        // Добавляем input в форму
        formCreate.appendChild(input);
    });
    return formCreate;
}
createForm(formCreate, data);

