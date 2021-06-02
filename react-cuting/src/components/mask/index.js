/* eslint-disable react-hooks/exhaustive-deps */
import { 
  useState, 
  useRef,
  useEffect
} from 'react'
import { MaskCom } from './styled'
export default function Mask(props){
  const { maskSize, canvasImg, setMaskSize } = props
  const maskCom = useRef()

  const [ maskPosition, changePosition ] = useState({x: 0, y: 0})

  useEffect(() => init(), [])

  const init = () => {
    maskCom.current.style.width = maskSize.dragW + 'px'
    maskCom.current.style.height = maskSize.dragH + 'px'
    maskCom.current.style.top = maskSize.dragY + 'px'
    maskCom.current.style.left = maskSize.dragX + 'px'
    maskCom.current.style.backgroundPosition = `-${maskSize.dragX}px -${maskSize.dragY}px`
  }

  const movehanldeDrag = e => {
    e.stopPropagation();
    let { dragW, dragH, dragX, dragY } = maskSize
    dragW = dragW - (maskPosition.x - e.clientX)
    dragH = dragH - (maskPosition.y - e.clientY)

    if (dragW > maskSize.w) {
      dragW = maskSize.w
    }
    if (dragH > maskSize.h) {
      dragH = maskSize.h
    }
    if (maskSize.w + maskSize.x < dragX + dragW) {
      dragW = maskSize.w + maskSize.x - dragX
    }
    if (maskSize.h + maskSize.y < dragY + dragH) {
      dragH = maskSize.h + maskSize.y - dragY
    }
    switch (e.target.style.cursor) {
      case 'nw-resize':
        
        break;
      case 'ne-resize':
      
        break;
      case 'sw-resize':
      
        break;
      case 'ne-resize':
        break;
      default:
        break;
    }
    maskCom.current.style.width = dragW + 'px'
    maskCom.current.style.height = dragH + 'px'
    maskCom.current.style.left = dragX + 'px'
    maskCom.current.style.top = dragY + 'px'
  }

  const movehanleDragEnd = e => {
    e.stopPropagation();
    setMaskSize(Object.assign(maskSize, {
      dragW: parseInt(maskCom.current.style.width),
      dragH: parseInt(maskCom.current.style.height),
      dragX: parseInt(maskCom.current.style.left),
      dragY: parseInt(maskCom.current.style.top)
    }))
  }

  const moveDown = e => {
    e.stopPropagation();
    changePosition({x: e.clientX, y: e.clientY})
  }

  const maskDown = e => {
    e.stopPropagation();
    maskPosition.x = e.clientX
    maskPosition.y = e.clientY
    e.target.addEventListener('mousemove', maskMove)
  }

  const maskMove = e => {
    let x = maskSize.dragX - (maskPosition.x - e.x)
    let y = maskSize.dragY - (maskPosition.y - e.y)
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
    e.target.removeEventListener("mousemove", maskMove)
  }

  const maskOut = e => {
    setMaskSize(Object.assign(
      maskSize, 
      {
        dragX: parseInt(maskCom.current.style.left), 
        dragY: parseInt(maskCom.current.style.top)
      }
    ))
    e.target.removeEventListener("mousemove", maskMove)
  }

  const createdSpan = () => {
    const arr = []
    for (let i = 0; i < 9; i++) {
      arr.push(<span key={i}></span>)
    }
    return arr
  }

  const createdMoveList = () => {
    const arr = [
      {top: '-5px', left: '-5px', cursor: 'nw-resize'},
      {top: '-5px', right: '-5px', cursor: 'ne-resize'},
      {bottom: '-5px', left: '-5px', cursor: 'sw-resize'},
      {bottom: '-5px', right: '-5px', cursor: 'se-resize'}
    ]
    return arr.map((item, index) => 
      <div
        key={index}
        className="move" 
        draggable="true"
        style={item}
        onDrag={movehanldeDrag}
        onMouseDown={moveDown}
        onDragEnd={movehanleDragEnd}
      />
    )
  }

  return (
    <MaskCom>
      <div 
        className="mask-img" 
        ref={maskCom}
        style={{backgroundImage: `url(${canvasImg})`}}
        onMouseDown={maskDown}
        onMouseUp={maskUp}
        onMouseOut={maskOut}
      >
        { createdSpan() }
        { createdMoveList() }
      </div>
    </MaskCom>
  )
}
