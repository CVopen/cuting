export const drawBg = (size, w, h, ctx) => {
  const width = parseInt(w / size)
  const height = parseInt(h / size)
  let color1 = '#7b7b7b'
  let color2 = '#676767'
  for (let i = 0; i < width; i++) {
    if (height % 2 === 0) {
      [ color1, color2 ] = [color2 , color1 ]
    }
    for (let j = 0; j < height; j++) {
      [ color1, color2 ] = [color2 , color1 ]
      drawLine(i * size, j * size, size, size, color1, ctx)
    }
  }
  
  // 补齐剩下背景
  if (w > width * size || h > height * size) {
    if (ctx.getImageData(width * size - size, 1, 1, 1).data[0] === 103) {
      color2 = '#7b7b7b'
      color1 = '#676767'
    } else {
      color1 = '#7b7b7b'
      color2 = '#676767'
    }
    const patchW = w - width * size
    for (let index = 0; index < height; index++) {
      [ color1, color2 ] = [color2 , color1 ]
      drawLine(width * size, index * size, patchW, size, color1, ctx)
    }

    if (ctx.getImageData(height * size - size, 1, 1, 1).data[0] === 103) {
      color2 = '#7b7b7b'
      color1 = '#676767'
    } else {
      color1 = '#7b7b7b'
      color2 = '#676767'
    }
    const patchH = h - height * size
    for (let index = 0; index < width; index++) {
      [ color1, color2 ] = [color2 , color1 ]
      drawLine(index * size, height * size, size, patchH, color1, ctx)
    }

    [ color1, color2 ] = [color2 , color1 ]
    drawLine(width * size, height * size, patchW, patchH, color1, ctx)
  }
}

const drawLine = (x1, y1, x2, y2, color, ctx) => {
  ctx.beginPath()
  ctx.rect(x1, y1, x2, y2)
  ctx.strokeStyle = color
  ctx.stroke() // 着色
  ctx.fillStyle = color
  ctx.fill()
  // 结束路径
  ctx.closePath()
}