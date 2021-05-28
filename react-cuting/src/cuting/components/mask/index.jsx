/* eslint-disable react-hooks/exhaustive-deps */
import { 
  useState, 
  useRef,
  useEffect
} from 'react'
import './index.scss'
export default function CanvasCom(props){
  const { maskSize, canvasImg, setMaskSize } = props
  const maskCom = useRef()

  const [ maskPosition, changePosition ] = useState({x: 0, y: 0})

  useEffect(() => {
    maskCom.current.style.width = maskSize.w + 'px'
    maskCom.current.style.height = maskSize.h + 'px'
    maskCom.current.style.top = maskSize.y + 'px'
    maskCom.current.style.left = maskSize.x + 'px'
    maskCom.current.style.backgroundPosition = `-${maskSize.x}px -${maskSize.y}px`
  }, [])

  const movehanldeDrag = e => {
    e.stopPropagation();
    let w = (maskSize.dragW ? maskSize.dragW : maskSize.w) - (maskPosition.x - e.clientX)
    let h = (maskSize.dragH ? maskSize.dragH : maskSize.h) - (maskPosition.y - e.clientY)
    if (w > maskSize.w) {
      w = maskSize.w
    }
    if (h > maskSize.h) {
      h = maskSize.h
    }
    maskCom.current.style.width = w + 'px'
    maskCom.current.style.height = h + 'px'
  }

  const movehanleDragEnd = e => {
    e.stopPropagation();
    setMaskSize(Object.assign(maskSize, {
      dragW: parseInt(maskCom.current.style.width),
      dragH: parseInt(maskCom.current.style.height)
    }))
  }

  const moveDown = e => {
    e.stopPropagation();
    changePosition({x: e.clientX, y: e.clientY})
  }

  const maskDown = e => {
    e.stopPropagation();
    maskPosition.x1 = e.clientX
    maskPosition.y1 = e.clientY
    e.target.addEventListener('mousemove', moveMask)
  }

  const moveMask = e => {
    let x = (maskSize.dragX ? maskSize.dragX : maskSize.x) - (maskPosition.x1 - e.x)
    let y = (maskSize.dragY ? maskSize.dragY : maskSize.y) - (maskPosition.y1 - e.y)
    if (maskSize.x > x) {
      x = maskSize.x
    }
    if (x > maskSize.x + maskSize.w - maskSize.dragW) {
      x = maskSize.x + maskSize.w - maskSize.dragW
    }

    if (maskSize.y > y) {
      y = maskSize.y
    }
    if (y > maskSize.y + maskSize.h - maskSize.dragH) {
      y = maskSize.y + maskSize.h - maskSize.dragH
    }

    maskCom.current.style.left = x + 'px'
    maskCom.current.style.top = y + 'px'
    maskCom.current.style.backgroundPosition = `-${x}px -${y}px`
  }
  const maskUp = e => {
    setMaskSize(Object.assign(
      maskSize, 
      {
        dragX: parseInt(maskCom.current.style.left), 
        dragY: parseInt(maskCom.current.style.top)
      }
    ))
    e.target.removeEventListener("mousemove", moveMask)
  }

  const maskOut = e => {
    setMaskSize(Object.assign(
      maskSize, 
      {
        dragX: parseInt(maskCom.current.style.left), 
        dragY: parseInt(maskCom.current.style.top)
      }
    ))
    e.target.removeEventListener("mousemove", moveMask)
  }

  return (
    <div className="mask">
      <div 
        className="mask-img" 
        ref={maskCom}
        style={{backgroundImage: `url(${canvasImg})`}}
        onMouseDown={maskDown}
        onMouseUp={maskUp}
        onMouseOut={maskOut}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div
          className="move" 
          draggable="true"
          onDrag={movehanldeDrag}
          onMouseDown={moveDown}
          onDragEnd={movehanleDragEnd}
        />
      </div>
    </div>
  )
}
