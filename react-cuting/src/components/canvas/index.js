/* eslint-disable react-hooks/exhaustive-deps */
import { 
  useState, 
  useEffect, 
  useImperativeHandle, 
  forwardRef 
} from 'react'
import { 
  positionImg,
  positionMask 
} from '../../utils/draw'
import Mask from '../mask/index'
import { CanvasCom } from './styled'

const Canvas = (props, ref) => {
  const { size, src, enlarge, importSize } = props
  let canvas
  const [ canvasImg, setSrc ] = useState('')
  const [ maskSize, setMaskSize ] = useState({})
  useEffect(() => init(), [])

  useImperativeHandle(ref, () => ({
    importImg: () => {
      console.log(document.querySelector('canvas').width)
      console.log(enlarge, importSize)
      // const a = document.createElement("a");
      // a.href = canvasImg
      // a.download = '123.png';
      // a.click();
    }
  }));

  const init = () => {
    const reader = new FileReader()
    reader.readAsDataURL(src)
    reader.onload = e => {
      const img = new Image()
      img.src = e.target.result
      img.onload = function () {
        const { x, y, w, h } = positionImg(size, img)
        canvas = document.querySelector('canvas')
        canvas.getContext("2d").drawImage(img, x, y, w, h)
        setSrc(canvas.toDataURL())
        console.log(importSize)
        // setMaskSize({ x, y, w, h})
        
        setMaskSize(positionMask({ x, y, w, h }, importSize))
      }
    }
  }

  return (
    <CanvasCom style={{width: size.width + 'px', height: size.height + 'px'}}>
      <canvas width={size.width} height={size.height} />
      {
        Object.getOwnPropertyNames(maskSize).length && <Mask 
          canvasImg={canvasImg}
          maskSize={maskSize}
          importSize={importSize}
          setMaskSize={setMaskSize}
        />
      }
    </CanvasCom>
  )
}

export default forwardRef(Canvas)