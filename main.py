# -*- coding: utf-8 -*-
import network
import time
from machine import Pin
import os
from socket import *
import json
#{"wifiConfig": {"ssid": "", "password": ""}, "firstload": "yes"}

def wifi_connect(name,psd):
    sta_if = network.WLAN(network.STA_IF)
    sta_if.active(True)
    sta_if.connect(name,psd)
    for i in range(10):
        time.sleep(1)
        print(i+1,'attempt at connection')
    if sta_if.isconnected()==True:
        a='WiFi connection successful'
        print(a,sta_if.ifconfig())
        return True
    else:
        a='WiFi connection failed. Please try again'
        print(a)
        return False

def wifi_disconnect():
    sta_if = network.WLAN(network.STA_IF); 
    sta_if.active(False)
    a='WiFi disconnected successfully'
    return a

def wifi_ap(name,psd):
    ap_if = network.WLAN(network.AP_IF)
    ap_if.config(essid=name, authmode=network.AUTH_WPA_WPA2_PSK, password=psd)
    for i in range(5):
        time.sleep(1)
        print('The AP build......')
    a='The AP was created successfully, and you are now ready to connect.'
    print(ap_if.ifconfig())
    print(a)

def readJson(filePath):
    with open(filePath,'rb') as fp:
        a = json.load(fp)
    return a

def writeJson(filepath,msg):

    with open(filepath,'w+',encoding='utf-8') as fp:
        #fp.write(json.dumps(msg, indent=4))

        json.dump(msg, fp)

def creatUdp():
    rt='{"connect":"no"}'
    udp_socket=socket(AF_INET,SOCK_DGRAM)
    print('UDP services is ready')#2、绑定本地相关信息，如果不绑定，则随机分配
    local_addr=('',7788)#ip地址和端口号，IP不写表示本机任何一个ip
    udp_socket.bind(local_addr)#3、等待接收对方发送的数据
    recv_data=udp_socket.recvfrom(1024)#1024表示本次接收的最大字节
    #recv_data存储的是一个元组（发送方ip，Port
    recv_msg=recv_data[0]
    send_addr=recv_data[1]
    #4、显示接收到的数据
    recvMsg = recv_msg.decode("gbk")
    print("%s:%s"% (str(send_addr),recv_msg.decode("gbk")))
    a=json.loads(recvMsg)
    if a['login']=='yes':
      rt='{"connect":"yes"}'
      if a['ssid'] != '':
          ssid = a['ssid']
          if a['password'] != '':
              password = a['password']
              rt = '{"login":"yes","ssid":"' + ssid + '","password":"' + password + '"}'
    #udp_socket.close()
    return rt

def ledChang():
  d = Pin(2,Pin.OUT)
  d.value(0)
  return d

def ledSan():
  
  for i in range(10):
    d.value(0)
    time.sleep(500)
    d.value(1)

def firstLoad():
  a = readJson('config.json')
  if a['firstload'] == 'yes':
    return True
  else:
    return False
  
  
if __name__=="__main__":
    time.sleep(3)
    #wifi_connect("TP-LINK_A2E3","doctorli1742220663")
    wifi_ap("HelpHero","123456789")
    if firstLoad():
        while True:
            a = creatUdp()
            b = json.loads(a)
            if b['login'] == 'yes':
                print('UDP connect successfully and the chep is ready to connect wifi.')
                led = ledChang()
                if b['ssid'] != '':
                    if b['password'] != '':
                        ssid = b['ssid']
                        password = b['password']
                        c = wifi_connect(ssid,password)
                        if c:
                            d = readJson('config.json')
                            d['wifiConfig']['ssid'] = ssid
                            d['wifiConfig']['password'] = password
                            d['firstload'] = 'no'
                            writeJson('config.json',d)
                            led.value(1)
                            break
                        else:
                            continue
    else:
        bc = readJson('config.json')
        wifi_connect(bc['wifiConfig']['ssid'],bc['wifiConfig']['password'])