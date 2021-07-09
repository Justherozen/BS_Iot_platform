import time
import re
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import paho.mqtt.client as mymqtt
engine = create_engine("mysql+pymysql://root:xrx683448@localhost:3306/myapp", encoding="utf-8")
Session = sessionmaker(bind=engine)
session = Session()

MQTT_Broker = "127.0.0.1"
MQTT_Port = 1883
Keep_Alive_Interval = 60
MQTT_Topic = "iotclient"


def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe(MQTT_Topic, 0)


def on_message(client, userdata, msg):
    mymsg = str(msg.payload)
    tmpn = re.findall(r":(.+?),", mymsg)
    tmpm = re.findall(r"\"value\":(.+?)}", mymsg)
    print(mymsg)
    tmpn.append(tmpm[0])
    stmt = f'insert into my_message(alert,cid,info,lat,lng,timestamp,value) values ("{int(tmpn[0])}", "{eval(tmpn[1])}", "{eval(tmpn[2])}", "{float(tmpn[3])}", "{float(tmpn[4])}", "{time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(float(tmpn[5]) / 1000)))}","{int(tmpn[6])}")'
    session.execute(stmt)
    session.commit()


client = mymqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(MQTT_Broker, int(MQTT_Port), int(Keep_Alive_Interval))
client.loop_forever()
