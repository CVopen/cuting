## 需要使用外层容器包裹并设置宽高


## react-cuting
### 一个简单易用的图片react裁剪插件


#### install 
```
npm install react-cuting

yarn add react-cuting
```

#### use 
```
import { Cuting } from 'react-cuting'

```

``` html
<Cuting ref={CutingRef} />
```


# react-cuting
<table style="text-align: center">
  <thead>
    <tr>
        <td>名称</td>
        <td>功能</td>
        <td>默认值</td>
        <td>可选值</td>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>size</td>
        <td>裁切框大小</td>
        <td>[80, 80]</td>
        <td></td>
    </tr>
    <tr>
        <td>enlarge</td>
        <td>图片根据截图框输出比例倍数</td>
        <td>1</td>
        <td>1 - max</td>
    </tr>
    <tr>
        <td>canMoveBox</td>
        <td>裁切框是否能够移动</td>
        <td>true</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>info</td>
        <td>裁剪框信息</td>
        <td>true</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>fixed</td>
        <td>是否开启裁切框固定比例</td>
        <td>true</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>outputType</td>
        <td>图片格式</td>
        <td>png</td>
        <td>jpeg || png || webp</td>
    </tr>
    <tr>
        <td>src</td>
        <td>图片地址</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>outputSize</td>
        <td>生成图片质量</td>
        <td>1</td>
        <td>0~1</td>
    </tr>
    <tr>
        <td>onChange</td>
        <td>上传图片的回调</td>
        <td></td>
        <td>success || error</td>
    </tr>
    <tr>
        <td>clear</td>
        <td>清除当前图片</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>import</td>
        <td>导出图片</td>
        <td></td>
        <td>文件名为cuting</td>
    </tr>
    <tr>
        <td>getBase</td>
        <td>获取截图的base64</td>
        <td></td>
        <td>接收一个callback</td>
    </tr>
    <tr>
        <td>getBlob</td>
        <td>获取截图</td>
        <td></td>
        <td>接收一个callback</td>
    </tr>
  </tbody>
</table>

### 内置方法  通过refs 调用


### 示例
``` html
const App = () => {
  const [bool,change] = useState(false)

  const CutingRef = useRef()
  const hanldClick = () => {
    CutingRef.current.import()
  }
  const hanldClear = () => {
    CutingRef.current.clear()
  }

  const changeInput = (info) => {
    console.log(info)
  }

  const hanldBase = () => {
    CutingRef.current.getBase((data) => {
      console.log(data)
    })
  }

  const hanldBlob = () => {
    console.log(CutingRef.current.getBlob())
  }

  return(
    <div style={{height: '600px'}}>
      <Cuting
        ref={CutingRef}
        size={[1000, 2000]}
        enlarge={1}
        canMoveBox={true}
        changeSize={true}
        info
        fixed={bool}
        outputType="gif"
        src="http://p1.music.126.net/LqeJALMTGSzFcXosVoMRhg==/109951166060177875.jpg"
        outputSize={0.5}
        onChange={changeInput}
      />
      <div onClick={()=>change(!bool)}>点我</div>
      <div className="btn" onClick={hanldClick}>触发canvas</div>
      <div className="btn" onClick={hanldClear}>清空</div>
      <div className="btn" onClick={hanldBase}>获取base64</div>
      <div className="btn" onClick={hanldBlob}>获取blob</div>
    </div>
  )
}
```
#### 功能增加和bug请提交issues