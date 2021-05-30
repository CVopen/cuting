'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var React = require('react');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

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
var CutingCom = styled__default['default'].div(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  padding: 10px;\n  .btn {\n    height: 50px;\n    background-color: red;\n  }\n  .container {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n    input {\n      opacity: 0;\n      width: 50%;\n      height: 80%;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      &:hover ~ span {\n        border-color: red;\n        color: red;\n      }\n    }\n    span {\n      border: 1px dashed #ccc;\n      transition: all .4s;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 50%;\n      height: 80%;\n      font-size: 500%;\n      border-radius: 10px;\n    }\n  }\n"])));

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

var _templateObject$1;
var MaskCom = styled__default['default'].div(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n  width: calc(100% - 40px);\n  height: calc(100% - 40px);\n  background-color: rgba(0, 0, 0, .6);\n  position: absolute;\n  top: 20px;\n  left: 20px;\n  .mask-img {\n    display: flex;\n    flex-wrap: wrap;\n    position: absolute;\n    cursor: move;\n    top: 0;\n    left: 0;\n    &::after {\n      content: \"+\";\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      color: #fff;\n    }\n    .move {\n      content: \"\";\n      position: absolute;\n      bottom: -10px;\n      right: -10px;\n      background-color: #1588f5;\n      width: 20px;\n      height: 20px;\n      border-radius: 50%;\n      cursor: se-resize !important;\n    }\n    span {\n      box-sizing: border-box;\n      border-radius: 0;\n      width: 33.33%;\n      display: block;\n      height: 33.33%;\n      &:nth-child(3n+1) {\n        border-left: 1px solid #1588f5;\n        border-right: none;\n      }\n      &:nth-child(3n) {\n        border-right: 1px solid #1588f5;\n        border-left: none;\n      }\n      &:nth-child(1),&:nth-child(2), &:nth-child(3) {\n        border-top: 1px solid #1588f5;\n        border-bottom: none;\n      }\n      &:nth-child(4),&:nth-child(5), &:nth-child(6) {\n        border-bottom: none;\n      }\n      &:nth-child(7),&:nth-child(8), &:nth-child(9) {\n        border-bottom: 1px solid #1588f5;\n      }\n    }\n  }\n"])));

function Mask(props) {
  var maskSize = props.maskSize,
      canvasImg = props.canvasImg,
      setMaskSize = props.setMaskSize;
  var maskCom = react.useRef();

  var _useState = react.useState({
    x: 0,
    y: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      maskPosition = _useState2[0],
      changePosition = _useState2[1];

  react.useEffect(function () {
    return init();
  }, []);

  var init = function init() {
    maskCom.current.style.width = maskSize.w + 'px';
    maskCom.current.style.height = maskSize.h + 'px';
    maskCom.current.style.top = maskSize.y + 'px';
    maskCom.current.style.left = maskSize.x + 'px';
    maskCom.current.style.backgroundPosition = "-".concat(maskSize.x, "px -").concat(maskSize.y, "px");
  };

  var movehanldeDrag = function movehanldeDrag(e) {
    e.stopPropagation();
    var w = (maskSize.dragW ? maskSize.dragW : maskSize.w) - (maskPosition.x - e.clientX);
    var h = (maskSize.dragH ? maskSize.dragH : maskSize.h) - (maskPosition.y - e.clientY);

    if (w > maskSize.w) {
      w = maskSize.w;
    }

    if (h > maskSize.h) {
      h = maskSize.h;
    }

    if (maskSize.w + maskSize.x < maskSize.dragX + w) {
      w = maskSize.w + maskSize.x - maskSize.dragX;
    }

    if (maskSize.h + maskSize.y < maskSize.dragY + h) {
      h = maskSize.h + maskSize.y - maskSize.dragY;
    }

    maskCom.current.style.width = w + 'px';
    maskCom.current.style.height = h + 'px';
  };

  var movehanleDragEnd = function movehanleDragEnd(e) {
    e.stopPropagation();
    setMaskSize(Object.assign(maskSize, {
      dragW: parseInt(maskCom.current.style.width),
      dragH: parseInt(maskCom.current.style.height)
    }));
  };

  var moveDown = function moveDown(e) {
    console.log(maskSize);
    e.stopPropagation();
    changePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  var maskDown = function maskDown(e) {
    e.stopPropagation();
    maskPosition.x1 = e.clientX;
    maskPosition.y1 = e.clientY;
    e.target.addEventListener('mousemove', moveMask);
  };

  var moveMask = function moveMask(e) {
    var x = (maskSize.dragX ? maskSize.dragX : maskSize.x) - (maskPosition.x1 - e.x);
    var y = (maskSize.dragY ? maskSize.dragY : maskSize.y) - (maskPosition.y1 - e.y);

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
  };

  var maskUp = function maskUp(e) {
    setMaskSize(Object.assign(maskSize, {
      dragX: parseInt(maskCom.current.style.left),
      dragY: parseInt(maskCom.current.style.top)
    }));
    e.target.removeEventListener("mousemove", moveMask);
  };

  var maskOut = function maskOut(e) {
    setMaskSize(Object.assign(maskSize, {
      dragX: parseInt(maskCom.current.style.left),
      dragY: parseInt(maskCom.current.style.top)
    }));
    e.target.removeEventListener("mousemove", moveMask);
  };

  return /*#__PURE__*/React.createElement(MaskCom, null, /*#__PURE__*/React.createElement("div", {
    className: "mask-img",
    ref: maskCom,
    style: {
      backgroundImage: "url(".concat(canvasImg, ")")
    },
    onMouseDown: maskDown,
    onMouseUp: maskUp,
    onMouseOut: maskOut
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("div", {
    className: "move",
    draggable: "true",
    onDrag: movehanldeDrag,
    onMouseDown: moveDown,
    onDragEnd: movehanleDragEnd
  })));
}

var _templateObject;
var CanvasCom$1 = styled__default['default'].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: hotpink;\n  font-size: 14px;\n  background-color: #ccc;\n\n  width: 100%;\n  height: 100%;\n  background-color: #7b7b7b;\n  background-image: linear-gradient(\n      45deg,\n      #676767 25%,\n      transparent 25%,\n      transparent 75%,\n      #676767 75%\n    ),\n    linear-gradient(\n      45deg,\n      #676767 25%,\n      transparent 25%,\n      transparent 75%,\n      #676767 75%\n    );\n  background-size: 16px 16px;\n  background-position: 0 0, 8px 8px;\n"])));

var Canvas = function Canvas(props, ref) {
  // const { size, src, scale } = props
  var size = props.size,
      src = props.src;
  var canvas;

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
        var a = document.createElement("a");
        a.href = canvasImg;
        a.download = '123.png';
        a.click();
      }
    };
  });

  var init = function init() {
    var reader = new FileReader();
    reader.readAsDataURL(src);

    reader.onload = function (e) {
      var img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        var _positionImg = positionImg(size, img),
            x = _positionImg.x,
            y = _positionImg.y,
            w = _positionImg.w,
            h = _positionImg.h;

        setMaskSize({
          x: x,
          y: y,
          w: w,
          h: h
        });
        canvas = document.querySelector('canvas');
        canvas.getContext("2d").drawImage(img, x, y, w, h);
        setSrc(canvas.toDataURL());
      };
    };
  };

  return /*#__PURE__*/React.createElement(CanvasCom$1, {
    style: {
      width: size.width + 'px',
      height: size.height + 'px'
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    width: size.width,
    height: size.height
  }), Object.getOwnPropertyNames(maskSize).length && /*#__PURE__*/React.createElement(Mask, {
    canvasImg: canvasImg,
    maskSize: maskSize,
    setMaskSize: setMaskSize
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

  var childRef = react.useRef();
  react.useEffect(function () {
    var container = document.querySelector('.container');
    setSize({
      width: parseInt(getComputedStyle(container).width) - 40,
      height: parseInt(getComputedStyle(container).height) - 40
    });
  }, []);

  var change = function change(e) {
    console.log(e.target.files[0]);
    setSrc(e.target.files[0]);
  };

  var importImg = function importImg(src) {
    var a = document.createElement("a");
    a.href = src;
    a.download = '123.png';
    a.click();
  };

  var hanldClick = function hanldClick() {
    childRef.current.importImg();
  };

  return /*#__PURE__*/React.createElement(CutingCom, null, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, src ? /*#__PURE__*/React.createElement(CanvasCom, {
    size: size,
    src: src,
    ref: childRef,
    scale: '1:1'
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    type: "file",
    onChange: change
  }), /*#__PURE__*/React.createElement("span", null, "+"))), /*#__PURE__*/React.createElement("div", {
    className: "btn",
    onClick: function onClick() {
      return setSrc('');
    }
  }, "\u6E05\u7A7A"), /*#__PURE__*/React.createElement("div", {
    className: "btn",
    onClick: importImg
  }, "\u5BFC\u51FA"), /*#__PURE__*/React.createElement("div", {
    className: "btn",
    onClick: hanldClick
  }, "\u89E6\u53D1canvas"));
}

exports.Cuting = Cuting;
