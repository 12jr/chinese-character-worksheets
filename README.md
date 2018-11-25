# Tool to create worksheets for Chinese character writing practice
## For users
### How can I create worksheets?
1.  Head to the [Releases page](https://github.com/12jr/chinese-character-worksheets/releases) and download the latest version's source code. <br/> If you're on Windows, you might want to choose `zip`.
2.  Unpack the downloaded file.
3.  Open `index.html`.
### Consider before downloading
*  To add stroke order images (like [this one](https://upload.wikimedia.org/wikipedia/commons/b/b6/%E6%88%91-bw.png)) to your worksheet, this tool has to be able to reach [wikimedia.org](wikimedia.org) and [cors.io](https://cors.io/).
*  To add [Pīnyīn](https://en.wikipedia.org/wiki/Pinyin) to your worksheet, this tool has to be able to reach [glosbe.com](https://glosbe.com/) and [cors.io](https://cors.io/).

Except for those two features, the tool is able to run offline.
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
