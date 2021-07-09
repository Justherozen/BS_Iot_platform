import React, { useState } from 'react';
import axios from 'axios';
import { useTheme,makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CartesianGrid, Tooltip, Legend, BarChart, Bar,LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(name,alertdata,normdata) {
  return { name,alertdata,normdata };
}

const defaultdata = [
  {
    name: 'Day 1',
    alertdata: 400,
    normdata: 240,
    
  },
  {
    name: 'Day 2',
    alertdata: 300,
    normdata: 139,
    
  },
  {
    name: 'Day 3',
    alertdata: 200,
    normdata: 980,
   
  },
  {
    name: 'Day 4',
    alertdata: 278,
    normdata: 390,
    
  },
  {
    name: 'Day 5',
    alertdata: 189,
    normdata: 480,
    
  },
  {
    name: 'Day 6',
    alertdata: 239,
    normdata: 430,
  },
  {
    name: 'Day 7',
    alertdata: 349,
    normdata: 430,
  },
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





export default function MessageChart() {
  const theme = useTheme();
  const classes = useStyles();
  const [data,setdata]=useState(defaultdata);
  const freshdata = async () => {
   
    const checkRecentDevice = async () => {
      // const formData = new URLSearchParams(payload).toString();
      const response =axios({
            method: 'get',
            url: '/getRecentMessage',
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
                      ok.data.alert[i],
                      ok.data.normal[i],
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
      <Title>最近十天消息流数据统计</Title>
      <ResponsiveContainer>
      <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="alertdata" fill="#82ca9d" />
          <Bar dataKey="normdata" fill="#8884d8" />
        </BarChart>
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
