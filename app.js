const div = document.querySelector ('#quiz-main-div')
let questionNo = 1
let resultArrayNo = 0
const nextbutton = document.querySelector ('#next-button')
const backbutton = document.querySelector ('#back-button')
const answerDiv = document.querySelector ('#answer-div')
let ConvertedApiData = []
let randomNumberArray = []
let randomNumber;
let optionsArray = []
let numbersForOptions = []

function randomNumberGenerator () {
    
    randomNumber = Math.floor(Math.random()*4)
    
    if (randomNumberArray.length === 0){
        randomNumberArray.push (randomNumber)
        randomNumberGenerator()
    } else if (!randomNumberArray.includes(randomNumber) && randomNumberArray.length < 4){
        randomNumberArray.push (randomNumber)
        randomNumberGenerator()
    } else if (randomNumberArray.includes(randomNumber) && randomNumberArray.length < 4){
        randomNumberGenerator()
    } else {
        return
    }

    return randomNumberArray
}



function renderQuestion () {
    
    numbersForOptions = randomNumberGenerator()

    optionsArray.push (ConvertedApiData.results[resultArrayNo].correct_answer)
    optionsArray.push (ConvertedApiData.results[resultArrayNo].incorrect_answers[0])
    optionsArray.push (ConvertedApiData.results[resultArrayNo].incorrect_answers[1])
    optionsArray.push (ConvertedApiData.results[resultArrayNo].incorrect_answers[2])

    div.innerHTML = `
    <h2>Question No. ${questionNo}:</h2>
    <h2>${ConvertedApiData.results[resultArrayNo].question}</h2>
    <div>
        <input type="radio" name="question-${questionNo}" id="option-1" value="${optionsArray[numbersForOptions[0]]}">
        <label for="option-1">${optionsArray[numbersForOptions[0]]}</label><br /><br />
        <input type="radio" name="question-${questionNo}" id="option-2" value="${optionsArray[numbersForOptions[1]]}">
        <label for="option-2">${optionsArray[numbersForOptions[1]]}</label><br /><br />
        <input type="radio" name="question-${questionNo}" id="option-3" value="${optionsArray[numbersForOptions[2]]}">
        <label for="option-3">${optionsArray[numbersForOptions[2]]}</label><br /><br />
        <input type="radio" name="question-${questionNo}" id="option-4" value="${optionsArray[numbersForOptions[3]]}">
        <label for="option-4">${optionsArray[numbersForOptions[3]]}</label><br /><br />
    </div>
    `
}


async function getDatafromAPI (){
    try {
        const ApiData = await fetch ('https://opentdb.com/api.php?amount=10&type=multiple')
        ConvertedApiData = await ApiData.json()
        console.log (ConvertedApiData.results)
        renderQuestion ()
        
        const radio = document.getElementsByName (`question-${questionNo}`)
        radio.forEach((items , index)=>{
            items.addEventListener ('change' , function (){
                if (items.checked && items.value === ConvertedApiData.results[resultArrayNo].correct_answer){
                    answerDiv.innerHTML = `
                    <h3 class='correct'> Correct Answer </h3>
                    `
                } else {
                    answerDiv.innerHTML = `
                    <h3 class='wrong'> Wrong Answer </h3>
                    `
                }
            })
        })
    } catch (error){
        console.log (error)
    }
}

getDatafromAPI()



nextbutton.addEventListener ('click' , ()=>{
    if (resultArrayNo === 0 || resultArrayNo < ConvertedApiData.results.length - 1) {
        answerDiv.innerHTML = ''
        resultArrayNo += 1
        questionNo += 1
        optionsArray = []
        randomNumberArray = []
        renderQuestion()
        const radio = document.getElementsByName (`question-${questionNo}`)
        radio.forEach((items , index)=>{
            items.addEventListener ('change' , function (){
                if (items.checked && items.value === ConvertedApiData.results[resultArrayNo].correct_answer){
                    answerDiv.innerHTML = `
                    <h3 class='correct'> Correct Answer </h3>
                    `
                } else {
                    answerDiv.innerHTML = `
                    <h3 class='wrong'> Wrong Answer </h3>
                    `
                }
            })
        })
    }
})

backbutton.addEventListener ('click' , ()=>{
    if (resultArrayNo <= ConvertedApiData.results.length - 1 && resultArrayNo > 0) {
        answerDiv.innerHTML = ''
        resultArrayNo -= 1
        questionNo -= 1
        optionsArray = []
        randomNumberArray = []
        renderQuestion()
        const radio = document.getElementsByName (`question-${questionNo}`)
        radio.forEach((items , index)=>{
            items.addEventListener ('change' , function (){
                if (items.checked && items.value === ConvertedApiData.results[resultArrayNo].correct_answer){
                    answerDiv.innerHTML = `
                    <h3 class='correct'> Correct Answer </h3>
                    `
                } else {
                    answerDiv.innerHTML = `
                    <h3 class='wrong'> Wrong Answer </h3>
                    `
                }
            })
        })
    }
})




