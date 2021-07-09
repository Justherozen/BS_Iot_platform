/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

function TabPanel(props) {
  const classes = useStyles();

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className={classes.tabpanel}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: '100vh',
  },

  tabbutton: {
    // width: '100%',
  },

  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    // width: '50%',
    minWidth: '100px',
  },

  tabpanel: {
    // width: '70%',
  },

  help: {
    width: '100%',
    maxWidth: 500,
  },
  use_item: {
    width: '100%',
    maxWidth: 500,
  },
  securicy: {
    width: '100%',
    maxWidth: 500,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab className={classes.tabbutton} label="帮助" {...a11yProps(0)} />
        <Tab className={classes.tabbutton} label="使用条款" {...a11yProps(1)} />
        <Tab className={classes.tabbutton} label="隐私协议" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div className={classes.help}>
          <Typography variant="h3" gutterBottom>
            帮助
          </Typography>
          <Typography variant="body1" gutterBottom>
            在这里您可以详细地了解如何使用 Iot Platform。
          </Typography>
          <Typography variant="body1" gutterBottom>
            您可以完全遵循您使用其他软件（如Google）的习惯使用我们的系统。
          </Typography>
          <Typography variant="body1" gutterBottom>
            我们的系统同时支持网页端和手机端的访问。
          </Typography>
          <Typography variant="body1" gutterBottom>
            如果您的操作没有获得您预期的响应，请关注我们界面的提醒，我们相信大多数情况下您都可以根据我们友好的用户交互，自己解决。
          </Typography>
          <Typography variant="body1" gutterBottom>
            如果按照界面提示，仍然不能解决，希望您保持宽容与耐心，我们的系统目前处于刚刚发出的阶段，意料之外的软件行为通常是系统的原因，而非您的问题。希望您能够对我们保持信心，耐心等待更好的版本。
          </Typography>
          <Typography variant="body1" gutterBottom>
            如果您仍有疑惑，您可以通过
            <Link href="https://github.com/Justherozen">GitHub</Link>
            随时与我们联系。
          </Typography>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.use_item}>
          <Typography variant="h3" gutterBottom>
            使用条款
          </Typography>
          <Typography variant="body1" gutterBottom>
            我们知道您会想要跳过这些服务条款，但在使用 Iot Platform
            服务时，了解我们提供的服务以及我们对您的期望是非常必要的。
          </Typography>
          <Typography variant="body1" gutterBottom>
            这里，以及本辅助说明中的“我”，通常是指浙江大学 2021
            年春夏学期BS软件体系设计胡晓军老师教学班级的同学。
          </Typography>
          <Typography variant="h4" gutterBottom>
            我们提供的服务
          </Typography>
          <Typography variant="body1" gutterBottom>
            Iot Platform
            提供广泛多样的物联网平台服务，这些服务均受本条款约束。具体服务包括：
          </Typography>
          <Typography variant="body1" gutterBottom>
            用户：注册账号、登录账号、修改个人信息等。
          </Typography>
          <Typography variant="body1" gutterBottom>
            设备：添加设备、查看设备信息、查看设备位置、查看设备消息记录等。
          </Typography>
          <Typography variant="h4" gutterBottom>
            我们对您的期望
          </Typography>
          <Typography variant="body1" gutterBottom>
            我们的许多服务可以让您接触到敏感信息，我们希望为所有用户营造愉快舒心的环境，这意味着您必须遵循以下基本的行为准则：
          </Typography>
          <Typography variant="body1" gutterBottom>
            1. 遵守适用的法律，包括互联网管理和物联网相关的法律等等。
          </Typography>
          <Typography variant="body1" gutterBottom>
            2. 虽然我们允许您使用 Iot Platform
            服务，但我们在服务中的知识产权均归我们所有。
          </Typography>
          <Typography variant="body1" gutterBottom>
            3.
            不得滥用、损害、干扰或破坏我们的服务。如以个人或团体盈利目的攻击我们的服务器，或兜售“黄牛”号等。我们将保留我们使用法律保护
            Iot Platform 服务的权利。
          </Typography>
          <Typography variant="body1" gutterBottom>
            4.
            尽管目前我们没有检查您真实身份的有效手段，但我们的维护人员会定期检查后端数据库，删除或恢复疑似恶意或不明身份的账户操作。
          </Typography>
          <Typography variant="body1" gutterBottom>
           5. 欢迎您对我们的服务提出宝贵的意见或反馈。
          </Typography>
          <Typography variant="body1" gutterBottom>
            如果您对本使用条款有任何疑问，都可以通过
            <Link href="https://github.com/Justherozen">GitHub</Link>与我们联系。
          </Typography>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={classes.use_item}>
          <Typography variant="h3" gutterBottom>
            隐私协议
          </Typography>
          <Typography variant="body1" gutterBottom>
            您使用 Iot Platform
            服务，即表示您信赖我们对您的信息的处理方式。我们深知这项责任事关重大，因此一直致力于保护您的信息，并让您拥有控制权。
          </Typography>
          <Typography variant="body1" gutterBottom>
            本隐私协议旨在协助您了解我们会收集哪些信息、为什么收集这些信息，以及您如何更新、管理、导出和删除自己的信息。
          </Typography>
          <Typography variant="h4" gutterBottom>
            我们会收集哪些信息
          </Typography>
          <Typography variant="body1" gutterBottom>
            在您创建 Iot Platform
            账户时，我们希望获取您的姓氏、名字、邮箱账号和密码；在您使用
            Iot Platform
            服务的过程中，我们希望获取您的设备记录。除此之外，我们不会收集其他任何信息。
          </Typography>
          <Typography variant="h4" gutterBottom>
            为什么收集这些信息
          </Typography>
          <Typography variant="body1" gutterBottom>
            我们收集这些信息仅用于您在 Iot Platform
            平台关联的医院服务中，我们承诺不会将这些信息用于任何其他不相关场景，同时，我们也将努力保证您提交给
            Iot Platform 的信息不会从任何渠道或途径泄露。
          </Typography>
          <Typography variant="h4" gutterBottom>
            您如何管理自己的信息
          </Typography>
          <Typography variant="body1" gutterBottom>
            您可以通过多种方式使用 Iot Platform
            服务来掌控自己的隐私。
          </Typography>
          <Typography variant="body1" gutterBottom>
            注意，一旦您注册 Iot Platform
            服务，我们将要求您提交必要的信息[具体的信息描述，可以参考前面我们会收集哪些信息这一小节]以供顺利地进行医疗问诊。任何情况下，我们都不会在未告知您的前提下收集信息，您可以在个人主页查看您提交给
            Iot Platform 的信息，并对这些信息做出合乎您账户类型的修改。
          </Typography>
          <Typography variant="body1" gutterBottom>
            如果您对本隐私协议有任何疑问，都可以通过
            <Link href="https://github.com/Justherozen">GitHub</Link>与我们联系。
          </Typography>
        </div>
      </TabPanel>
    </div>
  );
}
