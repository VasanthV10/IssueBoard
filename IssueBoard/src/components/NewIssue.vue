
<script>
import { onMounted,ref,onUpdated } from 'vue';
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
        function issues() {
            router.push("/issues");
        }
        function saveIssue() {
            var title = document.getElementById("title").value;
            var description = document.getElementById("description").value;
            if(title == "" && description == "") {
                alert("Please fill atleast one field");
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
            window.localStorage.setItem("issues", JSON.stringify(props.issueData));
            document.getElementById('title').value='';
            document.getElementById('description').value='';
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            props.issueData = [];
        }
        return {
            saveIssue,
            issues,
            props,
        }
    }
}
</script>

<template>
    <div class="header">
        <p>Issue Board</p>
        <div class="active">
            <button @click="issues()">Home</button>
        </div>
    </div>
<div class="screen">
    <div class = "text">
        <label class = "label"> Title </label>
        <div class="textbox">
            <input type="text" id = "title"  required>
        </div>
    </div>
    <div class = "text">
        <label class = "label"> Description </label>
        <div class="textbox">
            <textarea id = "description" style="height:100px;" required></textarea>
        </div>
        <div class = "buttonClass">
            <button @click="saveIssue()" class="button"> Add Issue</button>
        </div>
    </div>
    <div id="snackbar"> Issue Added Successfully.</div>
</div>
</template>
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
  min-width: 250px;
  background-color: #333;
  color: #fff;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  bottom: 30px;
  font-size: 17px;
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
