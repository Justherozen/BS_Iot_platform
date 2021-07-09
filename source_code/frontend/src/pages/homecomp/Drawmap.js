import React,{useState} from 'react';
import clsx from 'clsx';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Map, APILoader, Polyline, ToolBarControl,Marker,Text} from '@uiw/react-amap';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import Chart from './Chart';
import MessageChart from './MessageChart';
import Deposits from './Deposits';
import Orders from './Orders';
import BottomBar from '../components/BottomBar';
import Copyright from '../components/Copyright';

const drawerWidth = 240;
const defaultpath=[
    [120.046,30.4105],
    [120.214,30.1462],
    [120.357,30.4251],
    [119.979,30.2443],
    [120.001,30.1677],
    [120.022,30.3639],
    [120.074,30.3714]
  ];
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  verticalContainer: {
    marginTop: theme.spacing(-8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  emailInput: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '10%',
    width: '70%',
  },
  fixedHeight: {
    height: 240,
  },
  fixedHeight2: {
    height: 340,
  },
  buttomBar: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
  },
  copyright: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
  },
  buttomBar2: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
  },
  copyright2: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
  },
  copyrightText: {},
  nextButton: {
    borderRadius: '10px',
    border: 0,
    color: 'white',
    padding: '30 30px',
  },
}));

export default function Drawmap(){
    const classes = useStyles();
    const [path,setpath]=React.useState(defaultpath);
    const [inputContent, setInputContent] = useState('');
    const handleCidInput = event => {
        const text = event.target.value;
        setInputContent(text);
      };
      const drawdot = path.map(eachpoint => (
        <Text text={(path.findIndex(obj => obj === eachpoint))} position={[eachpoint[0],eachpoint[1]]} style={{
            'background-color': 'yellow',
            'color': 'black'
          }} />      
      ));
    
    
      const handlefillpath = async () => {
        const getpath = async () => {
          // const formData = new URLSearchParams(payload).toString();
          console.log(inputContent);
          const response =axios({
                method: 'get',
                url: '/getMessagebyCid',
                params: {
                        "Cid":inputContent
                }
            });
            console.log(response);
            const body = await response;
            return body;
          
        };
    
        try {
            const ok = await getpath();
            if(ok.data.code===0){
                window.alert("查询轨迹成功");
                const messageList = ok.data.data;
                let tmppath=[];
                for(let i=0;i<messageList.length;i+=1){
                    const result = [0,0];
                    result[0] = messageList[i].lng;
                    result[1] = messageList[i].lat;
                    tmppath=tmppath.concat([result]);
                  }
                setpath(tmppath);
                console.log(tmppath);
            }
            else{
                const tmppath=[];
                setpath(tmppath);
                window.alert("查询轨迹失败,设备不存在");
            }
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div style={{ width: '100%', height: '80%' }}>
<APILoader akay="a7a90e05a37d3f6bf76d4a9032fc9129">
            <Map center={[120.2,30.2]} zoom={10}>
          <Polyline
            onHide={(obj) => {
              console.log('obj:', obj);
            }}  
            onShow={(obj) => {
              console.log('obj:', obj);
            }}
            onClick={(obj) => {
              console.log('obj:', obj);
            }}
            strokeColor="red"
            strokeOpacity={1}
            path={path}
          />
          {drawdot}
        </Map>
        </APILoader>
        <TextField
                className={classes.emailInput}
                variant="outlined"
                size='small'
                id="username"
                label="设备id"
                helperText="请输入设备id"
                name="username"
                autoFocus
                value={inputContent}
                onChange={handleCidInput}
              />
        <Button
              className={classes.nextButton}
              variant="contained"
              color="primary"
              onClick={handlefillpath}
            >
              搜索路径
            </Button>
        <BottomBar className={classes.buttomBar2} />
        <Copyright className={classes.copyright2} />
        </div>
    );
}