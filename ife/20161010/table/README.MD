## table 说明

*准备*：先配置nodejs环境（下面方式1查看效果，不需要，已经打包完成），从终端中进入本目录下，然后执行npm install命令安装依赖的库，可以通过以下两种方式浏览效果。

1. 执行webpack命令将打包文件并生成在assets文件夹下，直接打开index.html即可查看。（已经打包完成）
2. 运行webpack-dev-server查看，在命令行下输入`npm run dev`，会自动打开浏览器查看到效果，需要等待一会。

`var table = new Table('app',data);`中传入2个参数，第一个为需要绑定到页面上的dom元素的`id`。
第二个参数为特定格式的数据。`data`的格式如下

```js
    var data = 
    {
        "title": {
            "id": "编号",
            "name": "姓名",
            "chinese": "语文",
        }, 
        "sortable_title": ["name","chinese", "medicine", "physical"], 
        "sort_mode": ["asc", "desc", "asc"], // 默认升序
        "body": [{  // 需要展示在table中tbody里面的数据
            "id": 0,
            "name": "Jason",
            "chinese": "1",
        }, {
            "id": 1,
            "name": "Charles",
            "chinese": "2",
        }]
	}

	// title为表格中标题需要显示的内容，例如其中id: "编号"是指id列的标题显示为中文编号，
	// 另外，这里面title中每个标题顺序可以改变，也可以只其实其中一部分。比如
	// "title":{"name":"姓名","id":"编号","chinese":"语文"}，则表格只显示3列,
	// 依次为姓名，编号，语文

	// sortable_title是配置可以进行排序的标题。sort_mode是配置sortable_title对应位置
	// 标题是按照升序还是降序排序，如果sort_mode的长度小于sortable_title长度，则
	// sortable_title后面的标题默认按照升序排序。
```

在src文件夹下main.js中 `var table = new Table('app',data);`实例化的table提供`sort_by`接口，如下
```js
	var table = new Table('app',data);
	table.sort_by(['name','chinese'],['asc','desc']);

	// ['name','chinese']是指表中数据以name为第一优先级标准排序，如果两个数据的name
	// 值相同，则以chinese为第二优先级标准对name值相同的数据进行排序，['asc','desc']
	// 分别对应name,chinese的排序方式
```

页面生成的表中有三角箭头的可以点击，切换排序方式。