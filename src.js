const FIRST_FIGURE_MIN = 6
const FIRST_FIGURE_MAX = 9
const RESULT_MIN = 11
const RESULT_MAX = 14

// Get numbers
const firstFigure = getRandomNumber(FIRST_FIGURE_MIN, FIRST_FIGURE_MAX)
const secondFigure = getRandomNumber(RESULT_MIN - firstFigure, RESULT_MAX - firstFigure)

document.addEventListener('DOMContentLoaded', function() {
    // Initial setup
    let htmlElements = {
        // Equation
        firstFigureSpan: document.getElementById('figure-one-text'),
        secondFigureSpan: document.getElementById('figure-two-text'),
        resultInput: document.getElementById('result-input'),
        // Arrows
        illustraions: document.getElementsByClassName('illustraion'),
        illustraionOne: document.getElementsByClassName('illustraion-one'),
        illustraionTwo: document.getElementsByClassName('illustraion-two'),
        // Arrow-related inputs
        firstFigureInput: document.getElementById('figure-one-input'),
        secondFigureInput: document.getElementById('figure-two-input'),
    }
    
    // STEP ONE
    function initiateStepOne() {
        // Set initial equation addendums
        htmlElements.firstFigureSpan.innerHTML = firstFigure
        htmlElements.secondFigureSpan.innerHTML = secondFigure
        // Clear inputs
        enableInput(htmlElements.firstFigureInput)
        enableInput(htmlElements.secondFigureInput)
        // Temporarily disable main input
        disableHtmlItem(htmlElements.resultInput)
        markInputAsInitial(htmlElements.resultInput)
        htmlElements.resultInput.value = '?'
        // Hide arrows and inputs
        for (let illustraion of htmlElements.illustraions) {
            disableHtmlItem(illustraion)
        }
        // Set css vars accordingly
        document.documentElement.style.setProperty('--num-of-divisions-one', firstFigure)
        document.documentElement.style.setProperty('--num-of-divisions-two', secondFigure)
    }
    initiateStepOne()
    
    // STEP TWO
    function initiateStepTwo() {
        enbaleHtmlItem(htmlElements.illustraionOne[0])
        htmlElements.firstFigureInput.focus()
        htmlElements.firstFigureInput.addEventListener('keypress', (e) => validateInput(e, 1))
        htmlElements.firstFigureInput.addEventListener('keyup', (e) => handleInput(e,
            firstFigure,
            initiateStepThree,
            displayErrorWithFirstFigure
        ))
    }
    initiateStepTwo()
    
    // First figure input errors
    function displayErrorWithFirstFigure() {
        highlightFigure(htmlElements.firstFigureSpan)
        markInputAsWrong(htmlElements.firstFigureInput)
    }
    function removeErrorMarkForFirstFigure() {
        removeHighlightFromFigure(htmlElements.firstFigureSpan)
        markInputAsCorrect(htmlElements.firstFigureInput)
        fixInputResult(htmlElements.firstFigureInput, htmlElements.secondFigureInput)
    }
    // Second figure input errors
    function displayErrorWithSecondFigure() {
        highlightFigure(htmlElements.secondFigureSpan)
        markInputAsWrong(htmlElements.secondFigureInput)
    }
    function removeErrorMarkForSecondFigure() {
        removeHighlightFromFigure(htmlElements.secondFigureSpan)
        markInputAsCorrect(htmlElements.secondFigureInput)
        fixInputResult(htmlElements.secondFigureInput, htmlElements.resultInput)
    }
    // Result input errors
    function displayErrorWithResult() {
        if (htmlElements.resultInput.value.length == 2) {
            markInputAsWrong(htmlElements.resultInput)
        } else {
            markInputAsCorrect(htmlElements.resultInput)
        }
    }
    function removeErrorMarkForResult() {
        markInputAsCorrect(htmlElements.resultInput)
        fixInputResult(htmlElements.resultInput, null)
    }

    // STEP THREE
    function initiateStepThree() {
        enbaleHtmlItem(htmlElements.illustraionTwo[0])
        removeErrorMarkForFirstFigure()
        htmlElements.secondFigureInput.addEventListener('keypress', (e) => validateInput(e, 1))
        htmlElements.secondFigureInput.addEventListener('keyup', (e) => handleInput(e,
            secondFigure,
            initiateStepFour,
            displayErrorWithSecondFigure
        ))
    }

    function initiateStepFour() {
        removeInitialMarkFromInput(htmlElements.resultInput)
        enableInput(htmlElements.resultInput)
        removeErrorMarkForSecondFigure()
        htmlElements.resultInput.addEventListener('keypress', (e) => validateInput(e, 2))
        htmlElements.resultInput.addEventListener('keyup', (e) => handleInput(e,
            firstFigure + secondFigure,
            removeErrorMarkForResult,
            displayErrorWithResult
        ))
    }
  })