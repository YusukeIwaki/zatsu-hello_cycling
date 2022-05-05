# @zatsu/hello_cycling

```
% npm install git+ssh://git@github.com:YusukeIwaki/zatsu-hello_cycling.git
```

## Usage

### Search ports

```
% jo search_word=川崎駅 | node index.js POST /app/station/search
{
  response: 1,
  data: [
    {
      id: 1364,
      name: 'セブンイレブン　川崎駅北店',
      brand_name: 'ダイチャリ',
      brand_logo: 'https://d2a2mitt2l0zmn.cloudfront.net/data/2021/07/19/logo_daichari_120.png',
      is_open: true,
      num_bikes_parkable: 0,
      num_bikes_rentalable: 4,
      num_bikes_reserve: 0,
      parking_num_limit: 4,
      port_photo_path: 'https://d2a2mitt2l0zmn.cloudfront.net/data/2018/04/23/keep_aspect_ratio/750/20180423_005249778_iOS.jpg',
      status: 9,
      lat: 35.53291,
      lon: 139.70144,
      battery_flag: 0,
      zip: '210-0006',
      pref_id: 14,
      pref: '神奈川県',
      city: '川崎市川崎区',
      city_id: '14131',
      address: '川崎市川崎区砂子1-4-2-5',
      opening_hour: '',
      closing_hour: '',
      port_category_id: 1,
      adpin_title: '',
      adpin_message: '',
      adpin_url: '',
      adpin_icon: '',
      adpin_show_checkbox: 0,
      img_path: null,
      banner_image: '',
      modal_image: '',
      modal_url: 'https://kawasakihalloween.com/',
      modal_title: '',
      modal_description: '',
      port_type: 'usable',
      bonus: false,
      business_hour: '24h'
    },
    {
      id: 6577,
      name: '川崎駅東口周辺自転車第8施設',
      brand_name: 'HELLO CYCLING',
      brand_logo: 'https://d2a2mitt2l0zmn.cloudfront.net/data/2019/05/07/keep_aspect_ratio/120/HC-logo.png',
      is_open: true,
~~~~~~~~~~~
```

### Show the detail of a port

```
% node index.js GET /app/station/detail?port_id=6321
{
  response: 1,
  data: {
    id: 6321,
    name: 'コインパーク平河町2丁目第2',
    brand_name: 'ダイチャリ',
    company_name: 'シナネンモビリティ＋',
    brand_url: 'https://resource.hellocycling.jp/webview/company/detail/20',
    brand_logo: 'https://d2a2mitt2l0zmn.cloudfront.net/data/2021/07/19/logo_daichari_120.png',
    address: '東京都千代田区平河町2-12-18',
    opening_hour: '',
    closing_hour: '',
    business_hour: '24h',
    is_open: true,
    num_bikes_parkable: 2,
    num_bikes_rentalable: 3,
    num_bikes_reserve: 0,
    port_photo_path: 'https://d2a2mitt2l0zmn.cloudfront.net/data/2021/05/13/keep_aspect_ratio/750/コインパーク平河町2丁目第2.JPG',
    parking_num_limit: 5,
    lat: 35.680885,
    lon: 139.741794,
    battery_flag: 0,
    zip: '102-0093',
    city_id: '13101',
    city_name: '千代田区',
    pref_id: 13,
    pref: '東京都',
    status: 5,
    port_category_id: 1,
    adpin_title: '',
    adpin_message: '',
    adpin_url: '',
    adpin_icon: '',
    banner_image: '',
    modal_image: '',
    modal_url: '',
    modal_title: '',
    modal_description: '',
    campaign_name: '',
    bikes: [ [Object], [Object], [Object] ],
    last_used: null,
    favorite: false,
    status_statistic: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    company_id: '20',
    photos: 0,
    port_type: 'usable'
  }
}
```
