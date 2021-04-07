<template>
    <div class="element" @click="open">
                <img :src="item.image">
                <div class="element_title">{{item.name}}</div>
    </div>
</template>

<script>


export default {
    name : 'Element',
    props: ['item'],
    data(){
        return {
        }
    },
    methods :{
        async open(){
            this.$confirm('Hành động của bạn sẽ xóa toàn bộ ký tự hiện có. Tiếp tục?', 'Xác nhận', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                type: 'warning'
                }).then( async () => {
                    await this.$store.dispatch("template/insert_template", this.item.id);

                    this.$message({
                        type: 'success',
                        message: 'Tạo mẫu mới thành công'
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Hủy bỏ tạo mẫu'
                });          
            });
        }
    }
}
</script>