import json
from mycreate import create_app
from mycreate import db
from models import *
from flask import request, jsonify
import mytoken
import datetime

app = create_app()

@app.route('/get30Message', methods=['GET'])
def getMessage():
    messages = Message.query.all()[-30:]
    result = {
        "code": 0,
        "data": []
    }
    for message in messages:
            mess = {
                "cid": message.cid,
                "alert": message.alert,
                "info": message.info,
                "lat": message.lat,
                "lng": message.lng,
                "timestamp": message.timestamp,
                "value": message.value
            }
            result.get("data").append(mess)
    print(result)
    return result

@app.route('/getMessagebyCid', methods=['GET'])
def getMessagebyCid():
    Id = request.args.get("Cid")
    print(Id)
    messages = Message.query.filter(Message.cid==Id).all()[-50:]
    result = {
        "code": 0,
        "data": []
    }
    if (len(messages)==0):
        return jsonify(code=-1, msg="设备不存在!")
    for message in messages:
        tmpmessage = {
            "alert": message.alert,
            "info": message.info,
            "lat": message.lat,
            "lng": message.lng,
            "timestamp": message.timestamp,
            "value": message.value
        }
        result.get("data").append(tmpmessage)
    print(result)
    return result

@app.route('/getUserbyEmail', methods=['GET'])
def getUserbyEmail():
    email = request.args.get("Email")
    print(email)
    user = User.query.filter(User.email == email).all()
    if user is None:
        code = -1
        msg = "Not exist the user!"
        return jsonify(code=code, msg=msg)
    code = 0
    msg = "get user success!"
    return jsonify(code=code, msg=msg, data=user[0].name)


@app.route('/editPass', methods=['POST'])
def editPass():
    data = json.loads(request.data)
    email= data["email"]
    new_name = data["name"]
    new_passwd = data["passwd"]
    print(email)
    print(new_name)
    print(new_passwd)
    tmp = User.query.filter(User.email == email).all()
    print(tmp)
    old_name=tmp[0].name
    tmp[0].name=new_name
    tmp[0].password=new_passwd
    devices = Device.query.filter(Device.user == old_name).all()
    for device in devices:
        device.user = new_name
    db.session.commit()
    return jsonify(code=0, msg="更改个人信息成功!")


@app.route('/register', methods=['POST'])
def register():
    data = json.loads(request.data)
    name = data['name']
    password = data['passwd']
    email = data['email']
    gender = data['gender']
    birthday = data['birthday']
    print(gender,birthday)
    result = {
        "code": 0,
        "msg": "Register success!"
    }
    new_id = 0
    users = User.query.all()
    for user in users:
        if name == user.name or email == user.email:
            result['code'] = -1
            result['msg'] = "邮箱或用户名已经存在!"
            return result
        new_id = user.id
    new_user = User(id=new_id + 1, name=name, password=password, email=email,gender=gender,birthday=birthday)
    db.session.add(new_user)
    db.session.commit()
    return result


@app.route('/login', methods=['POST'])
def login():
    data = json.loads(request.data)
    password = data["password"]
    email = data["email"]
    print(email, password)
    code = 0
    msg = "login success!"
    user = User.query.filter(User.email == email).all()
    if user is None:
        code = -1
        msg = "用户不存在!"
        return jsonify(code=code, msg=msg)
    print(user[0].password)
    if user[0].password != password:
        code = -2
        msg = "密码错误!"
        return jsonify(code=code, msg=msg)
    token_back = mytoken.create_token(user[0].id)
    print(token_back)
    print(type(token_back))
    return jsonify(code=code, msg=msg, data=token_back)




@app.route('/getDeviceByUser', methods=['GET'])
def getDeviceByUser():
    username = request.args.get("username")
    devices =  Device.query.filter(Device.user == username).all()
    result = {
        "code": 0,
        "data": []
    }
    for device in devices:
        dev = {
            "id": device.id,
            "Cname": device.cid,
            "Cid": device.name,
            "CDes": device.cdes,
            "Ctime": device.create_time,
            "user": device.user,
        }
        result.get("data").append(dev)
        print(dev)
    return result

