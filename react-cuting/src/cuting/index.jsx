/* eslint-disable react-hooks/exhaustive-deps */
import { 
  useEffect, 
  useState, 
  useRef 
} from 'react'
import './index.scss'
import CanvasCom from './components/canvas/index'

export default function Center (props) { 
  const [ src, setSrc ] = useState('')
  const [ size, setSize ] = useState(null)
  const childRef = useRef()
  useEffect(() => {
    const container = document.querySelector('.container')
    setSize({
      width: parseInt(getComputedStyle(container).width) - 40,
      height: parseInt(getComputedStyle(container).height) - 40
    })
  }, [])

  const change = e => {
    console.log(e.target.files[0]);
    setSrc(e.target.files[0])
  }

  const importImg = (src) => {
    const a = document.createElement("a");
    a.href = src
    a.download = '123.png';
    a.click();
  }

  const hanldClick = () => {
    childRef.current.importImg()
  }

  return (
    <div className='cropper'>
      <div className='container'>
        {
          src ?
          <CanvasCom 
            size={size}
            src={src}
            ref={childRef}
            scale={'1:1'}
          /> :
          <>
            <input type="file" onChange={change} />
            <span>+</span>
          </>
        }
      </div>
      <div className="btn" onClick={() => setSrc('')}>清空</div>
      <div className="btn" onClick={importImg}>导出</div>
      <div className="btn" onClick={hanldClick}>触发canvas</div>
    </div>
  )
}