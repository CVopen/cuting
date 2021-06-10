/* eslint-disable react-hooks/exhaustive-deps */
import { 
  useState, 
  useRef,
  useEffect
} from 'react'
import { MaskCom } from './styled'
export default function Mask(props){
  const { 
    maskSize, // 遮罩尺寸
    canvasImg, // 图片src
    setMaskSize,
    importSize, // 裁切框最小尺寸 比例默认 1：1 100 * 100
    status // 传入的状态
  } = props
  const maskCom = useRef()
  const mask = useRef()

  const [ maskPosition ] = useState({x: 0, y: 0})
  const [ cutingSize, changeSize ] = useState([100, 100])

  useEffect(() => init(), [props])

  const init = () => {
    maskCom.current.style.width = maskSize.dragW.toFixed(2) + 'px'
    maskCom.current.style.height = maskSize.dragH.toFixed(2) + 'px'
    maskCom.current.style.top = maskSize.dragY + 'px'
    maskCom.current.style.left = maskSize.dragX + 'px'
    maskCom.current.style.backgroundPosition = `-${maskSize.dragX}px -${maskSize.dragY}px`
    initCutingSize()
  }

  const initCutingSize = () => {
    const { dragW, dragH } = maskSize
    if (importSize) {
      if (dragW < 100 || dragH < 100) {
        if (dragW > dragH) {
          changeSize([(importSize[0] * dragH / importSize[1]), dragH])
        } else {
          changeSize([dragW, (importSize[1] * dragW / importSize[0])])
        }
        return
      }
      changeSize([(importSize[0] * cutingSize[1] / importSize[1]), cutingSize[1]])
    }

    if (!importSize && (dragW < 100 || dragH < 100)) {
      const size = dragW > dragH ? dragH : dragW
      changeSize([size, size])
    }
  }

  const validateW = (dragW) => {
    const { dragX } = maskSize
    if (dragW > maskSize.w) dragW = maskSize.w
    if (maskSize.w + maskSize.x < dragX + dragW) {
      dragW = maskSize.w + maskSize.x - dragX
    }
    if (dragW < cutingSize[0]) dragW = cutingSize[0]
    return dragW
  }
  const validateH = (dragH) => {
    const { dragY } = maskSize
    if (dragH > maskSize.h) dragH = maskSize.h
    if (maskSize.h + maskSize.y < dragY + dragH) {
     dragH = maskSize.h + maskSize.y - dragY
    }
    if (dragH < cutingSize[1]) dragH = cutingSize[1]
    return dragH
  }
  const validateX = (dragX) => {
    if (dragX <= maskSize.x) dragX = maskSize.x
    if (dragX >= maskSize.x + maskSize.w - cutingSize[0]) {
      dragX = maskSize.x + maskSize.w - cutingSize[0]
    }
    return dragX
  }
  const validateY = (dragY) => {
    if (dragY <= maskSize.y) dragY = maskSize.y
    if (dragY >= maskSize.y + maskSize.h - cutingSize[1]) {
      dragY = maskSize.y + maskSize.h - cutingSize[1]
    }
    return dragY
  }

  const moveDown = e => {
    e.stopPropagation();
    maskPosition.x = e.clientX
    maskPosition.y = e.clientY
    document.addEventListener('mousemove', movehanldeDrag)
  }

  const movehanldeDrag = e => {
    e.preventDefault ? e.preventDefault() : e.returnValue = false
    if (!e.clientX) return
    let { dragW, dragH, dragX, dragY } = maskSize
    switch (e.target.style.cursor) {
      case 'nw-resize':
        dragW = validateW(dragW + (maskPosition.x - e.clientX))
        dragH = validateH(dragH + (maskPosition.y - e.clientY))
        dragX = validateX(dragX + maskSize.dragW - dragW)
        dragY = validateY(dragY + maskSize.dragH - dragH)
        break;
      case 'ne-resize':
        dragW = validateW(dragW - (maskPosition.x - e.clientX))
        dragH = validateH(dragH + (maskPosition.y - e.clientY))
        dragY = validateY(dragY + maskSize.dragH - dragH)
        break;
      case 'sw-resize':
        dragW = validateW(dragW + (maskPosition.x - e.clientX))
        dragH = validateH(dragH - (maskPosition.y - e.clientY))
        dragX = validateX(dragX + maskSize.dragW - dragW)
        break;
      case 'se-resize':
        dragW = validateW(dragW - (maskPosition.x - e.clientX))
        if (status.fixed) {
          dragH = validateH(cutingSize[1] * dragW / cutingSize[0])
          dragH === cutingSize[1] && (dragW = cutingSize[0])
        } else {
          dragH = validateH(dragH - (maskPosition.y - e.clientY))
        }
        break;
      case 's-resize':
        dragH = validateH(dragH + (maskPosition.y - e.clientY))
        dragY = validateY(dragY + maskSize.dragH - dragH)
        break;
      case 'e-resize':
        dragW = validateW(dragW + (maskPosition.x - e.clientX))
        dragX = validateX(dragX + maskSize.dragW - dragW)
        break;
      case 'w-resize':
        dragW = validateW(dragW - (maskPosition.x - e.clientX))
        break;
      case 'n-resize':
        dragH = validateH(dragH - (maskPosition.y - e.clientY))
        break;
      default:
        break;
    }
    maskCom.current.style.width = dragW + 'px'
    maskCom.current.style.height = dragH + 'px'
    maskCom.current.style.left = dragX + 'px'
    maskCom.current.style.top = dragY + 'px'
    maskCom.current.style.backgroundPosition = `-${dragX}px -${dragY}px`
    document.querySelector('.info-w').innerHTML = dragW.toFixed(2)
    document.querySelector('.info-h').innerHTML = dragH.toFixed(2)
    return false
  }

  const moveOut = e => {
    e && e.stopPropagation();
    setMaskSize(Object.assign(maskSize, {
      dragW: parseInt(maskCom.current.style.width),
      dragH: parseInt(maskCom.current.style.height),
      dragX: parseInt(maskCom.current.style.left),
      dragY: parseInt(maskCom.current.style.top)
    }))
    document.removeEventListener("mousemove", movehanldeDrag)
  }

  const maskDown = e => {
    if (!status.canMoveBox) return
    e.stopPropagation();
    maskPosition.x = e.clientX
    maskPosition.y = e.clientY
    document.addEventListener('mousemove', maskMove)
  }

  const maskMove = e => {
    e.preventDefault ? e.preventDefault() : e.returnValue = false
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
    return false
  }

  const maskOut = () => {
    setMaskSize(Object.assign(
      maskSize, 
      {
        dragX: parseInt(maskCom.current.style.left), 
        dragY: parseInt(maskCom.current.style.top)
      }
    ))
    document.removeEventListener("mousemove", maskMove)
  }

  const createdMoveList = () => {
    let arr = [
      {top: '-5px', left: '-5px', cursor: 'nw-resize'},
      {top: '-5px', right: '-5px', cursor: 'ne-resize'},
      {bottom: '-5px', left: '-5px', cursor: 'sw-resize'},
      {bottom: '-5px', right: '-5px', cursor: 'se-resize'},
      {top: '-5px', left: 'calc(50% - 5px)', cursor: 's-resize'},
      {top: 'calc(50% - 5px)', left: '-5px', cursor: 'e-resize'},
      {top: 'calc(50% - 5px)', right: '-5px', cursor: 'w-resize'},
      {bottom: '-5px', left: 'calc(50% - 5px)', cursor: 'n-resize'}
    ]
    status.fixed && (arr = [arr[3]])
    return arr.map((item, index) => 
      <div
        key={index}
        className="move" 
        draggable="true"
        style={item}
        onMouseDown={moveDown}
        onMouseUp={moveOut}
        onMouseOut={moveOut}
      />
    )
  }

  return (
    <MaskCom ref={mask}>
      <div 
        className="mask-img" 
        ref={maskCom}
        style={{backgroundImage: `url(${canvasImg})`}}
        onMouseDown={maskDown}
        onMouseUp={maskOut}
        onMouseOut={maskOut}
      >
        { Array(9).fill(0).map((_, i) => <span key={i}></span>) }
        { status.changeSize && createdMoveList() }
        {
          status.info && <>
            <div className="info-w">{ maskSize.dragW.toFixed(2) }</div>
            <div className="info-h">{ maskSize.dragH.toFixed(2) }</div>
          </>
        }
      </div>
    </MaskCom>
  )
}
