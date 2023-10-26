const checkArr = (array, div, checkdiv, checkbox, label, name) => {
    array.map((value) => {

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
        label.setAttribute('for', value);
        console.log(name)
        switch (name) {
            case 'technology':
                label.innerHTML = value;
                break;

            case 'color':
                label.innerHTML = `<div style="background: ${value}" class="form__color">⠀</div>`;
                break;
        }

        // Добавляем всё в блок
        checkdiv.appendChild(checkbox);
        checkdiv.appendChild(label);

        div.appendChild(checkdiv);
    })
}