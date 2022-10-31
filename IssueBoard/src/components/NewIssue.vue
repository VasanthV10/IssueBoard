<template>
    <div class="header">
        <p>Issue Board</p>
        <div class="active">
            <button @click="issues()" style="width:100px;"><i class="fa fa-home"></i> Home</button>
        </div>
    </div>
<div class="screen">
    <div class = "text">
        <label class = "label"> Title </label>
        <div class="textbox">
            <input v-if = "editScreen.screenData" type="text" id = "title"  required>
            <input v-if = "editScreen.editable" type="text" id = "title" :value = "editScreen.editData.title" required>
            <span class = "error"></span>
        </div>
    </div>
    <div class = "text">
        <label class = "label"> Description </label>
        <div class="textbox">
            <textarea v-if = "editScreen.screenData" id = "description" style="height:100px;" required></textarea>
            <textarea v-if = "editScreen.editable" id = "description" style="height:100px;" :value = "editScreen.editData.description" required></textarea>
            <span class = "error"></span>
        </div>
        <div v-if = "editScreen.screenData" class = "buttonClass">
            <button @click="saveIssue()" class="button"> Add Issue</button>
        </div>
        <div v-if = "editScreen.editable" class = "buttonClass">
            <button @click="updateIssue()" class="button"> Update Issue</button>
        </div>
    </div>
    <div id="snackbar"></div>
</div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import router from "../router/index.js";

export default {
    name: "NewIssue",
    props : {
        issueData : {
            type: Array,
            default: [],
        }
    },
    setup(props) {
        const editScreen = reactive({
            editable : false,
            editData : {},
            screenData : true,
        });
        function issues() {
            router.push("/issues");
        }
        function validateInputField() {
            var title = document.getElementById("title").value;
            var description = document.getElementById("description").value;
            const error = document.getElementsByClassName("error");
            error[0].innerHTML = "";
            error[1].innerHTML = "";
            if(title == "" && description == "") {
                error[0].innerHTML = "Title field is required";
                error[1].innerHTML = "Description field is required";
                return false;
            }
            else if(title == "") {
                error[0].innerHTML = "Title field is required";
                return false;
            }
            else if(description == "") {
                error[1].innerHTML = "Description field is required";
                return false;
            }
            else
                return true;
        }
        onMounted ( () => {
            urlParam();
        });
        function saveIssue() {
            var title = document.getElementById("title").value;
            var description = document.getElementById("description").value;
            if(!validateInputField()) {
                return;
            }
            let mapData = { "title": title, "description": description };
            if(JSON.parse(window.localStorage.getItem('issues'))?.length > 0) {
                let data = JSON.parse(window.localStorage.getItem('issues'));
                for(let i = 0 ; i<data.length;i++) {
                    props.issueData.push(data[i]);
                }
            }
            props.issueData.push({...mapData});
            localStorage.clear();
            window.localStorage.setItem("issues", JSON.stringify(props.issueData));
            document.getElementById('title').value='';
            document.getElementById('description').value='';
            var x = document.getElementById("snackbar");
            x.className = "show";
            x.innerText = "Issue Added Successfully";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            props.issueData.splice(0);
        }
        function updateIssue() {
            var title = document.getElementById("title").value;
            var description = document.getElementById("description").value;
            var x = document.getElementById("snackbar");
            if(!validateInputField()) {
                return;
            }
            let data = JSON.parse(window.localStorage.getItem('issues'));
            let params = new URLSearchParams(location.search);
            let urlData = JSON.parse(params.get('data'));
            if(title == urlData.title && description == urlData.description) {
                x.className = "show";
                x.innerText = "No changes to update";
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                return;
            }
            for(let i = 0 ; i < data.length;i++) {
                    if(data[i].title == urlData.title || data[i].description == urlData.description) {
                        data[i].title = title;
                        data[i].description = description;
                    }
                    props.issueData.push(data[i]);
            }
            localStorage.clear();
            window.localStorage.setItem("issues", JSON.stringify(props.issueData));
            document.getElementById('title').value='';
            document.getElementById('description').value='';
            x.className = "show";
            x.innerText = "Issue Updated Successfully";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            props.issueData.splice(0);
            router.push("/issues");
        }
        function urlParam() {
            let params = new URLSearchParams(location.search);
            if(params.get('data')) {
                editScreen.editData = JSON.parse(params.get('data'));
                editScreen.editable = true;
                editScreen.screenData = false;
            }
        }
        return {
            saveIssue,
            issues,
            props,
            editScreen,
            urlParam,
            updateIssue
        }
    }
}
</script>

<style scoped>

* {
  box-sizing: border-box;
}

.screen {
    width :100%;
    height : 100%;
    border: 5px solid blue;
    padding: 16px;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
}
.text {
    content: "";
    display: table;
    clear: both;
    width: 100%;
}
.buttonClass {
    width: 100%;
    left: 500px;
    display: flex;  
    justify-content: flex-end;  
    align-items: flex-end; 
}
.label {
    float: left;
    width: 50%;
    margin-top: 6px;
    color: blueviolet;
    font-weight: bolder;
    font-size: large;
}
.textbox {
    float: left;
    width: inherit;
    margin-top: 6px;
}
input[type=text], textarea {
    padding: 12px;
    margin: 8px 0;
    display: inline-block;
    border: 2px solid black;
    box-sizing: border-box;
    width: 300px;
}
.button {
    width:120px;
    height:30px;
    background-color: #04AA6D;
    color: white;
    font-weight: 400;
    font-size: medium;
    cursor: pointer;
    margin: auto;
}
.button:hover {
    font-weight: 600;
    opacity: 0.8;
}
#snackbar {
  visibility: hidden;
  min-width: 200px;
  background-color: #333;
  color: #fff;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  bottom: 30px;
  font-size: 17px;
}
.error {
  font-size: 12px;
  padding: 2px;
  color: red;
  display: flex;
}
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {left: 0; opacity: 0;} 
  to {left: 30px; opacity: 1;}
}

@keyframes fadein {
  from {left: 0; opacity: 0;}
  to {left: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {left: 30px; opacity: 1;} 
  to {left: 0; opacity: 0;}
}

@keyframes fadeout {
  from {left: 30px; opacity: 1;}
  to {left: 0; opacity: 0;}
}

</style>
