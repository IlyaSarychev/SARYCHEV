window.onload = () => {

    setValidation(document.querySelector('.form-order'))

    function setValidation(form) {
        form.querySelectorAll('input, select').forEach(el => {
            setValidationData(el)
        })

        form.onsubmit = function(e) {
            e.preventDefault()

            elems = this.querySelectorAll('input, select')

            this.valid = true

            elems.forEach(el => {
                el.checkSelf()
                if (!el.valid) {
                    this.valid = false
                    return
                }
            })

            if (this.valid) alert('Отправка формы')
        }
    }

    function setValidationData(el) {
        
        el.validData = {}
        el.valid = true

        el.classList.forEach(cls => {

            if (cls == 'required') {
                el.validData['required'] = [true, `Поле ${el.placeholder} обязательно к заполнению`]
            }
            
            if (cls.startsWith('jsv-ml-')) {
                let num = Number(cls.slice(7))
                el.validData['min-length'] = [num, `В поле '${el.placeholder}' длина ввода не менее ${num} символов`]
            }
        })

        if (el.type && el.type == 'tel') {
            el.validData['phone'] = [null, `Поле ${el.placeholder} должно содержать корректный номер телефона`]
        }

        el.checkSelf = function() {

            let errorField = this.parentElement.querySelector('.error-text')
            
            for (let [key, value] of Object.entries(this.validData)) {
                
                if (key == 'min-length') {
                    if (this.value.length < value[0]) {
                        errorField.style.display = 'block'
                        errorField.innerText = value[1]
                        this.valid = false
                    } else {
                        this.valid = true
                        errorField.style.display = 'none'
                    }
                }

                if (key == 'required') {
                    if (!this.value.length) {
                        // alert(value[1])
                        
                        errorField.style.display = 'block'
                        errorField.innerText = value[1]
                        this.valid = false
                    } else {
                        this.valid = true
                        errorField.style.display = 'none'
                    }
                }

                if (key == 'phone') {
                    
                    let regExp = RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
                    if (!regExp.test(this.value)) {
                        errorField.style.display = 'block'
                        errorField.innerText = value[1]
                        this.valid = false
                    } else {
                        this.valid = true
                        errorField.style.display = 'none'
                    }
                }

            }
        }
    }

    const orderTotal = document.querySelector('.order-total')
    document.querySelector('#orderNumInput').onchange = function(e) {
        orderTotal.textContent = `${1500*this.value}$ (Стоимость услуги: 1500$)`
    }

    // 4.	Добавить к любым двум элементам javaScript код, который производит какие-либо изменения в CSS стиле элемента (например, меняет его цвет, меняет положение на странице, делает его невидимым).

    // Рандомный цвет кнопки при наведении

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    document.querySelectorAll('.button').forEach(el => {
        el.onmouseenter = function() {
            this.style.backgroundColor = `rgb(${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)})` 
        }
        el.onmouseleave = function() {
            this.style.backgroundColor = null
        }
    })

    // шар улетает

    const image = document.querySelector('[src="img/f4.png"]')
    const imageBr = image.getBoundingClientRect()

    window.onscroll = function(e) {

        if (window.scrollY + window.innerHeight > imageBr.top) {
            
            image.classList.add('fly')

            image.addEventListener('animationend', function(e) {
                this.style.opacity = 0
            }) 
        }
    }

    // Анимация jquery

    // $('.eggs').hide()

    $('.section-needed .title').click(function(e) {
        $('.eggs').slideDown(500)
    })

    $('.logo').click(function(e) {
        e.preventDefault()
        $(this).toggleClass('big')
    })

    // 

    $('.section-offer .button').click(function(e) {
        $('.section-offer .text').addClass('slideDown')
        setTimeout(() => {
            $('.section-offer .text').removeClass('slideDown')
        }, 2000)
    })
}