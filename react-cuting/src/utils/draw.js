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