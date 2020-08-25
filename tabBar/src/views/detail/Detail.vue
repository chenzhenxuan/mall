<template>
    <div id="detail">
        <detail-nav-bar/>
        <scroll class="content">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo"/>
        <detail-param-info :param-info="paramInfo"/>
        <detail-comment-info :comment-info="commentInfo"/>
        <good-list :goods="recommends"/>
        </scroll>
    </div>
</template>
<script>
import DetailNavBar from '../detail/ChildComps1/DetailNavBar'
import DetailSwiper from '../detail/ChildComps1/DetailSwiper'
import DetailBaseInfo from '../detail/ChildComps1/DetailBaseInfo'
import {getDetail,Goods,Shop,getRecommend, GoodsParam} from '../../network/detail'
import DetailShopInfo from '../detail/ChildComps1/DetailShopInfo'
import Scroll from '../../components/scroll/Scroll'
import DetailGoodsInfo from '../detail/ChildComps1/DetailGoodsInfo'
import GoodList from '../../components/content/GoodsList'
import DetailCommentInfo from '../detail/ChildComps1/DetailCommentInfo'
import DetailParamInfo from '../detail/ChildComps1/DetailParamInfo'
export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        GoodList,
        DetailCommentInfo,
        DetailParamInfo
    },
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            commentInfo:{},
            recommends:[],
            paramInfo:{}
        }
    },
    created(){
          this.iid=this.$route.params.iid
          //根据iid请求详情数据
          getDetail(this.iid).then(res=>{
                                //1.获取顶部banne
                console.log(res.data.result.rate)
                const data=res.data.result;
				this.topImages =data.itemInfo.topImages;
                this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo);
                this.shop=new Shop(data.shopInfo);
                this.detailInfo=data.detailInfo;
                //5 获取参数的信息
                this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
                this.commentInfo=data.rate.list[0];
          })
          getRecommend().then(res=>{
              console.log(res.data.data.list)
              this.recommends=res.data.data.list;
                console.log(this.recommends);
              
          })
    }

}
</script>
<style scoped>
#detail{
    position:relative;
    z-index:9;
    background-color:#fff;
    height:100vh;
}
.content{
    height:calc(100% - 44px);
}
</style>