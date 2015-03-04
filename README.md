#EMRAIT
EMRAIT全名為緊急醫療資源指派與查詢工具(Emergency Medical Resource Assignment and Inquiry Tool)

為參加[守護台灣 Open Data & Open Source 雲端災防應用開發者大賽](https://ossonazure.bhuntr.com/)的網頁作品。

EMRAIT共提供三個工具：

* 救護車及醫院指派工具 [for 救災中心]
    * 可處理同時多處災難點病患的緊急運送需求
    * 隨時考量可用之官方緊急救護資源(救護車、急救醫院)
    * 以最短時間內送完所有病患為主要考量
    * 協助救災中心統籌指揮決策
* 鄰近收容所指引 [for 救災中心、一般民眾]
    * 可指引民眾前往最合適的收容所
    * 可讓民眾隨時更新該收容所最新現況，避免人滿為患
* 鄰近診所查詢 [for 一般民眾]
    * 可指引民眾查詢合適的診所資訊(電話、住址、路線、營業時間)
    
## Website
URL: emrait.cloudapp.net

## Open data使用

| 名稱                               | 說明                                                         | 連結                         |
|------------------------------------|--------------------------------------------------------------|------------------------------|
| 全國重度級急救責任醫院急診即時訊息 | 用於顯示即時醫院資訊                                         | http://bit.ly/1GjgdHl        |
| 醫事機構代碼查詢                   | 整合醫事機構代碼的資料，讓診所資料更齊全                     | http://bit.ly/1GjglGF        |
| 診所基本資料                       | 將診所資料用視覺化方式供民眾查詢。                           | http://data.gov.tw/node/6144 |
| 台灣救護車資料                     | 目前台灣救護車資料並不齊全，本組自行抓取                     | http://bit.ly/1GjgpGs        |
| 醫院基本資料                       | 用於查詢鄰近醫院                                             | http://data.gov.tw/node/6143 |
| 災民收容所                         | 將災民收容所加值，以收容所為單位，提供民眾各收容所即時資訊。 |                              |

## API

目前API都架設在[datagarage](datagarage.io)上

可參考此使用說明 => [說明](https://docs.google.com/file/d/0B2RxwrCtb4FHenpXdkJYT0pzb1U/view)


## License
Apache License V2

powered by [OALIIM](http://ilin.iim.ncku.edu.tw/)