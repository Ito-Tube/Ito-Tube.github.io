var markerData = [ // マーカーを立てる場所名・緯度・経度
  {
    name: '糸島のトゥクトゥク',
    lat: 33.5601713,
    lng: 130.1976312,
    description: '東南アジアでメジャーなタクシー「トゥクトゥク」をレンタルして糸島をドライブできます。',
    video: 'i15tGYfEHBk'
  },{
    name: 'タビノキセキ',
    lat: 33.5905083,
    lng: 130.1503887,
    description: '手作りアクセサリーの制作・販売を行なっている工房です。',
    video: 'AxTXIs7o3gg'
  },{
    name: 'グリーンコード',
    lat: 33.5255099,
    lng: 130.1664739,
    description: '糸島市二丈にある音楽スタジオ&カフェ',
    video: 'BXOuoFVojAc'
  },{
    name: '一力寿司',
    lat: 33.5695529,
    lng: 130.2380551,
    description: '一力寿司、世界一のおもいで屋、鯛ラーメン穂と花の3つを営む素敵な思いを持った大将のお店',
    video: 'eCi26uqWXcw'
  },{
    name: '暇楽',
    lat: 33.5763295,
    lng: 130.0947597,
    description: '海辺の無添加手作り石けん工房。癒しを求めるあなたに',
    video: 'FEnwpG9eArQ'
  },{
    name: '立石山への行き方',
    lat: 33.5880603,
    lng: 130.110623,
    description: '立石山への行き方を「芥屋第1駐車場」からわかりやすく解説',
    video: 'Ww1VYCTA5m0'
  },{
    name: '立石山南側登山口',
    lat: 33.5800776,
    lng: 130.1030048,
    description: 'インスタ映えの絶景の山、立石山に登ろう。ハイキング気分で15分程度で登れる立石山の南側登山口はココ',
    video: 'Z7_6-S6mBMg'
  },{
    name: '糸島ベース Laid Back',
    lat: 33.5602503,
    lng: 130.2017209,
    description: '秘密基地のようなバー',
    video: 'HNh0GvU9Fwk'
  },{
    name: '白糸の滝',
    lat: 33.480918,
    lng: 130.1752019,
    description: '糸島を代表する観光地、県天然記念物の滝',
    video: '8LkyHb3MAk0'
  },{
    name: 'はろ展望台',
    lat: 33.4898821,
    lng: 130.168612,
    description: '糸島を一望できる展望台。夜景も綺麗です',
    video: 'AuzaAYcKC9k'
  }
];
var map;
var marker = [];
var infoWindow = [];
var MapCenter = new google.maps.LatLng(33.564422, 130.17); //地図の中心緯度経度の取得　
var MapZoom = 11.5;
var Options = {
  zoom: MapZoom,      //地図の縮尺値
  center: MapCenter,    //地図の中心座標
  mapTypeId: 'roadmap',   //地図の種類
  mapTypeControl: false,
  zoomControl: false,
  streetViewControl: false,
  fullscreenControl: false
};

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), Options);
  for (var i = 0; i < markerData.length; i++) {
    markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 地図の中心緯度経度
    marker[i] = new google.maps.Marker({ // マーカーの追加
      position: markerLatLng, // マーカーを立てる位置を指定
      map: map, // マーカーを立てる地図を指定
      icon: {
        url: './images/playpin.png',
        scaledSize: new google.maps.Size(32, 32),
        labelOrigin: new google.maps.Point(15, 40)  //ラベルの基点
      },
      label: {
        text: markerData[i]['name'],         //ラベル文字
        color: '#000000',          //ラベル文字の色
        fontFamily: 'sans-serif',  //フォント
        fontWeight: 'bold',        //フォントの太さ
        fontSize: '12px'           //フォントのサイズ
      }
    });

    infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
      content: "<button class='info_button'type='button' onclick='playvideo("+i+")'><img src='./images/yt_icon_rgb.png'></img><h3 class='pop-title'>" + markerData[i]['name'] + "</h3><p>"+markerData[i]['description']+"<br>タップして動画を再生</p></button>" // 吹き出しに表示する内容
    });

    markerEvent(i); // マーカーにクリックイベントを追加
  }
}

var current_window = 1;
function markerEvent(i) {
  marker[i].addListener('click', function() { // マーカーをクリックしたとき
    infoWindow[current_window].close();
    infoWindow[i].open(map, marker[i]); // 吹き出しの表示
    current_window = i;
  });
}

function playvideo(i){
  document.getElementById("embed_video").src = "https://www.youtube.com/embed/"+markerData[i]['video'];
  document.getElementById("video_screen").classList.add('show');
}

function pan2origin(){
  map.panTo(MapCenter);
  map.setZoom(MapZoom);
}

var myplace_marker;
var first_flg = 1;
var myplace;
function getmyplace(){
  if (!navigator.geolocation){//Geolocation apiがサポートされていない場合
    console.log("Geolocation　APIはあなたのブラウザーでサポートされておりません");
    return;
  }
  function success(position) {
    var latitude  = position.coords.latitude;//緯度
    var longitude = position.coords.longitude;//経度
    myplace = new google.maps.LatLng( latitude , longitude ) ;
    // console.log(myplace);
    if(myplace_marker == null){
      myplace_marker = new google.maps.Marker({
        map: map ,
        position: myplace ,
        icon: {
          url: './images/currentpos.png',
          scaledSize: new google.maps.Size(20, 20),
        }
      })
    }else{
      myplace_marker.setPosition(myplace);
    }
    if(first_flg == 1){
      map.panTo(myplace);
      first_flg = 0;
    }
  };
  function error() {
    //エラーの場合
    console.log("座標位置を取得できません");
    first_flg = 1;
  };

  if(first_flg == 1){
    navigator.geolocation.watchPosition(success, error);//成功と失敗を判断
  }else{
    map.panTo(myplace)
  }
}

initMap();

function close_video(){
  document.getElementById("video_screen").classList.remove('show');
  document.getElementById("embed_video").src = "";
}
