import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  function handleDeleteItem(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const notDeleted = questions.filter((quiz) => quiz.id !== id);
        setQuestions(notDeleted);
      });
  }
  function handleAnsChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json)
      .then((quizupdated) => {
        const updatedQuiz = questions.map((quiz) => {
          if (quiz.id === quizupdated.id) {
            return quizupdated;
          } else {
            return quiz;
          }
        });
        setQuestions(updatedQuiz);
      });
  }

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((question) => setQuestions(question));
  }, []);
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
          return (
            <QuestionItem
              key={question.id}
              question={question}
              handleDeleteItem={handleDeleteItem}
              handleAnsChange={handleAnsChange}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
