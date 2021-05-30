/* eslint-disable react-hooks/exhaustive-deps */
import { 
  useState, 
  useEffect, 
  useImperativeHandle, 
  forwardRef 
} from 'react'
import { positionImg } from '../../utils/draw'
import Mask from '../mask/index'
import { CanvasCom } from './css'

const Canvas = (props, ref) => {
  // const { size, src, scale } = props
  const { size, src } = props
  let canvas
  const [ canvasImg, setSrc ] = useState('')
  const [ maskSize, setMaskSize ] = useState({})
  useEffect(() => init(), [])

  useImperativeHandle(ref, () => ({
    importImg: () => {
      const a = document.createElement("a");
      a.href = canvasImg
      a.download = '123.png';
      a.click();
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
        setMaskSize({ x, y, w, h })
        canvas = document.querySelector('canvas')
        canvas.getContext("2d").drawImage(img, x, y, w, h)
        setSrc(canvas.toDataURL())
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
          setMaskSize={setMaskSize}
        />
      }
    </CanvasCom>
  )
}

export default forwardRef(Canvas)