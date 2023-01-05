# LeetCode Mistake Tracker Chrome Extension
[![Docker Image CI](https://github.com/architec/mistake/actions/workflows/docker-image.yml/badge.svg?branch=main)](https://github.com/architec/mistake/actions/workflows/docker-image.yml)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/gdkafhifmmkcifpdcfbppiieckgfpjbb.svg)](https://chrome.google.com/webstore/detail/leetcode-mistake-tracker/gdkafhifmmkcifpdcfbppiieckgfpjbb)
<a href="https://chrome.google.com/webstore/detail/leetcode-mistake-tracker/gdkafhifmmkcifpdcfbppiieckgfpjbb"><img src="https://img.shields.io/chrome-web-store/d/gdkafhifmmkcifpdcfbppiieckgfpjbb.svg" alt="users"></a>
<a href="https://github.com/architec/mistake/graphs/contributors" alt="Contributors"><img src="https://img.shields.io/github/contributors/architec/mistake" /></a>


This is a Chrome Extensions to help LeetCode users keep track of the LeetCode questions they would like to re-do in the future.

After users specified time period, the extension will remind the users to re-do the LeetCode question selected.

### Q: Why didn't I use the "add to list" feature from LeetCode?
A: I would like to sort the questions by the time when it was added, and give me an alert when my reminder time is up, to re-do this LeetCode question. I didn't find any similar feature from "add to list", so I created a chrome extension for this specific feature.

## User Installation

Install the extension from [here](https://chrome.google.com/webstore/detail/leetcode-mistake-tracker/gdkafhifmmkcifpdcfbppiieckgfpjbb)

## Features

This Chrome Extension currently supports:

- **Save the re-do LeetCode questions**
![wrong_answers.png](/screenshots/wrong_anwser_button_update.png?raw=true)
- **Show the list of LeetCode questions by extension popup**
![popup.png](/screenshots/popup.png?raw=true)


## Developer Installing and Running

### Procedures (Docker)

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Run `npm run compose` 
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
6. Happy hacking.

### Build by NPM
For step 3 above, you can use the following steps instead
1. Run `npm install` to install the dependencies.
2. Run `npm start`

## Packing

After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.


## Credits

- [chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react)
