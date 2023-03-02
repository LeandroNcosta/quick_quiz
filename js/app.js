const form = document.querySelector('.quiz-form')
const correctAnswers = ['A', 'B', 'A', 'D']
const finalResult = document.querySelector('.result')

let points = 0

const getUserAnswers = () => {
  const answers = correctAnswers
    .map((_, index) => form[`inputQuestion${index + 1}`].value)
  // form.inputQuestion1

  return answers
}

const calculatePoints = selectedAnswers => {
  points = 0

  selectedAnswers.forEach((answer, index) => {
    const answerIsCorrect = answer === correctAnswers[index]

    answerIsCorrect ? points += 25 : points
  })
}

const realTimeResult = () => {
  let count = 0

  const timer = setInterval(() => {
    count === points ? clearInterval(timer) : count

    finalResult.querySelector('span').textContent = `${count++}%`
  }, 20)
}

const showFinalResult = () => {
  finalResult.classList.remove('d-none')

  scrollTo({
    top: 0,
    bottom: 0,
    behavior: 'smooth'
  })
}

const handleWithAnswers = event => {
  event.preventDefault()
  const userAnswers = getUserAnswers()
  const unselectedAnswers = userAnswers.some((answer) => answer === '')

  if (unselectedAnswers) {
    if (confirm('Há algumas respostas não selecionadas, deseja continuar?')) {
      calculatePoints(userAnswers)
      realTimeResult()
      form.reset()
      showFinalResult()
    }
    return
  }

  calculatePoints(userAnswers)
  realTimeResult()
  form.reset()
  showFinalResult()
}

form.addEventListener('submit', handleWithAnswers)