/* eslint-disable react-hooks/exhaustive-deps */
import { 
  useEffect, 
  useState, 
  useRef 
} from 'react'
import { CutingCom } from './styled'
import CanvasCom from '../components/canvas/index'

export default function Cuting (props) { 
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

  const importImg = () => {
    console.log('cuting')
  }

  const hanldClick = () => {
    childRef.current.importImg()
  }

  return (
    <CutingCom>
      <div className='container'>
        {
          src ?
          <CanvasCom 
            size={size}
            importSize={props.size.split(',')}
            scale={props.scale}
            src={src}
            ref={childRef}
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
    </CutingCom>
  )
}