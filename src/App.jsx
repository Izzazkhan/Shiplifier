import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [activeBoxes, setActiveBoxes] = useState(Array(9).fill(false))
  const [clickOrder, setClickOrder] = useState([])
  const [isResetting, setIsResetting] = useState(false)
  const [completedAnimations, setCompletedAnimations] = useState(0)

  const handleBoxClick = (index) => {
    if (!activeBoxes[index] && !isResetting) {
      const newActive = [...activeBoxes]
      newActive[index] = true
      setActiveBoxes(newActive)
      setClickOrder((prev) => [...prev, index])
    }
  }

  const handleReset = () => {
    if (isResetting) return;
    setIsResetting(true)
    setCompletedAnimations(0)
  }

  useEffect(() => {
    if (isResetting && completedAnimations === clickOrder.length) {
      setActiveBoxes(Array(9).fill(false))
      setClickOrder([])
      setIsResetting(false)
    }
  }, [completedAnimations, isResetting, clickOrder.length])

  return (
    <div className="container">
      <div className="grid">
        {activeBoxes.map((isActive, index) => {
          const resetIndex = clickOrder.indexOf(index)
          const hasResetAnimation = isResetting && resetIndex !== -1
          return (
            <div
              key={index}
              className={`box ${isActive ? "active" : ""} ${ hasResetAnimation ? "animate-reset" : "" }`}
              style={ hasResetAnimation ? { "--delay": `${resetIndex * 500}ms` } : {} }
              onClick={() => handleBoxClick(index)}
              onAnimationEnd={() => {
                if (hasResetAnimation) {
                  setCompletedAnimations((prev) => prev + 1)
                }
              }}
            />
          )
        })}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset Grid
      </button>
    </div>
  )
}

export default App