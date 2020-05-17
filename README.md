# vue-elem
vue版本饿了么
## 布局
1. 主要用flexbox + px布局

## 笔记
[2020-05-17]    

1. clientHeight、offsetHeight、scrollHeight比较 
       
||clientHeight|offsetHeight|scrollHeight|
|----|----:|----|----|
|padding|true|true|true|
|border|false|true|true|
|滚动条高度|false|false|true|
|计算方式|`height` + CSS `padding`|content height + padding + border|clientHeight + scrollTop|    

2.使用scrollHeight判断滚动条滚动到底部    
```javascript
element.scrollHeight - element.scrollTop === element.clientHeight
```    
以上等式还可以判断用户是否阅读过带有滚动条的文本内容。
