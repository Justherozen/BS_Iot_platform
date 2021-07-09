import React, { useState } from 'react';
import axios from 'axios';
import { useTheme,makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const defaultdata = [
  createData('1', 0),
  createData('2', 100),
  createData('3', 120),
  createData('4', 150),
  createData('5', 130),
  createData('6', 200),
  createData('7', 220),
  createData('8', 320),
  createData('9', 210),
  createData('10', 230),
];

const useStyles = makeStyles(theme => ({
    // TODO: fix these ugly naming...
    nextButton: {
      // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: '10px',
      border: 0,
      color: 'white',
      padding: '600 600px',
      width: 1,
      // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    
  }));





export default function Chart() {
  const theme = useTheme();
  const classes = useStyles();
  const [data,setdata]=useState(defaultdata);
  const freshdata = async () => {
   
    const checkRecentDevice = async () => {
      // const formData = new URLSearchParams(payload).toString();
      const response =axios({
            method: 'get',
            url: '/getRecentDevice',
        });
        console.log(response);
        const body = await response;
        return body;
      
    };

    try {
        const ok = await checkRecentDevice();
        console.log('Password is OK, returning');
        if(ok.data.code===0){
            window.alert("刷新成功");
            let tempdata=[];
            for(let i = 0; i < 10; i += 1){
                tempdata = tempdata.concat([
                    createData(
                      ok.data.day[i],
                      ok.data.count[i],
                    ),
                  ]);
            }
            setdata(tempdata);
            console.log(data);
        }
        else{
            window.alert("刷新失败");
        }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Title>最近十天新增设备统计</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              设备数/台
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <Button
                className={classes.nextButton}
                type="submit"
                variant="contained"
                color="primary"
                onClick={freshdata}
              >刷新
                  </Button>
    </>
  );
}
