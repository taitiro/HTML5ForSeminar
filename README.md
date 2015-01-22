# HTML5ForSeminar
セミナー用のHTML5デモプロジェクト

どんなセミナーだったかは、下記参照

* [「明日から使える！ナウいITワード～開校！FLAMA教室」開催のお知らせ | 株式会社FLAMA](http://www.flama.co.jp/news/2014/20141224_2.html)

- - -

# 著作権について
このソースの著作権はMIT Licenseです。オリジナルのライセンス表示さえ保持してくれれば
好きなように扱えます。

使用しているライブラリの著作権については、それぞれのライブラリを参照してください。

プロジェクト内で使用している羊の絵と羊の動画については、パブリックドメインに寄贈されていた下記の画像・動画を使用しました

* [File:Sheep.svg - Wikimedia Commons](http://commons.wikimedia.org/wiki/File:Sheep.svg?uselang=ja)
* [sheep : antonwithagen : Free Download & Streaming : Internet Archive](https://archive.org/details/sheep_590)

# 使用しているライブラリ

## サーバーサイド

* [Express - Node.js web application framework](http://expressjs.com/)
* [websocket.io](https://www.npmjs.com/package/websocket.io)
* [mqtt](https://www.npmjs.com/package/mqtt)……RasberryPiと通信を行う場合

## RasberryPiサイド

* [i2c](https://www.npmjs.com/package/i2c)
* [websocket.io](https://www.npmjs.com/package/websocket.io)

# 必要環境

* [Node.js](http://nodejs.org/)、[npm](https://www.npmjs.com/)

## RasberryPiを用いる場合

### サーバーサイド

* [An Open Source MQTT v3.1 Broker](http://mosquitto.org/)などのMQTT Broker

### RasberryPi

* [Raspberry Pi](http://www.raspberrypi.org/)
* [PiBits/ServoBlaster at master · richardghirst/PiBits](https://github.com/richardghirst/PiBits/tree/master/ServoBlaster)
* [マイクロサーボ９ｇ　ＳＧ－９０: サーボ 秋月電子通商 電子部品 ネット通販](http://akizukidenshi.com/catalog/g/gM-08761/)
* [ＡＤＴ７４１０使用　高精度・高分解能　Ｉ２Ｃ・１６Ｂｉｔ　温度センサモジュール: センサ一般 秋月電子通商 電子部品 ネット通販](http://akizukidenshi.com/catalog/g/gM-06675/)

# 使い方

server、tempClient、それぞれのapp.jsを見てなんとなく推測してください

# 参考リンク

* [IoT時代を支えるプロトコル「MQTT」（前編） （1/3）：CodeZine](http://codezine.jp/article/detail/8000)
* [Raspberry-PiにおけるGPIO関係ツールのインストール方法 | Консоль В Раздан-3](http://oohito.com/nqthm/archives/2151)
* [Raspberry PiによるIoT（M2M）【I2C温度センサー/xively/Python】 - Aldebaranな人のブログ](http://yamaryu0508.hatenablog.com/entry/2014/08/19/233431)
