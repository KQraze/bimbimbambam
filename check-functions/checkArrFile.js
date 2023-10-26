const checkArr = (array, div, checkdiv, checkbox, label, name) => {
    array.map((value) => {

        checkdiv = document.createElement('div')
        checkdiv.setAttribute('class', 'form__checkbox')

        checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', value);
        checkbox.setAttribute('value', value);
        checkbox.setAttribute('id', value);

        label = document.createElement('label');
        label.setAttribute('for', value);
        switch (name) {
            case 'technology':
                label.innerHTML = value;
                break;

            case 'color':
                label.innerHTML = `<div style="background: ${value}" class="form__color">⠀</div>`;
                break;
        }
        checkdiv.appendChild(checkbox);
        checkdiv.appendChild(label);
        div.appendChild(checkdiv);
    })
}