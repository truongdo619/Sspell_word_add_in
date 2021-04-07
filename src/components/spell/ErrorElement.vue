<template>
  <el-collapse-item v-if="isHidden" :name="item.id" :errorId="item.id">
        <template slot="title">
            <span class="common-label">{{item["errorWord"]}}</span> <div class="inline-dot">.</div> <span style="font-weight: 300;">Đoạn {{item.paraId}}</span>
        </template>

        <el-row> 
            <el-col :span="20" class="content">
                <div class="label-content">
                    <span class="error-word">{{item["errorWord"]}}</span>
                    <i class="el-icon-right icon"></i>
                    <div class="alternative-words">
                        <el-button @click="handleClick(0)" v-if="item['alternativeWord'].length > 0" type="success">{{item["alternativeWord"][0]}}</el-button> 
                        <el-button @click="handleClick(1)" v-if="item['alternativeWord'].length > 1" type="success">{{item["alternativeWord"][1]}}</el-button> 
                        <el-button @click="handleClick(2)" v-if="item['alternativeWord'].length > 2" type="success">{{item["alternativeWord"][2]}}</el-button> 
                        <el-button @click="handleClick(3)" v-if="item['alternativeWord'].length > 3" type="success">{{item["alternativeWord"][3]}}</el-button> 
                        <el-button @click="handleClick(4)" v-if="item['alternativeWord'].length > 4" type="success">{{item["alternativeWord"][4]}}</el-button> 
                    </div>
                </div>
                <div class="notify-content">
                    <div>Từ "{{item["errorWord"]}}" không có trong từ điển. Nếu bạn chắc chắn đây là từ đúng, bạn có thể thêm nó vào từ điển cá nhân. </div>
                </div>
            </el-col>
            <el-col :span="3" :offset="1" class="list-btn">
                <el-button @click="handleDeleteBtn" icon="el-icon-delete"></el-button>
                <el-button @click="handleAddBtn" icon="el-icon-folder-add"></el-button>
            </el-col>
        </el-row>
     </el-collapse-item>
</template>

<script>
export default {
    'name': 'ErrorElement',
    props : ["item"],
    methods : {
        handleClick(val){
            this.$store.dispatch("spell/select_current_btn", { id : this.item.id, btnId : val});
        },
        handleDeleteBtn(){  
            document.querySelector('div.el-collapse-item[errorId="' + this.item.id + '"]').style.display = "none";
        },
        handleAddBtn(){
            this.$confirm('Từ "'+ this.item["errorWord"] +'" sẽ được thêm vào từ điển cá nhân. Tiếp tục?', 'Thông báo', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch("spell/add_to_dictionary", this.item["errorWord"]);
                this.$message({
                    type: 'success',
                    message: 'Thêm thành công'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Hủy hành động'
                });
            });
        }
    },
    computed : {
        isHidden(){
            return !this.$store.state.spell.dictionary.includes(this.item["errorWord"]);
        }
    }
} 
</script>
