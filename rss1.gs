function doGet(e) {
  //doGet :ウェブアプリケーションにアクセスがあったときに動作する関数
  //https://developers.google.com/apps-script/guides/web
  var num = e.parameter.num; 

//function myFunction() {
   
  //Google Apps Script　の　SpreadsheetApp スプレッドシートクラスの詳細は以下を確認してください。
  //https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app
  
  //[重要]  スプレッドのAPIは２つある
  //スプレットシートを捜査できるAPIにはベーシック(基本)とアドバンス(高度)の２種類あります。
　 //今回は ベーシックを利用します。ベーシックとアドバンスの見分け方は次の通り
   //ベーシック :　Google Apps Script や GAS ともいわれます。かつての Google Apps, 今はG Suitesで利用します。　
   // 　　　　　　 コードに、SpreadsheetApp. から書き始めるものがあレバこちらです。
   //アドバンス：  (Google Cloud Platformのサービスの一部です。
　　//            コードに、Sheets.Spreadsheets.から書き始める含まれます。
   //　　　　　　　もちろんアドバンスの方が色々な複雑なことが出きますが、利用するにはGCP(Google cloud platform)
  　//           の機能を有効にする必要があります。
　 //            ちなみにアドバンスのリファレンスは GoogleSheet APIという名称になっており、別の場所にあります
   //           (https://developers.google.com/sheets/api/quickstart/apps-script) 
   
  //0　デバックと方法
  //Browser.msgBox('hello world'); //デバック用(メッセージボックスへ出力)
  
  //1 スプレッドシート名を取得→RSSテスト
  //var ss = SpreadsheetApp.getActiveSpreadsheet();//スプレッドシートAPPの現在選択中のスプレッドシートをssとする
  //Logger.log(ss.getName());//デバック用(得た名前をログへ出力)

  //2. サンプル　「スプレッドシートの記事データの範囲を指定して、ログへ書き出す」
  //https://developers.google.com/apps-script/guides/sheets
  //
  //var ss = SpreadsheetApp.getActiveSheet(); //スプレッドシートをssとする
  //var data = ss.getDataRange().getValues(); //ssについて、セルに値が入ってる範囲を探し、値を取ってくる
  //for (var i = 1; i < data.length; i ++) {　//データの長さ分繰り返す
  //  Logger.log('no: ' + data[i][0]); // i行目 0列目のデータ
  //  Logger.log('rss: ' + data[i][1]);　// i行目 1列目のデータ
  //}

  //3. サンプル　「スプレッドシートの記事データの範囲を指定して、ログへ書き出す」
  var result=[];
  var ss = SpreadsheetApp.getActiveSheet(); //スプレッドシートをssとする
  var data = ss.getDataRange().getValues(); //ssについて、セルに値が入ってる範kj囲を探し、値を取ってくる
  for (var i = 1; i < data.length; i ++) {　//データの長さ分繰り返す
    Logger.log('no: ' + data[i][0]); // i行目 0列目のデータ
    Logger.log('rss: ' + data[i][1]);　// i行目 1列目のデータ
    result[i] = data[i][1];  //スプレッドシートを一度result配列へ入れる。
  }
  
  if (num < 1 || num > 12) {
    Logger.log('return:  range_error') ;//範囲外エラー
    return ContentService.createTextOutput("rangeerror");
  } else {
    Logger.log('return: ' + result[num]);//指定されたナンバー(num)の結果だけを、WEB APIの結果として返却
    return ContentService
   .createTextOutput(JSON.stringify(  result[num]    ))
   .setMimeType(ContentService.MimeType.JSON);
    //スクリプトからテキストコンテンツを返すサービス https://developers.google.com/apps-script/reference/content/content-service
  }
}


