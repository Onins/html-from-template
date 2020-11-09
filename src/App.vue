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
import csv from "csvtojson"

export default {
  name: "App",
  data() {
    return {
      fileinput: '',
      jsonoutput: []
    }
  },
  methods: {
    onFileChange(e) {
      this.jsonoutput = [];
      this.fileinput = "";
      var file = e.target.files;
      this.createInput(file[0]);
    },

    createInput(file) {
      let vm = this;
      let promise = new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = () => {
          resolve((vm.fileinput = reader.result));
        };
        reader.readAsText(file);
      });

      promise.then(
        () => {          
          csv({
            noheader:true,
            output: "csv"            
          })
          .fromString(vm.fileinput)
          .then((csvRow)=>{ 
            let headers=csvRow[0];
            for(let i=1;i<csvRow.length;i++){
              let obj = {};
              let currentline=csvRow[i];            

              for(let j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
              }
              this.jsonoutput.push(obj);
            }
          })
        },
        error => {
          console.log(error);
        }
      );
    },

    downloadHtml() {  
      let zip = new JSZip();
      let vm = this;
      for(let i = 0; i < vm.jsonoutput.length; i++) {
        zip.file(`${vm.jsonoutput[i].englishPass}.html`, this.updateTemplate(vm.jsonoutput[i]));
      }
      zip.generateAsync({type:"blob"})
      .then(function(content) {          
        saveAs(content, "world-heritage.zip");
      });       
    },

    updateTemplate(data) {
      let country = new WorldHeritage(data.bigAreaJP, data.bigAreaEN, data.countryJP, data.countryEN, data.seoKeyword, data.worldHeritageRegisteredName, data.englishPass, data.imagePass, data.metaDescription, data.metaKeywords, data.name, data.headline, data.explainatoryText, data.staffRecommendedPoints, data.heritageType, data.registrationAndExpansionYear, data.timeDifferenceWithJapan, data.bestSeason, data.flightTime, data.tourAverageBudget, data.estimatedTravelDays, data.directionsFromJapanDetails, data.HISOverseasBranchName, data.HISOverseasBranchSite);
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
</style>>