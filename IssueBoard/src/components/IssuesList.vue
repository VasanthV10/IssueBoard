
<template>
     <div class="header">
        <p>Issue Board</p>
        <div class = "active">
            <button @click="newIssue()"> Create New Issue</button>
        </div>
    </div>
    <div class="screen">
        <h1>List Of Issues :</h1>
        <div  v-for="(issue,index) in items" class="list">
            <div class = "content">
                <h2 :id = "'title-' + index"> Title : {{issue.title}} </h2>
                <h2 :id = "'description-' + index"> Description : {{issue.description}} </h2>
                <button :id = "'edit-' + index" @click="editButton(index)" class = "editButton"><i class="fa fa-edit"></i> edit </button>
                <button :id = "'delete-' + index" @click="deleteButton(index)" class = "deleteButton"><i class="fa fa-trash"></i> delete </button>
            </div>
        </div>
    </div>
</template>

<script>
import NewIssue from './NewIssue.vue';
import router from "../router/index.js";
import {onBeforeUpdate, reactive} from 'vue';

export default {
    name: "IssuesList",
    
    setup() {
        const items = reactive(JSON.parse(localStorage.getItem("issues")));
        function newIssue() {
            router.push("/newIssue");
        }
        function editButton(index) {
            var data = items[index];
            console.log(data);
            // const encodedData = encodeURIComponent(JSON.stringify(data))
            router.push("/newIssue?data="+JSON.stringify(data));
        }
        function deleteItems(arr,index) {
            if (index > -1) {
                arr.splice(index, 1);
            }
            return arr;
        }
        function deleteButton(index) {
            var data = deleteItems(items,index);
            localStorage.clear();
            window.localStorage.setItem("issues",JSON.stringify(data));
        }
        
        return {
            items,
            newIssue,
            editButton,
            deleteButton,
        };
    },
    components: { NewIssue }
}
</script>

<style >
.header {
  height: 50px;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.header p {
  color: blue;
  border-radius: 4px;
  font-weight: bolder;
  font-size: 24px;
  text-decoration: none;
  text-align: center;
}

.header button:hover {
  background-color: #ddd;
  color: black;
}

.active {
  position: absolute;
  right: 10px;
}
.header button {
  background-color: dodgerblue;
  color: white;
  width: 150px;
  height: 30px;
  font-size: 15px;
}
.screen {
    margin : 0px;
    width :100%;
    height : 100%;
    
}
.list {
    display: flex;
    height: 80px;
    width: 100%;
    border: 1px solid steelblue;
    background-color: aliceblue;
    position: relative;
    font-size: 12px;
    align-items: center;
    border-radius: 4px;
}
.editButton {
    position: absolute;
    right: 150px;
    top: 25px;
    width: 100px;
    height: 30px;
    border-radius: 3px;
    border-color: blue;
    font-size: medium;
    background-color: dodgerblue;
    color: white;
}
.editButton:hover {
    background-color: #ddd;
    color: black;
}
.deleteButton {
    position: absolute;
    right: 40px;
    top: 25px;
    width: 100px;
    height: 30px;
    border-radius: 3px;
    border-color: blue;
    font-size: medium;
    background-color: dodgerblue;
    color: white;
}
.deleteButton:hover {
    background-color: #ddd;
    color: black;
}
.content {
        margin: 20px;
}
</style>
