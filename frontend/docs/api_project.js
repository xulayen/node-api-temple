define({
  "name": "项目名称",
  "version": "1.0.0",
  "description": "描述",
  "title": "文档标题",
  "url": "http://10.20.26.19:8012/api",
  "header": {
    "title": "关于文档",
    "content": "<h4>VUE调用NODEJS-API文档。</h4>\n<ul>\n<li>查看<a href='/'>示例</a></li>\n</ul>\n<h3>统一说明</h3>\n<blockquote>\n<p>返回字段</p>\n</blockquote>\n<table>\n<thead>\n<tr>\n<th>字段</th>\n<th>类型</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>success</td>\n<td>bool</td>\n<td>是否成功</td>\n</tr>\n<tr>\n<td>code</td>\n<td>int</td>\n<td><a href=\"#api-_footer\">状态码</a></td>\n</tr>\n<tr>\n<td>result</td>\n<td>string</td>\n<td>api接口说明</td>\n</tr>\n<tr>\n<td>data</td>\n<td>object</td>\n<td>数据集</td>\n</tr>\n</tbody>\n</table>\n"
  },
  "footer": {
    "title": "系统状态",
    "content": "<h2>系统状态</h2>\n<blockquote>\n<p>系统状态<code>10000000</code>为成功，其他都是失败！</p>\n</blockquote>\n<ul>\n<li>状态码说明<code>10,00,0000</code>，</li>\n<li>前两位<code>10</code>是成功、<code>20</code>是失败、<code>30</code>是出现异常</li>\n<li>第三四位<code>00</code>代表当前<a href=\"#moduleType\">模块</a></li>\n<li>最后四位<code>0000</code>是状态编码</li>\n</ul>\n<table>\n<thead>\n<tr>\n<th>字段</th>\n<th>类型</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>10000000</td>\n<td>int</td>\n<td>成功</td>\n</tr>\n</tbody>\n</table>\n"
  },
  "order": [
    "Error",
    "Define",
    "PostTitleAndError",
    "PostError"
  ],
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2019-11-08T10:03:07.975Z",
    "url": "http://apidocjs.com",
    "version": "0.17.7"
  }
});
