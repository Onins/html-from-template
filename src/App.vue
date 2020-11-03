<template>
  <div id="app">
    <form enctype="multipart/form-data">
        <input type="file" @change="onFileChange">
        <a @click="downloadHtml()">Button</a>
    </form>
  </div>
</template>

<script>
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import WorldHeritage from "./class/whm.js"

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
          let lines=vm.fileinput.split("\n");
          let headers=lines[0].split(",");

          for(let i=1;i<lines.length - 1;i++){
            let obj = {};
            let currentline=lines[i].split(",");

            for(let j=0;j<headers.length;j++){
              obj[headers[j]] = currentline[j];
            }
            this.jsonoutput.push(JSON.parse(JSON.stringify(obj).replace(/\\n|\\r/g, '')));
          }
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
        zip.file(`${vm.jsonoutput[i].destination}.html`, this.updateTemplate(vm.jsonoutput[i]));
      }
      zip.generateAsync({type:"blob"})
      .then(function(content) {          
        saveAs(content, "world-heritage.zip");
      });       
    },

    updateTemplate(data) {
      let country = new WorldHeritage(data.month, data.airport, data.airplane, data.destination);
      return country.getTemplate();
    }
  }
}
</script>
