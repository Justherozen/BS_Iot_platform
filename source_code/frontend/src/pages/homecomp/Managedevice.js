import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
    Alert
  } from '@alex_xu/xui';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { ReactComponent as Icon } from '../../assets/images/mylogo.svg';
import BottomBar from '../components/BottomBar';
import Copyright from '../components/Copyright';
import Loading from '../components/LoadingMask';

const useStyles = makeStyles(theme => {
  const gridPadding = theme.spacing(0.5, 2.5);
  const smallGridPadding = theme.spacing(0.5, 1.5);
  const threeFraction = '30%';
  const twoFraction = '45%';
  const containerStyle = {
    margin: theme.spacing(0),
    padding: gridPadding,
    [theme.breakpoints.down('xs')]: {
      padding: smallGridPadding,
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  return {
    layoutContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
      maxWidth: '800px',
    },

    signUpContainer: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    welcome: {
      color: theme.palette.secondary.main,
    },

    borderedContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: 5,
      borderRadius: 30,
      boxShadow: '0 0px 5px 1px rgba(33, 33, 33, .3)',
      padding: theme.spacing(3),
      width: '90%',
      marginTop: theme.spacing(1),
    },

    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },

    logoContainer: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
    fixedHeight: {
        height: 240,
      },
      fixedHeight2: {
        height: 340,
      },
    logo: {
      width: '45%',
      height: '45%',
      marginBottom: theme.spacing(2),
    },

    accountInfoContainer: { marginTop: theme.spacing(2), ...containerStyle },

    lastNameInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      height: '100%',
      
    },

    // 姓
    lastNameInput: {
      '& div': {
        borderRadius: 16,
      },
      width: '70%',
    },

    firstNameInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '70%',
      height: '100%',
    },

    // 名
    firstNameInput: {
      '& div': {
        borderRadius: 16,
      },
    },

    accountTypeInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },

    dateInputBox: {
      marginTop: '-7%',
      display: 'flex',
      justifyContent: 'center',
      width: '64%',
      height: '100%',
    },

    accountTypeInput: {
      '& div': {
        borderRadius: 16,
      },
    },

    accountType: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      marginRight: theme.spacing(-1),
    },

    emailInputContainer: containerStyle,

    emailInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',

      // height: '100%',
    },

    emailInput: {
      '& div': {
        borderRadius: 16,
      },
      width: '70%',
    },

    passwordContainer: containerStyle,

    passwordInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
    passwordInput: {
      '& div': {
        borderRadius: 16,
      },
      width: '70%',
    },

    passwordConfirmInputBox: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '70%',
      height: '100%',
    },

    passwordConfirmInput: {
      '& div': {
        borderRadius: 16,
      },
    },

    labelRoot: { color: 'rgba(0, 0, 0, 0.35)' },
    labelFocused: {},
    label: {},

    jumpContainer: {
      margin: theme.spacing(0, 0, 2),
      padding: gridPadding,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    jumpToSignIn: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: 'translate(0px,1.5px)',
    },

    nextButton: {
      borderRadius: '10px',
      border: 0,
      color: 'white',
      padding: '30 30px',
    },

    copyright: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '90%',
    },
    copyrightText: {},

    buttomBar: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '90%',
    },

    checkboxContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: theme.spacing(0),
      marginTop: theme.spacing(-1),
      marginBottom: theme.spacing(2),
      padding: gridPadding,
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },

    centeredText: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // ! special operation for Josefin Sans
      transform: 'translate(0px,1.5px)',
    },
    textFieldInput: {
      fontSize: '1rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem',
      },
    },
    helperText: {
      fontSize: '0.75rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.6rem',
      },
    },
    appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  };
});

function createData(id,Cid, Cname,Cdes, Ctime,Cuser) {
    return { id,Cid, Cname,Cdes, Ctime,Cuser };
  }
  function createnData(id, time,clientid, whetheralert, msg, value, location) {
    return { id, time,clientid, whetheralert, msg, value, location };
  }
