import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const [totalnum,settotalnum]=useState(5);
  const [onlinenum,setonlinenum]=useState(5);


  useEffect(async () => {

    const response =axios({
            method: 'get',
            url: '/getDevice',
        });
        console.log(response);
        const body = await response;
      if (body.data.code === 0) {
        console.log("获取设备数量成功");
        const deviceList = body.data.data;
        let tmponline=0;
        settotalnum(deviceList.length);
        for (let i = 0; i < deviceList.length; i+=1) {
          if (
            deviceList[i].code > "device0000" &&
           deviceList[i].code < "device0006"
          )
            tmponline += 1;
        }
        setonlinenum(tmponline);
      } else {
        console.log("获取设备数量失败");
      }
    // console.log(rows);
    // console.log(allprescriptions);
  }, []);

  return (
    <>
      <Title>当前在线设备数</Title>
      <Typography component="p" variant="h4">
      {onlinenum}
      </Typography>
      <Title>总设备数</Title>
        <Typography component="p" variant="h4">
        {totalnum}
      </Typography>
      
    </>
  );
}
