# Tool to create worksheets for Chinese character writing practice
## For users
### How can I create worksheets?
1.  Head to the [Releases page](https://github.com/12jr/chinese-character-worksheets/releases) and download the latest version by clicking on `Chinese_Character_Worksheet_Tool.html` on the top.
2.  Open the downloaded file and follow the instructions.

This also works on your mobile phone or tablet!

### What do I need to run this tool?
*  A browser with enabled Javascript. This tool was developed with and for Mozilla Firefox, thus Firefox is recommended.
*  Some features need an internet connection to work:
    *  To add stroke order images (similar to [this](https://web.csulb.edu/~jwinter2/chin101/strokeorder/static/4e5f.png)) to your worksheet, this tool has to be able to reach [cdn.jsdelivr.net](https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/).
    *  To add [Pīnyīn](https://en.wikipedia.org/wiki/Pinyin) to your worksheet, this tool has to be able to reach [glosbe.com](https://glosbe.com/) and [cors.io](https://cors.io/).
    *  Except for those two features, the tool is able to run offline after the download.

## For developers
Please refer to the [wiki](https://github.com/12jr/chinese-character-worksheets/wiki).

### Used libraries, APIs, fonts etc.
*   [Hanzi Writer](https://github.com/chanind/hanzi-writer) as a source of the stroke orders and a library to turn them into vector graphics.
*   [Glosbe API](https://glosbe.com/a-api) to create Pīnyīn from the characters, and  
    [cors.io](https://cors.io/) to do that with JavaScript.
*   [jsPDF](https://parall.ax/products/jspdf) to create the PDFs dynamically.
*   [normalize.css](https://necolas.github.io/normalize.css/) for the looks.
*   [jQuery](https://jquery.com/) for coding.
*   [Some code](https://codepen.io/vkjgr/pen/gbPaVx) for fancy "loading dots".
*   [AR PL UKai CN](https://www.freedesktop.org/wiki/Software/CJKUnifonts/) ([available here](https://github.com/saiswa/free-fonts/blob/master/PCLinuxOSFonts/AR%20PL%20UKai%20CN%2C%20Regular.ttc)) as a Chinese font.
*   [Noto Sans](https://www.google.com/get/noto/#sans-lgc) as a Pīnyīn font.
*   [html-inline](https://github.com/substack/html-inline) to create the downloadable .html file.

## For people operating / renting web servers
Feel free and encouraged to host this tool. It's as easy as it gets to integrate as it only uses client-side technologies. If you put it online, [file an issue with the URL](https://github.com/12jr/chinese-character-worksheets/issues/new), so we can put it here.
