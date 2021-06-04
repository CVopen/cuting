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

/**
 * @param size 图片位置
 * @param importSize 裁切框位置
 * @returns {
 *  x,  canvas图片偏离左侧
 *  y,  canvas图片偏离顶部
 *  w,  canvas图片宽度
 *  h,  canvas图片高度
 *  dragX, 裁切框偏离左侧
 *  dragY, 裁切框偏离顶部
 *  dragW, 裁切框宽度
 *  dragH, 裁切框高度
 * } 遮罩大小
 */
export const positionMask = (size, importSize) => {
  importSize = importSize.map(item => parseInt(item))
  if (!importSize) {
    return Object.assign(size, {
      dragW: size.w,
      dragH: size.h,
      dragX: size.x,
      dragY: size.y
    })
  }
  if (size.w > importSize[0] || size.h > importSize[1]) {
    size.dragW = importSize[0]
    size.dragX = size.x + (size.w - importSize[0]) / 2
    size.dragH = importSize[1]
    size.dragY = size.y + (size.h - importSize[1]) / 2
  }
  if (size.w <= importSize[0]) {
    size.dragW = size.w
    size.dragX = size.x
    size.dragH = importSize[1] * size.w / importSize[0]
    size.dragY = size.y + (size.h - size.dragH) / 2
  }
  if (size.h <= importSize[1]) {
    size.dragH = size.h
    size.dragW = size.h * importSize[0] / importSize[1]
    size.dragX = size.x + (size.w - size.dragW) / 2
    size.dragY = size.y
  }
  size.dragX = parseInt(size.dragX)
  size.dragY = parseInt(size.dragY)
  return size
}
