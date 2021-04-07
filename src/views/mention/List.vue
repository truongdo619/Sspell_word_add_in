<template>
    <div>
        <div class="mention" v-if="!isDetail">
            <TopBar></TopBar>
            <ListDocument v-on:click-element="handleClickElement" :items="mention_list"></ListDocument>
            <div v-loading="this.loading" class="spinner"></div>

            <div v-if="this.isNotFound" class="mention-notify">
                <p>Không có văn bản nào được tìm thấy</p>
            </div>
        </div>

        <div class="result-detail" v-if="isDetail">
            <DocumentDetail v-on:click-back-btn="handleClickBack"></DocumentDetail>
        </div>
        <div v-loading="this.loading" class="spinner"></div>
    </div>
</template>


<script>

import TopBar from '../../components/mention/TopBar'
import ListDocument from '../../components/mention/ListDocument'
import DocumentDetail from "../../components/mention/DocumentDetail";
export default {
    name: 'MentionList',
    components : {DocumentDetail, TopBar, ListDocument},
    data(){
        return {
            isDetail : false
        }
    },
    async mounted(){
        await this.$store.dispatch("mention/load_mention");
    },
    computed : {
        loading() {
            return this.$store.state.mention.is_loading;
        },
        mention_list(){
            return this.$store.state.mention.mention_list;
        },
        isNotFound(){
            return this.$store.state.mention.is_not_found;
        }
    },
    methods:{
        handleClickBack(){
            this.isDetail = false;
        },
        handleClickElement(){
            this.isDetail = true;
        },
    }
}
</script>

<style scoped>
    .mention-notify p{
        text-align: center;
        margin-top: 60px;
    }
</style>