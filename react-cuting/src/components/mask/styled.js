import styled from 'styled-components'

const MaskCom = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  background-color: rgba(0, 0, 0, .6);
  position: absolute;
  top: 20px;
  left: 20px;
  .mask-img {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    cursor: move;
    top: 0;
    left: 0;
    &::after {
      content: "+";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
    }
    .move {
      position: absolute;
      /* bottom: -5px;
      right: -5px; */
      background-color: #1588f5;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    span {
      box-sizing: border-box;
      border-radius: 0;
      width: 33.33%;
      display: block;
      height: 33.33%;
      &:nth-child(3n+1) {
        border-left: 1px solid #1588f5;
        border-right: none;
      }
      &:nth-child(3n) {
        border-right: 1px solid #1588f5;
        border-left: none;
      }
      &:nth-child(1),&:nth-child(2), &:nth-child(3) {
        border-top: 1px solid #1588f5;
        border-bottom: none;
      }
      &:nth-child(4),&:nth-child(5), &:nth-child(6) {
        border-bottom: none;
      }
      &:nth-child(7),&:nth-child(8), &:nth-child(9) {
        border-bottom: 1px solid #1588f5;
      }
    }
  }
`
export {
  MaskCom
}