const defaultrows = [
    createData(0, 'device0001', '远程路由器', '第一个描述', '2021-06-24','User1'),
    createData(1, 'device0002', '远程打印器', '我的一个远程的打印机','2021-06-25' ,'User2'),
  ];
  const defaultnrows = [
  ];
function Managedevice(props) {
    const [username, setusername] = useState(props.name);
   console.log(username);
  const { width } = props;
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const ITEM_HEIGHT = 48;
  const [anchorEl2, setAnchorEl2] = useState(null);
  const typeTypeDisplay = ['私有', '共享'];
  const typeTypeStorage = ['private', 'share'];
  const [inputContent, setInputContent] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validFormEmail, setValidFormEmail] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [emailAlreadyTaken, setEmailAlreadyTaken] = useState(false);
  const [emailFormInvalid, setEmailFormInvalid] = useState(false);
  const [lastNameInvalid, setLastNameInvalid] = useState(false);
  const [firstNameInvalid, setFirstNameInvalid] = useState(true);
  const [accountTypeInvalid, setAccountTypeInvalid] = useState(false);
  const [typeTypeInvalid, setTypeTypeInvalid] = useState(false);
  const [RegSuc, setRegSuc] = useState(false);
  const [RegFail, setRegFail] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountType, setAccountType] = useState(-1);
  const [typeType, setTypeType] = useState(-1);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2000-06-24'),
  );
  const [rows,setrows]=useState(defaultrows);
  const [nrows,setnrows]=useState(defaultnrows);
  useEffect(async () => {
    console.log(username);
    const response =axios({
            method: 'get',
            url: '/getDeviceByUser',
            params: {
                    "username":username
            }
        });
        console.log(response);
        const body = await response;
      if (body.data.code === 0) {
        console.log("获取设备成功");
        const msgList = body.data.data;
        console.log(msgList.length);
        let tmpmsg=[];
        for (let i = 0; i < msgList.length; i+=1) {
            tmpmsg = tmpmsg.concat([
                createData(
                  i + 1,
                  msgList[i].Cid,
                  msgList[i].Cname,
                  msgList[i].CDes,
                  msgList[i].Ctime,
                  msgList[i].user,
                ),
            ]);
          }
        console.log(tmpmsg);
        setrows(tmpmsg);
      } else {
        console.log("获取设备失败");
      }
    // console.log(rows);
    // console.log(allprescriptions);
  }, []);
  const textFieldSize = isWidthDown('xs', width) ? 'small' : 'medium';
  const textFieldClassProps = {
    InputProps: {
      classes: {
        root: classes.textFieldInput,
      },
    },
    InputLabelProps: {
      classes: {
        root: classes.textFieldInput,
        // focused: {},
      },
    },
    FormHelperTextProps: {
      classes: {
        root: classes.helperText,
      },
    },
  };

  // note that this is a full-width space
  // material ui seems to ignore the half-width one
  const defaultHelperTextPlaceHolder = isWidthDown('xs', width) ? '' : '　';

  let typeTypeDisplayed = typeTypeDisplay[typeType];
  console.log(`${typeTypeDisplayed}`);
  if (typeTypeDisplayed === undefined) {
    typeTypeDisplayed = '';
  }

  
  const CreateDevice = async () => {
    console.log(username);
    const response =axios({
            method: 'post',
            url: '/createDevice',
            data: {
                    "Cid":lastName,"Cname":inputContent,"Cdes":password,"user":username
            }});
    console.log(response);
    let judge;
    const body = await response;
    if (body.data.code===0) {
        window.alert("新建设备成功,请刷新页面，设备名发生改变");
        setRegSuc(true);
        setRegFail(false);
      }
      else{
        console.log('新建设备失败，请检查是否重名');
        window.alert((await response).data.msg);
        judge=0;
        setRegSuc(false);
        setRegFail(true);
      }
      
  };

  const handleNextClick = async () => {
    setLoadingData(true);
    const response =axios({
            method: 'post',
            url: '/editDevice',
            data: {
                    "Cid":lastName,"Cname":inputContent,"Cdes":password,"user":username
            }});
    console.log(response);
    let judge;
    const body = await response;
    if (body.data.code===0) {
        window.alert("修改设备成功,请返回主页");
        setRegSuc(true);
        setRegFail(false);
      }
      else{
        console.log('编辑设备失败，请检查是否是否存在或是否拥有权限');
        window.alert("编辑设备失败，请检查是否是否存在或是否拥有权限");
        judge=0;
        setRegSuc(false);
        setRegFail(true);
      }
    setLoadingData(false); // 若跳转走了，则这个语句会报warning
    
  };

  const handleSearch = async () => {
    const response =axios({
            method: 'get',
            url: '/getMessagebyCid',
            params: {
                    "Cid":lastName,
            }});
    console.log(response);
    let judge;
    const body = await response;
    if (body.data.code===0) {
        window.alert("查询设备消息成功");
        const msgList = body.data.data;
        let tmpmsg=[];
        for (let i = 0; i < msgList.length; i+=1) {
            tmpmsg = tmpmsg.concat([
                createnData(
                  i + 1,
                  msgList[i].timestamp,
                  lastName,
                  msgList[i].alert,
                  msgList[i].info,
                  msgList[i].value,
                  ("(").concat(msgList[i].lat," , ",msgList[i].lng,")"),
                ),
            ]);
          }
        setnrows(tmpmsg);
        console.log(tmpmsg);
      }
      else{
        console.log('查询设备消息失败');
        window.alert((await response).data.msg);
      }
  };

  const open = Boolean(anchorEl);
  const handleAccountTypeClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = idx => event => {
    setAnchorEl(null);
    setAccountType(idx);
    setAccountTypeInvalid(false);
  };

  const open2 = Boolean(anchorEl2);
  const handleTypeTypeClick = event => {
    setAnchorEl2(event.currentTarget);
  };

  const handleTypeMenuItemClick = idx => event => {
    setAnchorEl2(null);
    setTypeType(idx);
    setTypeTypeInvalid(false);
  };


  const handleCidInput = event => {
    const text = event.target.value;
    setLastName(text);
  };


  const handleCdesInput = event => {
    const text = event.target.value;
    setPassword(text);
  };
  const handleLogin = event => {
    history.push('/signin');
  };

  const handleCheckBoxChange = event => {
    const selected = event.target.checked;
    setShowPassword(selected);
    console.log(`selected show password: ${selected}`);
  };
  const handleCNameInput = event => {
    const text = event.target.value;
    setInputContent(text);
  };
  return (
    <main className={classes.content}>
    <Container maxWidth="lg" className={classes.container}>
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={12}>
        <Paper className={classes.paper}>
        <Title>绑定设备</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>设备ID</TableCell>
            <TableCell>设备名</TableCell>
            <TableCell>设备描述</TableCell>
            <TableCell>创建时间</TableCell>
            <TableCell>拥有者</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.Cid}</TableCell>
              <TableCell>{row.Cname}</TableCell>
              <TableCell>{row.Cdes}</TableCell>
              <TableCell>{row.Ctime}</TableCell>
              <TableCell>{row.Cuser}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </Paper>
      </Grid>
      {/* Recent Deposits */}
   
      <Grid item xs={12} md={8} lg={12}>
        <Paper className={classes.container}>
        {RegSuc ? (<Alert message="修改设备成功" description="成功编辑设备" closable type="success" />):(<div />)}
      {RegFail ? (<Alert message="修改设备失败" description="编辑设备失败，请重新编辑" closable type="success" />):(<div />)}

        <Loading loadingData={loadingData} />
     
          <Container className={classes.logoContainer}>
            <Typography component="h1" variant="h5" className={classes.welcome}>
              {RegSuc? '修改成功，请返回主页':'修改设备信息'}
            </Typography>
          </Container>

          <Container className={classes.emailInputContainer}>
            <Container className={classes.lastNameInputBox}>
              <TextField
                error={lastNameInvalid}
                className={classes.lastNameInput}
                variant="outlined"
                size={textFieldSize}
                id="user_second_name"
                label="设备id(如'device0001')"
                name="user_second_name"
                autoFocus
                value={lastName}
                onChange={handleCidInput}
                {...textFieldClassProps}
              />
              <Button
              className={classes.nextButton}
              type="jumpContainer"
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              查询设备消息
            </Button>
            </Container>


          </Container>

          <Container className={classes.emailInputContainer}>
            <Container className={classes.emailInputBox}>
              <TextField
                className={classes.emailInput}
                variant="outlined"
                size={textFieldSize}
                id="username"
                label="设备昵称(如'我的远程遥控器')"
                name="username"
                autoFocus
                fullWidth
                value={inputContent}
                onChange={handleCNameInput}
                {...textFieldClassProps}
              />
            </Container>
          </Container>

          <Container className={classes.passwordContainer}>
            <Container className={classes.passwordInputBox}>
              <TextField
                className={classes.passwordInput}
                variant="outlined"
                size={textFieldSize}
                id="user_password"
                label="设备描述"
                name="user_password"
                autoFocus
                value={password}
                onChange={handleCdesInput}
                {...textFieldClassProps}
              />
            </Container>
            </Container>

          <Container className={classes.emailInputContainer}>
            <Container className={classes.accountTypeInputBox}>
              <TextField
                error={typeTypeInvalid} //
                className={classes.accountTypeInput}
                variant="outlined"
                size={textFieldSize}
                id="user_type_type"
                label={isWidthDown('xs', width) ? '类别' : '设备类别'}
                name="user_type_typen"
                autoFocus
                value={typeTypeDisplayed}
                InputLabelProps={textFieldClassProps.InputLabelProps}
                InputProps={{
                  ...textFieldClassProps.InputProps,
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className={classes.accountType}
                        aria-label="more"
                        aria-controls="menu"
                        aria-haspopup="true"
                        onClick={handleTypeTypeClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl2}
                        keepMounted
                        open={open2}
                        onClose={handleTypeMenuItemClick(0)}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 2,
                            width: '20ch',
                          },
                        }}
                      >
                        {[...typeTypeDisplay.keys()].map(key => (
                          <MenuItem
                            key={key}
                            selected={key === 0}
                            onClick={handleTypeMenuItemClick(key)}
                          >
                            {typeTypeDisplay[key]}
                          </MenuItem>
                        ))}
                      </Menu>
                    </InputAdornment>
                  ),
                }}
              />
            </Container>

          
        



          <Container className={classes.jumpContainer}>
            <Button
              className={classes.nextButton}
              type="jumpContainer"
              variant="contained"
              color="primary"
              onClick={handleNextClick}
            >
              确认修改
            </Button>
          </Container>

      </Container>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8} lg={12}>
        <Paper className={classes.paper}>
        <Title>查询设备消息</Title>
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
        <TableBody>name
          {nrows.map((nrow) => (
            <TableRow key={nrow.id}>
              <TableCell>{nrow.time}</TableCell>
              <TableCell>{nrow.clientid}</TableCell>
              <TableCell>{nrow.whetheralert}</TableCell>
              <TableCell>{nrow.msg}</TableCell>
              <TableCell>{nrow.value}</TableCell>
              <TableCell>{nrow.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </Paper>
      </Grid>
      {/* Recent Orders */}
    </Grid>
    <Box pt={4}>
    <BottomBar className={classes.buttomBar} />
    <Copyright className={classes.copyright} />
    </Box>
  </Container>
  </main>
      
  );
}

export default withWidth()(Managedevice);
