# Googleフォーム回答時のLark自動通知設定ガイド

Googleフォームに新しい回答が送信された際に、Larkチャットへ自動通知する設定です。

## 1. GASコードのひな形（「通知」機能）

以下のコードを、Google Apps Scriptのエディタに貼り付けて使用します。`YOUR_LARK_WEBHOOK_URL`の部分を、Larkで取得した実際のURLに置き換えてください。

```javascript
function onFormSubmit(e) {
  // ①ここにLarkのWebhook URLを設定してください
  var LARK_WEBHOOK_URL = 'YOUR_LARK_WEBHOOK_URL'; 

  // フォームの回答を取得します
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();

  var messageText = "【Googleフォームから新規問い合わせ】\n\n";

  // 回答内容を整形してメッセージ本文を作成します
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var questionTitle = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    messageText += questionTitle + ": " + answer + "\n";
  }

  // Lark APIに送信するペイロード（JSONデータ）を準備します
  var payload = {
    "msg_type": "text",
    "content": {
      "text": messageText
    }
  };

  // HTTPリクエストのオプションを設定します
  var options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'payload' : JSON.stringify(payload)
  };

  // LarkのWebhook URLにデータを送信します
  UrlFetchApp.fetch(LARK_WEBHOOK_URL, options);
}
```

> [!WARNING]
> コードは注意してご使用ください。

---

## 2. 設定手順（先方への案内用）

先方に行っていただく具体的な設定手順です。特にStep 2のWebhook URLの取得方法を丁寧に案内してください。

### 事前準備：LarkでのWebhook URLの取得（先方作業）
1. LarkデスクトップアプリまたはWeb版を開きます。
2. 通知を受け取りたいチャットグループ（例：営業チーム）を開きます。
3. チャット上部のグループ名をクリックし、「設定」を開きます。
4. 「ボット」タブから「ボットを追加」を選び、「カスタムボット」を作成します。
5. 作成されたボットの設定画面に表示される**「Webhook URL」をコピー**します。

### Googleフォームへの設定手順（あなたのサポート込み）
1. 連携したいGoogleフォームを開きます。
2. メニューから「回答」タブ → 右上の縦3点リーダー → 「回答先を選択」で、回答を保存するGoogleスプレッドシートを開きます。
3. スプレッドシートのメニューから「拡張機能」 → 「Apps Script」を開きます。
4. 表示されたコードエディタに、上記のGASコードを貼り付けます。
5. コード内の `YOUR_LARK_WEBHOOK_URL` の部分を、先方が取得したWebhook URLに置き換え、「保存」アイコンをクリックします。

### トリガー（自動実行設定）の設定（あなたのサポート込み）
1. Apps Scriptエディタの左側メニューにある「トリガー」アイコン（時計マーク）をクリックします。
2. 右下の「トリガーを追加」ボタンをクリックします。
3. 以下の設定に変更し、「保存」します。
    - **実行する関数**: `onFormSubmit`
    - **イベントの発生元**: スプレッドシートから
    - **イベントの種類**: フォーム送信時
4. 「承認が必要です」と表示されたら、「許可を確認」をクリックし、Googleアカウントへのアクセスを承認します（先方に行っていただく作業）。

これで、フォーム送信時に自動でLarkへ通知が飛ぶようになります。
