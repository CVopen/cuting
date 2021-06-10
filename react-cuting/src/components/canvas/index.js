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
import loadingImg from '../../assets/imgs/loading.gif'

const Canvas = (props, ref) => {
  const { 
    size, 
    src, 
    importSize,
    status 
  } = props
  
  const [ canvasImg, setSrc ] = useState('')
  const [ maskSize, setMaskSize ] = useState({})

  useEffect(() => init(), [])

  useImperativeHandle(ref, () => ({
    importImg: () => {
      const newCanvas = document.createElement('canvas');
      newCanvas.width = maskSize.dragW * status.enlarge;
      newCanvas.height = maskSize.dragH * status.enlarge;
      loadImgToCanvas(canvasImg, importCb(newCanvas))
    }
  }));

  const importCb = newCanvas => {
    return img => {
      newCanvas.getContext("2d").drawImage(img, maskSize.dragX, maskSize.dragY, maskSize.dragW, maskSize.dragH, 0, 0, newCanvas.width, newCanvas.height)

      const a = document.createElement("a");
      a.href = newCanvas.toDataURL()
      a.download = '123.png';
      a.click();
    }
  }

  const init = () => {
    if (typeof src === 'object') {
      const reader = new FileReader()
      reader.readAsDataURL(src)
      reader.onload = e => {
        loadImgToCanvas(e.target.result, initCanvasSize)
      }
      return
    }
    loadImgToCanvas(src, initCanvasSize)
  }
  const loadImgToCanvas = (src, cb) => {
    const img = new Image()
    img.src = src
    img.crossOrigin = '*'
    img.onload = () => cb(img)
  }

  const initCanvasSize = (img) => {
    const { x, y, w, h } = positionImg(size, img)
    const canvas = document.querySelector('canvas')
    canvas.getContext("2d").drawImage(img, x, y, w, h)
    console.log('OK了')
    setSrc(canvas.toDataURL())
    setMaskSize(positionMask({ x, y, w, h }, importSize))
  }

  return (
    <CanvasCom style={{width: size.width + 'px', height: size.height + 'px'}}>
      <canvas width={size.width} height={size.height} />
      {
        Object.getOwnPropertyNames(maskSize).length ? 
        <Mask 
          canvasImg={canvasImg}
          maskSize={maskSize}
          importSize={importSize}
          setMaskSize={setMaskSize}
          status={status}
        /> :
        <img src={loadingImg}/>
      }
    </CanvasCom>
  )
}

export default forwardRef(Canvas)