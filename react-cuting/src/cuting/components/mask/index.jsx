/* eslint-disable react-hooks/exhaustive-deps */
import { 
  useState, 
  useRef,
  useEffect
} from 'react'
import './index.scss'
export default function CanvasCom(props){
  const { maskSize, canvasImg, setMaskSize } = props
  console.log(maskSize);
  const maskCom = useRef()

  const [ maskPosition ] = useState({x1: 0, y1: 0})

  useEffect(() => {
    maskCom.current.style.width = maskSize.w + 'px'
    maskCom.current.style.height = maskSize.h + 'px'
    maskCom.current.style.top = maskSize.y + 'px'
    maskCom.current.style.left = maskSize.x + 'px'
    maskCom.current.style.backgroundPosition = `-${maskSize.x}px -${maskSize.y}px`
    setMaskSize(Object.assign(
      maskSize, 
      {
        dragW: maskSize.w, 
        dragH: maskSize.h
      }
    ))
  }, [])

  // 裁切框控制
  const changeMaskSize = e => {
    const w = (maskSize.dragW ? maskSize.dragW : maskSize.w) - (maskPosition.x1 - e.x)
    const h = (maskSize.dragH ? maskSize.dragH : maskSize.h) - (maskPosition.y1 - e.y)
    if (maskSize.w / 10 <= w <= maskSize.w) {
      maskCom.current.style.width = w + 'px'
    }
    if (maskSize.h / 10 <= h <= maskSize.h) {
      maskCom.current.style.height = h + 'px'
    }
  }

  const moveDown = e => {
    console.log('moveDown');
    e.stopPropagation();
    maskPosition.x1 = e.clientX
    maskPosition.y1 = e.clientY
    e.target.addEventListener('mousemove', changeMaskSize)
  }

  const moveUp = e => {
    setMaskSize(Object.assign(
      maskSize, 
      {
        dragW: parseInt(maskCom.current.style.width), 
        dragH: parseInt(maskCom.current.style.height)
      }
    ))
    e.target.removeEventListener("mousemove", changeMaskSize)
    e.target.click()
  }

  const moveOut = e => {
    setMaskSize(Object.assign(
      maskSize, 
      {
        dragW: parseInt(maskCom.current.style.width), 
        dragH: parseInt(maskCom.current.style.height)
      }
    ))
    e.target.removeEventListener("mousemove", changeMaskSize)
    e.target.click()
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

  const maskDown = e => {
    console.log('maskDown');
    maskPosition.x1 = e.clientX
    maskPosition.y1 = e.clientY
    e.target.addEventListener('mousemove', moveMask)
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
    e.target.click()
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
    e.target.click()
  }

  return (
    <div className="mask">
      <div 
        className="mask-img" 
        ref={maskCom}
        style={{ backgroundImage: `url(${canvasImg})` }}
        onMouseDown={maskDown}
        onMouseUp={maskUp}
        onMouseOut={maskOut}
        onClick={() => {}}
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
          onMouseDown={moveDown}
          onMouseUp={moveUp}
          onMouseOut={moveOut}
          onClick={() => {}}
        />
      </div>
    </div>
  )
}
