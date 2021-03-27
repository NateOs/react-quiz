import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const { waiting, loading, questions, index, correct, nextQuestion } = useGlobalContext()

  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }

  const { question, incorrect_answers, correct_answer } = questions[index] 
  const answers = [...incorrect_answers, correct_answer] 
  
  return (
    <section className="quiz">
      <p className="correct-answers">
        correct answers : {correct}/{index + 1}
      </p>
      <article className="container">
        <h2 dangerouslySetInnerHTML={{ __html: question }}/>
        <div className='btn-container'>
          {answers.map((answer, index) => {
            return (
              <button key={index} className='answer-btn' dangerouslySetInnerHTML={{__html: answer}}/>
            )
          })}
        </div>
      </article>
      <button className='next-question' onClick={() => nextQuestion()}>next question</button>

    </section>
  )
}

export default App
