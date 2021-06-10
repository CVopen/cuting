'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var React = require('react');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _templateObject$2;
var CutingCom = styled__default['default'].div(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  padding: 10px;\n  .btn {\n    height: 50px;\n    background-color: red;\n  }\n  .container {\n    width: 100%;\n    height: 100%;\n    min-height: 140px;\n    min-width: 140px;\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n    input {\n      opacity: 0;\n      width: 50%;\n      height: 80%;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      &:hover ~ span {\n        border-color: red;\n        color: red;\n      }\n    }\n    span {\n      border: 1px dashed #ccc;\n      transition: all .4s;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 50%;\n      height: 80%;\n      font-size: 500%;\n      border-radius: 10px;\n    }\n  }\n"])));

var verifyData = function verifyData(data) {
  if (data.size && !Array.isArray(data.size)) {
    throw new Error('Error: size value passed in is not an array');
  }

  if (data.enlarge && (typeof data.enlarge !== 'number' || data.enlarge < 1)) {
    throw new Error('Fail: enlarge value passed in is a number and greater than 1');
  }

  if (data.canMoveBox !== undefined && typeof data.canMoveBox !== 'boolean') {
    throw new Error('Fail: canMoveBox value passed in is not Boolean');
  }

  if (data.info !== undefined && typeof data.info !== 'boolean') {
    throw new Error('Fail: info value passed in is not Boolean');
  }

  if (data.outputType !== undefined && typeof data.outputType !== 'string') {
    throw new Error('fixed: outputType value passed in is not String');
  }

  if (data.src && typeof data.src !== 'string') {
    throw new Error('Fail: src value passed in is not String');
  }

  if (data.changeSize !== undefined && typeof data.changeSize !== 'boolean') {
    throw new Error('Fail: changeSize value passed in is not Boolean');
  }

  if (data.fixed !== undefined && typeof data.fixed !== 'boolean') {
    throw new Error('Fail: fixed value passed in is not Boolean');
  }

  !data.enlarge && (data.enlarge = 1);
  !data.outputType && (data.outputType = 'png');
  data.changeSize === undefined && (data.changeSize = true);

  if (data.fixed && data.canMoveBox === undefined) {
    data.canMoveBox = true;
  }

  return data;
};

/**
 * 确定图片位置
 * @param size 画布大小
 * @param img img DOM对象
 * @returns { x, y, w, h } x,y坐标位置 w,h导入图片大小
 */
var positionImg = function positionImg(size, img) {
  var x, y, w, h;

  if (img.width / img.height > size.width / size.height) {
    w = size.width;
    h = w * img.height / img.width;
    x = 0;
    y = (size.height - h) / 2;
  } else if (img.width / img.height === size.width / size.height) {
    x = y = 0;
    w = size.width;
    h = size.height;
  } else {
    h = size.height;
    w = h * img.width / img.height;
    y = 0;
    x = (size.width - w) / 2;
  }

  return {
    x: x,
    y: y,
    w: w,
    h: h
  };
};
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

var positionMask = function positionMask(size, importSize) {
  if (!importSize) {
    return Object.assign(size, {
      dragW: size.w,
      dragH: size.h,
      dragX: size.x,
      dragY: size.y
    });
  }

  if (size.w / size.h > importSize[0] / importSize[1]) {
    size.dragH = size.h > importSize[1] ? importSize[1] : size.h;
    size.dragW = size.dragH * importSize[0] / importSize[1];
  } else if (size.w / size.h === importSize[0] / importSize[1]) {
    size.dragW = size.w > importSize[0] ? importSize[0] : size.w;
    size.dragH = size.h > importSize[1] ? importSize[1] : size.h;
  } else {
    size.dragW = size.w > importSize[0] ? importSize[0] : size.w;
    size.dragH = size.dragW * importSize[1] / importSize[0];
  }

  size.dragX = parseInt(size.x + (size.w - size.dragW) / 2);
  size.dragY = parseInt(size.y + (size.h - size.dragH) / 2);
  size.dragH = size.dragH > 100 ? parseInt(size.dragH) : 100;
  size.dragW = size.dragW > 100 ? parseInt(size.dragW) : 100;
  return size;
};

var _templateObject$1;
var MaskCom = styled__default['default'].div(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n  width: calc(100% - 40px);\n  height: calc(100% - 40px);\n  background-color: rgba(0, 0, 0, .6);\n  position: absolute;\n  top: 20px;\n  left: 20px;\n  div {\n    user-select: none;\n  }\n  .mask-img {\n    display: flex;\n    flex-wrap: wrap;\n    position: absolute;\n    cursor: move;\n    top: 0;\n    left: 0;\n    &::after {\n      content: \"+\";\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      color: #fff;\n    }\n    .move {\n      position: absolute;\n      background-color: #1588f5;\n      width: 10px;\n      height: 10px;\n      border-radius: 50%;\n    }\n    span {\n      box-sizing: border-box;\n      border-radius: 0;\n      width: 33.33%;\n      display: block;\n      height: 33.33%;\n      &:nth-child(3n+1) {\n        border-left: 1px solid #1588f5;\n        border-right: none;\n      }\n      &:nth-child(3n) {\n        border-right: 1px solid #1588f5;\n        border-left: none;\n      }\n      &:nth-child(1),&:nth-child(2), &:nth-child(3) {\n        border-top: 1px solid #1588f5;\n        border-bottom: none;\n      }\n      &:nth-child(4),&:nth-child(5), &:nth-child(6) {\n        border-bottom: none;\n      }\n      &:nth-child(7),&:nth-child(8), &:nth-child(9) {\n        border-bottom: 1px solid #1588f5;\n      }\n    }\n    .info-w {\n      position: absolute;\n      top: 5px;\n      left: 50%;\n      transform: translateX(-50%);\n      color: #1588f5;\n    }\n    .info-h {\n      position: absolute;\n      top: 50%;\n      left: 5px;\n      transform: translateY(-50%);\n      color: #1588f5;\n    }\n  }\n"])));

function Mask(props) {
  var maskSize = props.maskSize,
      canvasImg = props.canvasImg,
      setMaskSize = props.setMaskSize,
      importSize = props.importSize,
      status = props.status;
  var maskCom = react.useRef();
  var mask = react.useRef();

  var _useState = react.useState({
    x: 0,
    y: 0
  }),
      _useState2 = _slicedToArray(_useState, 1),
      maskPosition = _useState2[0];

  var _useState3 = react.useState([100, 100]),
      _useState4 = _slicedToArray(_useState3, 2),
      cutingSize = _useState4[0],
      changeSize = _useState4[1];

  react.useEffect(function () {
    return init();
  }, [props]);

  var init = function init() {
    maskCom.current.style.width = maskSize.dragW.toFixed(2) + 'px';
    maskCom.current.style.height = maskSize.dragH.toFixed(2) + 'px';
    maskCom.current.style.top = maskSize.dragY + 'px';
    maskCom.current.style.left = maskSize.dragX + 'px';
    maskCom.current.style.backgroundPosition = "-".concat(maskSize.dragX, "px -").concat(maskSize.dragY, "px");
    initCutingSize();
  };

  var initCutingSize = function initCutingSize() {
    var dragW = maskSize.dragW,
        dragH = maskSize.dragH;

    if (importSize) {
      if (dragW < 100 || dragH < 100) {
        if (dragW > dragH) {
          changeSize([importSize[0] * dragH / importSize[1], dragH]);
        } else {
          changeSize([dragW, importSize[1] * dragW / importSize[0]]);
        }

        return;
      }

      changeSize([importSize[0] * cutingSize[1] / importSize[1], cutingSize[1]]);
    }

    if (!importSize && (dragW < 100 || dragH < 100)) {
      var size = dragW > dragH ? dragH : dragW;
      changeSize([size, size]);
    }
  };

  var validateW = function validateW(dragW) {
    var dragX = maskSize.dragX;
    if (dragW > maskSize.w) dragW = maskSize.w;

    if (maskSize.w + maskSize.x < dragX + dragW) {
      dragW = maskSize.w + maskSize.x - dragX;
    }

    if (dragW < cutingSize[0]) dragW = cutingSize[0];
    return dragW;
  };

  var validateH = function validateH(dragH) {
    var dragY = maskSize.dragY;
    if (dragH > maskSize.h) dragH = maskSize.h;

    if (maskSize.h + maskSize.y < dragY + dragH) {
      dragH = maskSize.h + maskSize.y - dragY;
    }

    if (dragH < cutingSize[1]) dragH = cutingSize[1];
    return dragH;
  };

  var validateX = function validateX(dragX) {
    if (dragX <= maskSize.x) dragX = maskSize.x;

    if (dragX >= maskSize.x + maskSize.w - cutingSize[0]) {
      dragX = maskSize.x + maskSize.w - cutingSize[0];
    }

    return dragX;
  };

  var validateY = function validateY(dragY) {
    if (dragY <= maskSize.y) dragY = maskSize.y;

    if (dragY >= maskSize.y + maskSize.h - cutingSize[1]) {
      dragY = maskSize.y + maskSize.h - cutingSize[1];
    }

    return dragY;
  };

  var moveDown = function moveDown(e) {
    e.stopPropagation();
    maskPosition.x = e.clientX;
    maskPosition.y = e.clientY;
    document.addEventListener('mousemove', movehanldeDrag);
  };

  var movehanldeDrag = function movehanldeDrag(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    if (!e.clientX) return;
    var dragW = maskSize.dragW,
        dragH = maskSize.dragH,
        dragX = maskSize.dragX,
        dragY = maskSize.dragY;

    switch (e.target.style.cursor) {
      case 'nw-resize':
        dragW = validateW(dragW + (maskPosition.x - e.clientX));
        dragH = validateH(dragH + (maskPosition.y - e.clientY));
        dragX = validateX(dragX + maskSize.dragW - dragW);
        dragY = validateY(dragY + maskSize.dragH - dragH);
        break;

      case 'ne-resize':
        dragW = validateW(dragW - (maskPosition.x - e.clientX));
        dragH = validateH(dragH + (maskPosition.y - e.clientY));
        dragY = validateY(dragY + maskSize.dragH - dragH);
        break;

      case 'sw-resize':
        dragW = validateW(dragW + (maskPosition.x - e.clientX));
        dragH = validateH(dragH - (maskPosition.y - e.clientY));
        dragX = validateX(dragX + maskSize.dragW - dragW);
        break;

      case 'se-resize':
        dragW = validateW(dragW - (maskPosition.x - e.clientX));

        if (status.fixed) {
          dragH = validateH(cutingSize[1] * dragW / cutingSize[0]);
          dragH === cutingSize[1] && (dragW = cutingSize[0]);
        } else {
          dragH = validateH(dragH - (maskPosition.y - e.clientY));
        }

        break;

      case 's-resize':
        dragH = validateH(dragH + (maskPosition.y - e.clientY));
        dragY = validateY(dragY + maskSize.dragH - dragH);
        break;

      case 'e-resize':
        dragW = validateW(dragW + (maskPosition.x - e.clientX));
        dragX = validateX(dragX + maskSize.dragW - dragW);
        break;

      case 'w-resize':
        dragW = validateW(dragW - (maskPosition.x - e.clientX));
        break;

      case 'n-resize':
        dragH = validateH(dragH - (maskPosition.y - e.clientY));
        break;
    }

    maskCom.current.style.width = dragW + 'px';
    maskCom.current.style.height = dragH + 'px';
    maskCom.current.style.left = dragX + 'px';
    maskCom.current.style.top = dragY + 'px';
    maskCom.current.style.backgroundPosition = "-".concat(dragX, "px -").concat(dragY, "px");
    document.querySelector('.info-w').innerHTML = dragW.toFixed(2);
    document.querySelector('.info-h').innerHTML = dragH.toFixed(2);
    return false;
  };

  var moveOut = function moveOut(e) {
    e && e.stopPropagation();
    setMaskSize(Object.assign(maskSize, {
      dragW: parseInt(maskCom.current.style.width),
      dragH: parseInt(maskCom.current.style.height),
      dragX: parseInt(maskCom.current.style.left),
      dragY: parseInt(maskCom.current.style.top)
    }));
    document.removeEventListener("mousemove", movehanldeDrag);
  };

  var maskDown = function maskDown(e) {
    if (!status.canMoveBox) return;
    e.stopPropagation();
    maskPosition.x = e.clientX;
    maskPosition.y = e.clientY;
    document.addEventListener('mousemove', maskMove);
  };

  var maskMove = function maskMove(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    var x = maskSize.dragX - (maskPosition.x - e.x);
    var y = maskSize.dragY - (maskPosition.y - e.y);

    if (maskSize.x > x) {
      x = maskSize.x;
    }

    if (x > maskSize.x + maskSize.w - maskSize.dragW) {
      x = maskSize.x + maskSize.w - maskSize.dragW;
    }

    if (maskSize.y > y) {
      y = maskSize.y;
    }

    if (y > maskSize.y + maskSize.h - maskSize.dragH) {
      y = maskSize.y + maskSize.h - maskSize.dragH;
    }

    maskCom.current.style.left = x + 'px';
    maskCom.current.style.top = y + 'px';
    maskCom.current.style.backgroundPosition = "-".concat(x, "px -").concat(y, "px");
    return false;
  };

  var maskOut = function maskOut() {
    setMaskSize(Object.assign(maskSize, {
      dragX: parseInt(maskCom.current.style.left),
      dragY: parseInt(maskCom.current.style.top)
    }));
    document.removeEventListener("mousemove", maskMove);
  };

  var createdMoveList = function createdMoveList() {
    var arr = [{
      top: '-5px',
      left: '-5px',
      cursor: 'nw-resize'
    }, {
      top: '-5px',
      right: '-5px',
      cursor: 'ne-resize'
    }, {
      bottom: '-5px',
      left: '-5px',
      cursor: 'sw-resize'
    }, {
      bottom: '-5px',
      right: '-5px',
      cursor: 'se-resize'
    }, {
      top: '-5px',
      left: 'calc(50% - 5px)',
      cursor: 's-resize'
    }, {
      top: 'calc(50% - 5px)',
      left: '-5px',
      cursor: 'e-resize'
    }, {
      top: 'calc(50% - 5px)',
      right: '-5px',
      cursor: 'w-resize'
    }, {
      bottom: '-5px',
      left: 'calc(50% - 5px)',
      cursor: 'n-resize'
    }];
    status.fixed && (arr = [arr[3]]);
    return arr.map(function (item, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "move",
        draggable: "true",
        style: item,
        onMouseDown: moveDown,
        onMouseUp: moveOut,
        onMouseOut: moveOut
      });
    });
  };

  return /*#__PURE__*/React.createElement(MaskCom, {
    ref: mask
  }, /*#__PURE__*/React.createElement("div", {
    className: "mask-img",
    ref: maskCom,
    style: {
      backgroundImage: "url(".concat(canvasImg, ")")
    },
    onMouseDown: maskDown,
    onMouseUp: maskOut,
    onMouseOut: maskOut
  }, Array(9).fill(0).map(function (_, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i
    });
  }), status.changeSize && createdMoveList(), status.info && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "info-w"
  }, maskSize.dragW.toFixed(2)), /*#__PURE__*/React.createElement("div", {
    className: "info-h"
  }, maskSize.dragH.toFixed(2)))));
}

