
<template>
     <div class="header">
        <p>Issue Board</p>
        <div class = "active">
            <button @click="newIssue()"> Create New Issue</button>
        </div>
    </div>
    <div class="screen">
        <h1>List Of Issues :</h1>
        <div v-bind:key="issue.title" v-for="(issue,index) in items" class="list">
            <h2> Title : {{issue.title}} </h2>
            <h2> Description : {{issue.description}} </h2>
            <button :id = "'edit' + index" @click="editButton()" class = "editButton"> edit </button>
            <button :id = "'delete' + index" @click="deleteButton()" class = "deleteButton"> delete </button>
        </div>
    </div>
</template>

<script>
import NewIssue from './NewIssue.vue';
import router from "../router/index.js";

export default {
    name: "IssuesList",
    setup() {
        function newIssue() {
            router.push("/newIssue");
        }
        function editButton() {
            router.push("/newIssue/title");
        }
        function deleteButton() {
            var deleteData = JSON.parse(localStorage.getItem("issues"));
            localStorage.removeItem("issues");
        }
        return {
            items: JSON.parse(localStorage.getItem("issues")),
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
    display: block;
    height: 80px;
    width: 100%;
    border: 2px solid;
    background-color: aliceblue;
    position: relative;
    font-size: 12px;
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
</style>
