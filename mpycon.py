# -*- encoding: utf-8 -*-
'''
@File    :   mpyconnect.py
@Time    :   2022/06/07 13:37:30
@Author  :   Wicos 
@Version :   1.0
@Contact :   wicos@wicos.cn
@Blog    :   https://www.wicos.me
'''

# here put the import lib
import network
import time
from machine import Pin
import os
from socket import *
import json


class mpyconnect:

    def __init__(self):
        self.config_path = "mpyconnect/config.json"
        self.led = Pin(2, Pin.OUT)
        self.__config_init__()
        self.config = self.__config_read__()
        print(self.config)
        self.wifi_ssid = self.config["wifi"]["ssid"]
        self.wifi_password = self.config["wifi"]["password"]

    def __config_init__(self):
        if "mpyconnect" not in os.listdir():
            print("config json init")
            os.mkdir("mpyconnect")
            # with open(self.config_path, "w+", encoding='utf-8') as fp:
            #     json.dump(
            #         , fp)
            self.__config_write__({
                "ip": "",
                "firstload": 1,
                "wifi": {
                    "ssid": "",
                    "password": ""
                }
            })

    def __config_read__(self):
        with open(self.config_path, 'rb') as fp:
            config_json = json.load(fp)
        return config_json

    def __config_write__(self, data):
        with open(self.config_path, 'w+', encoding='utf-8') as fp:
            #json.dump(data, fp)
            fp.write(json.dumps(data))

    def ap_create(self, ssid, password):
        ap_if = network.WLAN(network.AP_IF)
        ap_if.config(essid=ssid,
                     authmode=network.AUTH_WPA_WPA2_PSK,
                     password=password)
        for i in range(5):
            time.sleep(1)
            print('The AP build......')
        print(ap_if.ifconfig())
        print(
            'The AP was created successfully, and you are now ready to connect.'
        )

    def wifi_connect(self, ssid, password):
        sta_if = network.WLAN(network.STA_IF)
        sta_if.active(True)
        sta_if.connect(ssid, password)
        for i in range(10):
            self.led.value(0)
            time.sleep(0.5)
            self.led.value(1)
            time.sleep(0.5)
            print(i + 1, 'attempt at connection')
        if sta_if.isconnected() == True:
            a = 'WiFi connection successful'
            print(a, sta_if.ifconfig())
            chip_ip = sta_if.ifconfig()[0]
            config_old = self.__config_read__()
            config_old["ip"] = chip_ip
            self.__config_write__(config_old)
            return True
        else:
            print('WiFi connection failed. Please try again')
            return False

    def wifi_disconnect(self):
        sta_if = network.WLAN(network.STA_IF)
        sta_if.active(False)
        return 'WiFi disconnected successfully'

    def udp_server(self):
        rt = '{"connect":"no"}'
        udp_socket = socket(AF_INET, SOCK_DGRAM)
        print('UDP services is ready')  #2、绑定本地相关信息，如果不绑定，则随机分配
        self.led.value(0)
        local_addr = ('', 7788)  #ip地址和端口号，IP不写表示本机任何一个ip
        udp_socket.bind(local_addr)  #3、等待接收对方发送的数据
        recv_data = udp_socket.recvfrom(1024)  #1024表示本次接收的最大字节
        #recv_data存储的是一个元组（发送方ip，Port
        recv_msg = recv_data[0]
        send_addr = recv_data[1]
        #4、显示接收到的数据
        recvMsg = recv_msg.decode("gbk")
        print("%s:%s" % (str(send_addr), recv_msg.decode("gbk")))
        a = json.loads(recvMsg)
        print(a)
        if a['login'] == 'yes':
            if a['ssid'] != '':
                ssid = a['ssid']
                if a['password'] != '':
                    password = a['password']
                    rt = '{"login":1,"ssid":"' + ssid + '","password":"' + password + '"}'
        #udp_socket.close()
        return rt

    def connect(self):
        if self.config["firstload"] == 1:
            self.ap_create("MpyConnect", "12345678")
            while True:
                udp = self.udp_server()
                recv_data = json.loads(udp)
                if recv_data['login'] == 1:
                    print(
                        'UDP connect successfully and the chep is ready to connect wifi.'
                    )
                    self.led.value(0)
                    if recv_data['ssid'] != '':
                        if recv_data['password'] != '':
                            ssid = recv_data['ssid']
                            password = recv_data['password']
                            connect_result = self.wifi_connect(ssid, password)
                            if connect_result:
                                self.config['wifi']['ssid'] = ssid
                                self.config['wifi']['password'] = password
                                self.config['firstload'] = 0
                                self.__config_write__(self.config)
                                self.led.value(1)
                                break
                            else:
                                continue
        else:
            connect_result = self.wifi_connect(self.wifi_ssid, self.wifi_password)
            if connect_result:
              self.led.value(1)
