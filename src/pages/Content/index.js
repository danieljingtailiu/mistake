import { printLine } from './modules/print';
import { getTitleFromUrl } from './../../helper'

let timerDays = 3;
chrome.storage.sync.get('timerDays',
  function (items) {
    if (items.hasOwnProperty('timerDays')) {
      timerDays = parseInt(items.timerDays);
    }
  }
);

const timeValue = setInterval(function () {
  var nodeList = document.querySelectorAll('[data-cy="question-detail-main-tabs"]');
  if (nodeList.length > 0) {
    var button = document.createElement('button');
    button.innerHTML = 'Re-do';
    button.id = 'redoButton';
    button.type = 'button';
    button.style.height = '40px';
    button.style.width = '80px';
    nodeList[0].children[0].appendChild(button);
    clearInterval(timeValue);

    var theButton = document.getElementById('redoButton');

    let reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + timerDays);
    const redo = {
      uri: window.location.href.toString(),
      record: new Date().toLocaleString(),
      reminderDate: reminderDate.toLocaleString(),
    };

    theButton.addEventListener('click', function () {
      chrome.storage.sync.get('data', function (items) {
        let redos;
        const title = getTitleFromUrl(redo.uri);
        if (Object.keys(items).length === 0) {
          printLine('items is empty');
          redos = [];
        } else {
          redos = items.data;
          for (let i = 0; i < redos.length; i++) {
            if (redos[i].id === title) {
              alert('You already marked this question');
              return;
            }
          }
        }
        // redo.id = redos.length + 1;
        redo.id = title;
        redos.push(redo);
        redos.sort(function (a, b) {
          return new Date(a.reminderDate) - new Date(b.reminderDate);
        });
        chrome.storage.sync.set({ data: redos });
        // theButton.style.display = 'none';
      });
    });
  }
}, 1000);
