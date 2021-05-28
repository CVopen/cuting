/**
 * 绘制背景
 * @param size 绘制矩形尺寸
 * @param w 绘制区域宽
 * @param h 绘制区域高
 * @param ctx canvas
 */

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
      drawRect(i * size, j * size, size, size, color1, ctx)
    }
  }
  
  // 补齐剩下背景
  if (w > width * size || h > height * size) {
    // if (ctx.getImageData(width * size - size, 1, 1, 1).data[0] === 103) {
    //   color2 = '#7b7b7b'
    //   color1 = '#676767'
    // } else {
    //   color1 = '#7b7b7b'
    //   color2 = '#676767'
    // }
    [ color1, color2 ] = [color2 , color1 ]
    const patchW = w - width * size
    for (let index = 0; index < height; index++) {
      [ color1, color2 ] = [color2 , color1 ]
      drawRect(width * size, index * size, patchW, size, color1, ctx)
    }
    // if (ctx.getImageData(height * size - size, 1, 1, 1).data[0] === 103) {
    //   color2 = '#7b7b7b'
    //   color1 = '#676767'
    // } else {
    //   color1 = '#7b7b7b'
    //   color2 = '#676767'
    // }
    // [ color1, color2 ] = [color2 , color1 ]
    const patchH = h - height * size
    for (let index = 0; index < width; index++) {
      [ color1, color2 ] = [color2 , color1 ]
      drawRect(index * size, height * size, size, patchH, color1, ctx)
    }

    [ color1, color2 ] = [color2 , color1 ]
    drawRect(width * size, height * size, patchW, patchH, color1, ctx)
  }
}

/**
 * 绘制矩形
 * @param x1 位置
 * @param y1 位置
 * @param x2 绘制矩形尺寸
 * @param y2 绘制矩形尺寸
 * @param color 矩形颜色
 * @param ctx 绘制方格尺寸
 */
const drawRect = (x1, y1, x2, y2, color, ctx) => {
  ctx.beginPath()
  ctx.rect(x1, y1, x2, y2)
  ctx.strokeStyle = color
  ctx.stroke()
  ctx.fillStyle = color
  ctx.fill()
  ctx.closePath()
}

/**
 * 确定图片位置
 * @param size 画布大小
 * @param img img DOM对象
 * @returns { x, y, w, h } x,y坐标位置 w,h导入图片大小
 */
export const positionImg = (size, img) => {
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
  return { x, y, w, h }
}