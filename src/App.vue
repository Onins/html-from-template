<template>
  <div id="app">
    <form enctype="multipart/form-data">
      <input type="file" @change="onFileChange">
      <a @click="downloadHtml()">Generate Files</a>
    </form>
  </div>
</template>

<script>
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import WorldHeritage from "./class/whm.js"
import WorldHeritageSP from "./class/whm_sp.js"
import csv from "csvtojson"

console.log(WorldHeritageSP)

export default {
  name: "App",
  data() {
    return {
      fileInput: '',
      jsonOutput: []
    }
  },
  methods: {
    onFileChange(e) {
      this.jsonOutput = [];
      this.fileInput = "";
      var file = e.target.files;
      this.createInput(file[0]);
    },

    createInput(file) {
      let vm = this;
      let promise = new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = () => {
          resolve((vm.fileInput = reader.result));
        };
        reader.readAsText(file);
      });

      promise.then(
        () => {
          csv({
            noheader:true,
            output: "csv"
          })
          .fromString(vm.fileInput)
          .then((csvRow)=>{
            let headers=csvRow[0];
            for(let i=1;i<csvRow.length;i++){
              let obj = {};
              let currentline=csvRow[i];

              for(let j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
              }
              this.jsonOutput.push(obj);
            }
          })
        },
        error => {
          console.log(error);
        }
      );
    },

    downloadHtml() {
      if (this.fileInput != "") {
        let zip = new JSZip();
        let vm = this;
        zip.folder("PC");
        zip.folder("SP");

        for(let i = 0; i < vm.jsonOutput.length; i++) {
          zip.file(`PC/${vm.jsonOutput[i].en_pass}.html`, this.updateTemplate(vm.jsonOutput[i]));
          zip.file(`SP/${vm.jsonOutput[i].en_pass}.html`, this.updateTemplateSp(vm.jsonOutput[i]));
        }

        zip.generateAsync({type:"blob"})
        .then(function(content) {
          saveAs(content, "world-heritage.zip");
        });
      }
      else {
        alert("Please select CSV file")
      }
    },

    updateTemplate(data) {
      let country = new WorldHeritage(
        data.big_area_jp,
        data.big_area_en,
        data.area_code,
        data.country_jp,
        data.country_en,
        data.country_code_2,
        data.country_code_3,
        data.city_code,
        data.seo_keyword,
        data.registered_name_en,
        data.en_pass,
        data.sliders_count,
        data.meta_description,
        data.meta_keyword,
        data.name,
        data.headline,
        data.explanatory_text,
        data.staff_rec_pts,
        data.heritage_type,
        data.reg_year,
        data.time_diff_jp,
        data.best_season,
        data.flight_time,
        data.tour_avg_budget,
        data.est_travel_days,
        data.direction_jp_details,
        data.his_overseas_branch,
        data.other_countries_travel_pc,
        data.other_wh_pc,
        data.long_lat_fjp_tsite,
        data.other_wh_sites_pc
      );
      country.explanatory_text = country.formatParagraph(data.explanatory_text, "description__text");
      country.staff_rec_pts = country.formatParagraph(data.staff_rec_pts, "topics__sentence");
      country.long_lat_fjp_tsite = country.formatCoordinates(data.long_lat_fjp_tsite);
      country.other_wh_sites_pc = country.formatOtherWhSites(data.other_wh_sites_pc);
      country.his_overseas_branch = country.overseasBranch(data.his_overseas_branch);
      country.other_countries_travel_pc = country.otherCountriesTravel(data.other_countries_travel_pc);
      country.other_wh_pc = country.otherWH(data.other_wh_pc);
      country.sliders_count = country.generateSlider(data.sliders_count);
      country.direction_jp_overview = country.formatDirection(data.direction_jp_overview);
      return country.getTemplate();
    },

    updateTemplateSp(data) {
      let country = new WorldHeritageSP(
        data.big_area_jp,
        data.big_area_en,
        data.area_code,
        data.country_jp,
        data.country_en,
        data.country_code_2,
        data.country_code_3,
        data.city_code,
        data.seo_keyword,
        data.registered_name_en,
        data.en_pass,
        data.sliders_count,
        data.meta_description,
        data.meta_keyword,
        data.name,
        data.headline,
        data.explanatory_text,
        data.staff_rec_pts,
        data.heritage_type,
        data.reg_year,
        data.time_diff_jp,
        data.best_season,
        data.flight_time,
        data.tour_avg_budget,
        data.est_travel_days,
        data.direction_jp_details,
        data.his_overseas_branch,
        data.other_countries_travel_pc,
        data.other_wh_pc,
        data.long_lat_fjp_tsite,
        data.other_wh_sites_pc
      );
      country.explanatory_text = country.formatParagraph(data.explanatory_text, "description__text");
      country.staff_rec_pts = country.formatParagraph(data.staff_rec_pts, "topics__sentence");
      country.long_lat_fjp_tsite = country.formatCoordinates(data.long_lat_fjp_tsite);
      country.other_wh_sites_pc = country.formatOtherWhSites(data.other_wh_sites_pc);
      country.his_overseas_branch = country.overseasBranch(data.his_overseas_branch);
      country.other_countries_travel_pc = country.otherCountriesTravel(data.other_countries_travel_pc);
      country.other_wh_pc = country.otherWH(data.other_wh_pc);
      country.sliders_count = country.generateSlider(data.sliders_count);
      country.direction_jp_overview = country.formatDirection(data.direction_jp_overview);
      return country.getTemplate();
    }
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  width: 800px;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 20px 0;
}

a {
  cursor: pointer;
  width: 120px;
  text-align: center;
  margin-top: 40px;
  background-color: #a9ffa9;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #bdb7b7;
  font-family: sans-serif;
}
</style>
