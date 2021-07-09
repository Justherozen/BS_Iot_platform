import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, time,clientid, whetheralert, msg, value, location) {
  return { id, time,clientid, whetheralert, msg, value, location };
}

const defaultrows = [
  createData(0, '00:12,1 May', '10001', '在线', '设备已上线',32, '(122.1,312.2)'),
  createData(1, '00:09,1 May', '10002', '在线', '设备重启中',31, '(37.1,98.2)'),
  createData(2, '00:06,1 May', '10002', '离线', '设备已离线', 30,'(12.1,32.7)'),
  createData(3, '00:03,1 May', '10005', '在线', '请求位置信息成功',29, '(12.1,31.9)'),
  createData(4, '00:02,1 May', '10006', '在线', '设备已上线', 28,'(22.1,37.6)'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [rows,setrows]=useState(defaultrows);

  useEffect(async () => {

    const response =axios({
            method: 'get',
            url: '/get30Message',
        });
        console.log(response);
        const body = await response;
      if (body.data.code === 0) {
        console.log("获取设备数量成功");
        const msgList = body.data.data;
        console.log(msgList.length);
        
        let tmpmsg=[];
        for (let i = 0; i < msgList.length; i+=1) {
            tmpmsg = tmpmsg.concat([
                createData(
                  i + 1,
                  msgList[i].timestamp,
                  msgList[i].cid,
                  msgList[i].alert,
                  msgList[i].info,
                  msgList[i].value,
                  ("(").concat(msgList[i].lat," , ",msgList[i].lng,")"),
                ),
            ]);
          }
          console.log(tmpmsg);
          setrows(tmpmsg);
        
      } else {
        console.log("获取设备数量失败");
      }
    // console.log(rows);
    // console.log(allprescriptions);
  }, []);

  return (
    <>
      <Title>最近消息</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>时间</TableCell>
            <TableCell>设备ID</TableCell>
            <TableCell>警报</TableCell>
            <TableCell>消息内容</TableCell>
            <TableCell>传送值</TableCell>
            <TableCell>设备坐标</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.clientid}</TableCell>
              <TableCell>{row.whetheralert}</TableCell>
              <TableCell>{row.msg}</TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </>
  );
}
