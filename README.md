# Tool to create worksheets for Chinese character writing practice
## For users
### How can I create worksheets?

You can either...
*  [Use the tool **online** on worksheets.dx.am](http://worksheets.dx.am/).

or...

*  Use it **locally on your device**:
   1.  Head to the [Releases page](https://github.com/12jr/chinese-character-worksheets/releases) and download the latest version by clicking on `Chinese_Character_Worksheet_Tool.html` on the top.
   2.  Open the downloaded file and follow the instructions.

Both online and local use also work on your mobile phone or tablet! If you're not sure which one to choose, [read more about pros and cons](https://github.com/12jr/chinese-character-worksheets/wiki/User-FAQ:-Should-I-use-the-tool-on-the-website-or-locally-on-my-computer%3F).

### What do I need to run this tool?
*  A browser with enabled Javascript. This tool was developed with and for Mozilla Firefox, thus Firefox is recommended.
*  Some features need an internet connection to work:
    *  To add stroke order images (like [this one](https://upload.wikimedia.org/wikipedia/commons/b/b6/%E6%88%91-bw.png)) to your worksheet, this tool has to be able to reach [wikimedia.org](wikimedia.org) and [cors.io](https://cors.io/).
    *  To add [Pīnyīn](https://en.wikipedia.org/wiki/Pinyin) to your worksheet, this tool has to be able to reach [glosbe.com](https://glosbe.com/) and [cors.io](https://cors.io/).
    *  Except for those two features, the tool is able to run offline after the download.
    
## For developers
Please refer to the [wiki](https://github.com/12jr/chinese-character-worksheets/wiki).

### Used libraries, APIs, fonts etc.
*   The [Wikimedia Commons Stroke Order Project](https://commons.wikimedia.org/wiki/Commons:Stroke_Order_Project) as the source of the stroke order pictures,  
    the [Wikimedia Commons API](https://www.mediawiki.org/wiki/API:Main_page) to get those pictures, and  
    [cors.io](https://cors.io/) to be able to get those pictures with JavaScript.
*   [Glosbe API](https://glosbe.com/a-api) to create Pīnyīn from the characters.
*   [jsPDF](https://parall.ax/products/jspdf) to create the PDFs dynamically.
*   [normalize.css](https://necolas.github.io/normalize.css/) for the looks.
*   [jQuery](https://jquery.com/) for coding.
*   [Some code](https://codepen.io/vkjgr/pen/gbPaVx) for fancy "loading dots".
*   [AR PL UKai CN](https://www.freedesktop.org/wiki/Software/CJKUnifonts/) ([available here](https://github.com/saiswa/free-fonts/blob/master/PCLinuxOSFonts/AR%20PL%20UKai%20CN%2C%20Regular.ttc)) as a Chinese font.
*   [Noto Sans](https://www.google.com/get/noto/#sans-lgc) as a Pīnyīn font.
*   [html-inline](https://github.com/substack/html-inline) to create the downloadable .html file.
