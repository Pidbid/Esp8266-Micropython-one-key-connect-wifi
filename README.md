# Esp8266-Micropython-one-key-connect-wifi
MicroPython 一键配网
> 这是一个运行在Esp8266设备（如：ESP12，NideMcu等，以下简称“设备”）上基于Micropython配合微信小程序的一键配网程序，旨在方便调试和开发。
## 这个程序如何使用？
- 下载本仓库至本地
- 将本仓库内mpycon.py文件上传到设备
- 将设备上电，通常VCC使用5V或3.3V
- main.py 内引入本模块
> from mpycon import mpyconnect  
> con = mpyconnect()  
> con.connect()  
- 使用微信扫描图片qrcode.jpg的小小程序码
![image](https://github.com/Pidbid/Esp8266-Micropython-one-key-connect-wifi/blob/master/qrcode.jpg)
- 点击小程序内“连接热点”按钮自动连接热点，若弹出“WiFi权限申请”请点击同意
- 将目的WIFI的账号和密码分别填写完整
- 点击“开始配网”即可开始配网
- 等待配网阶段蓝色LED灯会长亮，连接肿LED会闪亮，配网完成配网会熄灭
- 至此，配网完成
## 这个程序的原理是什么？
> 使用设备创建AP并启动UDP服务，在连接设备信号后，使用UDP进行数据传输，完成配网
## 写这个小功能的初衷是什么？
Arduino有的我希望Mpy也要有，不然怎么Py呢？
## 和之前的版本有什么改变？
首先将配网功能模块化处理，并且将配置文件单独放置在一个文件夹内，与其它文件互不影响  

# 小程序如何使用

我采用uniapp + tmui 的开发方式，代码在miniprogram 目录内，总体来说没什么技术含量，主要是微信提供的udp服务

```
const udps = wx.createUDPSocket()
		udps.bind()
		udps.send({
			address: formData.ip,
			port: formData.port,
			message: JSON.stringify({ login: "yes", ssid: formData.ssid, password: formData.password })
		})
```

> 我个人很推荐(tmui)[https://tmui.design]是一位大佬写的uniapp的UI框架，目前已经到3.0版本了，很值得使用，主要是颜值很高

## 国内介绍地址：
(歪克士WICOS)[https://www.wicos.me/yingjian/868.html]