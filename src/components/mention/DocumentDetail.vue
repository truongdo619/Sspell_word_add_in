<template>
    <div>
            <div class="nav-bar">
                <i @click="handleClick" class="el-icon-back"></i>
                <span class="nav-title">Thuộc tính văn bản</span>
            </div>
            <div class="doc-detail">
                
            <table cellpadding="0px" cellspacing="1px" border="none" width="100%">
                            <tbody>
                                <tr>
                                    <td colSpan="4" class="title">
                                        {{this.item['document_info'][0]}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label">
                                        Số ký hiệu
                                    </td>
                                    <td colSpan="3">
                                        {{this.item['official_number'][0]}}
                                    </td>
                                    
                                </tr>
<!--                                <tr>-->
<!--                                    <td class="label">-->
<!--                                        Toàn văn-->
<!--                                    </td>-->
<!--                                    <td colSpan="3">-->
<!--                                        <a target="_blank" :href="'https://lawtech.simidoc.vn/van-ban/a/' + this.item['_id']">-->
<!--                                            Xem tại đây-->
<!--                                        </a>-->
<!--                                    </td>-->
<!--                                    -->
<!--                                </tr>-->
                                <tr>
                                <td class="label">
                                        Ngày ban hành
                                    </td>
                                    <td  colSpan="3">
                                       {{this.issued_date}}
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td class="label">
                                        Loại văn bản
                                    </td>
                                    <td colSpan="3">
                                        {{this.item['document_type'][0]}}
                                    </td>
                                    
                                </tr>
                                <tr>
                                <td class="label">
                                        Ngày có hiệu lực
                                    </td>
                                    <td colSpan="3">
                                        {{this.effective_date}}
                                    </td>
                                </tr>
                                <tr>
                                <td class="label">
                                    Ngành
                                    </td>
                                    <td colSpan="3">
                                        {{this.item['document_department'][0]}}
                                    </td>
                                </tr>
                                <tr>
                                
                                    <td class="label">
                                        Lĩnh vực
                                    </td>
                                    <td colSpan="3">
                                        {{this.item['document_field'][0]}}
                                    </td>
                                
                                </tr>
                                <tr>
                                <td rowSpan="1" class="label">
                                        Cơ quan ban hành/ Chức danh / Người ký
                                    </td>
                                    
                                    <td colSpan="3">
                                        {{this.item['issuing_body/office/signer'][0] + " / " + 
                                        this.item['issuing_body/office/signer'][1] + " / " +
                                        this.item['issuing_body/office/signer'][2] }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label">
                                        Phạm vi
                                    </td>
                                    <td colSpan="3">
                                        {{this.item["effective_area"]}}
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan="4" class="label">
                                        <p>Thông tin áp dụng</p>
                                        
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td colSpan="4" class="title">
                                          {{ "Tình trạng hiệu lực: " + this.item['document_info'][1]}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
</template>

<script>
export default {
    name : "DocumentDetail",
    computed: {
        item (){
            return this.$store.state.mention.activeElement;
        },
        effective_date(){
            let effective_date = this.item['effective_date'];
            if (effective_date != null && effective_date != undefined && effective_date.length != 0 ){
                let tmp = effective_date.substring(0, 10).split("-");
                return tmp[2] + "-" + tmp[1] + "-" + tmp[0];
            }
            return "";
        },
        issued_date(){
            
            let issued_date = this.item['issued_date'];
            if (issued_date != null && issued_date != undefined && issued_date.length != 0 ){
                let tmp = issued_date.substring(0, 10).split("-");
                return tmp[2] + "-" + tmp[1] + "-" + tmp[0];
            }
            return "";
        }
    },
    methods :{
        handleClick(){
            this.$emit("click-back-btn");
        }
    }
}
</script>

<style scoped>


table{
    margin-top: 10px;
    background: #ccc;
    border-spacing: 1px;
    border-collapse: separate;
    width: 100%;
    
    border-collapse: collapse;
    border: 1px solid gray; 
}

table .title{
    background: #E7F1FF;
    font: bold 10pt Arial, Helvetica, sans-serif;
    color: #0077d3;
}

table td{
    padding: 8px;
    background: #fff;
    vertical-align: text-top;
    color: #000;
}

table .label{
    background: #f6f6f6;
    font: bold 10pt Arial, Helvetica, sans-serif;
    color: #666;
}
table li{
    list-style: none;
}

.nav-bar{
    background-color: #1e87f0;
    color: white;
}

.nav-bar span{
    color: white;
    line-height: 32px;
}

.nav-bar .nav-title{
    margin-left: 10px;
}
.nav-bar i{
    cursor: pointer;
    height: 100%;
    padding: 10px;
    color: white;
}

.nav-bar i:hover{
    background-color: #2b579a;
    color: #f4f4f4;
}
</style>