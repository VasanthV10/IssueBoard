
<script>
import { onMounted,ref,onUpdated } from 'vue';

export default {
    name: "IssuesList",
    setup() {
        let issueData = ref([]);
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
                    issueData.value.push(data[i]);
                }
            }
            issueData.value.push({...mapData});
            window.localStorage.setItem("issues", JSON.stringify(this.issueData));
            document.getElementById('title').value='';
            document.getElementById('description').value='';
            issueData.value = [];
        }
        return {
            saveIssue,
            issueData
        }
    }
}
</script>

<template>
<div class="screen">
    <center><h1 style="font-weight:bolder;color: magenta;"><u>Create New Issue </u></h1></center>
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

</style>