@app.route('/getDevice', methods=['GET'])
def getDevice():
    devices = Device.query.all()
    result = {
        "code": 0,
        "data": []
    }
    for device in devices:
        dev = {
            "id": device.id,
            "code": device.cid,
            "name": device.name,
            "description": device.cdes,
            "create_time": device.create_time,
            "user": device.user,
        }
        result.get("data").append(dev)
        print(dev)
    return result

@app.route('/getRecentDevice', methods=['GET'])
def getRecentDevice():
    time_index = []
    count = [0, 0, 0, 0, 0, 0, 0,0,0,0]
    today = datetime.datetime.today()
    for i in range(0, 10):
        daytmp = today - datetime.timedelta(days=i)
        dayt = daytmp.replace(hour=0, minute=0, second=0, microsecond=0)
        dayt = datetime.datetime.date(dayt)
        time_index.append(str(dayt)[5:])
    time_index.reverse()
    devices = Device.query.all()
    for device in devices:
        device_day = str(datetime.datetime.date(device.create_time))[5:]
        for i in range(len(time_index)):
            if time_index[i] == device_day:
                count[i] += 1

    print(time_index, count)
    return jsonify(code=0, msg="getRDsuccess!", day=time_index, count=count)


@app.route("/getRecentMessage", methods=['GET'])
def getRecentMessage():
    time_index = []
    total = [0,0,0,0,0,0,0,0,0,0]
    normal = [0,0,0,0,0,0,0,0,0,0]
    alert = [0,0,0,0,0,0,0,0,0,0]
    today = datetime.datetime.today()
    for i in range(0, 10):
        daytmp = today - datetime.timedelta(days=i)
        dayt = daytmp.replace(hour=0, minute=0, second=0, microsecond=0)
        dayt = datetime.datetime.date(dayt)
        time_index.append(str(dayt)[5:])
    time_index.reverse()

    messages = Message.query.filter().all()
    for message in messages:
        message_day = str(datetime.datetime.date(message.timestamp))[5:]
        for i in range(len(time_index)):
            if time_index[i] == message_day:
                total[i] += 1
                if message.alert == 0:
                    normal[i] += 1
                else:
                    alert[i] += 1
    print(time_index, total, normal, alert)
    return jsonify(code=0, msg="getRMsuccess!", day=time_index, total=total, alert=alert, normal=normal)


@app.route('/editDevice', methods=['POST'])
def alterDevice():
    data = json.loads(request.data)
    Cid = data["Cid"]
    Cname = data["Cname"]
    Cdes = data["Cdes"]
    username = data["user"]
    device = Device.query.filter(Device.name == Cid).filter(Device.user==username).all()
    if(len(device)==0):
        return jsonify(code=-1, msg="修改失败!")
    device[0].cid = Cname
    device[0].name = Cid
    device[0].cdes = Cdes
    db.session.commit()
    return jsonify(code=0, msg="修改成功!")


@app.route('/createDevice', methods=['POST'])
def createDevice():
    data = json.loads(request.data)
    Cid = data["Cid"]
    CName = data["Cname"]
    CDescription = data["Cdes"]
    CUser = data["user"]
    result = {
        "code": 0,
        "msg": "create success!"
    }
    new_id = 0
    devices = Device.query.all()
    for device in devices:
        if Cid == device.name:
            result['code'] = -1
            result['msg'] = "出现了重名!"
            return result
        new_id = device.id
    new_device = Device(id=new_id + 1, cid=CName, name=Cid, cdes=CDescription,
                        create_time=datetime.datetime.now(), user=CUser)
    db.session.add(new_device)
    db.session.commit()
    return result


@app.route('/deleteDevice', methods=['GET'])
def deleteDevice():
    deviceName = request.args.get("name")
    devices = Device.query.filter(Device.name == deviceName).all()
    for device in devices:
        db.session.delete(device)
    db.session.commit()
    return jsonify(code=0, msg="删除成功!")





if __name__ == '__main__':
    app.run(port=5000, host='localhost', debug=True)
