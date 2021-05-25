import './index.scss'
export default function CanvasCom(props){
  let x1, y1
  const { maskSize, canvasImg, setMaskSize } = props
  console.log(maskSize);

  const maskDown = (e) => {
    x1 = e.clientX;
    y1 = e.clientY;
    e.target.addEventListener('mousemove', moveMask)
  }

  const maskUp = (e) => {
    e.target.removeEventListener("mousemove", moveMask)
  }

  const moveMask = (x1, y1, e) => {
    console.log(x1, y1);
    console.log(e);
  }

  return (
    <div className="mask">
      <div 
        className="mask-img" 
        style={{
          height: maskSize.h, 
          width: maskSize.w, 
          top: maskSize.y, 
          left: maskSize.x, 
          backgroundImage: `url(${canvasImg})`, 
          backgroundPosition: `-${maskSize.x}px -${maskSize.y}px`}}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div 
          className="move" 
          onMouseDown={maskDown}
          onMouseUp={maskUp}
        ></div>
      </div>
    </div>
  )
}
