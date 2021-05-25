/* eslint-disable react-hooks/exhaustive-deps */
import { 
  useState, 
  useEffect, 
  useImperativeHandle, 
  forwardRef 
} from 'react'
import { drawBg, positionImg } from '../../../_utils/draw'
import Mask from '../mask/index'

const CanvasCom = (props, ref) => {
  const { size, src, scale } = props
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
        drawBg(10, size.width, size.height, canvas.getContext("2d"))
        canvas.getContext("2d").drawImage(img, x, y, w, h)
        setSrc(canvas.toDataURL())
      }
    }
  }
  return (
    <>
      <canvas width={size.width} height={size.height} />
      <Mask 
        canvasImg={canvasImg}
        maskSize={maskSize}
        setMaskSize={setMaskSize}
      />
    </>
  )
}

export default forwardRef(CanvasCom)