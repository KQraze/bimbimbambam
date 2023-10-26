const inputFile = document.getElementById('file-selector')
const clearForm = document.getElementById('clear-form')
const divForm = document.getElementById('form')

let empty, label, checkbox, div, checkdiv, file, refer;

// Receiving and converting a file to json
const inputSelector = async (e) => {
    e.preventDefault();
    file = inputFile.files[0];
    let nameUrl = file.name;
    let response = fetch("forms/" + nameUrl)
        .then((response) => {
            return fetch(response.url).then((response) => {
                return response.json();
            })
        })
    let data = await response;

    divForm.setAttribute("style", 'display: block')
    createForm(formCreate, data);
    inputFile.setAttribute("style", 'display: none')
    clearForm.setAttribute("style", 'display: inherit')
}
// Clear form button
const formClear = (e) => {
    e.preventDefault();
    divForm.setAttribute("style", 'display: none');
    inputFile.setAttribute("style", 'display: inherit');
    clearForm.setAttribute("style", 'display: none');
    formCreate.innerHTML = "";
    createForm(formCreate, empty);
}
inputFile.addEventListener("change", inputSelector)
clearForm.addEventListener("click", formClear)

// Create form
const createForm = (form, data) => {
    // Отображение имени формы
    nameForm.innerHTML = data.name;
    createFormContent(data);
}
// Create context form
const createFormContent = (data) => {
    // Create fields
    data.fields.map((field) => {
        div = document.createElement('div');
        div.setAttribute('class', 'form__input');

        (field.label)
            ? label = document.createElement('label')
            : label = null;

        if (label !== null) {
            label.innerHTML = field.label;
            div.appendChild(label);
        }
        let input = document.createElement('input');
        for (let attr in field.input) {
            switch (attr) {
                case 'type': input.setAttribute(attr, field.input.type); break;
                case 'required': input.setAttribute(attr, field.input.required); break;
                case 'placeholder': input.setAttribute(attr, field.input.placeholder); break;
                case 'mask':
                    input.setAttribute(attr, field.input.mask);
                    input.setAttribute("placeholder", field.input.mask);
                    break;
                case 'multiple': input.setAttribute(attr, field.input.multiple); break;
                case 'filetype': input.setAttribute(attr, "." + field.input.filetype.join(",.")); break;

            }
        }
        switch (field.input.type) {
            case 'color':
                input.setAttribute('hidden', 'true');
                checkArr(field.input.colors, div, checkdiv, checkbox, label, field.input.type); break;
            case 'technology':
                input.setAttribute('hidden', 'true');
                checkArr(field.input.technologies, div, checkdiv, checkbox, label, field.input.type); break;
            case 'file':
                input.setAttribute('class', "form-control"); break;
        }
        div.appendChild(input);
        formCreate.appendChild(div)
    });
    let input;
    // Create references
    if (data.references) {
        div = document.createElement('div');
        div.setAttribute('class', 'form__ref');
        data.references.map((ref) => {

            if (ref.input) {

                input = document.createElement('input');
                input.setAttribute('type', ref.input.type);
                input.setAttribute("required", ref.input.required);

                if (ref.input.checked === "true") {
                    input.setAttribute("checked", '');
                }
                div.appendChild(input);
            }
            if (!ref.input) {

                if (ref["text without ref"]) {
                    let span = document.createElement('span')
                    span.innerHTML = ref["text without ref"]
                    div.appendChild(span);
                }
                refer = document.createElement('a')
                refer.innerHTML = " " + ref.text;
                refer.setAttribute('href', "/" + ref.ref);

                div.appendChild(refer);
            }
            formCreate.appendChild(div);
        });

        // Create buttons
        if (data.buttons) {
            div = document.createElement('div');
            div.setAttribute('class', 'form__btns');
            data.buttons.map((btn) => {
                let button = document.createElement('button');
                button.setAttribute('class', 'btn btn-primary');
                button.innerHTML = btn.text;
                div.appendChild(button);
            })
            formCreate.appendChild(div);
        }
    }
    return formCreate;
}