/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import './index.scss'
import { drawBg } from '../_utils/draw'

export default function Center (props) { 
  let canvas
  const [ src, setSrc ] = useState('')
  const [ size, setSize ] = useState(null)
  useEffect(() => {
    const container = document.querySelector('.container')
    setSize({
      width: parseInt(getComputedStyle(container).width) - 40,
      height: parseInt(getComputedStyle(container).height) - 40
    })
  }, [])

  const change = e => {
    console.log(e.target.files[0]);
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = e => {
      const img = new Image()
      img.src = e.target.result
      setSrc(e.target.result)
      img.onload = function () {
        loadPosition(img)
      }
    }
  }

  const loadPosition = (img) => {
    let x, y, w, h
    if (img.width / img.height > size.width / size.height) {
      w = size.width
      h = w * img.height / img.width
      x = 0
      y = (size.height - h) / 2
    } else if (img.width / img.height === size.width / size.height) {
      x = y = 0
      w = size.width
      h = size.height
    } else {
      h = size.height
      w = h * img.width / img.height
      y = 0
      x = (size.width - w) / 2
    }
    canvas = document.querySelector('canvas').getContext("2d")
    drawBg(10, size.width, size.height, canvas)
    canvas.drawImage(img, x, y, w, h)
    setSrc(document.querySelector('canvas').toDataURL())
  }

  const importImg = () => {
    const a = document.createElement("a");
    a.href = src
    a.download = '123.png';
    a.click();
  }

  return (
    <div className='cropper'>
      <div className='container'>
        {
          src ?
          <canvas width={size.width} height={size.height} /> :
          <>
            <input type="file" onChange={change} />
            <span>+</span>
          </>
        }
      </div>
      <div className="btn" onClick={() => setSrc('')}>清空</div>
      <div className="btn" onClick={importImg}>导出</div>
    </div>
  )
}