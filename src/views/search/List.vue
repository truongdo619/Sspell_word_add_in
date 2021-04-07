<template>
    <div>
        <div class="home" v-if="!isDetail">
            <SearchTopBar></SearchTopBar>
            <div class="section-box">
                <div class="search-box">
                    <el-input
                            placeholder="Tìm kiếm văn bản pháp luật"
                            v-model="inputsearchbox"
                            prefix-icon="el-icon-search"
                            id="inputsearchbox"
                            @change="searchDocument"
                            clearable>
                    </el-input>
                </div>
                <div id="search-box-main">
                    <div v-for="(element, index) in elementsForSearchResult" :key="element._id">
                        <ElementResult v-bind:item="element" v-bind:id="index+1" v-on:click-element="handleClickElement" />
                    </div> 
                </div>

                <div v-if="this.isNotFound" class="search-notify">
                    <p>Không có văn bản nào được tìm thấy</p>
                </div>

                
            </div>
        </div>
        <div class="result-detail" v-if="isDetail">
            <DocumentDetail v-on:click-back-btn="handleClickBack"></DocumentDetail>
        </div>
        <div v-loading="this.loading" class="spinner"></div>
    </div>
    
</template>

<script>

import ElementResult from '../../components/search/ElementResult'
import SearchTopBar from '../../components/search/SearchTopBar'
import DocumentDetail from '../../components/search/DocumentDetail'

export default {
    name : "SearchList",
    components : {ElementResult, SearchTopBar, DocumentDetail},
    async mounted(){

        if (this.$route.query.isSelected){
            await this.$store.dispatch("search/search_document_by_selection");
            this.inputsearchbox = this.$store.state.search.Keyword;
        }
        else
        {
            this.$store.dispatch("search/search_document", "luật nhà")
        }
    },
    data(){
        return{
            inputsearchbox : "",
            isDetail : false
        }
    },
    methods : {
        handleClickElement(id){
            this.$store.dispatch("search/set_state_active_element", id-1)
            this.isDetail = true;
        },
        handleClickBack(){
            this.isDetail = false;
        },
        searchDocument(){
            this.$store.dispatch("search/search_document", this.inputsearchbox)
        }
    },
    computed :{
        loading(){
            return this.$store.state.search.loadingElement;
        },
        elementsForSearchResult(){
            return this.$store.state.search.listElement;
        },
        isNotFound(){
            return this.$store.state.search.isNotFound;
        }
    }
}
</script>

<style scoped>
    .result-text {
        font-size: 75%;
    }
    .section-box {
        position: relative;
        top: 50px;
        padding: 0px 10px 0px 10px;
        margin-bottom: 10px;
    }
    .title-box {
        margin-bottom: 20px;
        font-size: 15px;
        font-weight: 800;
    }
    .search-box{
        margin-bottom: 10px;
    }
    .search-notify p{
        text-align: center;
    }
    
</style>