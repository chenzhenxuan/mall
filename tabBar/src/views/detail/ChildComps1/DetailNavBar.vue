<template>
    <div>
        <nav-bar>
            <div slot="left" class="left" @click="backClick">
                <img src="../../../assets/img/tabbar/fanhui.png">
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles" :key="index"
                 class="title-item"
                :class="{active:index===currentIndex}"
                @click="click(index)">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from '../../../components/navbar/NavBar'
export default {
    name:'DetailNavBar',
    components:{
        NavBar
    },
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    methods:{
        click(index){
            this.currentIndex=index;
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>
<style scoped>
.nav-bar{
    position:relative;
    z-index:9;
    background-color:#fff;
}
.nav-bar img{
    margin-top:10px;
}
.title{
    display:flex;
}
.title-item{
    flex:1;
    font-size:14px;
}
.active{
    color:crimson;
}
.left img{
    margin-top:10px;
    width:28px;
    height:28px;
}
</style>