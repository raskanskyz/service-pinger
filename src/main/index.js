import path from 'path';
import url from 'url';
import { app } from 'electron';
import is from 'electron-is';
import menubar from 'menubar';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';


let mb;

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];

    const installations = extensions.map(ext => installExtension(ext)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err)));

    await Promise.all(installations);
  }
};

app.on('ready', async () => {
  await installExtensions();

  mb = menubar({
    index: is.dev()
      ? 'http://localhost:8888/app.html'
      : url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true,
      }),
    icon: path.resolve(__dirname, 'rapidapi.png'),
    tooltip: 'Rapid Version Tracker',
    width: 350,
    height: 460,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      backgroundThrottling: false,
      // plugins: true,
      // nodeIntegration: false,
      // webSecurity: false,
      // allowDisplayingInsecureContent: true,
      // allowRunningInsecureContent: true,
    },
    alwaysOnTop: true,
    showOnAllWorkspaces: false,
    // preloadWindow: true,
  });

  mb.on('after-create-window', () => {
    if (process.env.NODE_ENV === 'development') {
      mb.window.webContents.openDevTools({ mode: 'undocked' });
    }
  });
});

app.on('window-all-closed', (event) => {
  app.dock.hide();
  event.preventDefault();
});