var _templateObject;
var CanvasCom$1 = styled__default['default'].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  font-size: 14px;\n  width: 100%;\n  height: 100%;\n  background-color: #7b7b7b;\n  background-image: linear-gradient(\n      45deg,\n      #676767 25%,\n      transparent 25%,\n      transparent 75%,\n      #676767 75%\n    ),\n    linear-gradient(\n      45deg,\n      #676767 25%,\n      transparent 25%,\n      transparent 75%,\n      #676767 75%\n    );\n  background-size: 16px 16px;\n  background-position: 0 0, 8px 8px;\n  img {\n    width: 60px;\n    height: 60px;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n  }\n"])));

var img = "data:image/gif;base64,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";

var Canvas = function Canvas(props, ref) {
  var size = props.size,
      src = props.src,
      importSize = props.importSize,
      status = props.status;

  var _useState = react.useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      canvasImg = _useState2[0],
      setSrc = _useState2[1];

  var _useState3 = react.useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      maskSize = _useState4[0],
      setMaskSize = _useState4[1];

  react.useEffect(function () {
    return init();
  }, []);
  react.useImperativeHandle(ref, function () {
    return {
      importImg: function importImg() {
        var newCanvas = document.createElement('canvas');
        newCanvas.width = maskSize.dragW * status.enlarge;
        newCanvas.height = maskSize.dragH * status.enlarge;
        loadImgToCanvas(canvasImg, importCb(newCanvas));
      }
    };
  });

  var importCb = function importCb(newCanvas) {
    return function (img) {
      newCanvas.getContext("2d").drawImage(img, maskSize.dragX, maskSize.dragY, maskSize.dragW, maskSize.dragH, 0, 0, newCanvas.width, newCanvas.height);
      var a = document.createElement("a");
      a.href = newCanvas.toDataURL();
      a.download = '123.png';
      a.click();
    };
  };

  var init = function init() {
    if (_typeof(src) === 'object') {
      var reader = new FileReader();
      reader.readAsDataURL(src);

      reader.onload = function (e) {
        loadImgToCanvas(e.target.result, initCanvasSize);
      };

      return;
    }

    loadImgToCanvas(src, initCanvasSize);
  };

  var loadImgToCanvas = function loadImgToCanvas(src, cb) {
    var img = new Image();
    img.src = src;
    img.crossOrigin = '*';

    img.onload = function () {
      return cb(img);
    };
  };

  var initCanvasSize = function initCanvasSize(img) {
    var _positionImg = positionImg(size, img),
        x = _positionImg.x,
        y = _positionImg.y,
        w = _positionImg.w,
        h = _positionImg.h;

    var canvas = document.querySelector('canvas');
    canvas.getContext("2d").drawImage(img, x, y, w, h);
    console.log('OK了');
    setSrc(canvas.toDataURL());
    setMaskSize(positionMask({
      x: x,
      y: y,
      w: w,
      h: h
    }, importSize));
  };

  return /*#__PURE__*/React.createElement(CanvasCom$1, {
    style: {
      width: size.width + 'px',
      height: size.height + 'px'
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    width: size.width,
    height: size.height
  }), Object.getOwnPropertyNames(maskSize).length ? /*#__PURE__*/React.createElement(Mask, {
    canvasImg: canvasImg,
    maskSize: maskSize,
    importSize: importSize,
    setMaskSize: setMaskSize,
    status: status
  }) : /*#__PURE__*/React.createElement("img", {
    src: img
  }));
};

