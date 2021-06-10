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
 * @param importSize 裁切框大小
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
  if (!importSize) {
    return Object.assign(size, {
      dragW: size.w,
      dragH: size.h,
      dragX: size.x,
      dragY: size.y
    })
  }

  if (size.w / size.h > importSize[0] / importSize[1]) {
    size.dragH = size.h > importSize[1] ? importSize[1] : size.h
    size.dragW = size.dragH * importSize[0] / importSize[1]
  } else if (size.w / size.h === importSize[0] / importSize[1]) {
    size.dragW = size.w > importSize[0] ? importSize[0] : size.w
    size.dragH = size.h > importSize[1] ? importSize[1] : size.h
  } else {
    size.dragW = size.w > importSize[0] ? importSize[0] : size.w
    size.dragH = size.dragW * importSize[1] / importSize[0]
  }
  size.dragX = parseInt(size.x + (size.w - size.dragW) / 2)
  size.dragY = parseInt(size.y + (size.h - size.dragH) / 2)
  size.dragH = size.dragH > 100 ? parseInt(size.dragH) : 100
  size.dragW = size.dragW > 100 ? parseInt(size.dragW) : 100

  return size
}
