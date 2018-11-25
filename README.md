# Tool to create worksheets for Chinese character writing practice
## For users
### How can I create worksheets?
1.  Head to the [Releases page](https://github.com/12jr/chinese-character-worksheets/releases) and download the latest version's source code. <br/> If you're on Windows, you might want to choose `zip`.
2.  Unpack the downloaded file.
3.  Open `index.html`.
### Consider before downloading
This tool requires an internet connection to work. It has to be able to reach wikimedia.org and cors.io (and, if you want Pīnyīn added in your PDF, glosbe.com).
## For developers
### What is it with those Base64 font files?
In [`res/fontsB64`](res/fontsB64), there are some files which assign Base64 encoded `ttf`/`ttc` files to Javascript variables. They are used by the PDF creation library (jsPDF) to display Pīnyīn and Chinese characters.
Currently, we use [AR PL UKai CN](https://www.freedesktop.org/wiki/Software/CJKUnifonts/) ([available here](https://github.com/saiswa/free-fonts/blob/master/PCLinuxOSFonts/AR%20PL%20UKai%20CN%2C%20Regular.ttc)) as a Chinese font.
* Note that this is an open source project, therefore it is dependent on open source fonts (unlike a paid website creating similar worksheets, which uses [Microsoft's proprietary KaiTi](https://docs.microsoft.com/en-us/typography/font-list/kaiti)). AR PL UKai does not seem to be developed anymore. Yet, AR PL UKai CN seems to be the [best choice](https://en.wikipedia.org/wiki/List_of_CJK_fonts#Regular_script) in open source [regular script](https://en.wikipedia.org/wiki/Regular_script) fonts.  
   Do you know some better open source, regular script font? Please [file an issue](https://github.com/12jr/chinese-character-worksheets/issues) suggesting it!
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