var CanvasCom = /*#__PURE__*/react.forwardRef(Canvas);

function Cuting(props) {
  var _useState = react.useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      src = _useState2[0],
      setSrc = _useState2[1];

  var _useState3 = react.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      size = _useState4[0],
      setSize = _useState4[1];

  var _useState5 = react.useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      data = _useState6[0],
      changeData = _useState6[1];

  var childRef = react.useRef();
  react.useEffect(function () {
    var container = document.querySelector('.container');
    setSize({
      width: parseInt(getComputedStyle(container).width) - 40,
      height: parseInt(getComputedStyle(container).height) - 40
    });
    initData();
  }, [props]);

  var change = function change(e) {
    console.log(e.target.files[0]);

    if (e.target.files[0].size > 1024 * 5) {
      console.log('太大了');
      return;
    }

    setSrc(e.target.files[0]);
  };

  var initData = function initData() {
    changeData(verifyData({
      size: props.size,
      enlarge: props.enlarge,
      canMoveBox: props.canMoveBox,
      info: props.info,
      fixed: props.fixed,
      outputType: props.outputType,
      src: props.src,
      changeSize: props.changeSize
    }));
    props.src && setSrc(props.src);
  };

  return /*#__PURE__*/React.createElement(CutingCom, null, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, src ? /*#__PURE__*/React.createElement(CanvasCom, {
    size: size,
    importSize: data.size,
    scale: data.scale,
    src: src,
    ref: childRef,
    status: data
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    type: "file",
    onChange: change
  }), /*#__PURE__*/React.createElement("span", null, "+"))));
}

exports.Cuting = Cuting;
