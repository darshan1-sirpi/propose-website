import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const actionsRef = useRef(null)
  const ghostAudioRef = useRef(null)
  const directionIndexRef = useRef(0)
  const [accepted, setAccepted] = useState(false)
  const [showScary, setShowScary] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const roastTarget = 'LOOOSER'
  const [roastText, setRoastText] = useState('')
  const [pandaSrc, setPandaSrc] = useState('/panda_dance.gif')
  const [mediaReady, setMediaReady] = useState(true)

  const handleYesClick = () => {
    setAccepted(true)
  }

  const moveNoButton = () => {
    const area = actionsRef.current

    if (!area) {
      return
    }

    const areaRect = area.getBoundingClientRect()
    const buttonWidth = 120
    const buttonHeight = 48
    const padding = 8
    const step = 54

    const maxX = Math.max(padding, areaRect.width - buttonWidth - padding)
    const maxY = Math.max(padding, areaRect.height - buttonHeight - padding)
    const directions = [
      { dx: 0, dy: -step },
      { dx: 0, dy: step },
      { dx: -step, dy: 0 },
      { dx: step, dy: 0 },
    ]
    setNoPosition((current) => {
      for (let i = 0; i < directions.length; i += 1) {
        const dir = directions[(directionIndexRef.current + i) % directions.length]
        const nextX = Math.min(maxX, Math.max(padding, current.x + dir.dx))
        const nextY = Math.min(maxY, Math.max(padding, current.y + dir.dy))

        if (nextX !== current.x || nextY !== current.y) {
          directionIndexRef.current =
            (directionIndexRef.current + i + 1) % directions.length
          return { x: nextX, y: nextY }
        }
      }

      return current
    })
  }

  useEffect(() => {
    const area = actionsRef.current

    if (!area) {
      return
    }

    const areaRect = area.getBoundingClientRect()
    const buttonWidth = 120
    const buttonHeight = 48
    const padding = 8

    const startX = Math.max(
      padding,
      Math.min(areaRect.width * 0.62, areaRect.width - buttonWidth - padding),
    )
    const startY = Math.max(
      padding,
      Math.min(areaRect.height * 0.58, areaRect.height - buttonHeight - padding),
    )

    setNoPosition({ x: startX, y: startY })
  }, [])

  useEffect(() => {
    if (!accepted) {
      return
    }

    setRoastText('')
    let index = 0

    const timer = setInterval(() => {
      index += 1
      setRoastText(roastTarget.slice(0, index))

      if (index >= roastTarget.length) {
        clearInterval(timer)
      }
    }, 120)

    return () => clearInterval(timer)
  }, [accepted])

  useEffect(() => {
    if (!accepted) {
      setShowScary(false)
      return
    }

    const scaryTimer = setTimeout(() => {
      setShowScary(true)
    }, 2000)

    const hideScaryTimer = setTimeout(() => {
      setShowScary(false)
    }, 6000)

    return () => {
      clearTimeout(scaryTimer)
      clearTimeout(hideScaryTimer)
    }
  }, [accepted])

  useEffect(() => {
    if (!showScary || !ghostAudioRef.current) {
      return
    }

    ghostAudioRef.current.currentTime = 0
    ghostAudioRef.current.play().catch(() => {
      // If autoplay is blocked, fail silently.
    })
  }, [showScary])

  const handleGifPick = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPandaSrc(objectUrl)
    setMediaReady(true)
  }

  return (
    <main className="page-wrap">
      <section className="proposal-card">
        <div className="eyebrow">Special Question</div>
        <h1 className="title">Will you be mine?</h1>
        <p className="subtitle">A simple promise: care, respect, and lots of smiles.</p>

        {accepted ? (
          <div className="celebration" role="status" aria-live="polite">
            <div className="confetti" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="roast-chip" aria-label="Funny typed message">
              <span className="roast-text">{roastText}</span>
              <span className="roast-cursor" aria-hidden="true">
                {roastText.length < roastTarget.length ? '|' : ''}
              </span>
            </div>

            <div className="yes-message">I am not interested .</div>

            {mediaReady ? (
              <img
                className="panda-dance"
                src={pandaSrc}
                alt="Dancing panda celebration"
                onError={() => setMediaReady(false)}
              />
            ) : (
              <div className="panda-fallback">
                <p>Panda GIF not found. Select your GIF below.</p>
                <label className="gif-picker" htmlFor="gifInput">
                  Choose panda dance GIF
                </label>
                <input
                  id="gifInput"
                  className="gif-input"
                  type="file"
                  accept="image/gif,image/webp,image/png,image/jpeg"
                  onChange={handleGifPick}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="actions" aria-label="Answer options" ref={actionsRef}>
            <button className="btn btn-yes" onClick={handleYesClick}>
              Yes, absolutely
            </button>

            <button
              className="btn btn-no"
              style={{ left: `${noPosition.x}px`, top: `${noPosition.y}px` }}
              onClick={moveNoButton}
              onTouchStart={moveNoButton}
              aria-label="No"
            >
              No
            </button>
          </div>
        )}

        <p className="hint">Tip: No Button is little bit Shy</p>
      </section>

      {showScary ? (
        <div className="scary-overlay" aria-live="assertive">
          <img className="scary-image" src="/scary.gif" alt="Scary surprise" />
          <audio ref={ghostAudioRef} src="/ghost.mp3" autoPlay />
        </div>
      ) : null}
    </main>
  )
}

export default App
