import styled from 'styled-components'

const CutingCom = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  .btn {
    height: 50px;
    background-color: red;
  }
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    input {
      opacity: 0;
      width: 50%;
      height: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &:hover ~ span {
        border-color: red;
        color: red;
      }
    }
    span {
      border: 1px dashed #ccc;
      transition: all .4s;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 80%;
      font-size: 500%;
      border-radius: 10px;
    }
  }
`
export {
  CutingCom
}