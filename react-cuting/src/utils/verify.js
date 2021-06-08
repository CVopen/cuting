export const verifyData = (data) => {
  if (data.size && !Array.isArray(data.size)) {
    throw new Error('Error: size value passed in is not an array')
  }
  if (data.enlarge && (typeof data.enlarge !== 'number' || data.enlarge < 1)) {
    throw new Error('Fail: enlarge value passed in is a number and greater than 1')
  }
  if (data.canMoveBox !== undefined && typeof data.canMoveBox !== 'boolean') {
    throw new Error('Fail: canMoveBox value passed in is not Boolean')
  }
  if (data.info !== undefined && typeof data.info !== 'boolean') {
    throw new Error('Fail: info value passed in is not Boolean')
  }
  if (data.outputType !== undefined && typeof data.outputType !== 'string') {
    throw new Error('fixed: outputType value passed in is not String')
  }
  if (data.src && typeof data.src !== 'string') {
    throw new Error('Fail: src value passed in is not String')
  }
  
  if (data.changeSize !== undefined && typeof data.changeSize !== 'boolean') {
    throw new Error('Fail: changeSize value passed in is not Boolean')
  }
  if (data.fixed !== undefined && typeof data.fixed !== 'boolean') {
    throw new Error('Fail: fixed value passed in is not Boolean')
  }
  if (!data.enlarge) data.enlarge = 1
  if (!data.outputType) data.outputType = 'png'
  if (data.changeSize === undefined) data.changeSize = true
  return data
}