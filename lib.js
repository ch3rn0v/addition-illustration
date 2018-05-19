const numRegEx = RegExp(/\d{1,2}/)

function disableHtmlItem(item) {    
    item.classList.add('disabled')
}
function enbaleHtmlItem(item) {
    item.classList.remove('disabled')
}
function enableInput(input) {
    input.value = ''
    enbaleHtmlItem(input)
}
function markInputAsInitial(input) {
    input.classList.add('initial')
}
function removeInitialMarkFromInput(input) {
    input.classList.remove('initial')
}
function highlightFigure(figure) {
    figure.classList.add('highlighted')
}
function removeHighlightFromFigure(figure) {
    figure.classList.remove('highlighted')
}
function markInputAsWrong(input) {
    input.classList.add('wrong')
}
function markInputAsCorrect(input) {
    input.classList.remove('wrong')
}
function fixInputResult(input, nextInput) {
    disableHtmlItem(input)
    if (nextInput != null && nextInput != undefined) {
        nextInput.focus()
    } else {
        input.blur()
    }
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function validateNumericInput(value) {
    return numRegEx.test(value)
}
function validateInput(e, maxLength) {
    cursorCommandKeyCodes = [8, 46, 35, 36, 37, 39, 116]
    pageAndInputCommandKeys = ['a', 'A', 'r', 'R', 'f', 'F']
    if (cursorCommandKeyCodes.indexOf(e.keyCode) >= 0 ||
        e.ctrlKey && pageAndInputCommandKeys.indexOf(e.key) >= 0) {
        // The above commands are allowed
        return true
    }
    if (e.key.length > maxLength) {
        // Only single digit expected
        e.preventDefault()
        return false
    }
    if (!validateNumericInput(e.key)) {
        // Only digits allowed
        e.preventDefault()
        return false
    }
    if (e.target.value.length == maxLength && (
        e.target.selectionStart != 0 ||
        e.target.selectionEnd != maxLength)) {
        // Only single digit expected
        e.preventDefault()
        return false
    }
    return true
}
function handleInput(e, expectedFigure, success, failure) {
    // Chrome allows '#', '$', '%' despite validateInput.
    // This condition fixes it.
    if (!numRegEx.test(e.key)) {
        digits = e.target.value.match(numRegEx)
        if (digits != null) {
            e.target.value = e.target.value.match(numRegEx)[0]
        } else {
            e.target.value = ''
        }
    }
    if (e.target.value === expectedFigure.toString()) {
        success()
    } else {
        failure()
    }
}