import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const tempurl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [waiting, setWaiting] = useState(true)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
   
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    const response = await axios(url).catch((err) => console.log(err))
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      }
    } else {
      setWaiting(true)
    }
  }

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1)
    } else if (index >= questions.length - 1) {
      console.log('done')
    }

  }

  useEffect(() => {
    fetchQuestions(tempurl)
  }, [])

  return <AppContext.Provider value={{loading, waiting, questions, index, correct, error, isModalOpen, nextQuestion}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
