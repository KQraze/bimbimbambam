
let response = await fetch('./interview.js')
let data = await response.json();

// Задача переменных
let label;
let checkbox;
let div;
let checkdiv;

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

        if (field.input.filetype) {
            input.setAttribute('accept', "." + field.input.filetype.join(",."));
        }

        // Добавляем input в блок
        div.appendChild(input);
        formCreate.appendChild(div)
    });
    return formCreate;
}
createForm(formCreate, data);

