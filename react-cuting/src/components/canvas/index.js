/* eslint-disable react-hooks/exhaustive-deps */
import React, { 
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
    importImg: () => importType('img'),
    importBase: (callback) => importType('base64', callback),
    importBlob: (callback) => importType('blob', callback)
  }));

  const importType = (type, callback) => {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = maskSize.dragW * status.enlarge;
    newCanvas.height = maskSize.dragH * status.enlarge;
    
    loadImgToCanvas(src, importCb(newCanvas, type, callback))
  }

  const importCb = (newCanvas, type, callback) => {
    return img => {
      const context = newCanvas.getContext("2d")
      context.drawImage(img, maskSize.dragX, maskSize.dragY, maskSize.dragW, maskSize.dragH, 0, 0, newCanvas.width, newCanvas.height)
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;

      switch (type) {
        case 'img':
          const a = document.createElement("a");
          a.href = newCanvas.toDataURL('image/' + status.outputType, status.outputSize)
          a.download = 'cuting'
          a.click()
          return
        case 'base64':
          callback(newCanvas.toDataURL())
          return 
        case 'blob':
          callback(dataURItoBlob(newCanvas.toDataURL()))
          return 
      }
    }
  }
  const dataURItoBlob = (dataURI) => {
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
    var byteString = atob(dataURI.split(',')[1]); //base64 解码
    var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
    var intArray = new Uint8Array(arrayBuffer); //创建视图
    for (var i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], {type: mimeString});
  
  }
  const init = () => {
    if (typeof src === 'object') {
      const reader = new FileReader()
      reader.readAsDataURL(src)
      reader.onload = e => {
        loadImgToCanvas(e.target.result, initCanvasSize)
      }
    }
    loadImgToCanvas(src, initCanvasSize)
  }
  const loadImgToCanvas = (src, cb) => {
    const img = new Image()
    img.src = src
    img.crossOrigin = '*'
    img.onload = () => {
      cb(img)
    }
  }

  // 初始化图片
  const initCanvasSize = (img) => {
    const { x, y, w, h } = positionImg(size, img)
    const canvas = document.querySelector('canvas')
    canvas.getContext("2d").drawImage(img, x, y, w, h)
    props.onChange('success')
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