import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Map, APILoader, Polyline, ToolBarControl,Marker,Text} from '@uiw/react-amap';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
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
import Editpass from './Editpass';
import Drawmap from './Drawmap';
import VerticalTabs from '../help/Help';
import Managedevice from './Managedevice';

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
    paddingRight: 8, // keep right padding when drawer closed
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

export default function Dashboard(props) {
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [dash1, setdash1] = React.useState(true);
    const [dash2, setdash2] = React.useState(false);
    const [dash3, setdash3] = React.useState(false);
    const [dash4, setdash4] = React.useState(false);
    const [dash5, setdash5] = React.useState(false);
    const [path,setpath]=React.useState(defaultpath);
    const [inputContent, setInputContent] = useState('');
    const [username,setusername]=useState('');
    if (!props.location.state) {
        return <h1>Invalid Access</h1>;
      }
    const {
        email:useremail
      } = props.location.state;
   console.log(useremail);
   useEffect(async () => {

    const response =axios({
            method: 'get',
            url: '/getUserbyEmail',
            params: {
                    "Email":useremail
            }
        });
        console.log(response);
        const body = await response;
      if (body.data.code === 0) {
        console.log("获取用户名成功");
        const tmpuser = body.data.data;
        setusername(tmpuser);
       console.log(tmpuser);
      } else {
        console.log("获取用户名失败");
      }
    // console.log(rows);
    // console.log(allprescriptions);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = async () => {
    setOpen(false);
  };
  const handleClick1 = async () => {
    setdash1(true);
    setdash2(false);
    setdash3(false);
    setdash4(false);
    setdash5(false);
  };
  const handleClick2 = async () => {
    setdash2(true);
    setdash1(false);
    setdash3(false);
    setdash4(false);
    setdash5(false);
  };
  const handleClick3 = async () => {
    setdash3(true);
    setdash2(false);
    setdash1(false);
    setdash4(false);
    setdash5(false);
  };
  const handleClick4 = async () => {
    setdash4(true);
    setdash2(false);
    setdash3(false);
    setdash1(false);
    setdash5(false);
  };
  const handleClick5 = async () => {
    setdash5(true);
    setdash2(false);
    setdash3(false);
    setdash1(false);
    setdash4(false);
  };


  const drawdot = path.map(eachpoint => (
    <Text text={(path.findIndex(obj => obj === eachpoint))} position={[eachpoint[0],eachpoint[1]]} style={{
        'background-color': 'yellow',
        'color': 'black'
      }} />      
  ));
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            IoT Platform
          </Typography>
          <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={() => {  history.push({
                pathname: '/newdevice',
                state: { name: username },
              }); }
            }
      >
        新增
      </Button>
          <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={() => {  history.push({
            pathname: '/signin',
            state: { name: username },
          }); }}
      >
        登出
      </Button>
      <IconButton color="inherit">
              <NotificationsIcon 
               onClick={handleClick4}/>
          </IconButton>  
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem button onClick={handleClick1}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="数据统计" />
    </ListItem>
    <ListItem button onClick={handleClick2}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="设备管理" />
    </ListItem>
    <ListItem button onClick={handleClick3}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="设备轨迹查询" />
    </ListItem>
    <ListItem button onClick={handleClick4}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="个人信息修改" />
    </ListItem>
    <ListItem button onClick={handleClick5}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="使用帮助与隐私说明" />
    </ListItem>
            </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {dash1?(
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
                <div>
        <Link color="primary" onClick={handleClick2}>
          查看所有设备列表
        </Link>
      </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={fixedHeightPaper2}>
                <MessageChart />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
          <BottomBar className={classes.buttomBar} />
          <Copyright className={classes.copyright} />
          </Box>
        </Container>
        ):(
            <div/>
        )
        }
        {dash2?(
        <Managedevice name={username}/>
        ):(
            <div/>
        )
        }
        {dash3?(
        <Drawmap/>
        ):(
            <div/>
        )
        }
        {dash4?(
      <Editpass email={useremail} name={username} />
        ):(
            <div/>
        )
        }
        {dash5?(
      <VerticalTabs name={username} />
        ):(
            <div/>
        )
        }
      </main>
    </div>
  );
}
