/* eslint-disable react-hooks/exhaustive-deps */
import React, { 
  useEffect, 
  useState, 
  useRef,
  useImperativeHandle, 
  forwardRef 
} from 'react'
import { CutingCom } from './styled'
import { verifyData } from '../utils/verify'
import CanvasCom from '../components/canvas/index'

const Cuting = (props, ref) => { 
  const [ src, setSrc ] = useState('')
  const [ size, setSize ] = useState(null)
  const [ data, changeData ] = useState(null)
  const childRef = useRef()
  useEffect(() => {
    const container = document.querySelector('.container')
    setSize({
      width: parseInt(getComputedStyle(container).width) - 40,
      height: parseInt(getComputedStyle(container).height) - 40
    })
    initData()
  }, [props])

  useImperativeHandle(ref, () => ({
    import: () => {
      childRef.current.importImg()
    },
    clear: setSrc,
    getBase: (callback) => childRef.current.importBase(callback),
    getBlob: (callback) => childRef.current.importBlob(callback)
  }));

  const change = e => {
    if (e.target.files[0].size > (1 << 20) * 5) {
      props.onChange('error')
      return
    }
    setSrc(e.target.files[0])
  }
  
  const initData = () => {
    changeData(verifyData({
      size: props.size,
      enlarge: props.enlarge,
      canMoveBox: props.canMoveBox,
      info: props.info,
      fixed: props.fixed,
      outputType: props.outputType,
      src: props.src,
      changeSize: props.changeSize
    }))
    props.src && setSrc(props.src)
  }

  return (
    <CutingCom>
      <div className='container'>
        {
          src ?
          <CanvasCom 
            size={size}
            importSize={data.size}
            scale={data.scale}
            src={src}
            ref={childRef}
            status={data}
            onChange={props.onChange}
          /> :
          <>
            <input type="file" onChange={change} />
            <span>+</span>
          </>
        }
      </div>
    </CutingCom>
  )
}

export default forwardRef(Cuting)