import { printLine } from './modules/print';

printLine('Content Script loaded');

const timeValue = setInterval(function () {

  var nodeList = document.querySelectorAll('[data-cy="submit-wrong-result"]');
  if (nodeList.length > 0) {
    var button = document.createElement('button');
    button.innerHTML = 'Redo';
    button.id = 'redoButton';
    button.type = 'button';
    nodeList[0].appendChild(button);
    clearInterval(timeValue);

    var theButton = document.getElementById('redoButton');
    const redo = {
      uri: window.location.href,
      record: new Date().toLocaleString(),
    };

    theButton.addEventListener('click', function () {
      chrome.storage.sync.get('data', function (items) {
        printLine('items');
        console.log(items);
        let redos;
        if (Object.keys(items).length === 0) {
          redos = [];
        } else {
          redos = items.data;
        }
        redos.push(redo);
        chrome.storage.sync.set({ data: redos });
        theButton.style.display = 'none';
      });
    });
  }
}, 3000);
