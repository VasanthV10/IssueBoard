
<script>
import { onMounted,ref,onUpdated } from 'vue';

export default {
    name: "IssuesList",
    setup() {
        let issueData = ref([]);
        onMounted(() => console.log(issueData.value))
        function saveIssue() {
            var title = document.getElementById("title").value;
            var description = document.getElementById("description").value;
            let mapData = { "title": title, "description": description };
            JSON.parse(window.localStorage.getItem('issueData'));
            issueData.value.push({...mapData});
            window.localStorage.setItem("issues", JSON.stringify(this.issueData));
            document.getElementById('title').value='';
            document.getElementById('description').value='';
        }
        onUpdated(() => {
            console.log("Updated");
        })

        return {
            saveIssue,
            issueData
        }
    }
}
</script>

<template>
<div class="screen">
    <center><h1>Create New Issue </h1></center>
    <div class = "text">
        <label class = "label"> Title </label>
        <input type="text" id = "title" class="textbox"/>
        <label class = "label"> Description </label>
        <textarea id = "description" class="textbox"></textarea>
        <div class = "button">
            <button @click="saveIssue()"> Add Issue</button>
        </div>
    </div>
</div>
</template>
<style scoped>
.screen {
    width :100%;
    height : 100%;
    border: 5px solid blue;
}
.text {
    height: 100%;
    width: 100%;
    padding-bottom: 10px;
}
.button {
    width: inherit;
    text-align: center;
}
.label {
    width: 300px;
    display: block;
    padding: 10px;
}
.textbox {
    display: flex;
    width: 200px;
    height: 50px;
}

</style>
