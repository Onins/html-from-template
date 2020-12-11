export default class whm {
  big_area_jp = "";
  big_area_en = "";
  area_code = "";
  country_jp = "";
  country_en = "";
  country_code_2 = "";
  country_code_3 = "";
  city_code = "";
  seo_keyword = "";
  registered_name_en = "";
  en_pass = "";
  sliders_count = "";
  slider="";
  meta_description = "";
  meta_keyword = "";
  name = "";
  headline = "";
  explanatory_text = "";
  staff_rec_pts = "";
  heritage_type = "";
  reg_year = "";
  time_diff_jp = "";
  best_season = "";
  flight_time = "";
  tour_avg_budget = "";
  est_travel_days = "";
  direction_jp_overview = "";
  direction_jp_details = [];
  his_overseas_branch = "";
  other_countries_travel_pc = "";
  other_wh_pc = "";
  long_lat_fjp_tsite = "";
  other_wh_sites_pc = "";

  constructor(
    big_area_jp,
    big_area_en,
    area_code,
    country_jp,
    country_en,
    country_code_2,
    country_code_3,
    city_code,
    seo_keyword,
    registered_name_en,
    en_pass,
    sliders_count,
    meta_description,
    meta_keyword,
    name,
    headline,
    explanatory_text,
    staff_rec_pts,
    heritage_type,
    reg_year,
    time_diff_jp,
    best_season,
    flight_time,
    tour_avg_budget,
    est_travel_days,
    direction_jp_details,
    his_overseas_branch,
    other_countries_travel_pc,
    other_wh_pc,
    long_lat_fjp_tsite,
    other_wh_sites_pc
    )
  {
    this.big_area_jp = big_area_jp;
    this.big_area_en = big_area_en;
    this.area_code = area_code;
    this.country_jp = country_jp;
    this.country_en = country_en;
    this.country_code_2 = country_code_2;
    this.country_code_3 = country_code_3;
    this.city_code = city_code;
    this.seo_keyword = seo_keyword;
    this.registered_name_en = registered_name_en;
    this.en_pass = en_pass;
    this.sliders_count = sliders_count;
    this.meta_description = meta_description;
    this.meta_keyword = meta_keyword;
    this.name = name;
    this.headline = headline;
    this.explanatory_text = explanatory_text;
    this.staff_rec_pts = staff_rec_pts;
    this.heritage_type = heritage_type;
    this.reg_year = reg_year;
    this.time_diff_jp = time_diff_jp;
    this.best_season = best_season;
    this.flight_time = flight_time;
    this.tour_avg_budget = tour_avg_budget;
    this.est_travel_days = est_travel_days;
    this.direction_jp_details = direction_jp_details;
    this.his_overseas_branch = his_overseas_branch;
    this.other_countries_travel_pc = other_countries_travel_pc;
    this.other_wh_pc = other_wh_pc;
    this.long_lat_fjp_tsite = long_lat_fjp_tsite;
    this.other_wh_sites_pc = other_wh_sites_pc;
  }

  formatOtherWhSites(content) {
    let array = content !== "" ? content.split("\n\n") : "";
    let list = "";
    let mvImgUrl;
    if (array) {
      array.forEach((el) => {
        if(el !== "none") {
          mvImgUrl = el.includes("https") ? el.split("/") : "";
          mvImgUrl = `/${mvImgUrl[3]}/${mvImgUrl[4]}/${mvImgUrl[5]}/img/${mvImgUrl[6]}_mv.jpg`
          list += `
          <li class="heritage__item">
            <a class="heritage__item-inner" href="${(el.split("\n")[1]).slice(0, -1)}.html">
              <p class="heritage__img">
                <img class="object-fit" src=${mvImgUrl} alt="${ (el.split("\n")[0]).substring(1) }" />
              </p>
              <p class="heritage__tag">${this.country_jp}</p>
              <p class="heritage__name">${ (el.split("\n")[0]).substring(1) }</p>
            </a>
          </li>
          `
        }
      });
      return list;
    }
  }

  formatCoordinates(coordinates) {
    let array = coordinates !== "" ? coordinates.split("\n\n") : "";
    let longLat = "";

    if (array) {
      let data = array[array.length -1].split("\n");
          longLat += `
          // 到着地
          const dest = {
            name: "${(array[0].split('\n'))[0].slice(0, -1)}",
            lat: ${array[0].split('\n')[1].split(',')[0].substring(1)},
            lng: ${(array[0].split(','))[1]},
          };
          `
      if (array.length > 2) {
        for(let x=1; x < array.length-1; x++) {
          longLat += `
          // 到着地
          const dest${x+1} = {
            name: "${(array[x].split('\n'))[0].slice(0, -1)}",
            lat: ${array[x].split('\n')[1].split(',')[0].substring(1)},
            lng: ${(array[x].split(','))[1]},
          };
          `
        }
      }

      longLat += `
          // 世界遺産
          const heritage = {
            name: "${data[0].slice(0, -1)}",
            lat: ${ data[1] ? (data[1].split(','))[0].substring(1) : '' },
            lng: ${ data[1] ? (data[1].split(','))[1] : '' },
            src: '/world-heritage/${this.big_area_en}/${this.country_en}/img/${this.en_pass}_mv.jpg', //画像
          };
      `
      return longLat;
    }

  }

  formatParagraph(text, className) {
    let array = text !== "" ? text.split("\n\n") : false;
    let paragraphs = "";
    if (array) {
      array.forEach((paragraph) => {
        paragraphs += `<p class="${className}">${paragraph}</p>`;
      });
      return paragraphs;
    }
  }

  generateSlider(num) {
    if(num !== "" || num !== "none") {
      let i;
      let slideItem = "";
      for(i = 1; i <= num; i++) {
        slideItem += `<li><img class="object-fit" src="/world-heritage/${this.big_area_en}/${this.country_en}/img/${this.en_pass}_main0${i}.jpg" alt="${this.name}" /></li>\n`
      }
      return slideItem;
    }
  }

  overseasBranch(detail) {
    let branch = detail !== "none" ? detail.split("\n") : false;
    let detailText = "";
    if (branch) {
      detailText = `<p class="direction-detail__text">この世界遺産がある国には、HISの現地支店がございます。<a href="${branch[0]}">>>${branch[1]}</a><br />お客様の安心で快適な旅をサポートします。</p>`;
    }
    return detailText;
  }

  otherCountriesTravel(list) {
    let content = list.replace(/▼/g, '');
    let array = content !== "none" ? content.split("\n\n") : false;
    let itemList = "";
    if (array) {
      array.forEach(function(arrList) {
        let arr = arrList.split("\n");
        itemList += `<li class="other__item"><a href="${arr[1]}">${arr[0]}</a></li>\n`;
      });
    }
    return itemList;
  }

  otherWH(list) {
    let content = list.replace(/▼/g, '');
    let array = content !== "none" ? content.split("\n\n") : false;
    let itemList = "";
    if (array) {
      array.forEach(function(arrList) {
        let arr = arrList.split("\n");
        itemList += `<li class="other-country__item"><div class="heritage__button heritage__button--other-country"><a href="${arr[1]}">${arr[0]}</a></div></li>\n`;
      });
    }
    return itemList;
  }

  formatDirection(details) {
    let group = details.split("\n\n");
    let objList = [];
    let childList = [];

    if (group.length > 1 && details != ""){
      objList.push(group[0].split("\n")[1].split(": ").pop());
      if (group.length > 2) {
        for(let i = 1; i < group.length - 1; i++) {
          let elem = [];
          let groupList = [];

          groupList.push(group[i].split("\n")[0].replace(/■/g, ''));
          groupList.push(group[i].split("\n").slice(1))

          groupList.forEach((item, index )=> {
            if (index == 0) {
              elem.push(`<div class="direction-detail__item-inner"><p class="direction-detail__place">${item}</p></div>`);
            }
            else {
              let children = [];

              item.forEach(child => {
                children.push(`<p class="direction-detail__time direction-detail__time--${child.split(": ")[0]}">${child.split(": ").pop()}</p>`)
              });
              elem.push(`<div class="direction-detail__item-inner">${children.join("")}</div>`)
            }
          });
          childList.push(`<li class="direction-detail__item">${elem.join("")}</li>`);
        }
        objList.push(childList.join(""));
      }
      objList.push(group[group.length - 1].replace(/■/g, ''));
    }

    else {
      return false;
    }
    return objList;
  }

  getTemplate()
  {
    return `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <title>${this.name} - ${this.country_jp} 世界遺産の旅【HIS】</title>
        <!-- Google Tag Manager -->
        <script>
          (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-M6QKN2');
        </script>
        <!-- End Google Tag Manager -->
        <meta name="keywords" content="${this.meta_keyword}" />
        <meta name="description" content="${this.meta_description}" />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@HIS_japan" />
        <link rel="canonical" href="https://www.his-j.com/world-heritage/${this.big_area_en}/${this.country_en}/${this.en_pass}/" />
        <link rel="shortcut icon" href="https://www.his-j.com/cmn/images/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="https://www.his-j.com/cmn/images/apple-touch-icon.png" sizes="180x180" />

        <!--OpenGraph-->
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="${this.name} - ${this.country_jp} 世界遺産の旅【HIS】" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.his-j.com/world-heritage/${this.big_area_en}/${this.country_en}/${this.en_pass}/index_sp.html" />
        <meta property="og:site_name" content="HIS海外・国内総合旅行予約サイト" />
        <meta property="og:image" content="https://www.his-j.com/cmn/images/ogp.png" />
        <meta property="og:description" content="${this.meta_description}"/>
        <meta property="fb:app_id" content="222347251136850" />

        <!--構造化データ-->
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@id": "https://www.his-j.com/Default_sp.aspx",
                  "name": "総合旅行サイトHIS"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.his-j.com/world-heritage/index_sp.html",
                  "name": "世界遺産の旅"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.his-j.com/world-heritage/${this.big_area_en}/index_sp.html",
                  "name": "${this.big_area_jp}の世界遺産"
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@id": "https://www.his-j.com/world-heritage/${this.big_area_en}/${this.country_en}/index_sp.html",
                  "name": "${this.country_jp}の世界遺産"
                }
              },
              {
                "@type": "ListItem",
                "position": 5,
                "item": {
                  "@id": "https://www.his-j.com/world-heritage/${this.big_area_en}/${this.country_en}/${this.en_pass}/index_sp.html",
                  "name": "${this.name}"
                }
              }
            ]
          }
        </script>

        <!--PCでアクセス時にPCページへリダイレクト-->
        <script type="text/javascript">
          if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
          } else {
            var newPage = '/world-heritage/${this.big_area_en}/${this.country_en}/${this.en_pass}/';
            var redirectURL = location.origin + newPage + location.search;
            redirectURL += location.hash;
            location.href = redirectURL;
          }
        </script>

        <!--共通-->
        <link rel="stylesheet" href="https://www.his-j.com/cmn/css/common.css" />
        <script src="https://www.his-j.com/cmn/plugin/jquery/jquery-3.3.1.min.js"></script>
        <link rel="stylesheet" href="https://www.his-j.com/cmn/plugin/slick/slick.css" />
        <link rel="stylesheet" href="https://www.his-j.com/cmn/plugin/magnific-popup/magnific-popup.css" />
        <script src="https://www.his-j.com/cmn/plugin/slick/slick.min.js"></script>
        <script src="https://www.his-j.com/cmn/plugin/magnific-popup/jquery.magnific-popup.min.js"></script>
        <script src="https://www.his-j.com/cmn/plugin/cookie_js/jquery.cookie.js"></script>

        <!--テンプレート用-->
        <link rel="stylesheet" href="https://www.his-j.com/cmn/ui-parts/css/ui_parts.min.css" />
        <script src="https://www.his-j.com/cmn/ui-parts/js/ui_parts.js"></script>

        <!--新ヘッダーフッター用-->
        <link rel="stylesheet" href="https://www.his-j.com/cmn/n-headfoot/css/headfoot.css" />
        <script src="https://www.his-j.com/cmn/plugin/vue/vue.js"></script>
        <script src="https://www.his-j.com/cmn/plugin/pubsub/pubsub.min.js"></script>

        <!--ページ用-->
        <script src="/world-heritage/library/object-fit-images/ofi.min.js"></script>
        <link rel="stylesheet" href="/world-heritage/css/details_sp.css" />
      </head>

      <body>
        <!-- Google Tag Manager (noscript) -->
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M6QKN2" height="0" width="0" style="display: none; visibility: hidden;"></iframe>
        </noscript>
        <!-- End Google Tag Manager (noscript) -->

        <div id="hisApp">
          <h1 id="site-copy">${this.name} - ${this.country_jp} 世界遺産の旅【HIS】</h1>

          <div id="header">
            <his-header></his-header>
          </div>

          <main class="main">
            <!--▼▼▼ パンくず ▼▼▼-->
            <div class="breadcrumb">
              <ul class="breadcrumb__inner">
                <li class="breadcrumb__item">
                  <a href="/Default.aspx" class="breadcrumb__itemInner">
                    <img class="breadcrumb__icon" src="https://www.his-j.com/cmn/icon/icon_home.png" alt="" />
                    <span>総合旅行サイトHIS</span>
                  </a>
                </li>
                <li class="breadcrumb__item">
                  <a href="/world-heritage/index_sp.html" class="breadcrumb__itemInner">
                    <span>世界遺産の旅</span>
                  </a>
                </li>
                <li class="breadcrumb__item">
                  <a href="/world-heritage/${this.big_area_en}/index_sp.html" class="breadcrumb__itemInner">
                    <span>${this.big_area_jp}の世界遺産</span>
                  </a>
                </li>
                <li class="breadcrumb__item">
                  <a href="/world-heritage/${this.big_area_en}/${this.country_en}/index_sp.html" class="breadcrumb__itemInner">
                    <span>${this.country_jp}の世界遺産</span>
                  </a>
                </li>
                <li class="breadcrumb__item">
                  <span class="breadcrumb__itemInner">
                    <span>${this.seo_keyword}</span>
                  </span>
                </li>
              </ul>
            </div>
            <!--▲▲▲ パンくず ▲▲▲-->

            <section class="content">
              <!--#include virtual="/world-heritage/ssi/global-nav_sp.shtml" -->

              <section class="main-visual">
                <h2 class="main-visual__text">
                  <p class="main-visual__text--japanese">${this.name}</p>
                  <p class="main-visual__text--english">${this.registered_name_en}</p>
                </h2>
              </section>

              <section class="description">
                <div class="description__inner">
                  <h3 class="title">
                    <p class="title__text title__text--main-visual">${this.headline}</p>
                    <p class="title__img">
                      <img src="/world-heritage/img/english_title/description.svg" alt="Description" />
                    </p>
                  </h3>

                  <ul class="slick">
                    ${this.sliders_count}
                  </ul>
                  <ul class="thumbnail">
                    ${this.sliders_count}
                  </ul>

                  <p class="description__text">${this.explanatory_text}</p>
                  <p class="description__text">
                    現在の形になったのは14世紀・明の時代。
                    約2000年にわたり、数百万人の農民たちと30万の兵士、膨大な量の煉瓦と石とで造られた、気の遠くなるような壮大なプロジェクトだ。
                  </p>  
                  <p class="description__text">
                    アクセスしやすいポイントは、中心地から2時間程度で行ける北京市内の長城。
                    観光コースが整備されているのは「八達嶺（はったつれい）」。
                    馬5頭が横並びで通れていたという幅6mの長城を歩き悠久の歴史に想いを馳せよう。途中にある「明の十三陵」は13人の皇帝と23人の皇后、1人の貴妃が眠る陵墓があり、見学も可能。「慕田峪（ぼでんよく）」は変化に富んだ景観をロープウェイの上から眺めることができる。
                  </p>

                  <div class="topics">
                    <div class="topics__inner">
                      <p class="topics__sub-title">HIS秘境旅行専門デスク<br />ネイチャーワールド・スタッフの</p>
                      <p class="topics__title">おすすめトピックス</p>
                      <p class="topics__sentence">${this.staff_rec_pts}<!--<span></span>--></p>
                    </div>
                  </div>
                </div>
              </section>

              <section class="information">
                <div class="information__inner">
                  <h3 class="title">
                    <p class="title__text">世界遺産情報</p>
                    <p class="title__img">
                      <img src="/world-heritage/img/english_title/information.svg" alt="Infotmation" />
                    </p>
                  </h3>

                  <ul class="information__list">
                    <li class="information__item">
                      <div class="information__item-img-outer">
                        <p class="information__item-img">
                          <img src="/world-heritage/img/icon/icon_information01.svg" alt="" />
                        </p>
                      </div>
                      <p class="information__item-title">登録名</p>
                      <p class="information__item-data">${this.name}<br />${this.registered_name_en}</p>
                    </li>
                    <li class="information__item">
                      <div class="information__item-img-outer">
                        <p class="information__item-img">
                          <img src="/world-heritage/img/icon/icon_information03.svg" alt="" />
                        </p>
                      </div>
                      <p class="information__item-title">国名</p>
                      <p class="information__item-data">${this.country_jp}</p>
                    </li>
                    <li class="information__item">
                      <div class="information__item-img-outer">
                        <p class="information__item-img">
                          <img src="/world-heritage/img/icon/icon_information05.svg" alt="" />
                        </p>
                      </div>
                      <p class="information__item-title">登録年</p>
                      <p class="information__item-data">${this.reg_year}</p>
                    </li>
                    <li class="information__item">
                      <div class="information__item-img-outer">
                        <p class="information__item-img">
                          <img src="/world-heritage/img/icon/icon_information07.svg" alt="" />
                        </p>
                      </div>
                      <p class="information__item-title">世界遺産分類</p>
                      <p class="information__item-data">${this.heritage_type}</p>
                    </li>
                    <li class="information__item">
                      <div class="information__item-img-outer">
                        <p class="information__item-img">
                          <img src="/world-heritage/img/icon/icon_information09.svg" alt="" />
                        </p>
                      </div>
                      <p class="information__item-title">日本との時差</p>
                      <p class="information__item-data">-${this.time_diff_jp}</p>
                    </li>
                    <li class="information__item">
                      <div class="information__item-img-outer">
                        <p class="information__item-img">
                          <img src="/world-heritage/img/icon/icon_information02.svg" alt="" />
                        </p>
                      </div>
                      <p class="information__item-title">ベストシーズン</p>
                      <p class="information__item-data">${this.best_season}</p>
                    </li>
                    <li class="information__item">
                      <div class="information__item-img-outer">
                        <p class="information__item-img">
                          <img src="/world-heritage/img/icon/icon_information04.svg" alt="" />
                        </p>
                      </div>
                      <p class="information__item-title">飛行時間</p>
                      <p class="information__item-data">${this.flight_time}</p>
                    </li>
                    <li class="information__item">
                      <div class="information__item-img-outer">
                        <p class="information__item-img">
                          <img src="/world-heritage/img/icon/icon_information06.svg" alt="" />
                        </p>
                      </div>
                      <p class="information__item-title">平均予算</p>
                      <p class="information__item-data">${this.tour_avg_budget}</p>
                    </li>

                    <li class="information__item">
                      <div class="information__item-img-outer">
                        <p class="information__item-img">
                          <img src="/world-heritage/img/icon/icon_information08.svg" alt="" />
                        </p>
                      </div>
                      <p class="information__item-title">旅行日数</p>
                      <p class="information__item-data">${this.heritage_type}</p>
                    </li>
                  </ul>
                </div>
              </section>

              <section class="direction">
                <div class="direction__inner">
                  <h3 class="title">
                    <p class="title__text">日本からの行き方</p>
                    <p class="title__img">
                      <img src="/world-heritage/img/english_title/direction.svg" alt="Direction" />
                    </p>
                  </h3>
                </div>

                <div class="direction-map">
                  <div class="direction-map__inner">
                    <div id="map"></div>
                  </div>
                </div>

                <div class="direction-detail">
                  <div class="direction-detail__inner">
                    <ul class="direction-detail__list">
                      <li class="direction-detail__item">
                        <p class="direction-detail__place">${this.direction_jp_overview.length > 1 ? "日本" :""}</p>
                        <p class="direction-detail__time direction-detail__time--plane">${this.direction_jp_overview.length > 1 ? this.direction_jp_overview[0]: ""}</p>
                      </li>
                      ${this.direction_jp_overview.length > 2 ? this.direction_jp_overview[1] : ""}
                      <li class="direction-detail__item">
                        <p class="direction-detail__place">${this.direction_jp_overview.length > 1 ? this.direction_jp_overview[this.direction_jp_overview.length - 1]: ""}</p>
                      </li>
                    </ul>
                    <div class="direction-detail__sentence">
                      <p class="direction-detail__text">${this.direction_jp_details}</p>
                      ${this.his_overseas_branch}
                    </div>
                  </div>
                </div>
              </section>

              <section class="recommend">
                <div class="recommend__inner">
                  <h3 class="title">
                    <p class="title__text title__text--recommend">${this.seo_keyword}に行く旅行を探す</p>
                    <p class="title__img">
                      <img src="/world-heritage/img/english_title/planatrip.svg" alt="Plan a Trip" />
                    </p>
                  </h3>

                  <div class="recommend__tab-table">
                    <div class="grid-row grid-row--narrowGutter js-toggleOnClick" data-target-group=".categoryWrapper">
                      <div class="grid-col3 js-countTabs js-toggleControl toggleControl--active" data-target="#category01">
                        <div class="recommend__tab">
                          <a class="recommend__tab-text recommend__tab-text--tour" href="https://tour.his-j.com/ct/sp/search/02A_10/USA/USA/GCN/">ツアー</a>
                        </div>
                      </div>
                      <div class="grid-col3 js-countTabs js-toggleControl" data-target="#category02">
                        <div class="recommend__tab">
                          <a class="recommend__tab-text recommend__tab-text--ticket-hotel" href="https://www.his-j.com/kaigai/air-hotel/Default_sp.aspx">航空券<br />＋<br />ホテル</a>
                        </div>
                      </div>
                      <div class="grid-col3 js-countTabs js-toggleControl" data-target="#category03">
                        <div class="recommend__tab">
                          <a class="recommend__tab-text recommend__tab-text--ticket" href="https://www.his-j.com/kaigai/air/north-america/america/las/index_sp.html">航空券</a>
                        </div>
                      </div>
                      <div class="grid-col3 js-countTabs js-toggleControl" data-target="#category04">
                        <div class="recommend__tab">
                          <a class="recommend__tab-text recommend__tab-text--hotel" href="https://hotels.his-j.com/sp/HotelList/GCN/">ホテル</a>
                        </div>
                      </div>
                      <div class="grid-col3 js-countTabs js-toggleControl" data-target="#category05">
                        <div class="recommend__tab">
                          <a class="recommend__tab-text recommend__tab-text--optional-tour" href="https://activities.his-j.com/SightSeeing/O2/USA/S0047/">オプショナル<br />ツアー</a>
                        </div>
                      </div>
                      <div class="grid-col3 js-countTabs js-toggleControl" data-target="#category06">
                        <div class="recommend__tab">
                          <a class="recommend__tab-text recommend__tab-text--car" href="https://cars.his-j.com/sp/RtfCarList.aspx?PickupCityCd=LAS">レンタカー</a>
                        </div>
                      </div>
                    </div>

                    <!--<div id="category01" class="categoryWrapper toggleTarget--active">
                      <ul class="plan-travel-slick">
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間 タグ1</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div id="category02" class="categoryWrapper">
                      <ul class="plan-travel-slick">
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間 タグ2</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div id="category03" class="categoryWrapper">
                      <ul class="plan-travel-slick">
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間 タグ3</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div id="category04" class="categoryWrapper">
                      <ul class="plan-travel-slick">
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間 タグ4</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div id="category05" class="categoryWrapper">
                      <ul class="plan-travel-slick">
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間 タグ5</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div id="category06" class="categoryWrapper">
                      <ul class="plan-travel-slick">
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間 タグ6</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                        <li>
                          <a class="recommend__card" href="">
                            <p class="recommend__card-img">
                              <img class="object-fit" src="/world-heritage/img/dammy/img01.png" alt="（画像の代替テキスト）" />
                            </p>
                            <div class="recommend__card-body">
                              <h4 class="recommend__card-title">●添乗員同行●羽田発着 気軽にグランドキャニオン5日間</h4>
                              <p class="recommend__card-text">スタンダードクラスホテルに滞在</p>
                            </div>
                            <p class="recommend__card-price">123,456<span>円～</span>789,000<span>円</span></p>
                          </a>
                        </li>
                      </ul>
                    </div>-->
                  </div>
                  <!-- <div class="heritage__button heritage__button--recommend">
                    <a href="">グランドキャニオンに<br />行くツアーをもっと見る</a>
                  </div> -->

                  <div class="other">
                    <div class="other__block">
                      <h5 class="other__title">その他の${this.country_jp}旅行</h5>
                      <ul class="other__list">
                        ${this.other_countries_travel_pc}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section class="heritage" ${this.other_wh_sites_pc ? '' : 'style="display: none"'}>
                <div class="heritage__inner">
                  <h3 class="title">
                    <p class="title__text title__text--heritage">その他のアメリカの世界遺産</p>
                    <p class="title__img">
                      <img src="/world-heritage/img/english_title/otherworldheritage.svg" alt="Other World Heritage" />
                    </p>
                  </h3>
                  <ul class="heritage__list">
                    ${this.other_wh_sites_pc ? this.other_wh_sites_pc : "<li></li>"}
                  </ul>
                </div>
              </section>

              <section class="other-country">
                <div class="other-country__inner">
                  <h3 class="title">
                    <p class="title__text title__text--other-country">その他の${this.big_area_jp}の国の世界遺産を探す</p>
                    <p class="title__img">
                      <img src="/world-heritage/img/english_title/othercountries.svg" alt="Other Countries" />
                    </p>
                  </h3>
                  <ul class="other-country__list">
                    ${this.other_wh_pc}
                  </ul>
                </div>
              </section>

              <section class="big-banner">
                <div class="big-banner__inner">
                  <a class="big-banner__img" href="https://www.natureworld.jp/">
                    <img class="object-fit" src="https://www.his-j.com/world-heritage/img/bnr_natureworld_sp.jpg" alt="ネイチャーワールドバナー" />
                  </a>
                </div>
              </section>

              <section class="banner">
                <div class="banner__inner">
                  <h5 class="banner__title">その他のおすすめ特集</h5>
                  <div class="section__container">
                    <!--#include virtual="/world-heritage/ssi/recomended-banner_sp.shtml" -->
                  </div>
                  <div class="banner__button"><a href="">もっと見る</a></div>
                </div>
              </section>
            </section>
          </main>

          <!--▼▼▼ トップへ戻る ▼▼▼-->
          <div class="goTop" id="js-goTop">
            <a href="#">
              <img class="goTop__img--sp" src="/world-heritage/img/icon/icon_pagetop.svg" alt="ページトップへ" />
            </a>
          </div>
          <!--▲▲▲ トップへ戻る ▲▲▲-->

          <div id="footer">
            <his-footer></his-footer>
          </div>
        </div>

        <!--▼▼▼ 新ヘッダーフッター用 ▼▼▼-->
        <script src="https://www.his-j.com/cmn/plugin/polyfill/es6-promise.min.js"></script>
        <script src="https://www.his-j.com/cmn/n-headfoot/js/headfoot.js"></script>

        <script src="https://www.his-j.com/cmn/n-headfoot/data/switch_data.js"></script>

        <script src="https://www.his-j.com/cmn/n-headfoot/template/template_header.js"></script>
        <script src="https://www.his-j.com/cmn/n-headfoot/template/template_footer_common.js"></script>
        <script src="/headfoot/js/number_stores.js"></script>
        <!--▲▲▲ 新ヘッダーフッター用 ▲▲▲-->

        <!--ページ用-->
        <script>
          /* ▼メインビジュアル反映▼ */
          const mv = '/world-heritage/${this.big_area_en}/${this.country_en}/img/${this.en_pass}_mv_sp.jpg';
          /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

          /* ▼google map反映▼ */
          // 出発地
          const dept = {
            name: '東京',
            lat: 35.763889, // 緯度
            lng: 140.391667, // 経度
          };
          // 到着地
          const dest = {
            name: ${this.coordinates ? this.coordinates.dest[0] : ""},
            lat: ${this.coordinates ? this.coordinates.dest[1] : ""},
            lng: ${this.coordinates ? this.coordinates.dest[2] : ""},
          };
          // 世界遺産
          const heritage = {
            name: ${this.coordinates ? this.coordinates.heritage[0] : ""},
            lat: ${this.coordinates ? this.coordinates.heritage[1] : ""},
            lng: ${this.coordinates ? this.coordinates.heritage[2] : ""},
            src: '/world-heritage/${this.big_area_en}/${this.country_en}/img/${this.en_pass}-thumb_sp.jpg', //画像
            // english: 'Grand Canyon', //※空白かコメントアウトで表示消せます
          };
          /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
        </script>
        <script src="/world-heritage/js/details_sp.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?client=gme-hiscoltd&channel=all_all&v=quarterly&callback=initMap"></script>

        <script type="text/javascript">
          <!--
          var track_title = "★★ダミー★★";
          var track_id = "";
          var track_portaltop_id = "";
          //-->
        </script>
        <!-- SiteCatalyst code version: H.14.Copyright 1997-2007 Omniture, Inc. More info available at http://www.omniture.com -->
        <script language="JavaScript" src="//e.his-j.com/js/s_code_sp.js"></script>
        <script>
          <!--
          s.pageName = track_title;
          s.prop6 = track_id;
          if (track_portaltop_id != '') s.eVar46 = track_portaltop_id;
          s.events = "";
          var s_code = s.t();
          if (s_code) document.write(s_code)
          //-->
        </script>
        <!-- End SiteCatalyst code version: H.14. -->

        <!-- Yahoo Tag Manager -->
        <script id="tagjs" type="text/javascript">
          (function () {
            var tagjs = document.createElement('script');
            var s = document.getElementsByTagName('script')[0];
            tagjs.async = true;
            tagjs.src = '//s.yjtag.jp/tag.js#site=b3mRptN';
            s.parentNode.insertBefore(tagjs, s);
          })();
        </script>
        <noscript>
          <iframe src="//b.yjtag.jp/iframe?c=b3mRptN" width="1" height="1" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </noscript>
        <!-- End Yahoo Tag Manager -->
      </body>
    </html>
    `;
  }
}