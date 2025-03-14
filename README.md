# RoLIMOA: **Ro**bocon **L**ivestreaming **I**ntegrated **M**atch **O**perating **A**pp

NHK学生ロボコンのようなロボットコンテストの大会で、青・赤チームの得点を各担当が入力し、それを会場のスクリーンやライブストリーミング（動画配信）に表示する統合的なシステムです。

[![demo](./docs/demo-video.gif)](https://www.youtube.com/watch?v=NV2unpMqg-M)

## 機能 / features

![RoLIMOAの想定構成図](./docs/RoLIMOAの想定構成図.drawio.png)

- NHK学生ロボコン・高専ロボコンと同じ、青コートと赤コートによる2チームの対戦形式
- 毎年変わるルールに合わせ、JSONで得点計算やVゴール名などを柔軟に設定
- 各デバイスで入力した得点は他のデバイスと同期
- スクリーンや配信画面に、対戦チーム名や得点、タイマーを表示


## 使い方 / Usage

### 設定ファイルの編集

client/src/config.jsonを編集して、好みの設定にします。特にルールに関する`rule.task_objects`, `rule.score`, `rule.vgoal`を編集します。server/src/config.jsonも同じ内容で保存してください。

現在、config.jsonについてドキュメントなどはありません。client/src/config/schema.tsでzod schemaを定義しているので、それを参考にしてください。

### 本番環境の起動方法

サーバ側でクライアントのビルド済みファイルをホスティングしているので、実際の大会時には次のような運用を想定しています。

```bash
git clone https://github.com/kishimotonico/RoLIMOA.git
cd RoLIMOA

# クライアントをビルド
cd ./client
npm i       # 初回のみ
npm run build

# サーバを起動する
cd ../server
npm i       # 初回のみ
npm start
```

http://localhost:8000 で管理画面を開けるようになります。OSやファイアウォールを設定すれば、他のデバイスからも操作できます。

### 詳しい操作方法

#### 「試合管理（マスタ）」画面

「試合管理（マスタ）」画面を開き、試合名・青チーム名・赤チーム名を入力して〔試合開始〕を押します。〔次のフェーズへ〕のボタンでセッティングタイムや競技を始めることができます。以後、この画面のタブは常に開いたままにします。また、試合管理画面は1つのタブのみで開く必要がある点に注意してください。

#### スクリーン画面

カウントダウンや競技終了の効果音は「スクリーン」画面で再生されます。カウントダウンやフェーズ遷移時のラグを防止するため、試合管理画面とスクリーン画面は、サーバを起動したのと同じPCで表示することを推奨します。

注意点として、スクリーン画面の音声再生は環境に依存するので、効果音が遅れる場合があります。Chromeでは音声の自動再生を許可してください。Firefoxなど別ブラウザを使うと挙動が改善するケースもあります。

また、内部タイマーが二重に生成されてしまい **経過時間が正常に取得できないバグ** があります。競技中フェーズで発生すると、競技時間が終わる前に終了の効果音が鳴ってしまいます。ページを再読み込みすることで対応できるため、現段階では運用でカバーしてください。バグ発生は、画面のタイマーにチラつき（1秒に2回以上の更新）があるとき、もしくはデバッグコンソールを確認することで分かります。

#### 得点入力、主審入力画面

別のタブやデバイスで「青/赤チーム入力」画面を開き、得点を入力します。実際の大会では、各コートの担当者複数名が同時に入力する想定です。

「主審入力」画面では、両チームの得点状況を一覧できます。Googleスプレッドシートなど別記録へ転記しやすくするために実装しました。また、試合終了フェーズでは〔試合結果を確定〕することができます。結果を確定すると、ダッシュボードに試合の結果が記録されます。

#### 配信オーバーレイ画面

「配信オーバーレイ」画面は、YouTubeなどへの配信画面に表示するために使います。OBSのBrowser Sourceで、1600x900の大きさで表示する想定です。会場の音声を取り込むため、配信オーバーレイでは音声を再生していません。

#### その他、サーバ仕様

サーバが終了したとき、試合結果は消えます。ただ、試合履歴の保存機能を試験的に実装しました。試合管理画面のデバイス管理にある保存ボタンを押すと、sever/save/store_20230524000000.jsonに保存します。このファイルがある場合は、再起動時に最も新しいものが読み込まれます。


## 開発方法 / How to develop

開発時には、サーバとクライアントをそれぞれ起動して開発します。

```bash
# サーバ側
cd /path/to/RoLIMOA/server
npm start

# クライアント側
cd /path/to/RoLIMOA/client
npm run dev
```

### 要素技術

このプロジェクトでは次の言語やライブラリを使ってます

- TypeScript
- React
- Redux (Redux Toolkit)
- Recoil
- WebSocket (socket.io)
- Zod
- Express

### 🐋 Docker (WIP)

Dockerでも起動や開発ができます。

本番環境のコンテナを使うには、次の方法でビルド＆起動をしてからブラウザで http://localhost:8000 にアクセスします。

```bash
cd /path/to/RoLIMOA

# ビルド
docker build -t rolimoa .

# 起動
docker run -p 8000:8000 rolimoa
```

開発環境にはサーバーとクライアントのコンテナを使うので、次のようにしてDocker composeで起動します。

```bash
cd /path/to/RoLIMOA

docker compose up -d
```

### TODO: 今後追加したい機能や、改善したい点など

#### タイマー、時刻表示の改善

タイマーが二重に起動して表示が安定しないことや、意図しない音声再生するときがあるので改善したい。

#### 各試合のログ保存・再生

各試合でチームの点数状況などを保存したり、得点の増減など各操作を記録して再現したりする機能が欲しい。

#### サーバとクライアントのコードの共通化

サーバとクライアントの両方でRedux（Redux Toolkit）を用いているので`server/src/slices/*.ts`と`client/src/features/*.ts`でほぼ同じコードを管理している。1つにまとめたい。
