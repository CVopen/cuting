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
 * @param scale 图片比例
 * @param { dragW, dragH } 裁切框尺寸
 */
export const positionMask = (size, importSize, scale) => {
  if (importSize) {
    // 如果传入导出文件大小 就按照导出文件大小的比例
    return calcImportSize(size, importSize)
  }
  if (scale) {
    // 如果传入了导出文件比例 就按照导出文件比例
    return calcScale(size, scale)
  }
  // 如果没有就按照截取部分的比例导出等比例大小的图片
}

/**
 * @param size 图片位置
 * @param importSize 裁切框位置
 * @param { dragW, dragH, imgScale } 裁切框尺寸
 */
const calcImportSize = (size, importSize) => {
  return { dragW, dragH, imgScale }
}

/**
 * @param size 图片位置
 * @param scale 裁切框比例
 * @param { dragW, dragH, imgScale } 裁切框尺寸
 */
const calcScale = (size, scale) => {
  return { dragW, dragH, imgScale }
}