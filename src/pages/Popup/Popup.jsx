import React, { Component } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

// react material ui
import { green, pink, red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import GitHubIcon from '@mui/icons-material/GitHub';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { ListItemSecondaryAction } from '@mui/material';

// helper functions
import { getTitleFromUrl } from '../../helper';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], daysInput: 3 };
    this.removebyid = this.removebyid.bind(this);

    chrome.storage.sync.get(
      null,
      function (items) {
        if (items.hasOwnProperty('data')) {
          this.setState({ data: items.data });
        }
        if (items.hasOwnProperty('timerDays')) {
          this.setState({ daysInput: items.timerDays });
        }
      }.bind(this)
    );

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  removebyid(id) {
    chrome.storage.sync.get(
      'data',
      function (items) {
        let redos;
        if (Object.keys(items).length === 0) {
          redos = [];
        } else {
          redos = items.data;
        }
        let index = 0;
        for (; index < redos.length; index++) {
          if (redos[index].id === id) {
            redos.splice(index, 1);
            break;
          }
        }
        chrome.storage.sync.set(
          { data: redos },
          function () {
            chrome.storage.sync.get(
              'data',
              function (items) {
                if (Object.keys(items).length > 0) {
                  this.setState({ data: items.data });
                }
              }.bind(this)
            );
          }.bind(this)
        );
      }.bind(this)
    );
  }

  removeall() {
    chrome.storage.sync.set({ data: [] });
    this.setState({ data: [] });
  }

  handleSubmit(event) {
    alert('Saved the number of days for timer: ' + this.state.daysInput);
    chrome.storage.sync.set({ timerDays: this.state.daysInput });
    event.preventDefault();
  }

  render() {
    const itemsList = this.state.data.map((redo) => {
      const redoURI = redo.uri;
      const today = new Date();

      var delta = (new Date(redo.reminderDate) - today) / 1000;
      // calculate (and subtract) whole days
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;
      // calculate (and subtract) whole hours
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;
      // calculate (and subtract) whole minutes
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      // what's left is seconds
      var seconds = delta % 60;

      const avatarBgColor =
        new Date(redo.reminderDate) - today <= 0 ? red[700] : green[700];
      return (
        <ListItem
          key={redo.id}
          button
          component="a"
          href={redo.uri}
          onClick={(e) => {
            chrome.tabs.update({ url: redo.uri });
            e.preventDefault();
          }}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: avatarBgColor }}>
              <AssignmentIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={redo.id}
            secondary={
              new Date(redo.reminderDate) - today <= 0
                ? 'Time to re-do!'
                : `${days} days ${hours} hours`
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => {
                e.preventDefault();
                this.removebyid(redo.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <div className="Title-bar">
            <form onSubmit={this.handleSubmit}>
              <label style={{ fontSize: '10px' }}>
                <input
                  type="text"
                  pattern="[0-9]*"
                  style={{ width: '30px' }}
                  onChange={(event) =>
                    this.setState({
                      daysInput: event.target.value.replace(/\D/, ''),
                    })
                  }
                  value={this.state.daysInput}
                />
              </label>
              <input
                type="submit"
                value="&#128190;"
                style={{ fontSize: 'smaller' }}
              />
            </form>
            <Typography variant="subtitle2" component="div">
              LeetCode List
            </Typography>
            <div>
              <IconButton
                edge="end"
                size="large"
                aria-label="delete"
                onClick={(e) => {
                  e.preventDefault();
                  this.removeall();
                }}
              >
                <DeleteSweepIcon style={{ fontSize: 'large' }} />
              </IconButton>
            </div>
          </div>
          <List dense={false} style={{ maxHeight: '100%', overflow: 'auto' }}>
            {itemsList}
          </List>
        </header>

        <div class="footer">
          <div>
            <IconButton
              edge="end"
              size="small"
              aria-label="delete"
              onClick={(e) => {
                chrome.tabs.update({
                  url: 'https://github.com/arch-org/mistake',
                });
                e.preventDefault();
              }}
            >
              <GitHubIcon style={{ fontSize: 'xx-small' }} />
            </IconButton>
          </div>
          <div>
            <IconButton
              edge="end"
              size="small"
              aria-label="delete"
              onClick={(e) => {
                chrome.tabs.update({
                  url: 'https://www.programcreek.com/2012/11/top-10-algorithms-for-coding-interview/',
                });
                e.preventDefault();
              }}
            >
              <AccountTreeIcon style={{ fontSize: 'xx-small' }} />
            </IconButton>
            <IconButton
              edge="end"
              size="small"
              aria-label="delete"
              onClick={(e) => {
                chrome.tabs.update({
                  url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions',
                });
                e.preventDefault();
              }}
            >
              <AccountTreeIcon style={{ fontSize: 'xx-small' }} />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
